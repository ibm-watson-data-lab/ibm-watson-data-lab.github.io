/**
 * Saves JSON documents to Cloudant/CouchDB (updates if already exists)
 *
 * @param  {Object} params
 * @param  {string} params.cloudant.url
 *         The fully qualified URL to the Cloudant/CouchDB instance used to store the JSON
 *         (example: 'https://username:password@username.cloudant.com')
 * @param  {string} params.cloudant.dbname
 *         The name of the database to store the JSON. Database must already exist in the
 *         referenced Cloudant/CouchDB instance (example: 'projectsdb')
 * @param  {array of Objects} params.docs
 *         An array of JSON data to store
 *         (example: [ { "name": "va", "state": "MA" }, { "name": "vaughan", "state": "NJ" } ])
 * @return {array of strings}
 *         An array containing the document IDs of the saved files
 */

const main = (params) => {
  if (!params.docs || params.docs.length < 1) {
    console.error('to_cloudant.main: missing docs[]')
    return Promise.reject(webResponse('Missing docs[]', 400))
  }

  if (!params.cloudant || !params.cloudant.dbname || !params.cloudant.url) {
    console.error('to_cloudant.main: missing cloudant info')
    return Promise.reject(webResponse('Missing Cloudant info', 400))
  }

  let docids = { 'docids': [] }

  // get cloudant & db instance
  const cloudant = require('cloudant')({
    url: params.cloudant.url,
    plugin: 'retry',
    retryTimeout: 1100
  })

  const db = cloudant.db.use(params.cloudant.dbname)
  let cloudantdocs = params.docs.map(doc => cloudantUpsert(db, doc))

  cloudantdocs.push(new Promise((resolve, reject) => resolve(docids)))

  return cloudantdocs.reduce((prev, nextFn) => {
    return prev.then(results => {
      if (results) {
        docids.docids = docids.docids.concat(results)
      }
      return nextFn
    }).catch(error => {
      console.error(error)
      return nextFn
    })
  }, Promise.resolve())
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

const cloudantUpsert = (db, doc, callback) => {
  return new Promise((resolve, reject) => {
    doc['_id'] = doc._id || doc.id || generateID(doc)
    db.get(doc._id, function (err, data) {
      if (!err) {
        console.log('upsert', data)
        doc._rev = data._rev
      }
      db.insert(doc, function (err, d) {
        if (err) {
          reject(err)
        } else {
          resolve(d.id)
        }
      })
    })
  })
}

const generateID = doc => {
  return doc.title.toLowerCase().replace(/([^A-Z0-9])+/ig, '')
}

exports.main = main
