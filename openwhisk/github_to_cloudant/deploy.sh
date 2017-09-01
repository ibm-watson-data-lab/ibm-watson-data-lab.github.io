#!/bin/bash

####################################################################
##  if experiencing 'permission denied' errors when attempting    ##
##  to run this script, try changing the file permissions:        ##
##                                                                ##
##     chmod 755 deploy.sh                                        ##
##                                                                ##
####################################################################

####################################################################
##                                                                ##
##  Usage:                                                        ##
##                                                                ##
##     ./deploy.sh [-p packagename] [-c configfile]               ##
##                                                                ##
##  Example:                                                      ##
##                                                                ##
##     ./deploy.sh -p mypackage -c /Users/myname/config.json      ##
##                                                                ##
####################################################################


# default package name
OWPACKAGE=devadvosite

# default config file
OWCONFIG=config.json


# function to zip actions
function zipaction {
  echo && echo 'Zipping: ' $1
  cd $1/
  rm $1.zip
  npm install
  zip -r $1.zip *
  rm -rf node_modules
  cd ../
}

# parse command line arguments
while getopts p:c: opts; do
   case ${opts} in
      p) OWPACKAGE=$OPTARG ;;
      c) OWCONFIG=$OPTARG ;;
   esac
done

# get openwhisk 'apihost' property
property=(`wsk property get --apihost | tr -s '[:blank:]'`)
OWAPIHOST=${property[$(expr ${#property[*]} - 1)]}

# get openwhisk 'namespace' property
property=(`wsk property get --namespace | tr -s '[:blank:]'`)
OWNAMESPACE=${property[$(expr ${#property[*]} - 1)]}


# set package url: https://{APIHOST}/api/v1/web/{NAMESPACE}/{PACKAGE}
OWURL=https://$OWAPIHOST/api/v1/web/$OWNAMESPACE/$OWPACKAGE


# create package with the config parameters
echo && echo 'Executing: ' wsk package update $OWPACKAGE --param-file $OWCONFIG
wsk package update $OWPACKAGE --param-file $OWCONFIG

# creata the 'from_github' action
echo && echo 'Executing: ' wsk action update $OWPACKAGE/from_github from_github/from_github.js
wsk action update $OWPACKAGE/from_github from_github/from_github.js

# zip up the 'to_json' action since it has dependencies not available in openwhisk
zipaction to_json

# creata the 'to_json' action
echo && echo 'Executing: ' wsk action update $OWPACKAGE/to_json --kind nodejs:6 to_json/to_json.zip
wsk action update $OWPACKAGE/to_json --kind nodejs:6 to_json/to_json.zip

# creata the 'to_cloudant' action
echo && echo 'Executing: ' wsk action update $OWPACKAGE/to_cloudant to_cloudant/to_cloudant.js
wsk action update $OWPACKAGE/to_cloudant to_cloudant/to_cloudant.js

# create a 'github_to_cloudant' web action sequence available at https://{APIHOST}/api/v1/web/{NAMESPACE}/{PACKAGE}/github_to_cloudant
echo && echo 'Executing: ' wsk action update $OWPACKAGE/github_to_cloudant --sequence $OWPACKAGE/from_github,$OWPACKAGE/to_json,$OWPACKAGE/to_cloudant --web true
wsk action update $OWPACKAGE/github_to_cloudant --sequence $OWPACKAGE/from_github,$OWPACKAGE/to_json,$OWPACKAGE/to_cloudant --web true


echo 
echo '   PACKAGE NAME:' $OWPACKAGE
echo '    PACKAGE URL:' $OWURL
echo ' WEB ACTION URL:' $OWURL/github_to_cloudant
echo 
