/**
 * Extract GitHub URLs of watched files which have been modified.
 * Invoked via GitHub Webhook push event
 *
 * @param  {Object} params
 * @param  {array of strings} params.FILES
 *         Relative paths to 'yml' files which will be watched and stored into Cloudant
 *         (example: [ "_data/projects.yml", "config.yml" ])
 * @param  {string} params.GIT_BRANCH
 *         The name of the branch to watch for updates (example: 'master')
 * @param  {string} params.GIT_SECRET
 *         The secret/key used to generate the hmac hex digest
 * @param  {string} params.__ow_headers.x-github-event
 *         GitHub webhook event type header (example: 'push')
 * @param  {string} params.__ow_headers.x-hub-signature
 *         GitHub webhook hmac hex digest header
 * @return {Object}
 *         An object containing the (raw GitHub) URLs to the watched files which were updated
 */

const Buffer = require('safe-buffer').Buffer

const main = params => {
  if (params.hasOwnProperty('__ow_headers')) {
    const branch = params.hasOwnProperty('GIT_BRANCH') ? params.GIT_BRANCH : 'master'
    const headers = params.hasOwnProperty('__ow_headers') ? params.__ow_headers : {}
    const eventtype = headers.hasOwnProperty('x-github-event') ? headers['x-github-event'] : null
    let body = {}

    if (params.hasOwnProperty('__ow_body')) {
      body = JSON.parse(Buffer.from(params.__ow_body, 'base64').toString())
    }

    if (params.hasOwnProperty('GIT_SECRET')) {
      const crypto = require('crypto')
      const computedhash = 'sha1=' + crypto.createHmac('sha1', params.GIT_SECRET).update(JSON.stringify(body)).digest('hex')
      const hubsignature = headers.hasOwnProperty('x-hub-signature') ? headers['x-hub-signature'] : null

      if (hubsignature !== computedhash) {
        // uh oh, signature does not match
        console.warn(`from_github.main: received hmac hex digest (${hubsignature}) does not match expected (${computedhash})`)
        return Promise.reject(webResponse('Signature does not match', 403))
      }
    }

    if (eventtype !== 'push') {
      // not the event we are looking for
      console.warn(`from_github.main: not the event we are looking for: ${eventtype}`)
      return Promise.reject(webResponse('Not the event we are looking for', 400))
    } else if (body.ref !== `refs/heads/${branch}`) {
      // not the branch we want
      console.warn(`from_github.main: want branch 'refs/heads/${branch}' got '${body.ref}'`)
      return Promise.reject(webResponse('Not the branch we want', 400))
    } else if (!body['head_commit']) {
      // missing head_commit
      console.warn(`from_github.main: missing head_commit: ${body.ref}`)
      return Promise.reject(webResponse('Missing head_commit', 400))
    } else if (!params.FILES || !params.FILES.length) {
      // no files to watch for
      console.warn(`from_github.main: no files to watch: ${params.FILES}`)
      return Promise.reject(webResponse('No files to watch', 500))
    } else {
      return fromwebhook(params.FILES, branch, body)
    }
  } else {
    // where are the headers?
    console.warn(`from_github.main: headers missing: ${params}`)
    return Promise.reject(webResponse('Headers missing', 400))
  }
}

const fromwebhook = (files, branch, body) => {
  const _ = require('lodash')
  const repo = body.repository['full_name']
  const commit = body['head_commit']

  let changes = _.union(commit.added, commit.modified)
  changes = changes.map(f => {
    if (files.indexOf(f) > -1) {
      return {
        filename: f,
        fileurl: `https://raw.githubusercontent.com/${repo}/${branch}/${f}`
      }
    } else {
      return null
    }
  })
  changes = _.compact(changes)

  if (changes.length > 0) {
    return Promise.resolve({ files: changes })
  } else {
    return Promise.reject(webResponse('No watched files changed', 200))
  }
}

const webResponse = (body, statusCode) => {
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
