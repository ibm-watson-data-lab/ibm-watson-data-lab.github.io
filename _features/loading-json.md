---
title:      Loading JSON
headline:   Moving data into data services should be easy. We can help.
layout:     layout-featured-collection
permalink:  loading-json
strategies: 
  - working-with-json
position:	0
lead: glynn-bird
---

On the IBM Cloud, it should be easy to move data in, share it between services, and get data out. These projects represent our ongoing work to make data import and export easier for users.

## Importing structured data into document data stores

Structured data living in spreadsheets, relational databases, or as flat CSV/TSV files can be easily imported into IBM Cloudant, MongoDB or ElasticSearch using our [nosqlimport](https://www.npmjs.com/package/nosqlimport) tool. 

Cloudant and CouchDB have their own tool, the popular [couchimport](https://www.npmjs.com/package/couchimport) utility which allows structured data to be bulk imported into the JSON document stores, with an optional transformation along the way. The *couchimport* utility is also packaged as an [installable Electron](https://github.com/ibm-watson-data-lab/couchdbimporter) app to make data transfer as simple as a "drag and drop."

## Moving data from other clouds

Developers are keen to avoid being locked in to a cloud platform so we have built tools to extract data from [other](https://medium.com/ibm-watson-data-lab/moving-data-from-documentdb-to-cloudant-or-couchdb-6c3d16414fc6) [cloud](https://medium.com/ibm-watson-data-lab/moving-data-from-dynamodb-to-cloudant-or-couchdb-4a4110a4e2d9) databases, which can easily be paired with [couchimport](https://www.npmjs.com/package/couchimport) or [nosqlimport](https://www.npmjs.com/package/nosqlimport) to move the data elsewhere.

## Backing up Cloudant

Cloudant is an operational database, safely storing vital data for our customers in distributed clusters. Customer backup needs vary widely, but can be scripted easily with the [couchbackup](https://www.npmjs.com/package/@cloudant/couchbackup) utility which can turn databases into text files, to allow rotating backups to be archived on cheaper object storage.

## Transporter

The nice folks at [Compose](https://compose.com) have written the [Transporter](https://github.com/compose/transporter) utility that makes data movement between files and their MongoDB, ElasticSearch, RethinkDB, PostgreSQL, and RabbitMQ products.  
