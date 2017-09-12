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

Jupyter Notebooks are powerful interactive tools for fast and flexible data experimentation and analysis. They can contain live code, rich text, equations, and visualizations. However, the learning curve is steep. Coding [a simple visualization requires lots of research](https://medium.com/ibm-watson-data-lab/i-am-not-a-data-scientist-efe7ca6ceba2), which works against the promise of data science notebooks as tools for easy collaboration.

This is where PixieDust comes in. It's an open source helper library that's designed to lower the barrier to entry for scientists and developers working in Jupyter Notebooks. PixieDust speeds the main steps of data science:

- [Data loading from remote files](https://ibm-watson-data-lab.github.io/pixiedust/loaddata.html)
- [Data visualisation](https://ibm-watson-data-lab.github.io/pixiedust/displayapi.html) with a simple `display()` API
- [Dashboard creation](https://ibm-watson-data-lab.github.io/pixiedust/pixieapps.html) with minimal coding using PixieApps

## PixieDust &amp; Spark

If you're processing data at scale, PixieDust also works with Apache Spark&trade; data structures like PySpark DataFrames, DataSets, and GraphFrames. When detecting that Spark is available, PixieDust enables these extra capabilities:

- [PackageManager](https://ibm-watson-data-lab.github.io/pixiedust/packagemanager.html) to install third-party Spark packages
- [Spark Progress Monitoring](https://ibm-watson-data-lab.github.io/pixiedust/sparkmonitor.html) to see how Spark Jobs are progressing
- [Scala bridge](https://ibm-watson-data-lab.github.io/pixiedust/scalabridge.html) to write Scala/Java code in the same Python Notebook

## Getting started  

Sample notebooks are available on [IBM's Data Science Experience](https://datascience.ibm.com/):

- [Welcome to PixieDust](https://apsportal.ibm.com/exchange/public/entry/view/5b000ed5abda694232eb5be84c3dd7c1)
- [Analyze traffic data using PixieDust & Spark](https://apsportal.ibm.com/exchange/public/entry/view/79a80738cf6815e6807dba5c2c614a04)
- [Analyze open data sets with Spark & PixieDust](https://apsportal.ibm.com/exchange/public/entry/view/d32974a6cab2d0b11cd660233868fc33)

If you prefer to work locally, you can start by installing PixieDust using its [local installer](https://ibm-watson-data-lab.github.io/pixiedust/install.html#). For more advanced applications using PixieDust, check out the projects featured here.
