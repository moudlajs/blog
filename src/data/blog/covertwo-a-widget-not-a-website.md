---
title: "A Scoreboard That's a Widget, Not a Website"
pubDatetime: 2026-09-25T06:00:00Z
description: "Watching the NFL from Europe means kickoffs at 19:00, 22:25 and 02:20. I wanted one small page that tells me what's on. So I built covertwo."
tags:
  - side-projects
  - fantasy-football
---

Watching the NFL from Central Europe is a timezone puzzle. The early Sunday games kick off at 19:00. The late window is around 22:25. Sunday Night Football starts at 02:20, which is either dedication or a medical condition.

Every scoreboard I found was a _website_. Ads, autoplay video, news, betting odds, and somewhere under all of it, the score. I wanted one row per game. That's it.

So I built [covertwo](https://moudlajs.github.io/covertwo/).

## What it does

One compact row per game, grouped by day. Kickoff times in my timezone, with a toggle for US time. Live games refresh every 30 seconds. When nothing is live, a card tells me what's next. Finished days fold away so they don't take up space.

That's the whole product. A widget, not a website.

## The one annoying part

The scores come from ESPN's public scoreboard API. It works fine from a terminal. From a browser on another site, it refuses: no CORS headers, so the browser blocks the response.

The fix is a tiny Cloudflare Worker. The page asks the Worker, the Worker asks ESPN, caches the answer for about 15 seconds, and adds the headers the browser wants. Free tier, a few dozen lines, and ESPN sees one request per 15 seconds instead of one per open tab.

Everything else is a static React app on GitHub Pages.

## Overkill, on purpose

It has unit tests, and Playwright end-to-end tests on mobile and desktop that run against a saved copy of ESPN's data, so CI never calls the real API. Every change goes through a pull request and a review before it lands, and releases are cut automatically from the commit titles.

That sounds like a lot for a scoreboard. It's also why it moved fast: about 20 releases in its first two days, from v0.1.0 to v1.13.

---

_P.S. - For the non-football people: cover two is a defense where two safeties split the deep half of the field._
