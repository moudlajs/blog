---
title: "Bootlegging My Own Playlists"
pubDatetime: 2026-09-24T19:15:00Z
description: "Apple wants a paid developer account before you can create a playlist from code. The Apple Music web player already has everything it needs. So bootleg borrows it."
tags:
  - side-projects
---

I had a list of songs in a text file. I wanted them as a playlist in Apple Music. That's the whole story, and it should be a five-minute job.

It isn't. The official way to talk to Apple Music from code is MusicKit, and MusicKit needs a developer token. A developer token needs a paid Apple Developer membership. That's 99 dollars a year to move a text file into a playlist.

## The back door

The Apple Music web player at music.apple.com doesn't pay that fee every time you open it. It already has a developer token, and while you're signed in, it has your user token too. You can see both in the browser's DevTools, sitting in the request headers.

So [bootleg](https://github.com/moudlajs/bootleg) reuses them. You copy the two tokens into a `.env` file (the user token needs refreshing now and then), and it calls the same endpoints the web player calls:

```sh
bootleg -name "Road trip" roadtrip.txt
```

One song per line, `Artist - Title`. It searches the catalog for each line, creates the playlist in one request, and writes anything it couldn't match to `unmatched.txt` so you can fix it and add the rest to the same playlist with `-playlist-id`.

## Matching is the real work

Searching is easy. Picking the right result is not. Search for a famous song and half the results are karaoke versions, tribute bands, and "made famous by" covers. bootleg throws those out unless your line asks for them, and it wants both the artist and the title to match.

It also ignores case, accents and punctuation, because nobody types `Sigur Rós` with the accent. `Sigur Ros - Hoppipolla` finds `Sigur Rós - Hoppípolla`.

Run it with `-dry-run` first and it shows every match without creating anything.

## The honest part

These are private, undocumented endpoints. Apple can change them tomorrow and bootleg will break. It's for your own account only, it never logs in or grabs tokens by itself, and it searches slowly on purpose so it doesn't hammer anything.

And despite the name, it doesn't download or share a single song. It only adds songs you can already stream to your own library. The bootleg part is the route, not the music.

---

_P.S. - When Apple rejects the tokens, bootleg exits with code 2 and tells you how to get fresh ones. Usually only the user token needs replacing._
