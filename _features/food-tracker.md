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

![Screen shot of the Cloudant FoodTrackerdemo app.](/img/food-tracker.png "The Cloudant FoodTracker demo app"){: .story-img-12}

The Cloudant FoodTracker demo app transforms Apple's FoodTracker app into an Offline First app. The app lets users view and edit a list of meals each with a meal name, rating, and photo. The Cloudant FoodTracker app uses [Cloudant Sync](https://github.com/cloudant/CDTDatastore) to store app data locally, and then syncs this data with IBM Cloudant when an internet connection is available.

Apple's FoodTracker introduction walks readers through the process of building the user interface and the logic of a basic app. The introduction culminates in storing the app data as files on the iOS device. The Cloudant FoodTracker tutorial series picks up where Apple's FoodTracker stops and replaces the data storage mechanism with Cloudant Sync, known as *CDTDatastore*. The tutorial then demonstrates how to sync app data with IBM Cloudant. Finally, the tutorial demonstrates adding some useful user interface features for the Offline First app.
