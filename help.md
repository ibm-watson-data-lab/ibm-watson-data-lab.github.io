---
layout: default
title: Help
id: help
---

### Add projects to featured collections
To add a project to a featured collection, include one or more of these permalinks to the features array of your project in the _data/project.yml file. (The featured collection files are in the _features directory.)
{% assign items = site.features %}
| Page title | Filename | Permalink |
|---|---|---|{% for item in items %}
| {{ item.title }} | {{ item.path }} | [{{ item.permalink }}](/{{ item.permalink }}) |{% endfor %}

### Add projects and features to strategies
To associate a project to a strategy, add one or more of these permalinks to the strategies array of your project. To associate a featured collection to a strategy, add one or more of these permalinks to the strategies array in that feature's frontmatter. (These files are in the _strategies directory.)
{% assign items = site.strategies %}
| Page title | Filename | Permalink |
|---|---|---|{% for item in items %}
| {{ item.title }} | {{ item.path }} | [{{ item.permalink }}](/{{ item.permalink }}) |{% endfor %}
