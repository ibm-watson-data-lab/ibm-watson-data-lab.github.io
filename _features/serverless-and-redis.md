---
title:      Serverless + Redis
headline:   Functions, the perfect companion to any cache.
layout:     layout-featured-collection
permalink:  serverless-and-redis
featured:   true
strategies: 
  - serverless-and-data
pinned: 
  - "Add Redis To Your Serverless Application"
lead: lorna-mitchell
---

When you have a serverless function, but need to stash the results somewhere for a quick moment, where do you turn?

Redis offers flexible levels of persistence and speedy performance. Serverless functions offer scalability without the infrastructure overhead. Together, they complement each other well.

## Getting started with serverless

Platforms like [Apache OpenWhisk](https://openwhisk.apache.org/) let you write code in the language of your choice. For example, [the documentation](https://github.com/apache/incubator-openwhisk/blob/master/docs/about.md#how-openwhisk-works) provides a "Hello World" function in JavaScript:

<script src="https://gist.github.com/mikebroberg/fbb580405171b2a3d4a44bd5fa2c071d.js"></script>

After installing [wsk, the OpenWhisk CLI](https://github.com/apache/incubator-openwhisk/blob/master/docs/cli.md), you simply need to define your function as an action:

<script src="https://gist.github.com/mikebroberg/a52a4537f861c264a3c6c74a8a33f704.js"></script>

Invoke that action like so:

<script src="https://gist.github.com/mikebroberg/c990f777c1e7befa11690788c98edbdf.js"></script>

## Using Redis from a serverless function

In my [Alexa Project Codename](https://github.com/lornajane/alexa-project-codename) example application, stashing data from a serverless function isn't that much more involved. First I bundle up my required Node.js modules and my Redis parameters:

<script src="https://gist.github.com/lornajane/0af8e1e01e85d051bd1720b5d4f72ccf.js"></script>

Then, I can use the node_redis client's SET command, with node_redis for added asynchronous operation (as in `client.setAsync(...)`):

<script src="https://gist.github.com/lornajane/7f6766889da9abae167dee7a77baf21e.js"></script>

There's a lot more you can do, so be sure to check these projects for more ideas.