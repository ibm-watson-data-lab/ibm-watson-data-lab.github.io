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
    <div class="col m8" style="position:relative">
      <div class="projects-pagecount" style="top: -36px;">Page <span class="projects-current">0</span> of <span class="projects-last">0</span></div>
      <div class="projects-search-results">
        <ul>
          <!-- search results go here -->
        </ul>
      </div>
      <div class="projects-paging">
        <button class="projects-prev" disabled><i class="small material-icons">chevron_left</i></button>
        <div class="projects-pagecount">Page <span class="projects-current">0</span> of <span class="projects-last">0</span></div>
        <button class="projects-next" disabled><i class="small material-icons">chevron_right</i></button>
      </div>
    </div>
    <div class="col m1"> </div>
    <div class="col m3" style="position:relative">
      <div class="projects-search-refine">Refine</div>
      <div class="projects-search-facets">
        <!-- search facets go here -->
      </div>
    </div>
  </section>
</div>

<script>
  var siteStrategies = {};
  {% for strategy in site.strategies %}
  siteStrategies['{{ strategy.permalink }}'] = '{{ strategy.title }}';
  {% endfor %}
</script>
