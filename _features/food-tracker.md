---
title:      Cloudant FoodTracker
headline:   Learn how to build Offline First iOS apps with Swift and Cloudant Sync.
layout:     layout-featured-collection
permalink:  food-tracker
img:        food-tracker.png
img-thumb:  food-tracker-thumb.png
strategies: 
  - offline-first
---

![Screen shot of the Cloudant FoodTrackerdemo app.](/img/food-tracker.png "The Cloudant FoodTracker demo app"){: .story-img-4}

The Cloudant FoodTracker demo app transforms Apple's FoodTracker app into an Offline First app. The app lets users view and edit a list of meals each with a meal name, rating, and photo. The Cloudant FoodTracker app uses **Cloudant Sync** to store app data locally, and then syncs this data with **IBM Cloudant** when an internet connection is available.

Apple's FoodTracker introduction walks readers through the process of building the user interface and the logic of a basic app. The introduction culminates in storing the app data as files on the iOS device. **The Cloudant FoodTracker tutorial series picks up where Apple's FoodTracker stops and replaces the data storage mechanism with Cloudant Sync**, known as *CDTDatastore*. The tutorial then demonstrates how to sync app data with IBM Cloudant. Finally, the tutorial demonstrates adding some useful user interface feature for the Offline First app.

- [Cloudant FoodTracker Part 1](https://developer.ibm.com/clouddataservices/2016/01/25/start-developing-ios-apps-swift-with-cloud-sync-part-1-the-datastore/): The Datastore
- [Cloudant FoodTracker Part 2](https://developer.ibm.com/clouddataservices/2016/06/08/offline-first-ios-apps-part-2-cloud-sync/): Sync to the Cloud
- [Cloudant FoodTracker Part 3](https://developer.ibm.com/clouddataservices/2016/06/30/offline-first-ios-apps-with-swift-part-3-user-interface/): User Interface
