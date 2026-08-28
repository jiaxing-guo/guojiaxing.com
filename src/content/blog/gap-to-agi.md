---
title: "The Gap to AGI: Learning How to Think"
summary: General intelligence may require adapting the form of computation, not only scaling the amount of reasoning.
publishedAt: 2026-08-27
tags:
  - Artificial intelligence
  - Adaptive computation
  - Reasoning
draft: false
---

LLMs are becoming remarkably good at reasoning. They have achieved superhuman performance across multiple domains: writing sophisticated software, solving difficult mathematical problems, and carrying out increasingly long chains of thought.

And yet there is a strange asymmetry: ask the same general-purpose model to play chess or poker, conduct a difficult negotiation, or enter an unfamiliar interactive environment, and its performance often looks much less impressive. These problems are not fundamentally beyond AI.

Superhuman chess programs have existed for decades, since Deep Blue defeated world champion Garry Kasparov in 1997. Poker has seen similar superhuman systems. We know that extremely effective algorithms exist for these environments.

So perhaps the remaining gap is not simply more intelligence, more knowledge, or even more reasoning. Perhaps part of the gap is learning **what kind of reasoning a problem requires**.

## Humans do not think the same way everywhere

Consider chess and poker.

When I play chess, my thinking naturally becomes more focused on:

- candidate moves
- forcing lines
- pruning obviously bad continuations
- evaluating future positions

The mindset becomes very different when I play poker:

- mixed strategies
- opponent tendencies and modeling
- uncertainty about hidden information
- how the opponent adapts to my behavior

Computer science gives these regimes very different algorithms. For chess-like environments, we might think about minimax or Monte Carlo Tree Search. For poker-like environments, we might think about belief states, regret minimization, or equilibrium computation. But the human brain is not literally executing MCTS when playing chess or CFR when playing poker.

Something else is happening.

## The brain seems to reconfigure computation

Humans appear to achieve algorithmic flexibility mostly through **reconfiguration, amortization, abstraction, and selective computation**.

Years of experience compress expensive reasoning into intuition:

- We learn which features matter.
- We learn when deeper calculation is worthwhile.
- We learn which possibilities deserve attention and which can be ignored.

Depending on the structure of the situation, different kinds of internal computation become more important. The same brain can therefore behave almost like very different algorithms without implementing those algorithms explicitly.

This seems like an important clue for AI.

## Current LLMs mostly learn one extraordinarily powerful computational habit

The remarkable thing about transformers is how much emerged from something that sounds almost trivial:

> predict the next token

Scaling this objective produced models capable of programming, mathematics, planning, abstraction, and many forms of reasoning. Post-training and reinforcement learning then made those capabilities substantially stronger.

But underneath all of this, the basic computational process remains surprisingly uniform. A transformer repeatedly transforms its current context and predicts what comes next:

- It can *describe* tree search.
- It can *explain* Bayesian inference.
- It can *write* CFR.
- It can even imitate these processes through a chain of thought.

But knowing an algorithm and naturally **becoming the appropriate kind of reasoner** are different capabilities. That distinction seems increasingly important.

## Maybe the next step is not a bigger toolbox

One natural approach to general-purpose agents is:

> Give the LLM many tools and teach it to route to the appropriate one.

This approach has achieved enormous success across many domains. For chess, call a search engine. For poker, call a game-theoretic solver. For math, call a symbolic system. For coding, call a compiler.

However, there might be a deeper possibility.

Neural networks are extremely good at amortization. Give them enough examples of an expensive computation and they can often learn a much cheaper approximation. What happens if, instead of teaching a neural network one algorithm, we expose it to **many fundamentally different kinds of computation across many different environments**? Perhaps the network could learn something more abstract than any individual algorithm.

Not:

> “This is poker, therefore run CFR.”

But something closer to:

> “This environment has hidden state, strategic opponents, and actions whose value depends on behavioral frequencies. My internal computation should therefore become more belief-based, distributional, and strategically robust.”

Likewise:

> “This environment is deterministic, fully observable, and adversarial. Forward simulation and pruning should dominate.”

The distinction is subtle. The first is **algorithm selection**. The second is **adaptive computation**.

## An algorithm manifold

One way to think about this is that there may not need to be a discrete collection of algorithms at all. Instead, imagine a continuous space of computational strategies.

Chess might occupy one region: **simulation + pruning + value propagation**.

Poker another: **belief inference + counterfactual reasoning + strategic randomization**.

Debugging might involve: **causal hypothesis generation + experimentation + belief revision**.

Scientific reasoning: **world modeling + experiment design + uncertainty reduction**.

A sufficiently general neural system might learn this space and move through it depending on the structure of the environment. Then unfamiliar problems would not necessarily require selecting one known algorithm. The model could potentially combine computational behaviors it learned elsewhere.

A partially observable adversarial planning problem might require something between search and belief reasoning. A negotiation might combine opponent modeling, planning, uncertainty, and long-term adaptation.

There may be no named classical algorithm corresponding exactly to the right combination. Humans deal with this constantly.

## This might explain an important limitation of today's reasoning models

Current reasoning models are becoming very good at **thinking harder**. Give them more inference compute and they can generate longer reasoning trajectories, explore additional hypotheses, use tools, and verify their answers.

But general intelligence may also require learning to **think differently**. The relevant question becomes:

> Given a new environment, can the model infer what kind of computation is appropriate?

And eventually:

> Can it construct a new way of reasoning from computational patterns it learned elsewhere?

That feels meaningfully different from scaling chain-of-thought.

## From predicting tokens to predicting computation

Next-token prediction somehow produced representations far more general than anyone would have expected from the objective itself. Maybe sufficiently diverse post-training could produce another emergent abstraction.

Instead of only learning:

> what token should come next?

or even:

> what action should I take next?

a model might implicitly learn:

> what transformation of my internal state should happen next?

Search.

Simulate.

Update a belief.

Propagate a consequence backward.

Discard inconsistent hypotheses.

Explore because information is valuable.

Stop computing because further thought is not worth the cost.

These do not necessarily need to exist as explicit, human-defined modules. They could emerge as reusable patterns in neural computation. Different problems could evoke different combinations of them.

## Perhaps that is one of the gaps to AGI

I do not think chess or poker are themselves blockers to AGI. Specialized AI already plays both extraordinarily well.

The interesting gap is that a human can encounter chess, poker, debugging, negotiation, or a completely unfamiliar game and gradually become the **right kind of thinker** for each one. We do not need somebody to rewrite our cognitive architecture every time the environment changes. Our brains somehow infer structure, reconfigure computation, amortize experience, and develop appropriate abstractions.

Modern LLMs have demonstrated how much cognition can emerge from learning statistical structure at scale. Perhaps one of the next questions is whether similarly broad training can make **the computation itself adaptive**.

Not merely models that know many algorithms.

Not merely agents that select among a library of solvers.

But neural systems that learn, from the structure of the world in front of them, **how they ought to think**.
