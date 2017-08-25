---
title:      Weather + Data
headline:   There's a lot you can learn when you analyze weather data.
layout:     layout-featured-collection
permalink:  weather-and-data
img:        watson_black.png
img-thumb:  watson_black.png
strategies: 
  - differentiators
---

Besides being one of the most talked about subjects worldwide, weather influences our environment and drives a lot of our decisions. For instance the food production is largely depending on the weather, as well as the amount of solar and wind energy that can be produced. And on a more personal level the weather forecast influences our decisions to bring an umbrella, go by bike, bus or car and how busy traffic will be.   

Imagine having weather data easily available to find out if your data is driven by the weather and then use it to do predictions for tomorrow and even next week.  

Here you can find examples of how we are exploring what you can do with weather data. In general this consists of three broad steps:
1. Combine your own data with historical weather data based on location and date
1. Analyse this combined data to build predictive models
1. Use weather forecast data to make predictions to be used in your applications

## Combine - Analyse - Build - Predict

The first step is getting access to the data. There is a lot of it, so first you have to decide what you need. The options are broadly historic, current and future weather. All of these include variables such as temperature, humidity, rainfall, windspeed and many more.

There is quite some weather out there for free, but if you want a consistent dataset check out the IBM The Weather Company APIs on [Bluemix](https://console.ng.bluemix.net/) or through their own data portal. The APIs work as simple as doing a GET request with the location (latitude, longitude) and time period you are interested in. This will return a json file with weather data for the period you specified. 

To explore the data a great tool is Jupyter Python notebooks that you can run locally or in the [Cloud](https://datascience.ibm.com/). Check out this [notebook](https://github.com/ibm-watson-data-lab/python-notebooks/blob/master/Weather%20forecast.ipynb) to see a basic example of the API, how to convert the json data and create charts and maps with PixieDust. 

When you have decided that there is a clear influence of weather on your data, you can start building a (machine learning) model and do predictions using weather forecast data. These predictions can then be used in other applications as for example a warning system for events likely to happen due to changes in the weather over the coming week. 

## Weather + Your Data

As we are constantly developing new ideas into data science projects and applications here are some of the ideas we are playing with at the moment and that might inspire you to explore if weather is something to add to your projects.

- A [weather forecast PixieApp](https://medium.com/ibm-watson-data-lab/visualizing-weather-data-as-a-pixieapp-c4424aae084d) to explore how the APIs can be used
- [Collisions and Weather](https://medium.com/ibm-watson-data-lab/move-over-matplotlib-2780cd1f56bf) - analysis of the influence of weather on traffic collisions in New York
- And many more to come, watch this space!

For some more background on weather watch [this video](https://www.youtube.com/watch?v=U_Aq2cPxwss&list=PLGVZCDnMOq0oieXy92cJBwSirA3G2MCU1&index=6) where [Margriet](https://twitter.com/MargrietGr) explains a little more about weather and climate data and how to work with it. 
