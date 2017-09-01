/**
 * Extract GitHub URLs of watched files which have been modified.
 * Invoked via GitHub Webhook push event
 *
 * @param  {Object} params
 * @param  {array of strings} params.watch.yml
 *         Relative paths to 'yml' files which will be watched and stored into Cloudant
 *         (example: [ "_data/projects.yml", "config.yml" ])
 * @param  {string} params.__ow_headers.x-github-event
 *         GitHub webhook event type header (example: 'push')
 * @return {Object}
 *         An object containing the (raw) URLs to the watched files which were updated
 */

const _ = require('lodash')

const main = params => {
  let eventtype = null
  if (params.hasOwnProperty('__ow_headers') && params.__ow_headers.hasOwnProperty('x-github-event')) {
    eventtype = params.__ow_headers['x-github-event']
  }
  if (eventtype !== 'push') {
    // not the event we are looking for
    console.warn(`from_github.main: not the event we are looking for: ${eventtype}`)
    return Promise.reject(webResponse('Not the event we are looking for', 202))
  } else if (params.ref !== 'refs/heads/master') {
    // not the branch we want
    console.warn(`from_github.main: not the branch we want: ${params.ref}`)
    return Promise.reject(webResponse('Not the branch we want', 202))
  } else if (!params['head_commit']) {
      // missing head_commit
    console.warn(`from_github.main: missing head_commit: ${params.ref}`)
    return Promise.reject(webResponse('Missing head_commit', 202))
  } else {
    return fromwebhook(params.watch, params)
  }
}

const fromwebhook = (watch, body) => {
  const repo = body.repository['full_name']
  const commit = body['head_commit']
  let urls = []
  let ymlfiles = []

  if (watch && watch.yml) {
    ymlfiles = watch.yml
  }

  let changes = _.union(commit.added, commit.modified, commit.removed)
  changes = changes.map(f => {
    return ymlfiles.indexOf(f) > -1
      ? `https://raw.githubusercontent.com/${repo}/master/${f}`
      : null
  })
  changes = _.compact(changes)

  if (changes.length > 0) {
    urls = changes
    return Promise.resolve({
      urls: {
        yml: urls
      }
    })
  } else {
    console.log('fromwebhook: ignoring push event, yml files not changed')
    return Promise.reject(webResponse('No watched files changed', 200))
  }
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
