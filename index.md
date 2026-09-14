---
layout: default
title: Home
permalink: /
nav_section: home
---

{% assign latest_research = site.research | sort: "date" | reverse | first %}
{% assign latest_post = site.posts | first %}

<div class="nz-about">
  <div class="nz-portrait-switch">
    <button class="nz-portrait-button" type="button" data-portrait-toggle data-portrait="illustration" aria-label="Show original photo of Nanyi holding a plush dog" aria-pressed="false">
      <img class="nz-portrait-illustration" src="{{ '/assets/images/nanyi-illustrated.jpg' | relative_url }}" width="150" height="150" alt="" aria-hidden="true">
      <img class="nz-portrait" src="{{ '/assets/images/nanyi-photo.jpg' | relative_url }}" width="150" height="150" alt="" aria-hidden="true">
    </button>
    <span class="nz-portrait-caption" data-portrait-caption>Click for photo</span>
  </div>
  <div class="nz-about-copy">
    <h1>Nanyi Zhao</h1>
    <div class="nz-intro">
      <p>I'm a senior at NYU studying computer science and mathematics. This is where I keep track of what I'm learning and building.</p>
    </div>
  </div>
</div>

<p class="nz-current">Right now, I'm reading about AI tokenomics and Big-T notation, with questions about how token usage changes across retrieval and agent systems. I keep my working notes in the <a href="{{ '/research/' | relative_url }}">research log</a>.</p>

<section class="nz-section" aria-labelledby="selected-work-heading">
  <h2 id="selected-work-heading">Selected work</h2>
  <div class="nz-work">
    <div>
      <h3><a href="{{ '/projects/' | relative_url }}">Company disclosures</a></h3>
      <p>Work on collecting and organizing public disclosures from A-share listed companies.</p>
    </div>
    <div>
      <h3><a href="{% post_url 2026-03-20-fifty-experiments-on-news-classification %}">News classification</a></h3>
      <p>Fifty experiments on how preprocessing and metadata affect a news classifier.</p>
    </div>
  </div>
</section>

{% if latest_research or latest_post %}
<section class="nz-section" aria-labelledby="recent-writing-heading">
  <h2 id="recent-writing-heading">Recent writing</h2>
  <ul class="nz-writing-list">
    {% if latest_research %}
    <li>
      <time class="nz-date" datetime="{{ latest_research.date | date: '%Y-%m-%d' }}">{{ latest_research.date | date: '%-d %b %Y' }}</time>
      <div>
        <h3><a href="{{ latest_research.url | relative_url }}">{{ latest_research.title | escape }}</a></h3>
        <span class="nz-kind">Research log</span>
      </div>
    </li>
    {% endif %}
    {% if latest_post %}
    <li>
      <time class="nz-date" datetime="{{ latest_post.date | date: '%Y-%m-%d' }}">{{ latest_post.date | date: '%-d %b %Y' }}</time>
      <div>
        <h3><a href="{{ latest_post.url | relative_url }}">{{ latest_post.title | escape }}</a></h3>
        <span class="nz-kind">Blog</span>
      </div>
    </li>
    {% endif %}
  </ul>
</section>
{% endif %}
