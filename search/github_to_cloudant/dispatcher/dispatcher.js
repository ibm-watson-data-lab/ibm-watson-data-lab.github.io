/**
 * Dispatch files to appropriate converter action
 *
 * @param  {Object} params
 * @param  {Array of Objects} params.files
 *         An array of objects with 'name' and 'url' (to retrieve) or 'data' (to parse) and convert to JSON
 *         (e.g., [ { "name": "projects.yml", "url": "https://raw.githubusercontent.com/myrepo/master/_data/projects.yml" } ])
 * @param  {string} params.packageName
 *         The package name where the 'xxxx_to_json' actions reside
 */

const openwhisk = require('openwhisk')

const main = params => {
  if (params.hasOwnProperty('files') && params.files.length > 0) {
    return dispatchactions(params.files, params.packageName)
  } else {
    console.error('dispatcher.main: Missing files')
    return Promise.reject(webResponse('Missing files', 400))
  }
}

const dispatchactions = (files, packageName) => {
  const ow = openwhisk()
  const actionprefix = packageName ? `${packageName}/` : ''
  const actionmap = {
    yml: `${actionprefix}parse_yml`,
    yaml: `${actionprefix}parse_yml`,
    csv: `${actionprefix}parse_csv`,
    tsv: `${actionprefix}parse_csv`,
    json: `${actionprefix}parse_json`
  }
  let actions = []

  files.forEach(f => {
    let params = {}

    if (f.hasOwnProperty('fileurl')) {
      params['filename'] = f.hasOwnProperty('filename') ? f.filename : f.fileurl.substring(f.fileurl.lastIndexOf('/') + 1)
      params['fileurl'] = f.fileurl
    } else if (f.hasOwnProperty('filedata')) {
      params['filename'] = f.hasOwnProperty('filename') ? f.filename : ''
      params['filedata'] = f.filedata
    }

    const ext = params.filename.substring(params.filename.lastIndexOf('.') + 1)
    if (actionmap.hasOwnProperty(ext)) {
      console.log(`dispatcher: invoking ${actionmap[ext]} for ${params.filename}`)
      actions.push(ow.actions.invoke({ actionName: actionmap[ext], params: params }))
    } else {
      console.log(`dispatcher: skipping ${params.fileurl || params.filename}, file type not known`)
    }
  })

  return Promise.all(actions).then(results => {
    return webResponse(`${results.length} 'parse_xxxx' action(s) initiated`)
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
    body: Buffer.from(JSON.stringify(message), 'utf8').toString('base64')
  }
}

exports.main = main
