---
title:      Simple Search
headline:   Turn a CSV into an API that powers a search engine.
layout:     layout-featured-collection
permalink:  simple-search
strategies: 
  - working-with-wdp
essentials:
  Simple Search on GitHub: https://github.com/ibm-watson-data-lab/simple-search-service
---


Site search is one of the most important features for e-commerce companies. Users can search for terms and filter results by specific values, letting shoppers check out as quickly as possible. Implementing a faceted search engine like this for your app or website is easier than you think.

<a href="/img/search-facets.png">![On this guitar search site, click a link on the right to narrow down results and find exactly what you want.](/img/search-facets.png){: .story-img-12}</a>

Simple Search Service is an IBM Bluemix app that lets you quickly create a faceted search engine, exposing an API you can use to bring search into your own apps. The service includes a guided web app that lets you preview the API and test it against your own data. Once you deploy, just upload your CSV or TSV data, specify which fields to facet, and the service handles the rest.

## How it works

Deployment automatically provisions a Cloudant account, attaches it to the service, and presents a web app that lets you upload a data file. The service automatically imports that data into Cloudant, with every field indexed for search.

![Architecture diagram of Simple Search Service](/img/simple-search-diagram.png)

Simple Search Service then exposes a RESTful search API that your application can use. The API is CORS-enabled, so your client-side web app can use it without issue. The API is also caches popular searches in an in-memory data store for faster retrieval. You can scale this solution by adding multiple Simple Search Service nodes and a centralized cache that uses Redis by Compose (also available on Bluemix).