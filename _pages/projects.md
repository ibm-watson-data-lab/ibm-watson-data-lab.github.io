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

<div class="row container repos"></div>
 