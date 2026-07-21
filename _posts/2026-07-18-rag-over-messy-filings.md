---
layout: post
title: "Notes from building a RAG pipeline over messy filings"
date: 2026-07-18
---

I'm partway through a summer internship building the data side of a RAG system over Chinese listed-company filings — raw announcements, F10 forms, periodic reports, and market events, turned into something you can actually query and get a sourced answer from instead of a plausible-sounding guess.

Most of the actual difficulty so far hasn't been the retrieval-augmented-generation part — it's everything upstream of it. Getting documents chunked in a way that doesn't split a table in half, keeping a stable ID so every stored record can be traced back to its original filing, and combining structured SQL lookups with vector search so the system doesn't have to choose between "exact" and "semantically relevant." The actual answer-generation step is almost the easy part once the retrieval underneath it is trustworthy.

The bigger realization: a RAG system is only as honest as its retrieval. It's straightforward to build something that returns a fluent-sounding answer; it's much harder to build something that returns the *right* passage and is willing to say "I don't have enough evidence for that" when it should. That's the part I've spent the most time on, and the part I think matters most if this kind of system is ever going to be trusted with anything that isn't news-classification-stakes.

Not finance research in the strict sense, but a decent crash course in what it actually takes to make messy real-world data say something useful.
