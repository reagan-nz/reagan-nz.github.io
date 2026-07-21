---
layout: post
title: "A full-stack detour: Vue 3 + Spring Boot + MySQL"
date: 2026-03-05
---

Spent the last couple months building a full-stack student information management system — students, classes, courses, grades, and schedules, with a Vue 3 frontend talking to a Spring Boot backend and a MySQL database underneath. CRUD, search, pagination, and a weighted GPA calculator across all of it.

Nothing here was research-y, and that was fine — I mostly wanted to get comfortable with the full loop of frontend, API, and database actually talking to each other, instead of only ever touching one layer at a time in coursework. The most annoying (and most instructive) part was getting the data shapes to agree cleanly across all three layers; it's easy to get each piece working in isolation and much harder to get them all agreeing on what a "student" object actually looks like.

Good preparation, if nothing else, for eventually building the same kind of full loop around something I actually care about the output of, instead of a made-up school database.
