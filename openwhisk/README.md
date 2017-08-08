# `ibm-watson-data-lab.github.io` with OpenWhisk

The Github pages site for [IBM Watson Data Lab](https://ibm-watson-data-lab.github.io/) includes an integration with Apache [OpenWhisk]((https://console.ng.bluemix.net/openwhisk/getting-started)). 

## Set Up

#### Apache OpenWhisk

Specific `yml` files from the [GitHub repo](https://github.com/ibm-watson-data-lab/ibm-watson-data-lab.github.io) are converted to JSON and saved into an instance Cloudant NoSQL database via OpenWhisk actions. To configure the actions:

1. Confirm [OpenWhisk](https://console.ng.bluemix.net/openwhisk/getting-started) CLI is installed and available
2. Set environment variables

  * `COUCH_URL` - the fully qualified URL to the  Cloudant/CouchDB instance
  * `COUCH_DBNAME` - the name of the database to use in the Cloudant/CouchDB instance
  * `YML_FILES` - comma-separated lists of relative paths to `yml` files (e.g., `_data/projects.yml,_config.yml`) to be converted to JSON

3. Run `./deploy.sh` to create the OpenWhisk actions

> Make note of the *URL* for the newly created OpenWhisk package (**devadvosite**).  
> For example: `https://{APIHOST}/api/v1/web/{NAMESPACE}/devadvosite`

#### GitHub Webhook

The OpenWhisk actions are triggered by `push` events from [GitHub Webhook](https://developer.github.com/webhooks/). To add a webhook:

1. Go to the **Settings > Webhooks** page of your repository
2. Click on **Add webhook**
3. For **Payload URL**, enter the URL to sequence (e.g., `https://{APIHOST}/api/v1/web/{NAMESPACE}/devadvosite/github_to_cloudant.http`)
4. For **Content type**, select `application/json`
5. Select **Just the push event**
6. Enable **Active**
7. Click **Add webhook**

## Resources

* [Cloudant NoSQL databse](https://cloudant.com)
* [GitHub webhook](https://developer.github.com/webhooks/)
* [Getting started with OpenWhisk](https://console.ng.bluemix.net/openwhisk/getting-started)
