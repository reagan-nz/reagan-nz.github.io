---
title: "RAG as a Canonical Workload, Not Necessarily a Big-T Class"
date: 2026-09-17
tags:
  - ai-tokenomics
  - big-t
  - rag
  - llm-systems
summary: "A first attempt to separate RAG's effect on model-visible token consumption from the stronger claim that RAG defines its own asymptotic token-complexity class."
description: "A first attempt to separate RAG's effect on model-visible token consumption from the stronger claim that RAG defines its own asymptotic token-complexity class."
references:
  - title: "Tokenomics Foundation"
    url: https://www.tokeneconomics.com/
  - title: "Big-T Notation explainer"
    url: https://www.tokeneconomics.com/projects/big-t-notation/
---

## What I understood

Basic RAG clearly affects token consumption because retrieval reduces the amount of context ultimately shown to the language model.

If a full source contains \\(N\\) tokens but retrieval returns only \\(r\\) chunks with average length \\(L\\), then the downstream model may see roughly

$$
rL
$$

retrieved tokens rather than the entire source. Reducing input size and reducing model-visible token consumption are therefore not separate effects: for an LLM call, fewer input tokens directly reduce metered input-token usage.

However, this does not automatically imply that RAG should be assigned a distinct asymptotic class such as

$$
T(\log n).
$$

If corpus size grows while the system continues to retrieve a fixed number of chunks, the number of tokens shown to the model may remain approximately constant with respect to corpus size.

## Current working interpretation

I currently think it is more useful to treat basic RAG as a canonical AI workload or architecture to analyze than to assume that “RAG” itself corresponds to one universal Big-T class. This is a working interpretation, not a proven research result.

A minimal RAG pipeline is:

```text
Query
  ↓
Deterministic Retrieval
  ↓
Top-r Chunks
  ↓
One LLM Call
  ↓
Answer
```

In this simplest case, retrieval mainly changes the input-token cost of the downstream model call.

The more interesting token-economic behavior appears when RAG becomes compositional:

```text
Query
  ↓
LLM Query Rewrite
  ↓
Retrieval
  ↓
LLM Reranking
  ↓
Generation
  ↓
Verification
  ↓
Retry / Additional Retrieval if Needed
```

At that point, token consumption depends not only on retrieved-context size but also on:

- repeated model calls;
- conditional branches;
- retries;
- verification;
- multi-hop retrieval;
- possible agent delegation.

## Research observation

My current working observation is that basic deterministic RAG may not need to be treated as a distinct token-complexity class. Its immediate effect is to reduce the model-visible input of an atomic LLM call. RAG becomes more interesting as a tokenomics research object when model-mediated rewriting, reranking, verification, retries, or agentic delegation introduce compositional structure.

This remains a hypothesis to test rather than an established result.

## Questions I want to pursue

1. With respect to what variable should the token cost of RAG scale: corpus size, retrieved-context size, request count, or another quantity?
2. When deterministic retrieval reduces input context, should that be modeled only as a change in the coefficient or atomic-call cost, rather than as a separate complexity class?
3. At what point does a RAG pipeline become sufficiently compositional that sequence, choice, iteration, or branching structure becomes the more important description of token cost?
4. For realistic RAG systems with retries or adaptive retrieval, can a simple expected-cost model accurately predict measured token usage?

## Next step

- Treat simple deterministic RAG as a baseline.
- Write an explicit token-cost model for one-call RAG.
- Add one architectural feature at a time: query rewriting, reranking, verifier, and retry.
- Instrument a small implementation and compare predicted versus observed token usage.
- Use discrepancies to identify where simple composition assumptions break.
