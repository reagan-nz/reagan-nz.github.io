---
layout: page
prose: false
title: Research log
permalink: /research/
nav_section: research
---

<p class="nz-lede">Notes from reading and work in progress. Current focus: AI tokenomics, Big-T notation, and token complexity.</p>

{% assign entries = site.research | sort: "date" | reverse %}
{% if entries.size > 0 %}
<ul class="nz-writing-list">
  {% for entry in entries %}
  <li>
    <time class="nz-date" datetime="{{ entry.date | date: '%Y-%m-%d' }}">{{ entry.date | date: '%-d %b %Y' }}</time>
    <div>
      <h3><a href="{{ entry.url | relative_url }}">{{ entry.title | escape }}</a></h3>
      {% if entry.summary %}<p>{{ entry.summary | escape }}</p>{% endif %}
    </div>
  </li>
  {% endfor %}
</ul>
{% else %}
<p>No research entries yet.</p>
{% endif %}
