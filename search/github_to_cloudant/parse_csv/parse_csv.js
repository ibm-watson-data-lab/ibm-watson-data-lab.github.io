/**
 * Converts supported files to JSON
 *
 * @param  {Object} params
 * @param  {string} params.fileurl
 *         The csv file URL to retrieve and convert to JSON
 *         (e.g., "https://raw.githubusercontent.com/myrepo/master/_data/cities.csv")
 * @param  {string} params.packageName
 *         The package name of the 'to_couchdb' action
 * @return {Object}
 *         Object containing 'docs'- a JSONArray representation of the file contents
 */

const request = require('request')
const openwhisk = require('openwhisk')
const _ = require('lodash')
const csvoptions = {columns: true, skip_empty_lines: true, relax: true}

const main = params => {
  const nextaction = params.packageName ? `${params.packageName}/to_couchdb` : 'to_couchdb'
  csvoptions['delimiter'] = params.filename.endsWith('.tsv') ? '\t' : ','

  if (params.hasOwnProperty('filedata')) {
    let jsondata = require('csv-parse/lib/sync')(params.filedata, csvoptions)
    let jsondocs = updatejson(jsondata, params.filename)
    return triggernext(jsondocs, nextaction, params.filename)
  } else if (params.hasOwnProperty('fileurl')) {
    return parsefile(params.fileurl, params.filename)
      .then(jsondocs => {
        return triggernext(jsondocs, nextaction, params.filename)
      })
  } else {
    console.error('parse_csv.main: Missing file URLs')
    return Promise.reject(jsonResponse('Missing file URLs', true))
  }
}

const parsefile = (url, name) => {
  return new Promise((resolve, reject) => {
    const parser = require('csv-parse')(csvoptions)
    let rows = []

    request.get(url)
      // .on('response', response => {
      //   console.log('repsonse', response.statusCode)
      // })
      .on('error', err => {
        console.warn(`parsefile: Failed to retrieve ${url}`, err)
        reject(jsonResponse(`Failed to retrieve ${url}`, true))
      })
      .pipe(parser)
      .on('data', d => { rows.push(d) })
      .on('error', err => {
        console.warn(`parsefile: Failed to parse ${url}`, err)
        reject(jsonResponse(`Failed to parse ${url}`, true))
      })
      .on('finish', () => {
        resolve(updatejson(rows, name))
      })
  })
}

const updatejson = (json, name) => {
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
      console.log(`parse_csv: ${name} has ${jsondocs.length} doc(s)`)

      _.chunk(jsondocs, 50).forEach(chunk => {
        actions.push(ow.actions.invoke({ actionName: nextaction, params: { src: name, docs: chunk } }))
      })
    }

    return Promise.all(actions).then(results => {
      return jsonResponse(`${results.length} 'to_couchdb' activation(s) initiated from parse_csv`)
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
