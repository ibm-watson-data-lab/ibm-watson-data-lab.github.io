#!/bin/bash

####################################################################
##  if experiencing 'permission denied' errors when attempting    ##
##  to run this script, try changing the file permissions (to     ##
##  make the script executable):                                  ##
##                                                                ##
##     chmod u+x deploy.sh                                        ##
##                                                                ##
####################################################################

####################################################################
##                                                                ##
##  Usage:                                                        ##
##                                                                ##
##    ./deploy.sh [-p packagename] [-c configfile]                ##
##                                                                ##
##  Options:                                                      ##
##    -p PACKAGENAME     name to use for the package              ##
##    -c CONFIGFILE      path and name to config file to use      ##
##                                                                ##
##  Example:                                                      ##
##                                                                ##
##    ./deploy.sh -p mypackage -c /Users/username/myconfig.json   ##
##                                                                ##
####################################################################


# default package name
OWPACKAGE=github_to_cloudant

# default config file
OWCONFIG=config.json


# function to zip actions
function zipaction {
  echo && echo 'Packaging: ' $1
  cd $1/
  rm $1.zip
  npm install
  zip -r $1.zip *
  rm -rf node_modules
  cd ../

  echo && echo 'Executing: ' $WSKCMD action update $OWPACKAGE/$1 --kind nodejs:8 $1/$1.zip
  $WSKCMD action update $OWPACKAGE/$1 --kind nodejs:8 $1/$1.zip
}

# function to send action
function addaction {
  echo && echo 'Executing: ' $WSKCMD action update $OWPACKAGE/$1 --kind nodejs:8 $1/$1.js
  $WSKCMD action update $OWPACKAGE/$1 --kind nodejs:8 $1/$1.js
}

# parse command line arguments
while getopts p:c: opts; do
   case ${opts} in
      p) OWPACKAGE=$OPTARG ;;
      c) OWCONFIG=$OPTARG ;;
   esac
done

# check for appropriate CLI command
if bx wsk >/dev/null 2>&1; then
    echo 'Using Bluemix CLI Cloud Functions (bx wsk) plugin'
    WSKCMD='bx wsk'
elif wsk >/dev/null 2>&1; then
    echo 'Using Cloud Functions stand-alone (wsk) CLI'
    WSKCMD='wsk'
else
    echo 'Cloud Functions CLI is required: https://console.bluemix.net/openwhisk/learn/cli'
    exit 1
fi

# get openwhisk 'apihost' property
property=(`$WSKCMD property get --apihost | rev | cut -f1 | rev`)
OWAPIHOST=${property[$(expr ${#property[*]} - 1)]}
echo 'Using API host: ' $OWAPIHOST

# get openwhisk 'namespace' property
property=(`$WSKCMD namespace list | tail -n1`)
OWNAMESPACE=${property[$(expr ${#property[*]} - 1)]}
echo 'Using namespace: ' $OWNAMESPACE

# set package url: https://{APIHOST}/api/v1/web/{NAMESPACE}/{PACKAGE}
OWURL=https://$OWAPIHOST/api/v1/web/$OWNAMESPACE/$OWPACKAGE

# create package with the config parameters
echo && echo 'Executing: ' $WSKCMD package update $OWPACKAGE --param-file $OWCONFIG --param packageName $OWPACKAGE
$WSKCMD package update $OWPACKAGE --param-file $OWCONFIG --param packageName $OWPACKAGE

# create the 'from_github' action
addaction from_github

# create the 'dispatcher' action
addaction dispatcher

# create the 'parse_json' action
addaction parse_json

# zip up the 'parse_csv' action since it has dependencies not available in openwhisk
zipaction parse_csv

# zip up the 'parse_yml' action since it has dependencies not available in openwhisk
zipaction parse_yml

# zip up the 'to_couchdb' action since it has dependencies not available in openwhisk
zipaction to_couchdb

# create the web action sequences available at https://{APIHOST}/api/v1/web/{NAMESPACE}/{PACKAGE}/{ENDPOINT}
echo && echo 'Executing: ' $WSKCMD action update $OWPACKAGE/githubwebhook --sequence $OWPACKAGE/from_github,$OWPACKAGE/dispatcher --web raw
$WSKCMD action update $OWPACKAGE/githubwebhook --sequence $OWPACKAGE/from_github,$OWPACKAGE/dispatcher --web raw


echo 
echo '        PACKAGE NAME:' $OWPACKAGE
echo '         PACKAGE URL:' $OWURL
echo '   GITHUB ACTION URL:' $OWURL/githubwebhook
echo 
