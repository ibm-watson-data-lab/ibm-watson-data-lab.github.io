# `github_to_cloudant`

Stores/updates specified files from this [GitHub repo](https://github.com/ibm-watson-data-lab/ibm-watson-data-lab.github.io) into a Cloudant instance. 

## Set Up

#### IBM Cloud Functions

Specific files from the repo are converted to JSON and saved into an instance of the [Cloudant NoSQL](https://cloudant.com) database via IBM Cloud Functions (Apache OpenWhisk) actions. To configure the actions:

1. Confirm the [IBM Cloud Functions](https://console.ng.bluemix.net/openwhisk/getting-started) CLI is installed and available
2. Update the `config.json` file accordingly, where:

  * `cloudant.url` - the fully qualified URL to the  Cloudant/CouchDB instance
  * `cloudant.dbname` - the name of the database to use. it must already exist in Cloudant/CouchDB instance
  * `watch.yml` - array of relative paths to `yml` files (e.g., `[ "_data/projects.yml", "_config.yml" ]`) to be converted to JSON

3. Run the script to create the actions:

  ```
  ./deploy.sh [-p packagename] [-c configfile]
  ```

  * `[packagename]` - is the desired name of the package to store the actions under
  * `[configfile]` - is the path to the config file to use  


> Make a note of the **PACKAGE URL** and **WEB ACTION URL** for the newly created package and actions. For example:
> `https://{APIHOST}/api/v1/web/{NAMESPACE}/devadvosite`

#### GitHub Webhook

The IBM Cloud Functions actions are triggered by `push` events from [GitHub Webhook](https://developer.github.com/webhooks/). To add a webhook:

1. Go to the **Settings > Webhooks** page of the repository
2. Click on **Add webhook**
3. For **Payload URL**, enter the WEB ACTION URL (e.g., `https://{APIHOST}/api/v1/web/{NAMESPACE}/devadvosite/github_to_cloudant`)
4. For **Content type**, select `application/json`
5. Select **Just the push event**
6. Enable **Active**
7. Click **Add webhook**

## Resources

* [Cloudant NoSQL databse](https://cloudant.com)
* [GitHub Webhook](https://developer.github.com/webhooks/)
* [Getting started with IBM Cloud Functions](https://console.ng.bluemix.net/openwhisk/getting-started)
