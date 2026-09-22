---
title: "From Big-T to a Measurable RAG Workload: Pilot Design"
date: 2026-09-21
tags:
  - ai-tokenomics
  - big-t
  - rag
  - llm-systems
  - research
summary: "A pre-experiment research note defining a small pilot for testing whether simple expected-cost composition models can describe measured token consumption in increasingly compositional RAG workflows."
description: "A pre-experiment research note defining a small pilot for testing whether simple expected-cost composition models can describe measured token consumption in increasingly compositional RAG workflows."
references:
  - title: "Tokenomics Foundation"
    url: https://www.tokeneconomics.com/
  - title: "Big-T Notation explainer"
    url: https://www.tokeneconomics.com/projects/big-t-notation/
---

**Status: Pilot design — written before running the experiment**

Preserving this status separates my prior hypotheses from any later interpretation of the results.

## Motivation

My initial question was whether RAG itself should correspond to a particular Big-T complexity class.

My current working interpretation is different: basic deterministic RAG may be better viewed as a canonical AI workload than as one universal asymptotic token-complexity class. This is my present interpretation, not an established research result.

In basic RAG, retrieval primarily changes how much context is exposed to the downstream language-model call. If a system always retrieves a fixed number of chunks, increasing total corpus size does not necessarily increase the number of tokens consumed by that LLM call.

The more interesting token-consumption structure appears when RAG becomes compositional through additional model calls, conditional decisions, verification, and retries.

## Research Question v0.1

**Can a simple expected-cost composition model describe measured token consumption as a RAG workflow becomes increasingly compositional?**

This is an initial pilot question, not a final research claim.

## Experimental Workflows

### Workflow A — Basic RAG

```text
Question
   ↓
Retrieval
   ↓
Top-r Chunks
   ↓
LLM Answer
```

This serves as the baseline. The retrieval system itself is not the primary object being measured in this pilot. The initial measurement focuses on model-visible input and output token consumption.

### Workflow B — Rewrite + RAG

```text
Question
   ↓
LLM Query Rewrite
   ↓
Retrieval
   ↓
LLM Answer
```

This introduces sequential model calls. My pre-experiment expectation is that its measured token usage should be largely explainable as the sum of the rewrite call and answer call.

### Workflow C — Rewrite + RAG + Verification / Retry

```text
Question
   ↓
Query Rewrite
   ↓
Retrieval
   ↓
Answer Generation
   ↓
Verifier
   ↓
Sufficient?
  /        \
yes        no
 ↓          ↓
finish    retry
```

This introduces a variable number of calls.

## Pre-Experiment Hypotheses

### H1 — Atomic baseline

Basic RAG should have straightforward model-token consumption determined primarily by the input context and generated output.

### H2 — Sequential composition

For rewrite + RAG, total model-token consumption should be approximately the sum of the individual model calls.

### H3 — Retry behavior

A simple expected-cost approximation for retry-based workflows may work reasonably well if the number of attempts and the cost of each attempt behave independently.

However, realistic difficult queries may simultaneously:

- trigger more retries;
- retrieve more or longer context;
- generate longer answers;
- require more expensive verification.

If so, retry frequency and per-attempt token cost may be correlated, making a simple factorized approximation less accurate. H3 is a hypothesis to test, not an observed result.

## What Will Be Measured

The initial pilot will use approximately 10 questions over a small public corpus.

For each model call, I will log:

- query ID;
- workflow;
- call type;
- attempt number;
- model;
- input tokens;
- output tokens;
- total tokens;
- retrieved chunk count;
- retrieved-context token count.

At the query level, I will summarize:

- number of model calls;
- retry count;
- total input tokens;
- total output tokens;
- total tokens.

## What Would Count as an Interesting Result?

Simply showing that a more complicated architecture consumes more tokens is not interesting by itself.

The useful observation would be a systematic discrepancy between a simple compositional cost prediction and measured token consumption, followed by an architectural explanation for that discrepancy.

## Planned Analysis

After the pilot runs, I will extend this entry with a **Pilot Results** section containing:

- **Prediction vs. Measurement**
- **Unexpected Observations**
- **Possible Explanation**
- **Limitations**
- **Next Experiment**

No experimental results are reported here because the pilot has not yet been run.

## Implementation Plan

- Use a small public corpus.
- Use approximately 10 questions.
- Use the same fixed LLM across all workflows.
- Keep prompts and generation settings fixed where possible.
- Measure provider- or runtime-reported token counts rather than manually estimating them.
- Cap retries to prevent runaway execution.
- Prioritize a minimal, reproducible implementation over production-quality RAG infrastructure.
