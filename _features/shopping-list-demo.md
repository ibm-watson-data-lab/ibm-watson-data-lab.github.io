---
title:      Offline First Shopping List
headline:   A series of simple Offline First apps, built with the technology you already know
layout:     layout-featured-collection
permalink:  shopping-list-demo
#img:        shopping-list.png
#img-thumb:  shopping-list-thumb.png
strategies:
  - offline-first
position:	1
lead: bradley-holt
essentials:
  Shopping Lists on GitHub: https://github.com/ibm-watson-data-lab/shopping-list
  Offline First: http://offlinefirst.org/
  IBM Cloudant: https://www.ibm.com/analytics/us/en/technology/cloud-data-services/cloudant/
  PouchDB: https://pouchdb.com/
---

![Screen shot of the Shopping List demo app.](/img/shopping-list-vanillajs.png "The Shopping List demo app"){: .story-img-12}

Sometimes the simplest way to explain something is to _show_ someone. We want everyone to be able to get started easily building [Offline First](https://www.ibm.com/cloud/learn/offline-first) apps, so we built the simplest app we could think of - and built it in **many technology stacks**. The shopping list is an easy concept to understand, and it's a small enough idea that everyone can understand what it does. By building Progressive Web Apps, **hybrid mobile apps**, **native mobile apps**, and even a **desktop app** we are meeting developers on their home turf, and introducing new ideas in a way they can understand and use.

The Offline First approach plans for the most constrained network environment first, enabling a great user experience even while the device is offline or has only an intermittent connection, and providing progressive enhancement as network conditions improve. It relies on client-side apps and a local datalayer, usually [PouchDB](https://pouchdb.com/) or [Cloudant Sync](https://developer.ibm.com/clouddataservices/offline-first/), plus background sync to [IBM Cloudant](https://developer.ibm.com/clouddataservices/offline-first/) or [Apache CouchDB](http://couchdb.apache.org/).

![Architecture of the Shopping List demo apps](/img/shopping-list-architecture.png "Offline First Shopping List Architecture Diagram")

The demo apps are reference implementations; developers can come here and see how these modern concepts would fit in the context they're already working with. They can use the code to quickly try out the application, or use it as the basis for their own ideas. The code is ready to **run locally** and to **deploy to IBM Cloud** with a single click and serves as study material, live demo and inspiration all in one handy public-GitHub-repository-shaped package.


Many of the shopping list demo applications also have detailed **tutorials**, walking developers through how the applications were built. For developers looking to understand the basis and use the knowledge in their own applications, these tutorials will point them along the way. You pick your poison: VanillaJS (aka JavaScript), Polymer, Vue.js, React, Preact, Ember.js, React Native, Kotlin, Swift ... and we've done the rest!

