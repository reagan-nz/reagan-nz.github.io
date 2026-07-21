---
layout: post
title: "Building a course registration system in Java Swing"
date: 2025-11-10
---

Just finished a desktop course registration system in Java — admins can create, edit, and delete courses; students can register, drop, and pull enrollment reports. Nothing about the feature set is exotic, which was sort of the point: it was a good excuse to actually design a class hierarchy properly instead of letting one grow organically.

I ended up with `User`, `Student`, `Admin`, and `Course` as the core classes, with a Swing GUI on top and course/student data persisted through Java's serialization rather than a real database (didn't need one for this scale, and it kept the project focused on OOP design instead of turning into a database exercise).

The most useful part wasn't the GUI, honestly — it was going back after the first working version and noticing how much logic had leaked into the interface layer that should have lived in the model classes instead. Refactoring that out made the whole thing easier to reason about, which is a lesson I expect to keep re-learning on every project until it actually sticks.
