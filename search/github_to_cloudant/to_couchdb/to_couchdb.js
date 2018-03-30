/**
 * Saves JSON documents to Cloudant/CouchDB (updates if already exists)
 *
 * @param  {Object} params
 * @param  {string} params.COUCHDB_URL
 *         The fully qualified URL to the Cloudant/CouchDB instance used to store the JSON
 *         (example: 'https://username:password@username.cloudant.com')
 * @param  {string} params.COUCHDB_DBNAME
 *         The name of the database to store the JSON. Database must already exist in the
 *         referenced Cloudant/CouchDB instance (e.g., 'projectsdb'). This overrides params.src
 * @param  {array of Objects} params.docs
 *         An array of JSON data to store
 *         (e.g., [ { "name": "va", "state": "MA" }, { "name": "vaughan", "state": "NJ" } ])
 * @param  {string} params.src
 *         The name of the (GitHub) source file the JSON data was retrieved from. This will be
 *         used as the database name if params.COUCHDB_DBNAME is not provided. If this is used
 *         for the database name it will be normalized (i.e., replace non-alphanumeric characters
 *         with _ and convert to lowercase)
 * @return {array of strings}
 *         An array containing the document IDs of the saved files
 */

const hash = require('object-hash')

const main = (params) => {
  if (!params.docs || params.docs.length < 1) {
    console.error('to_couchdb.main: missing docs[]')
    return Promise.reject(jsonResponse('Missing docs[]', true))
  }

  let dbname = null
  if (params.COUCHDB_DBNAME) {
    dbname = params.COUCHDB_DBNAME
  } else if (params.src) {
    dbname = params.src.replace(/\W+/g, '_').toLowerCase()
    while (dbname.startsWith('_')) {
      dbname = dbname.substring(1)
    }
  }

  if (!dbname || !params.COUCHDB_URL) {
    console.error('to_couchdb.main: missing CouchDB/Cloudant info')
    return Promise.reject(jsonResponse('Missing CouchDB/Cloudant info', true))
  }

  return initDB(params.COUCHDB_URL, dbname)
    .then(db => {
      return sendToDB(db, params)
    })
    .catch(err => {
      console.error('to_couchdb.main: ', err)
      return Promise.reject(jsonResponse(err, true))
    })
}

const sendToDB = (db, params) => {
  let byids = {}
  // const db = cloudant.db.use(dbname)
  let docs = Array.isArray(params.docs) ? params.docs : [params.docs]
  docs.forEach(doc => {
    doc['src_hash'] = generateHash(doc)
    doc['_id'] = doc._id || doc.id || generateID(doc)
    byids[doc._id] = doc
  })

  return new Promise((resolve, reject) => {
    let keys = Object.keys(byids)
    db.fetch({keys: keys}, function (err, data) {
      if (err) {
        console.error(err)
        reject(jsonResponse(err, true))
      } else {
        console.log(`to_couchdb.main: fetched ${data.rows.length} of ${keys.length}`)

        data.rows.forEach(row => {
          if (row.doc) {
            if (row.doc._rev) {
              byids[row.key]._rev = row.doc._rev
            }
            if (byids[row.key]['src_hash'] === row.doc['src_hash']) {
              delete byids[row.key]
            }
          }
        })

        const updateddocs = Object.keys(byids).map(id => {
          return byids[id]
        })

        db.bulk({ 'docs': updateddocs }, (err, results) => {
          if (err) {
            console.error(err)
            reject(jsonResponse(err, true))
          } else {
            resolve(jsonResponse({ 'docs': results }))
          }
        })
      }
    })
  })
}

const initDB = (url, dbname) => {
  return new Promise((resolve, reject) => {
    // get db instance
    const cloudant = require('cloudant')({
      url: url,
      plugin: 'retry',
      retryTimeout: 1100
    })

    cloudant.db.get(dbname, function (err, data) {
      if (err) {
        cloudant.db.create(dbname, function (err, body) {
          if (err) {
            reject(err)
          } else {
            resolve(cloudant.db.use(dbname))
          }
        })
      } else {
        resolve(cloudant.db.use(dbname))
      }
    })
  })
}

const jsonResponse = (body, error) => {
  return {
    status: error ? 'error' : 'ok',
    message: body.message || body
  }
}

const generateID = doc => {
  let d = doc
  if (doc.title) {
    d = { title: doc.title }
  } else if (doc.name) {
    d = { name: doc.name }
  }
  return generateHash(d)
}

const generateHash = doc => {
  return hash(doc, {
    ignoreUnknown: true,
    excludeKeys: key => {
      return key === 'id' || key === '_id'
    }
  })
}

exports.main = main
