/**
 * Converts supported files to JSON
 *
 * @param  {Object} params
 * @param  {string} params.urls
 * @param  {array of strings} params.urls.yml
 *         An array of yml file URLs to retrieve and convert to JSON
 *         (example: [ "https://raw.githubusercontent.com/myrepo/master/_data/projects.yml", "https://raw.githubusercontent.com/myrepo/master/config.yml" ])
 * @return {Object}
 *         Object containing 'docs'- an array of JSON representation of the files
 */

const request = require('request')
const yaml = require('js-yaml')

const main = params => {
  let docs = { 'docs': [] }

  if (params.hasOwnProperty('urls') && params.urls.hasOwnProperty('yml')) {
    let urls = params.urls.yml
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
  } else {
    console.error('to_json.main: Missing file URLs')
    return Promise.reject(webResponse('Missing file URLs', 400))
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
        console.warn(`yml2json: Failed to retrieve ${url}`, response.statusCode, response.statusMessage, body)
        resolve(Promise.resolve())
      }
    })
  })
}

const webResponse = (body, statusCode) => {
  const Buffer = require('safe-buffer').Buffer
  const message = {
    status: statusCode >= 400 ? 'error' : 'ok',
    message: body.message || body
  }

  return {
    headers: { 'Content-Type': 'application/json' },
    statusCode: statusCode || 200,
    message: message.message,
    body: new Buffer(JSON.stringify(message)).toString('base64')
  }
}

exports.main = main
