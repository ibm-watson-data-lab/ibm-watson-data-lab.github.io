# Projects Search

The [Projects search page](https://ibm-watson-data-lab.github.io/projects) is powered by the [Simple Search Service](https://github.com/ibm-watson-data-lab/simple-search-service) and the [SimpleSearchJS](https://github.com/ibm-watson-data-lab/simple-search-js), but the data for the search service is maintained in the [`_data/projects.yml`](https://github.com/ibm-watson-data-lab/ibm-watson-data-lab.github.io/blob/master/_data/projects.yml) file. In addition, the search index is modified from the default provided by the search service and is maintained in the [`search/ddoc/indexes.yml`](https://github.com/ibm-watson-data-lab/ibm-watson-data-lab.github.io/blob/master/search/ddoc/indexes.yml) file.

The Simple Search Service is automatically updated via serverless actions. The actions are triggered by a GitHub webhook whenever changes to files in the repo are pushed.

More specifically, when updates to `_data/projects.yml` are pushed to the `master` branch the Simple Search Service data is updated accordingly. Likewise, when changes to [`search/ddoc/indexes.yml`]((https://github.com/ibm-watson-data-lab/ibm-watson-data-lab.github.io/blob/master/search/ddoc/indexes.yml)) are pushed to the `master` branch the search index is updated in the Simple Search Service.

> **NOTE**: JSON or CSV files are also supported by the actions and could have been used instead of YAML. However, YAML allows for multiline text making it a little easier to read or review the files.

## Set Up

#### IBM Cloud Functions

Specified files from the repo are converted to JSON and saved into an instance of [Apache CouchDB](https://couchdb.apache.org/)/[IBM Cloudant](https://cloudant.com) NoSQL database via IBM Cloud Functions (Apache OpenWhisk) actions. To configure the actions:

1. Confirm the [IBM Cloud Functions](https://console.ng.bluemix.net/openwhisk/getting-started) CLI is installed and available
2. Update the `config.json` file accordingly, where:

  * `COUCHDB_URL` - the fully qualified URL to the Cloudant/CouchDB instance
  * `COUCHDB_DBNAME` - the name of the database to use. It must already exist in the Cloudant/CouchDB instance.
  * `FILES` - array of relative paths to files (e.g., `[ "_data/projects.yml", "search/ddoc/indexes.yml" ]`) to be converted to JSON
  * `GIT_BRANCH` - the name of the branch (e.g., `master`) to watch for updates. Default is `master`.
  * `GIT_SECRET` - the secret/key used to secure the webhook. Not required, but if set should match the secret set for the GitHub Webhook secret

3. Run the script to create the actions:

  ```
  ./deploy.sh [-p packagename] [-c configfile]
  ```

  * `[packagename]` - is the desired name of the package to group the actions under
  * `[configfile]` - is the path to the config file edited above


> Make a note of the **PACKAGE URL** and **GITHUB ACTION URL** for the newly created package and actions. For example:
> `https://{APIHOST}/api/v1/web/{NAMESPACE}/{PACKAGE}`
> `https://{APIHOST}/api/v1/web/{NAMESPACE}/{PACKAGE}/githubwebhook`

#### GitHub Webhook

The IBM Cloud Functions actions are triggered by `push` events from [GitHub Webhook](https://developer.github.com/webhooks/). To add a webhook:

1. Go to the **Settings > Webhooks** page of the repository
2. Click on **Add webhook**
3. For **Payload URL**, enter the GITHUB ACTION URL (e.g., `https://{APIHOST}/api/v1/web/{NAMESPACE}/{PACKAGE}/githubwebhook`)
4. For **Content type**, select `application/json`
5. Enter a **Secret**. It should match the `GIT_SECRET` used in the config file edited above
6. Select **Just the push event**
7. Enable **Active**
8. Click **Add webhook**

## Resources

* [Cloudant NoSQL database](https://cloudant.com)
* [Getting started with IBM Cloud Functions](https://console.ng.bluemix.net/openwhisk/getting-started)
* [GitHub Webhook](https://developer.github.com/webhooks/)
