/**
  *
  * main() will be invoked when you run this Action.
  * Action saves given docs to Cloudant (updates if already exists)
  *
  * @param Whisk actions accept a single parameter,
  *        which must be a JSON object which must contain:
  *         - docs = array of JSON objects to save
  *         - cloudantUrl = the Cloudant URL (host, username, password)
  *         - dbname = the name of the database
  *
  * @return returns array of save/updated document IDs
  *
  */

const main = (params) => {
  let docs = params.docs

  // ensure we have have docs to save
  if (!docs || typeof docs !== 'object') {
    throw (new Error('Missing docs[]'))
  }

  // check for db given
  if (!params.dbname) {
    throw (new Error('Missing dbname'))
  }

  // get cloudant & db instance
  const cloudant = getCloudantAccount(params)
  const db = cloudant.db.use(params.dbname)
  let docids = { 'docids': [] }

  let cloudantdocs = docs.map(doc => cloudantUpsert(db, doc))
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

const getCloudantUrl = params => {
  let url

  if (params.cloudantUrl) {
    url = params.cloudantUrl
  } else {
    if (!params.host || !params.username || !params.password) {
      throw (new Error('cloudant url is required.'))
    }

    url = 'https://' + params.username + ':' + params.password + '@' + params.host
    params.cloudantUrl = url
  }

  return url
}

const getCloudantAccount = params => {
  return require('cloudant')({
    url: getCloudantUrl(params),
    plugin: 'retry',
    retryTimeout: 1100
  })
}

const cloudantUpsert = (db, doc, callback) => {
  return new Promise((resolve, reject) => {
    doc['_id'] = doc._id || doc.id || doc.title.toLowerCase().replace(/([^A-Z0-9])+/ig, '')
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

exports.main = main
