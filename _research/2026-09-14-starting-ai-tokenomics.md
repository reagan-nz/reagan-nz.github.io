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

## Questions / ambiguities

### Q1 — What should the scaling variable be?

Big-T uses \\(n\\) somewhat loosely to represent request count or input size. However, in a real AI system, several dimensions may scale independently: the number of requests, query length, corpus size, retrieved-context size, and task complexity.

For example, in a RAG system, the corpus may grow from one million to one hundred million documents while the model still receives only five retrieved chunks. In that case, token consumption with respect to corpus size may remain approximately constant.

**Question:** Should Big-T use one universal \\(n\\), or should token complexity be defined with respect to multiple independent scaling variables?

**Status:** Open for me. I need to check the full Big-T paper and existing work before treating this as a research gap.

### Q2 — What resources should Big-T actually measure?

Big-T is presented as a framework for token consumption, but AI systems also use deterministic computation outside the LLM.

For example, a RAG system may perform vector search over a growing corpus. Retrieval computation may become more expensive as the database grows, while the number of tokens actually shown to the model remains nearly constant.

**Question:** Should Big-T measure only model-visible token consumption, or should the resource model also include retrieval, code execution, tool calls, and other deterministic computation?

**Status:** Open for me. I need to distinguish token complexity from ordinary computational complexity.

### Q3 — Is agent depth enough to describe agentic token complexity?

The current Big-T notation introduces agent depth \\(a\\), but different multi-agent topologies with similar depth may have very different token costs.

For example, a sequential chain

$$
A \rightarrow B \rightarrow C \rightarrow D
$$

is structurally different from a branching system in which one agent spawns many workers. If each agent creates \\(b\\) sub-agents over depth \\(a\\), the number of active agents may grow approximately like

$$
1 + b + b^2 + \cdots + b^a,
$$

rather than simply scaling linearly with \\(a\\).

**Question:** Is agent depth \\(a\\) sufficient, or does a useful token-complexity framework also need branching factor, topology, retry structure, or some other description of agent coordination?

**Status:** Candidate question. I need to check how the full Big-T framework models branching and multi-agent systems.

## Next step

Finish the explainer, read the more detailed Big-T material, and sketch the token-consumption structure of a simple RAG pipeline.
