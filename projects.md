---
layout: page
title: Projects
permalink: /projects/
---

A running list of things I've built, roughly newest first. Code for most of these is on [GitHub](https://github.com/reagan-nz).

<div class="project-card">
  <h3>Listed Company Data Platform</h3>
  <div class="tag-row">
    <span class="tag">Python</span>
    <span class="tag">RAG</span>
    <span class="tag">multi-agent</span>
    <span class="tag">Playwright</span>
  </div>
  <p>An end-to-end financial intelligence platform for A-share listed companies: collecting, cleaning, validating, storing, and vectorizing filings and market events, then answering natural-language questions over them with retrieval-augmented generation. The system keeps a stable ID linking every stored record back to its original filing, so every answer comes with verifiable source evidence rather than an unsupported guess.</p>
  <p class="project-link"><a href="https://github.com/reagan-nz/listed-company-data-platform">GitHub →</a></p>
</div>

<div class="project-card">
  <h3>News Topic Classification: A Preprocessing Ablation Study</h3>
  <div class="tag-row">
    <span class="tag">Python</span>
    <span class="tag">pandas</span>
    <span class="tag">scikit-learn</span>
    <span class="tag">NLTK</span>
  </div>
  <p>Studied how different preprocessing choices and metadata features affect a 4-class news classification task, running 50 controlled experiments across 5 preprocessing strategies, 2 feature settings, and 5 baseline classifiers, evaluated with accuracy, macro-F1, and confusion-matrix/error analysis. Heavier preprocessing turned out to help less than expected, and a metadata field (news source) sometimes acted as a misleading shortcut for the model rather than a genuine signal.</p>
</div>

<div class="project-card">
  <h3>Epidemic Dashboard</h3>
  <div class="tag-row">
    <span class="tag">Flask</span>
    <span class="tag">ECharts</span>
  </div>
  <p>A real-time dashboard visualizing epidemic data, built with a Flask backend serving data to ECharts visualizations on the frontend.</p>
  <p class="project-link"><a href="https://github.com/reagan-nz/dashboard_epidemic">GitHub →</a></p>
</div>

<div class="project-card">
  <h3>Student Information Management System</h3>
  <div class="tag-row">
    <span class="tag">Vue 3</span>
    <span class="tag">Spring Boot</span>
    <span class="tag">MySQL</span>
  </div>
  <p>A full-stack system for managing students, classes, courses, grades, and schedules, including weighted GPA calculation and basic data analysis. Vue frontend talking to a Spring Boot + MySQL backend, with CRUD, search, and pagination across every module.</p>
</div>

<div class="project-card">
  <h3>Course Registration System</h3>
  <div class="tag-row">
    <span class="tag">Java</span>
    <span class="tag">Swing</span>
  </div>
  <p>A desktop course registration system for admins and students, with course creation, enrollment, drop flows, and report export. Built around an object-oriented class design (User, Student, Admin, Course) with a Swing GUI and serialized file storage for persistence.</p>
  <p class="project-link"><a href="https://github.com/reagan-nz/Course_Registration_System">GitHub →</a></p>
</div>

<div class="project-card">
  <h3>Music Artist Signal Analysis</h3>
  <div class="tag-row">
    <span class="tag">Python</span>
  </div>
  <p>Signal analysis on music/artist data.</p>
  <p class="project-link"><a href="https://github.com/reagan-nz/music_artist_signal_analysis">GitHub →</a></p>
</div>
