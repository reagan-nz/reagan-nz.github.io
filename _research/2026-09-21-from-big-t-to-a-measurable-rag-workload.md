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

One retry attempt block \\(R\\) is:

```text
Query
   ↓
Rewrite
   ↓
Retrieval
   ↓
Answer
   ↓
Verify
   ↓
PASS?
 /    \
yes    no
 ↓      ↓
finish  verifier feedback
            ↓
        Rewrite again
            ↓
        Retrieval
            ↓
         Answer
            ↓
         Verify
```

Verifier feedback is passed only to the next rewrite call. Retrieval then uses the newly rewritten query, while the answer call does not directly receive the previous verifier feedback. If verification fails, the entire attempt block repeats. This allows a failed verification to change the next retrieval query and its evidence rather than simply repeating an identical retrieval.

The implementation permits at most three attempts. Because each attempt contains a rewrite, answer, and verification call, Workflow C can use at most nine LLM calls:

$$
3\ \text{attempts}
\times
(\text{rewrite}+\text{answer}+\text{verify})
=9\ \text{LLM calls}.
$$

## Pre-Experiment Hypotheses

### H1 — Atomic baseline

Basic RAG should have straightforward model-token consumption determined primarily by the input context and generated output.

### H2 — Sequential composition

For rewrite + RAG, total model-token consumption should be approximately the sum of the individual model calls.

### H3 — Retry composition

For query \\(j\\), define:

$$
\nu_j=\text{number of attempt blocks}
$$

and:

$$
\bar c_j
=
\text{mean token cost of an attempt block within query }j.
$$

The repeated-block token cost for that query is therefore:

$$
S_j=\nu_j\bar c_j.
$$

The pilot will compare the observed quantity

$$
E[\nu\bar c]
$$

with the simple factorized approximation

$$
E[\nu]E[\bar c].
$$

My pre-experiment hypothesis is that the approximation may work reasonably well when retry frequency and per-query attempt cost are not systematically coupled.

However, realistic difficult queries may simultaneously:

- cause more attempts;
- produce longer or more complicated rewrites;
- retrieve different evidence;
- produce longer answer calls;
- require more expensive verification.

In that case, queries with larger \\(\nu_j\\) may also tend to have larger \\(\bar c_j\\), producing a systematic difference between

$$
E[\nu\bar c]
$$

and

$$
E[\nu]E[\bar c].
$$

This is a pre-experiment hypothesis to test, not a finding. A near-zero difference would also be informative: the purpose is to test whether the simple abstraction is adequate, not to force it to fail.

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
- retrieved-context character length (`context_chars`; auxiliary only).

`context_chars` is only an auxiliary indicator of retrieved-context size. It is not treated as a substitute for token count.

The authoritative LLM token-consumption measurements come from actual Ollama model calls and are reported by the runtime:

- `prompt_eval_count` → input tokens;
- `eval_count` → output tokens.

At the query level, I will summarize:

- number of model calls;
- retry count;
- total input tokens;
- total output tokens;
- total tokens.

## What Would Count as an Interesting Result?

Simply showing that a more complicated architecture consumes more tokens is not interesting by itself.

The useful observation would be a systematic discrepancy between a simple compositional cost prediction and measured token consumption, followed by an architectural explanation for that discrepancy.

For Workflow C, the main quantity of interest is whether the observed mean repeated-block cost differs systematically from the simple factorized approximation, and whether any gap can be related to dependence between retry frequency and per-query attempt cost.

A near-zero gap would also be a useful pilot result because it would suggest that the simpler abstraction is adequate for the tested workload.

## Planned Analysis

### Planned Retry Analysis

For Workflow C, define:

$$
\text{attempt\_cost}_{j,i}
=
\text{provider-reported total LLM tokens used in attempt }i
$$

$$
\bar c_j
=
\frac{1}{\nu_j}
\sum_i \text{attempt\_cost}_{j,i}
$$

$$
S_j
=
\sum_i \text{attempt\_cost}_{j,i}
=
\nu_j\bar c_j
$$

The analysis will report:

$$
\text{actual mean retry cost}
=
\mathrm{mean}_j(\nu_j\bar c_j)
$$

and:

$$
\text{factorized prediction}
=
\mathrm{mean}_j(\nu_j)
\cdot
\mathrm{mean}_j(\bar c_j)
$$

together with:

- absolute prediction gap;
- percentage prediction gap;
- covariance between \\(\nu_j\\) and \\(\bar c_j\\);
- correlation between \\(\nu_j\\) and \\(\bar c_j\\), when variance permits.

Mean attempt cost is computed within each query first. Attempts are not pooled across all queries before calculating the factorized comparison, because doing so can mechanically obscure the dependence being studied.

After the pilot runs, I will extend this entry with a **Pilot Results** section containing:

- **Prediction vs. Measurement**
- **Unexpected Observations**
- **Possible Explanation**
- **Limitations**
- **Next Experiment**

No experimental results are reported here because the pilot has not yet been run.

## Implementation Plan

- Use a local Ollama runtime.
- Use `qwen3:4b` with `think=false`.
- Use deterministic or low-variance generation settings.
- Use a small public Wikipedia corpus.
- Use TF-IDF retrieval with top-k selection.
- Use approximately 10 questions.
- Use the same fixed model across all workflows.
- Permit at most three attempts in Workflow C.
- Use provider- or runtime-reported token counts from actual LLM calls.
- Do not manually estimate LLM token counts.
- Treat this as a deliberately small exploratory pilot rather than a benchmark.

No live LLM calls have been run yet.
