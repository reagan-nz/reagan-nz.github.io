---
title: "Starting AI Tokenomics: From Big-O to Big-T"
date: 2026-09-14
summary: "First pass over the Tokenomics Foundation explainers; open questions about what n means in Big-T."
description: "First pass over the Tokenomics Foundation explainers; open questions about what n means in Big-T."
references:
  - title: "Tokenomics Foundation"
    url: https://www.tokeneconomics.com/
  - title: "Big-T Notation explainer"
    url: https://www.tokeneconomics.com/projects/big-t-notation/
---

## What I read

The Tokenomics Foundation's introduction to AI tokenomics and its Big-T notation explainer.

## What I understand so far

AI tokenomics can be viewed through three layers: production, consumption, and value. Big-T is an informal framework inspired by Big-O for thinking about how token consumption grows as AI workloads scale.

The notation introduces input or request scale *n*, model calls per request *k*, and agent depth *a*. I want to be more precise about what each of these measures.

## Questions I'm taking forward

1. What exactly should *n* represent: request count, input size, corpus size, or something else?
2. Why is “RAG done right” classified as $$T(\log n)$$?
3. If retrieval returns a fixed number of chunks of fixed length, does the retrieved context stay constant as the corpus grows?
4. Should Big-T measure only LLM tokens, or should retrieval and deterministic computation also enter the resource model?

> Treating corpus size and request-visible input as the same *n* may be conflating two different scaling questions.

## Next step

Finish the explainer, read the more detailed Big-T material, and sketch the token-consumption structure of a simple RAG pipeline.
