---
title: Safe Observation Capacity for Opponent Exploitation under Showdown Censoring
shortTitle: Safe Observation Capacity
summary: A safe method for learning exploitable opponent behavior when folds censor private-card observations.
question: How can an agent acquire strategically useful private-card data while preserving a value floor?
year: 2026
status: Preprint
topics:
  - Imperfect-information games
  - Opponent exploitation
  - Safe active learning
authors:
  - Jiaxing Guo
arxivId: "2608.09954"
version: v2
submittedAt: 2026-07-20
revisedAt: 2026-08-12
repo: https://github.com/jiaxing-guo/safe-observation-capacity
paper: https://arxiv.org/abs/2608.09954
pdf: https://arxiv.org/pdf/2608.09954
doi: https://doi.org/10.48550/arXiv.2608.09954
projectId: safe-observation-capacity
featured: true
order: 1
---

## Central Question

How can an agent acquire strategically useful private-card data while preserving a guaranteed value floor?

## Main Contribution

The paper defines **safe observation capacity**, which measures the largest target reach available under a specified value slack. Safe Active De-censoring combines public screening, an independent reveal batch, and robust deployment.

A sequence-form construction recovers censored fold mass on reveal-certified histories. The resulting capacity frontier is concave and piecewise linear, with an initial slope determined by the safety floor's shadow price.

The experiments improve certified gains over public-only collection. A separate audit-refit-deploy study detects all 30 simulation seeds and no control seed.

## Citation

[1] J. Guo, “Safe Observation Capacity for Opponent Exploitation under Showdown Censoring,” arXiv:2608.09954, 2026, doi: 10.48550/arXiv.2608.09954.
