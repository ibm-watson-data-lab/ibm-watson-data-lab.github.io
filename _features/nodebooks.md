---
title:      NodeBooks
headline:   Python and Node.js code, in the same data science notebook.
story:      An add-on for Jupyter that lets Node run inside Python notebook cells.
permalink:  nodebooks
layout:     layout-featured-collection
featured:   true
img:        nodebooks.png
img-thumb:  nodebooks-thumb.png
strategies: 
  - notebooks-for-developers
essentials:
  pixiedust_node on GitHub: https://github.com/ibm-watson-data-lab/pixiedust_node

---

Notebooks are where data scientists process, analyze, and visualize data in an iterative, collaborative environment. Having a scratchpad where you can write some code, iteratively work on some algorithms, and visualize the results quickly can speed the collaborative process.

As convenient as Jupyter Python notebooks are, sometimes it's better to collaborate with tools others find more familiar. For many people, that means JavaScript, in the form of Node.js.

[pixiedust_node](https://github.com/ibm-watson-data-lab/pixiedust_node) is an add-on for Jupyter notebooks that allows Node.js to run inside notebook cells. In fact, it’s built on the popular PixieDust helper library.

## Getting started

Configuration is only two short notebook cells.

<script src="https://gist.github.com/mikebroberg/e5cf19bc3dd6ae86377def338a168dc4.js"></script>

<script src="https://gist.github.com/mikebroberg/ca9a6d8b17ce2c0fac85f95bc16e233d.js"></script>

Now you're ready to fetch some data, in this case, from [a Cloudant database](https://examples.cloudant.com/cities).

<script src="https://gist.github.com/mikebroberg/fda0b34d62be48197985b3752cb763b3.js"></script>

Then use your favorite Node.js package to generate a data visualization.

<script src="https://gist.github.com/mikebroberg/92b7322eaad334faa033a0cfa47c2e46.js"></script>

In the context of a Jupyter notebook, you'll see your chart rendered like so:

![Rendered pixiedust_node chart in Jupyter Python Notebook](/img/nodebooks.png)