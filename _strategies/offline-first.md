---
title:      Offline First
headline:   With an Offline First approach, lack of network connectivity is not an error condition for your app.
permalink:  offline-first
layout:     layout-strategy
tier:       2
---

![Three different signal bars respectively indicating full bars, one bar, and no signal.](/img/signal-bars.png "Offline, Online, and Everything in Between")

Offline First is an approach to app development in which apps are designed for the most resource-constrained environments *first*. **Offline First is a humble acknowledgment of the transient nature of network connectivity.** An [Offline First app](/offline-first-apps) will not only work offline, but will also work better when it has access to only a flaky network connection, and even better when it has great network connectivity. All of this while allowing users to **keep data in sync across multiple devices**.

Apps that are built using an Offline First approach are **faster and more responsive** than their cloud-dependent counterparts. An Offline First app stores its content and data directly on the local device, making data access operations extremely fast. An Offline First app can get updated content, sync its data, or enable features that aren't practical to make work offline when the app is connected. However, users of an Offline First app can **still interact with that app even when there is no reliable connection available**.

**The Offline First movement is the natural successor to the Mobile First movement.** With the Mobile First approach, web developers embraced the constraints presented by the explosion of device sizes on the mobile web. Techniques such as responsive web design and fluid layouts allowed web developers to embrace the chaos of the mobile web, and to create better web apps out of this chaos. Just as Mobile First was about targeting the *smallest* device sizes first, **Offline First is about targeting the *most constrained network connectivity environments* first**.

Part of IBM Watson Data Platform, [IBM Cloudant](https://www.ibm.com/analytics/us/en/technology/cloud-data-services/cloudant/) is a fully-managed database-as-a-service that is uniquely suited for Offline First apps. An Offline First app can store its data locally in PouchDB or in Cloudant Sync while offline, and then **sync this data to and from IBM Cloudant** when a connection becomes available. IBM Cloudant is based on Apache CouchDB, an open source document database. This provides developers with a stack on which to build Offline First apps that is fully-based on open source and open standards. Once data is in IBM Cloudant, there are a number of **integration points that allow this data to flow throughout the IBM Watson Data Platform**.

While IBM has been involved in helping to build and grow the Offline First community through a series of [Offline Camps](/offline-camp), **the Offline First movement is much larger than IBM**. Developers, user experience professionals, and other builders are working together on a number of innovations within the broader Offline First movement, such as **reproducible data science** and **cognitive and analytics at the edge**. Major industry players such as Google are also involved in the Offline First community's efforts.
