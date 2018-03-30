/**
 * Converts supported files to JSON
 *
 * @param  {Object} params
 * @param  {string} params.fileurl
 *         The yml file URL to retrieve and convert to JSON
 *         (e.g., "https://raw.githubusercontent.com/myrepo/master/_data/projects.yml")
 * @param  {string} params.filedata
 *         The content of the yml file to convert to JSON
 * @param  {string} params.packageName
 *         The package name of the 'to_couchdb' action
 * @return {Object}
 *         Object containing 'docs'- a JSONArray representation of the file contents
 */

const request = require('request')
const yaml = require('js-yaml')
const openwhisk = require('openwhisk')
const _ = require('lodash')

const main = params => {
  const nextaction = params.packageName ? `${params.packageName}/to_couchdb` : 'to_couchdb'

  if (params.hasOwnProperty('filedata')) {
    let jsondocs = tojson(params.filedata, params.filename)
    return triggernext(jsondocs, nextaction, params.filename)
  } else if (params.hasOwnProperty('fileurl')) {
    return getyml(params.fileurl, params.filename)
      .then(jsondocs => {
        return triggernext(jsondocs, nextaction, params.filename)
      })
  } else {
    console.error('parse_yml.main: Missing file URLs')
    return Promise.reject(jsonResponse('Missing file URLs', true))
  }
}

const getyml = (url, name) => {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      method: 'GET'
    }, (err, response, body) => {
      if (err) {
        console.warn(`getyml: Failed to retrieve ${url}`, err)
        reject(jsonResponse(`Failed to retrieve ${url}`, true))
      } else if (response.statusCode === 200) {
        let jsondocs = tojson(body, name)
        resolve(jsondocs)
      } else {
        console.warn(`getyml: Failed to retrieve ${url}`, response.statusCode, response.statusMessage, body)
        reject(jsonResponse(`Failed to retrieve ${url}`, true))
      }
    })
  })
}

const tojson = (data, name) => {
  let json = yaml.safeLoad(data)

  if (json.map) {
    json = json.map(j => {
      j['src_url'] = name
      return j
    })
  } else {
    json['src_url'] = name
    json = [json]
  }

  return json
}

const triggernext = (jsondocs, nextaction, name) => {
  const ow = openwhisk()
  return new Promise((resolve, reject) => {
    let actions = []

    if (jsondocs) {
      console.log(`parse_yml: ${name} has ${jsondocs.length} doc(s)`)

      _.chunk(jsondocs, 50).forEach(chunk => {
        actions.push(ow.actions.invoke({ actionName: nextaction, params: { src: name, docs: chunk } }))
      })
    }

    return Promise.all(actions).then(results => {
      return jsonResponse(`${results.length} 'to_couchdb' activation(s) initiated from parse_yml`)
    })
  })
}

const jsonResponse = (body, error) => {
  return {
    status: error ? 'error' : 'ok',
    message: body.message || body
  }
}

exports.main = main
