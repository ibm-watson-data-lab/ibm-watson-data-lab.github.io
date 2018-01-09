---
title:      Machine Learning for Developers
headline:   ML for the rest of us.
layout:     layout-featured-collection
permalink:  machine-learning-for-developers
strategies: 
  - differentiators
lead:       mark-watson
---

Making predictions sounds like a cool and useful feature for your app, but machine learning sounds hard and abstract. It doesn't have to be. Some basic concepts will take you a long way. We'll show you how to get your own ML system up and running.

## The tools

If you can load up a Jupyter Notebook with [PixieDust](/pixiedust-for-jupyter), you're aleady halfway there. Quickly load and display data, like the following in a Python Jupyter Notebook cell:

<script src="https://gist.github.com/mikebroberg/a8771513efceda07f0b7cb8a5c39f5fe.js"></script>

You can [install PixieDust, Anaconda, and Jupyter locally](https://ibm-watson-data-lab.github.io/pixiedust/install.html), or just use a service. IBM's [Data Science Experience](https://datascience.ibm.com/) comes preconfigured and lets you quickly deploy Jupyter Notebooks in the cloud, as well as backing services such as Apache Spark. It's a great place to get your feet wet.

## The model

Now it's a matter of knowing what kind of problem you want to solve, and the libraries to help you do it. The most common problem, predicting numbers, is called a "regression" problem, so we'll start with that. Using the [Spark ML](https://spark.apache.org/mllib/) libraries, you can set up a machine learning model with only a few lines in a notebook:

<script src="https://gist.github.com/mikebroberg/ba5efccf64f344805ddd5e9c2257e737.js"></script>

Then, building a model is almost as simple as passing in the right parameters:

<script src="https://gist.github.com/mikebroberg/75b08b0b5c5d7993baa92b3a0df4b173.js"></script>

## The prediction

Now run your model against a data set:

<script src="https://gist.github.com/mikebroberg/692a2e7cb79929677332866437e37d5c.js"></script>

We unpack the code line-by-line in [Building Your First Machine Learning System](https://medium.com/ibm-watson-data-lab/building-your-first-machine-learning-system-b3d9401927b7), but thankfully it's not a lot to grok. The article has more on deploying the model to the cloud to enable REST API access, opening up your predictions to users of your apps.

See? The basics _can_ take you pretty far. Check out the projects here for more ML basics, and beyond.
