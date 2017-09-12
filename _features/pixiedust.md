---
title:      PixieDust
headline:   An open source helper library for Python notebooks. It makes working with data simpler.
story:      Working with data is a team sport.
permalink:  pixiedust
layout:     layout-featured-collection
featured:   true
# img:        pixiedust-logo.png
# img-thumb:  pixiedust-logo-thumb.png
strategies: 
  - notebooks-for-developers
essentials:
  PixieDust on GitHub: https://github.com/ibm-watson-data-lab/pixiedust
  PixieDust Docs:   https://ibm-watson-data-lab.github.io/pixiedust/

---

Jupyter Notebooks are powerful interactive tools for fast and flexible experimentation and data analysis. They can contain live code, rich text, equations and visualizations. However, for the uninitiated, the learning curve can be steep. For example, as explained in this [article](https://medium.com/ibm-watson-data-lab/i-am-not-a-data-scientist-efe7ca6ceba2), writing a simple visualization requires a good amount of documentation reading and coding, which is not very conducive to fast exploration and experimentation.  
This is where PixieDust comes in. It is an open source helper library that helps data scientists and developers working in Jupyter Notebooks be more productive by speeding the main steps of data science:
- [Data loading from remote files](https://ibm-watson-data-lab.github.io/pixiedust/loaddata.html)
- [Data visualisation](https://ibm-watson-data-lab.github.io/pixiedust/displayapi.html) with a simple display() API
- [Dashboard creation](https://ibm-watson-data-lab.github.io/pixiedust/pixieapps.html) with minimal coding using PixieApps

If you are working with data at scale, PixieDust also work with Apache Spark data structures like PySpark DataFrames, DataSets and GraphFrames. When detecting that Spark is available, PixieDust enables extra capabilities like:
- [PackageManager](https://ibm-watson-data-lab.github.io/pixiedust/packagemanager.html) to install third party Spark packages
- [Spark Progress Monitoring](https://ibm-watson-data-lab.github.io/pixiedust/sparkmonitor.html) to see how your Spark Jobs are progressing
- [Scala bridge](https://ibm-watson-data-lab.github.io/pixiedust/scalabridge.html) that lets you write Scala/Java code directly in your Python Notebook

## Get started  

Check out these sample notebook on DSX  
- [Welcome to PixieDust](https://apsportal.ibm.com/exchange/public/entry/view/5b000ed5abda694232eb5be84c3dd7c1)
- [Analyze traffic data using PixieDust & Spark](https://apsportal.ibm.com/exchange/public/entry/view/79a80738cf6815e6807dba5c2c614a04)
- [Analyze open data sets with Spark & PixieDust](https://apsportal.ibm.com/exchange/public/entry/view/d32974a6cab2d0b11cd660233868fc33)

If you prefer to work locally, you can start by installing PixieDust using the [local installer](https://ibm-watson-data-lab.github.io/pixiedust/install.html#)

For more advanced applications using PixieDust, check out these blog posts from our developer advocates:  
- [Mapping for Data Science with PixieDust and Mapbox](https://medium.com/ibm-watson-data-lab/mapping-for-data-science-with-pixiedust-and-mapbox-b5aa1d9532b9)
- [Share the (PixieDust) Magic](https://medium.com/ibm-watson-data-lab/share-the-pixiedust-magic-4684d9a96b89)
- [You Too Can Make Magic (in Jupyter Notebooks with PixieDust)](https://medium.com/ibm-watson-data-lab/you-too-can-make-magic-in-jupyter-notebooks-with-pixiedust-505d20f4fd13)
- [Move over, MatPlotLib](https://medium.com/ibm-watson-data-lab/move-over-matplotlib-2780cd1f56bf)
- [Sentiment Analysis of Twitter Hashtags with Spark](https://medium.com/ibm-watson-data-lab/real-time-sentiment-analysis-of-twitter-hashtags-with-spark-7ee6ca5c1585)
- [FlightPredict II: The Sequel](https://medium.com/ibm-watson-data-lab/flightpredict-ii-the-sequel-fb613afd6e91)
- [Easy Access to All Points of Interest Data](https://medium.com/ibm-watson-data-lab/easy-access-to-all-points-of-interest-data-acc6569e45b2)


