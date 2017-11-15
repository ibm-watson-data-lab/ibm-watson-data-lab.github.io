---
layout: default
title:  Projects
id:     projects
---

<div class="container">
  <section class="row projects-search section-block">
    <div class="col m7">
      <h3>Projects</h3>
    </div>
    <div class="col m5" style="visibility:hidden">
      <input id="projects-search-input" class="search-input" type="text" placeholder="Search Projects">
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  </section>

  <section class="row">
    <div class="col m8">
      <div class="projects-search-results">
        {% assign projects = site.data.projects | reverse %}
        <ul>
          {% for proj in projects %}
          <li class="m12 strategy-project-info">
            {% include single-project.html project=proj %}
          </li>
          {% endfor %}
        </ul>
      </div>
    </div>
    <div class="col m4 projects-search-facets">
    </div>
  </section>
</div>

<!-- <section class="container">
  <div class="row">
    <div class="col m8">
      {% assign projects = site.data.projects | reverse %}
      <h3>Projects</h3>
      <ul class="row">
        {% for proj in projects %}
        <li class="col m12 strategy-project-info">
          {% include single-project.html project=proj %}
        </li>
        {% endfor %}
      </ul>
    </div>
    <div class="col m4">
    </div>
  </div>
</section> -->

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
 
