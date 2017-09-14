---
title:      Location Tracker
headline:   Build Offline First apps that leverage the geospatial capabilities of IBM Cloudant.
layout:     layout-featured-collection
permalink:  location-tracker
img:        location-tracker-client.png
img-thumb:  location-tracker-client-thumb.png
strategies: 
  - offline-first
---

![Screen shot of the Location Tracker demo app.](/img/location-tracker-client.png "The Location Tracker demo app"){: .story-img-4}

The Location Tracker demo app uses geolocation to track and map user movements. The app uses an Offline First approach, storing the geolocation data locally on the device using Cloudant Sync or PouchDB, and then sync'ing this data with IBM Cloudant. The Location Tracker demo app is available as a **native mobile app** or as a **web app**. Both versions share a mobile backend built with Node.js.

## Mobile app

The Location Tracker native mobile app demonstrates to Swift developers how easy it is to integrate IBM Cloudant into an iOS app in order to track, store, and query locations. Since the app uses an Offline First approach, its core capabilities continue to work regardless of the app's network connectivity status. The Location tracker demo app provides architectural guidance on scaling your app to support millions of users.

- [Location Tracker Native App Tutorial Part 1](https://developer.ibm.com/clouddataservices/2016/06/14/location-tracker-part-1-offline-first/): Swift, Gelocation & Cloudant Sync
- [Location Tracker Native App Tutorial Part 2](https://developer.ibm.com/clouddataservices/2016/08/11/location-tracker-part-2-database-per-user): User Management & Scaling Up

## Web app

The first iteration of the Location Tracker web app demonstrates building the app as a CouchApp, which can be served directly from IBM Cloudant or Apache CouchDB, and leverages PouchDB and the HTML5 Geolocation API on the client side. The CouchApp is then refactored into a single-page application (SPA) which is deployable to IBM Bluemix. From there, a Node.js middle tier is added which provides user management functionality.

- [Location Tracker Web App Tutorial Part 1](https://github.com/cloudant-labs/location-tracker-couchapp/blob/master/tutorial/tutorial.adoc): Implementing as a CouchApp
- [Location Tracker Web App Tutorial Part 2](https://github.com/cloudant-labs/location-tracker-angular/blob/master/tutorial/tutorial.adoc): Implementing in AngularJS
- [Location Tracker Web App Tutorial Part 3](https://github.com/cloudant-labs/location-tracker-nodejs/blob/master/tutorial/tutorial.md): Adding a Middle Tier to Manage Users
