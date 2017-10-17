---
title:      SETI
headline:   The search for intelligent life, crunching data courtesy of the IBM Cloud.
layout:     layout-featured-collection
permalink:  seti
img:        seti.png
img-thumb:  seti_sm.png
featured:   true
strategies: 
  - partners
lead: adam-cox
---

#### The SETI@IBMCloud project

The [SETI Institute](https://www.seti.org/) observes radio signals from outer space, monitoring for signs of intelligent life. They do this 24/7, using an array of 42 satellite dishes located in northern California.

Why does this partnership matter to IBM? It presents unique data processing and machine learning problems that the IBM Cloud can help handle.

#### Data problems, at scale

The SETI Institute and its collaborators have moved more than 16 TBs of data onto IBM Object Storage and Db2 Warehouse on Cloud, and have analyzed that data using the IBM Spark framework. Already, the project has [produced new machine learning models](https://medium.com/ibm-watson-data-lab/using-artificial-intelligence-to-search-for-extraterrestrial-intelligence-ec19169e01af) that are remarkably accurate. (Run the two winning models [[1](https://apsportal.ibm.com/analytics/notebooks/994cc41f-d523-4ccb-9787-c3f783675522/view?access_token=37ec266931730de1a726e1c916d4d8c67e04a1bb4740a05b4e604b622f85c50f), [2](https://apsportal.ibm.com/analytics/notebooks/f2cc36f5-a236-4d0a-8fc8-d098311c7caa/view?access_token=6e0e60f4b2b50cc790f93277fd50bcd0ed9ca926552ca9d3b9c735fe69f43a36)] on the IBM Data Science Experience and reproduce their work.)

#### ibmos2spark

Working with IBM Object Storage so closely meant uncovering some warts. The WDP developer advocacy team, in conjunction with DSX engineering, developed the [ibmos2spark package](https://github.com/ibm-watson-data-lab/ibmos2spark) to help set Spark Hadoop configurations for connecting to object storage. It helped SETI collaborators spend less time on data ingestion, allowing them to focus on their machine learning models.

Previously, configuration information would have to be copy and pasted each time users wanted to pull data in object storage down into a DataFrame for computation in a Jupyter notebook. With the ibmos2spark package, users need to configure connections once, like so:

<script src="https://gist.github.com/gadamc/6284fe9b0cb42d8af0c0943f02b2c1cd.js"></script>

ibmos2spark comes pre-installed on the IBM Data Science Experience, with a UI feature for inserting credentials to code for faster data ingestion. The package works for these languages:

{:.browser-default}
- Python
- Scala
- R, sparklyR (support for IBM Cloud Object Storage coming soon)
- R, sparkR (support for IBM Cloud Object Storage coming soon)