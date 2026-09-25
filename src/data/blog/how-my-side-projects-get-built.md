---
title: "My Side Projects Get Code Review Now"
pubDatetime: 2026-09-25T08:00:00Z
description: "Every hobby project of mine now runs like a small team: an issue, a draft pull request, CI, and a reviewer that didn't write the code."
tags:
  - devops
  - side-projects
---

Side projects used to mean one branch, commits called `fix`, and pushing to main at midnight. This year that changed, and it wasn't discipline. It was tooling.

A lot of the code in my projects is now written with Claude. That's fast, and it's also exactly why I wanted guardrails. Fast code with nobody checking it is how you end up debugging at 2 AM.

## The loop

Every repo follows the same flow:

1. **An issue first.** Even for small things. It's the note that says why.
2. **A branch and a draft pull request.** CI runs on every push: lint, types, tests, build.
3. **Ready for review.** Marking the PR ready triggers a separate Claude instance in GitHub Actions. It didn't write the code and it only sees the diff, so it reviews it cold.
4. **Every comment gets an answer.** Fixed, or not fixing and why, or a follow-up issue.
5. **Squash merge.** The PR title becomes the commit, and release-please turns those titles into versions and a changelog.

## Why a second model helps

The one who writes the code is the worst person to review it. That's true for me, and it's true for a model. The author already "knows" what the code is meant to do and reads that into it.

A fresh reviewer doesn't. In [bootleg](https://github.com/moudlajs/bootleg), reviews found holes in the review gate itself: a push racing the "ready" click could let a pull request pass without being reviewed at all. Another time a PR labelled "docs only" was quietly changing behaviour, and the review said so, so it got split into its own PR. Small things. The kind that become a bad evening later.

## What it costs

Some patience. A one-line fix still gets an issue and a PR. But the payoff is real: [covertwo](https://github.com/moudlajs/covertwo) shipped about 20 releases in its first two days, and I trusted every one of them.

It's also the most DevOps thing in my life that isn't my job. Pipelines, reviews, releases, all for a scoreboard and a playlist tool.

---

_P.S. - This blog was the last holdout. It had commits straight to main. It now goes through the same loop._
