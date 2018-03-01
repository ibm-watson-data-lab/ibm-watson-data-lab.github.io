---
layout: default
title:  Projects
id:     projects
permalink: projects
---

<div class="container">
  <section class="row projects-search section-block">
    <div class="col m7">
      <h3>Projects</h3>
    </div>
    <div class="col m5">
      <input id="projects-search-input" class="search-input" type="text" value="*:*" placeholder="Search Projects">
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  </section>

  <section class="row">
    <div class="col m8">
      <div class="projects-search-results">
        <ul>
          <!-- search results go here -->
        </ul>
      </div>
      <div class="projects-paging">
        <button class="projects-prev" disabled>Prev</button> <button class="projects-next" disabled>Next</button>
        <div class="projects-pagecount">Page <span class="projects-current">0</span> of <span class="projects-last">0</span></div>
      </div>
    </div>
    <div class="col m1"> </div>
    <div class="col m3 projects-search-facets">
    </div>
  </section>
</div>

<script>
  var siteStrategies = {};
  {% for strategy in site.strategies %}
  siteStrategies['{{ strategy.permalink }}'] = '{{ strategy.title }}';
  {% endfor %}
</script>
