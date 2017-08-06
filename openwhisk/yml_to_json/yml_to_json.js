/**
  *
  * main() will be invoked when you run this Action.
  * Action retrieves *.yml files provided and converts to JSON.
  *
  * @param Whisk actions accept a single parameter,
  *        which must be a JSON object which must contain:
  *         - urls = an array of urls to yml files to retrieve
  *
  * @return returns JSON representation of the *.yml files
  *
  */

const request = require('request')
const yaml = require('js-yaml')

const main = params => {
  let docs = { 'docs': [] }

  if (params.hasOwnProperty('urls')) {
    let urls = params.urls
    let jsondocs = urls.map(url => yml2json(url))

    jsondocs.push(new Promise((resolve, reject) => resolve(docs)))

    return jsondocs.reduce((prev, nextFn) => {
      return prev.then(results => {
        if (results) {
          docs.docs = docs.docs.concat(results)
        }
        return nextFn
      }).catch(error => {
        console.error(error)
        return nextFn
      })
    }, Promise.resolve())
  }
}

const yml2json = url => {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: 'GET'
    }, (err, response, body) => {
      if (err) {
        console.warn(err)
        resolve(Promise.resolve())
      } else if (response.statusCode === 200) {
        let json = yaml.safeLoad(body)
        if (json.map) {
          json = json.map(j => {
            j['yml_src'] = url
            return j
          })
        } else {
          json['yml_src'] = url
        }
        resolve(json)
      } else {
        console.warn(`Failed to retrieve ${url}`, response.statusCode, response.statusMessage, body)
        resolve(Promise.resolve())
      }
    })
  })
}

exports.main = main
