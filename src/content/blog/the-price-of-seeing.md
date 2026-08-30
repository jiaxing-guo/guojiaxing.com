---
title: The Price of Seeing
summary: How safe exploration can create the evidence needed to learn hidden behavior in imperfect-information games.
publishedAt: 2026-08-30
tags:
  - Game theory
  - Active learning
  - Poker
draft: false
---

*In poker, the hands you most want to learn from are often the ones you never get to see.*

This essay develops ideas from my preprint, [Safe Observation Capacity for Opponent Exploitation under Showdown Censoring](https://arxiv.org/abs/2608.09954).

The accompanying [code and experiments](https://github.com/jiaxing-guo/safe-observation-capacity) are also available.

Suppose you are playing poker against someone who seems to fold too much. If you knew **which hands** they over-fold, the response could be simple: apply pressure where their range cannot defend.

There is an annoying problem.

When they fold, you do not get to see their cards.

The behavior you want to understand destroys the evidence needed to understand it.

That small observation opens a much larger question:

> **How should an agent learn when its own actions determine what becomes observable?**

## The strangest poker dataset

Poker gives you a remarkable amount of public information. You see bets, calls, raises, folds, board cards, bet sizes, and complete action histories.

At showdown, you get something even more valuable: the opponent's private cards.

Suppose you collect a million hands and want to estimate one simple quantity:

> When the opponent holds $7\clubsuit6\clubsuit$ here, how often do they call?

A natural estimator finds every hand where you eventually saw $7\clubsuit6\clubsuit$, then counts how often the opponent called.

But seeing those cards is related to the action.

Calls keep the hand alive and can expose the cards later. Folds terminate the hand and hide them immediately.

Your dataset therefore contains too many $7\clubsuit6\clubsuit$ hands where the opponent continued.

You may estimate

$$
P(\text{call}\mid 7\clubsuit6\clubsuit,\text{ cards revealed}),
$$

while caring about

$$
P(\text{call}\mid 7\clubsuit6\clubsuit).
$$

Those are different questions, and they can have very different answers.

Statisticians call this **missing not at random**, or MNAR. The chance of seeing the hidden variable depends on the behavior you are trying to estimate.

In the paper, we show that passive showdown estimates converge to reveal-conditioned behavior. The bias can survive unlimited data.

That creates a wonderfully perverse phenomenon.

## More data can make you more confidently wrong

We usually treat more data as a cure for uncertainty. Here, more data can remove uncertainty while leaving the bias untouched.

With 1,000 observations, the confidence interval may still be wide. With 100,000, it narrows. With a million, the estimate can look extraordinarily precise.

Unfortunately, it can be extraordinarily precise around the wrong number.

When reveal rates differ across actions, the naive estimator converges to a biased limit. Its confidence interval keeps shrinking and can eventually exclude the true strategy altogether.

The failure does not look like insufficient data.

It looks statistically excellent: low variance, enormous sample size, tiny confidence interval—and the wrong answer.

Poker makes the mechanism visible because the hidden variable is printed on two cards. But the same structure appears whenever decisions affect what later becomes measurable.

A lender observes repayment only after issuing a loan. A physician sees some outcomes only after choosing a treatment or test.

A recommender learns from the items it chose to expose. A robot learns mainly about states its previous policy allowed it to visit.

In interactive systems, your policy helps construct your dataset.

## Two opponents you can never tell apart

There is an even cleaner version of the problem.

Imagine two opponents with very different private strategies. One calls too often with weak hands and folds too often with strong hands. The other reverses that hidden composition.

Now choose the probabilities so both opponents produce exactly the same public action frequencies.

They fold equally often. They call equally often. Every publicly visible history has the same probability.

From your perspective, they are identical.

We call them **public twins**.

You can passively observe them forever without learning which one is present. A billion hands only estimate their shared public statistics to more decimal places.

Yet the best response to one twin can be very different from the best response to the other.

Better estimation cannot recover information the observation process never exposes. You need to change the observation process itself.

Fortunately, poker lets you do that.

## Sometimes the experiment is an action

Suppose the opponent can fold or continue. A fold hides their cards, so that branch seems useless for learning their private strategy.

But you control what happens after a continuation.

You can check instead of betting. You can call instead of raising. More generally, you can steer the game toward branches where continuing hands reach showdown.

Now the private cards become visible.

There is also a conservation law inside the game tree.

**Sequence form** represents game-tree probabilities as flows. Probability mass enters a decision, then divides among the available actions.

If you know the incoming mass and observe every revealing continuation, the hidden fold mass is simply what remains:

$$
\text{fold mass}
=
\text{parent mass}
-
\sum \text{revealed continuation mass}.
$$

You can therefore identify some hidden folding behavior without observing a folded hand directly.

The information comes from controlling downstream branches, observing what they reveal, and using the flow constraints to reconstruct what disappeared.

Learning has become experimental design.

You choose actions for their strategic consequences and for the evidence they cause the world to reveal.

That raises the next question: **what does the experiment cost?**

## Curiosity has a price

The easiest way to reveal a poker hand may be to call far too often.

As data collection, that could be fantastic. As poker, it could be disastrous.

Exploration becomes especially dangerous in adversarial settings because the opponent can exploit the experiment itself.

Suppose you begin with a strong reference strategy whose worst-case value is $v_{\text{ref}}$.

You want to investigate an opponent while keeping one promise:

$$
\text{worst-case value} \geq v_{\text{ref}}-\rho.
$$

The parameter $\rho$ is your exploration budget.

A larger $\rho$ permits bolder experiments. A smaller one keeps you closer to the original guarantee.

Now information and strategic safety have a common price.

Once the problem is written this way, a natural quantity appears.

## How much information can safety buy?

Pick a hidden decision $I$ that you want to understand.

How much access can any strategy buy while still respecting the safety floor?

We call the answer **safe observation capacity**:

$$
\kappa_\rho(I)
=
\max_{\text{strategies satisfying the safety floor}}
\text{controlled reach of } I.
$$

Controlled reach is the part of access determined by your strategy and known chance events. It tells you how effectively you can route play toward the target.

It is not yet the final probability of observing the target. The opponent must also reach the relevant private state and choose a continuation that reveals it.

Think of $\kappa_\rho(I)$ as the access you can buy directly.

Now vary $\rho$.

At $\rho=0$, you refuse to sacrifice guaranteed value. Some targets may already be easy to reach. Others may sit far from every safe route.

As you loosen the floor, new probing strategies become available. Controlled reach can increase.

The resulting frontier relates **safety budget** to **observational access**.

Its geometry is remarkably clean. Safe observation capacity is non-decreasing, concave, and piecewise linear in the safety budget.

The dual value of the safety constraint gives the local exchange rate between worst-case value and access.

It behaves like an **information supply curve**.

Some parts of an opponent's strategy are cheap to inspect. Others sit behind strategically dangerous branches.

The game assigns a price to seeing each hidden behavior.

## The price eventually becomes statistical

Access is only useful when it produces observations.

The opponent contributes the remaining factor. Let $\pi(I)$ collect the residual opponent reach and the chance that play continues into a revealing branch.

The useful observation rate is then approximately

$$
\kappa_\rho(I)\pi(I).
$$

This leads to a practical question:

> How many games are needed to estimate the opponent accurately?

For target precision $\varepsilon$, the local sample cost scales like

$$
N
\propto
\frac{1}
{\kappa_\rho(I)\pi(I)\varepsilon^2},
$$

up to logarithmic and target-local terms.

The message is simple.

If a target is difficult to reach safely, learning takes longer. If a slightly larger safety budget doubles access, the same evidence may require roughly half as many games.

The paper proves achievable rates and matching local lower bounds when the target has the required reveal structure.

The geometry of the game tree determines the statistics of learning.

## Deciding what is worth looking at

A realistic poker game contains many places where an opponent could deviate.

Actively revealing every one would waste data and strategic value. Curiosity needs a routing policy.

We built a controller called **Safe Active De-censoring**, or SAD.

The acronym is somewhat unfortunate. By the time we noticed, it had become difficult to call it anything else.

SAD begins with cheap public evidence.

If an opponent suddenly folds too often on a river line, that anomaly is visible without forcing extra showdowns.

Next, SAD asks whether the suspicious region is safely observable. An interesting deviation may sit behind a prohibitively expensive probe.

Safe observation capacity tells the controller how much access its risk budget can buy.

SAD then routes a limited reveal budget toward targets that are both valuable and accessible.

Those probes create showdowns or other identifying observations while preserving the worst-case value floor.

The evidence narrows the set of opponent strategies still consistent with the data. The agent then computes a robust response against what remains possible.

Public twins need a separate audit because ordinary screening sees no anomaly.

The controller occasionally runs identification experiments designed to expose private changes that preserve every public statistic.

The opponent model decides where the agent hopes to gain. The safety floor limits what the attempt can cost.

## What happens in poker experiments?

We tested each mechanism separately so the results would say what actually caused the improvement.

The primary results are means over ten matched runs, using the same simulated seeds for each method. The paper reports two-sided 95% confidence intervals.

A **certified gain** is a guaranteed improvement over the reference value for every opponent strategy still consistent with the evidence.

In a simplified turn-river game with one million hands and $\rho=0.5$, public data alone certified a gain of $0.485$ against a river over-folder.

Randomly allocated safe reveals raised the certificate to $0.588$.

SAD concentrated the reveal budget on strategically relevant targets and reached $0.692$.

When evaluated against the known simulated opponent, SAD achieved $0.810$, close to the safe oracle's $0.828$.

The safe oracle knows the opponent's strategy in advance. It is the best benchmark available under the same safety floor.

On an equilibrium control, SAD selected no targets and returned to the reference strategy.

That behavior matters. An active learner should be able to conclude that nothing is worth investigating.

The public-twin experiment tests a harder failure.

Public data cannot distinguish the twins, so a public-only learner remains at the reference value no matter how precisely it estimates their shared statistics.

Active auditing changes the observation process.

Using separate audit, refit, and deployment samples, the procedure detected all $30$ twin runs and none of the $30$ equilibrium controls.

We also tested whether capacity predicts how quickly revealing observations arrive.

Across the predeclared hold'em suffix targets, predicted and observed rates were almost perfectly aligned.

The log-log regression had slope $1.010$ and $R^2=0.999$.

That result was especially satisfying.

Capacity begins as geometry inside an optimization problem. In the experiments, it behaves almost exactly like the rate parameter predicted by the statistical theory.

## Learning by controlling what becomes observable

Poker gives the problem a wonderfully tangible form.

There is a hidden variable—the opponent's cards—and sometimes the game physically turns it face up.

But the structure is everywhere.

A scientific experiment changes a system in order to measure it. A physician chooses tests that determine what clinical information appears.

A robot chooses which parts of its environment it visits. A recommender chooses which products, videos, or articles can generate feedback.

In each case, action controls part of the future dataset.

Observation is therefore a strategic resource.

Some information arrives automatically. Some requires intervention. Some is cheap. Some sits behind actions carrying real cost or risk.

For an adversarial environment, the central question becomes:

> **How much can you afford to learn while remaining safe against the person you are trying to understand?**

Safe observation capacity turns that question into something measurable.

It prices access under a safety budget. That access determines how quickly hidden behavior can be learned.

The broader idea is simple:

> **Information is sometimes something you must produce through your actions.**

Once that happens, learning becomes inseparable from deciding where to go, what to risk, and what is worth seeing.

Read the full [preprint](https://arxiv.org/abs/2608.09954) or explore the [research code](https://github.com/jiaxing-guo/safe-observation-capacity).
