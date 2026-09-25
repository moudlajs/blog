---
title: "All My Sleeper Leagues in One Question"
pubDatetime: 2026-09-25T07:30:00Z
description: "The Sleeper app shows one league at a time. On a Sunday with injuries flying, that's too slow. I'm building waiverwatch so I can just ask Claude."
tags:
  - side-projects
  - fantasy-football
---

Season two of fantasy football, and I'm in more than one league again. The Sleeper app is great, but it shows one league at a time. On a Sunday, when a running back limps off in the first quarter, I want one answer across all of them:

- _"How am I doing this week?"_
- _"Who's thin at RB in my dynasty league?"_
- _"Which trending waiver pickups are still available in my leagues?"_

Tapping through every league to work that out takes longer than the waiver window I have.

## The idea

[waiverwatch](https://github.com/moudlajs/waiverwatch) is an MCP server for Sleeper. MCP is the standard way to give an AI assistant tools. Instead of building another app, I give Claude a few tools that read my leagues, and then I'll just ask in plain words, on the laptop or the phone.

Claude is the interface. There's no website to build and no app to maintain.

## The rules I set

- **Always fresh.** Rosters, matchups and waivers are fetched from Sleeper on every question. Only the big player list is cached.
- **Read-only.** Sleeper's API is public and free, with no key. waiverwatch never logs into my account and can't change anything.
- **Zero running cost.** Written in Go, hosted on Google Cloud Run's free tier when it's online, scaling to zero between Sundays.

## Where it is today

Early. Right now it's a command-line tool that lists my leagues. Next up is the local MCP server so Claude on my laptop can use it, then the hosted version so it works from my phone.

I'll write the follow-up when it answers its first real waiver question. Hopefully before my bench needs it.

---

_P.S. - Last season I lost a playoff game after a first-round bye. I'm not saying waiverwatch would have fixed that. I'm saying I'd like the excuse to be gone._
