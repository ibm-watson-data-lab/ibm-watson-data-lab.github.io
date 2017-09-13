---
title:      Weather + Data
headline:   Easily grab weather data, and apply it to your own data problems.
layout:     layout-featured-collection
permalink:  weather-and-data
img:        data-cloud.png
img-thumb:  data-cloud.png
strategies: 
  - differentiators
---

Weather influences our environment and our decisions. Better predicting these decisions gives us an edge in everything from food production, to renewable energy, to simply deciding if you'll need an umbrella for the day.

There are lots of ways to get weather data, but the key is consistency. Provide a location and a timeframe, and IBM's [Weather Company Data APIs](https://twcservice.mybluemix.net/rest-api/) return JSON with the weather data you specified&mdash;a simple, repeatable GET request to enhance your analytics.

Our examples generally cover three main areas:

1. Combining existing data with historical weather data, often in a [Jupyter Notebook](/notebooks-for-developers).
2. Analyzing combined data to inform predictive models (machine learning).
3. Using weather forecast data to make predictions, adding them into applications.

## Getting started

We are constantly developing new ideas into data science projects. This page collects the best of those ideas. For a more basic example, however, [this notebook](https://github.com/ibm-watson-data-lab/python-notebooks/blob/master/Weather%20forecast.ipynb) explains connecting to The Weather Company API and how to convert its JSON to create charts and maps with [PixieDust](/pixiedust).