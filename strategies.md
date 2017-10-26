---
layout: default
title:  Strategies
id:     strategies
---

# Strategies and their owners

> <span class="warning">This page is for <strong>internal use only</strong> and is not linked to from any other site pages. The strategies and collections here are the same as those live on the site today, which means this is not a complete list of the work we're doing.</span>

{% assign items = site.strategies %}
{% assign authors = site.authors %}


{% for item in items %}

{% for author in authors %} 
{% if item.lead == author.permalink %}
{% assign author = author.title %}
{% capture permalink %}/{{ author.permalink }}{% endcapture %}
{% endif %}
{% endfor %}

#### {{ item.title }} | [{{ author }}]({{permalink}})

<div class="row">
  <div class="col m5 s12">
    <strong>{{ item.headline }}</strong>
    {{ item.content }}
  </div>
  <div class="col m7 s12">
    <h6>Featured collections</h6>
    {% assign collections = site.features | where:"strategies", item.permalink %}
    <ul class="browser-default">
    {% for collection in collections %}
    <li>
      <strong><a href="/{{ collection.permalink }}">{{ collection.title }}</a></strong> | 
    {% for author in authors %}{% if collection.lead == author.permalink %}<a href="/{{ author.permalink }}">{{ author.title }}</a>{% endif %}
    {% endfor %} <br />
      {{ collection.headline }}
    </li>
{% endfor %}
    </ul>

  </div>
</div>

{% endfor %}

#### Community Guidelines | [Maureen McElaney](/maureen-mcelaney)

<hr />

There are also strategies that are just getting started:

#### Machine Learning for Developers | [Mark Watson](/mark-watson)

