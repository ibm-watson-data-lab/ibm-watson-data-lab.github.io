---
layout: default
title:  Projects
id:     projects
---

<h1>{{ page.title }}</h1>

{% comment %}
<div class="row">
  <div class="col m3">
    <div class="subhead">
      Featured collections
    </div>
  </div>
  <div class="col m9">
    {% assign items = site.features  %}
    {% include item-featured.html items=items context="index" %}          
  </div>
</div>
<div class="divider"></div>
  <p class="subhead">
    Project work
  </p>
{% endcomment %}

<div class="section">
  {% assign items = site.data.projects | reverse %}
  {% include item.html items=items context="index" %}          
</div>

<!--
<script>
  var repos = {{ site.github.public_repositories | jsonify }}
</script>

<div class="container">
  <section>
    <form class="search-wrapper">
      <label for="repos-search" class="search-label">Browse our Open Source projects &#8628;</label>
      <input id="repos-search" class="search-input" type="text">
    </form>
  </section>
  <section>
    <div class="repos-wrapper">
      <div class="repos-count">
      </div>
      <div class="repos-list">
      </div>
    </div>
  </section>
</div>
-->

<!--
<div class="row container">
  {% for repo in site.github.public_repositories %}
  <div class="col s12 repo">
    <h3>{{ repo.name }}</h3>
    <p class="repo-url"><a href="{{ repo.html_url }}" target="_blank">{{ repo.html_url }}</a></p>
    <p class="repo-meta">
        <i class="fa fa-code-fork" aria-hidden="true"></i>
        {{ repo.forks_count }}
        
        <i class="fa fa-star" aria-hidden="true"></i>
        {{ repo.stargazers_count }}
        
        <i class="fa fa-eye" aria-hidden="true"></i>
        {{ repo.watchers_count }}
    </p>
    <div class="repo-desc">
      <p>{{ repo.description }}</p>
    </div>
    <p class="separator">&hellip;</p>
  </div>
  {% endfor %}
</div>
-->

<div class="row container repos">
</div>
