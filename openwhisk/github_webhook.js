/**
  *
  * main() will be invoked when you run this Action.
  * Action is expected to be invoked via GitHub Webhook push event.
  * Action checks push event for any changes to projects.yml in master.
  *
  * @param Whisk actions accept a single parameter,
  *        which must be a JSON object which must contain
  *        the github webhook push event payload
  *
  * @return returns array of (raw) urls to changed projects.yml
  *
  */

const _ = require('lodash')

const main = params => {
  let eventtype = null
  let urls = []

  if (params.hasOwnProperty('__ow_headers')) {
    let headers = params.__ow_headers
    if (headers.hasOwnProperty('x-github-event')) {
      eventtype = headers['x-github-event']
    }
  }

  if (eventtype !== 'push') {
    // not the event we are looking for
    console.warn(`Skipping event: received event type ${eventtype}`)
  // } else if (!params.hasOwnProperty('__ow_body')) {
  //   // missing body
  //   console.error('No body received:', params)
  } else {
    let body = params // JSON.parse(params['__ow_body'])

    if (!body.hasOwnProperty('ref') || body.ref !== 'refs/heads/master') {
      console.warn('Skipping push event: event not for master branch')
    } else if (!body.hasOwnProperty('head_commit')) {
      console.error('Skipping push event: event missing head_commit')
    } else {
      const repo = body.repository['full_name']
      const commit = body['head_commit']
      const ymlfiles = params.hasOwnProperty('ymlFiles') ? params.ymlFiles.split(',') : ['projects.yml']

      let changes = _.union(commit.added, commit.modified, commit.removed)
      changes = changes.map(f => {
        return ymlfiles.indexOf(f) > -1
          ? `https://raw.githubusercontent.com/${repo}/master/${f}`
          : null
      })
      changes = _.compact(changes)

      if (changes.length === 0) {
        console.log('Ignoring push event: yml files not changed')
      } else {
        urls = changes
      }
    }
  }

  return { urls: urls }
}

exports.main = main
