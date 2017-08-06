#!/bin/bash

# fully qualified URL to Cloudant/CouchDB instance
if [ -z "$COUCH_URL" ]; then echo "COUCH_URL is required"; exit 1; fi
# Cloudant/CouchDB database name
if [ -z "$COUCH_DBNAME" ]; then echo "COUCH_DBNAME is required"; exit 1; fi
# relative path to *.yml files separated by comma (e.g., export YML_FILES=_data/projects.yml,_config.yml)
if [ -z "$YML_FILES"]; then echo "YML_FILES is required"; exit 1; fi

# create package with parameters from environment variables
wsk package update devadvosite --param cloudantUrl $COUCH_URL --param dbname $COUCH_DBNAME --param ymlFiles $YML_FILES

# creata a web action to receive incoming github webhook events
wsk action update devadvosite/github_webhook github_webhook.js --web true

# zip up yml_to_json action since it has dependencies not available in openwhisk
rm yml_to_json.zip
cd yml_to_json/
npm install
zip -r yml_to_json.zip *
mv yml_to_json.zip ../yml_to_json.zip
cd ../

# creata an action to conver yml to json
wsk action update devadvosite/yml_to_json --kind nodejs:6 yml_to_json.zip

# creata an action to save to cloudant
wsk action update devadvosite/save_to_cloudant save_to_cloudant.js

# create a web action sequence of the actions
# available at https://{APIHOST}/api/v1/web/{NAMESPACE}/devadvosite/github_to_cloudant.json
wsk action update devadvosite/github_to_cloudant --sequence devadvosite/github_webhook,devadvosite/yml_to_json,devadvosite/save_to_cloudant --web true
