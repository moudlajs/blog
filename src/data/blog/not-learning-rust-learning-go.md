---
title: "I Never Promised to Learn Rust. I Learned Go."
pubDatetime: 2026-10-06T18:05:00Z
description: "My January post on failed tech resolutions ended with a joke promise to learn Rust. It stayed a joke. Here's what I got into instead."
tags:
  - humor
  - side-projects
---

In January I wrote about [tech resolutions that always fail by February](/posts/tech-resolutions-fail-by-february/). Number one on the list was "This Is the Year I Learn Rust", and the post signed off with the most predictable P.S. in tech:

> _I'm definitely going to learn Rust this year. For real this time. I'm very serious._

For the record: that was a joke. I never set that resolution. Which makes it the only one on the list I couldn't fail.

What I did do, without planning it, was fall into Go.

## How Go happened

Nobody told me to learn Go. I had two annoyances and needed small tools that just run:

- **[bootleg](https://github.com/moudlajs/bootleg)** turns a text file of songs into an Apple Music playlist.
- **[waiverwatch](https://github.com/moudlajs/waiverwatch)** is the start of a server that lets Claude read all my fantasy leagues at once.

Go turned out to be the language for people who want the tool more than the language. One binary, no runtime to install, a standard library that already has the HTTP client and the JSON parser. The error handling is famously repetitive. It's also easy to read.

Rust makes you prove to the compiler that you're right. Go assumes you're an adult and lets you find out.

## The rest of the scoreboard

Checking my public GitHub for this year, next to the Go:

- **TypeScript.** An NFL scoreboard.
- **Bash.** A save-game sync for two Macs, in bash 3.2, a version from 2006.
- **C#.** New releases of a command-line tool for my homelab.

Lines of Rust: **zero**. Exactly as not promised.

## The real lesson from January

The January post said resolutions fail because they're written for a fantasy version of you. The fix apparently isn't a better resolution. It's a real problem you want solved by Sunday. That picks the language for you, and you learn it because you have to.

---

_P.S. - I'm definitely not going to learn Rust next year. Which, by my own logic, means I probably will._
