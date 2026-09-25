---
title: "Software That Refuses Rather Than Guesses"
pubDatetime: 2026-09-25T07:00:00Z
description: "Star Traders: Frontiers has no working cloud save on macOS. My fix syncs saves between two Macs, and its best feature is saying no."
tags:
  - side-projects
  - devops
---

I play [Star Traders: Frontiers](https://store.steampowered.com/app/335620/) on two Macs. Steam should sync the saves. It doesn't: cloud saves are switched off for this game on macOS, because its cloud rules only know Windows paths.

So a campaign I played on one Mac simply didn't exist on the other.

## The obvious fix, and why it's wrong

The obvious fix is a sync tool. Point Syncthing or iCloud at the save folder, done.

Except these save files are encrypted blobs. They can't be merged, only replaced whole. A sync tool that sees changes on both sides has to pick one, and it picks quietly. Play a session on each machine, and one of them is gone. You find out three hours into the next session.

## What I built instead

[star-traders-sync](https://github.com/moudlajs/star-traders-sync) is a Bash script that moves saves over `rsync` and `ssh` on my Tailscale network, through a hub folder on one machine. No daemon, no third-party service.

Every day it's one command:

```bash
sts play
```

Pull from the hub, launch the game, wait until I quit, push back. Same command on either Mac.

## Saying no is the feature

The one rule is: push before you switch machines. When I forget, nothing breaks. The next pull **refuses**. It shows both sides, with timestamps and campaign counts, and waits for me to choose:

```bash
sts pull --force=hub      # keep what's on the hub
sts push --force=local    # keep what's on this machine
```

And every overwrite takes a snapshot first, so even the wrong choice can be undone.

It's the same lesson as incident response at work: the dangerous systems aren't the ones that fail loudly. They're the ones that guess, succeed, and are wrong.

## Also: a doctor

`sts doctor` checks everything the sync needs, in order: bash, rsync, the config, the SSH key, the connection to the hub. It doesn't stop at the first problem, and it prints the exact command to fix each one. It's read-only, so it's always safe to run.

---

_P.S. - It's written for bash 3.2, the old version macOS still ships, so it doesn't need a newer bash from Homebrew._
