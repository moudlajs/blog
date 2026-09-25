export interface Project {
  name: string;
  repo: string; // owner/name on GitHub
  blurb: string; // one line, used on the home page
  description: string;
  tags: string[];
  live?: string;
}

// Order is display order. Only public repos belong here.
export const PROJECTS: Project[] = [
  {
    name: "covertwo",
    repo: "moudlajs/covertwo",
    blurb: "A small NFL live scoreboard. A widget, not a website.",
    description:
      "One compact row per game, grouped by day, with a Europe/US kickoff time toggle. A static React app on GitHub Pages plus one tiny Cloudflare Worker that proxies and caches ESPN's scoreboard.",
    tags: ["TypeScript", "React", "Cloudflare Workers"],
    live: "https://moudlajs.github.io/covertwo/",
  },
  {
    name: "waiverwatch",
    repo: "moudlajs/waiverwatch",
    blurb: "Ask Claude about all my Sleeper fantasy leagues at once.",
    description:
      "An MCP server for Sleeper fantasy football. The Sleeper app shows one league at a time; this lets Claude answer across all of them, from the laptop or the phone. Read-only, always fresh, zero running cost.",
    tags: ["Go", "MCP", "Fantasy football"],
  },
  {
    name: "bootleg",
    repo: "moudlajs/bootleg",
    blurb: "A text file of songs in, an Apple Music playlist out.",
    description:
      "Turns a plain list of songs into an Apple Music library playlist through the web player's back door: no MusicKit, no paid developer account, just the tokens the browser already has.",
    tags: ["Go", "CLI", "Apple Music"],
  },
  {
    name: "star-traders-sync",
    repo: "moudlajs/star-traders-sync",
    blurb: "Game saves synced between two Macs. Refuses rather than guesses.",
    description:
      "Syncs Star Traders: Frontiers saves between two Macs over Tailscale with rsync and ssh. Save files can't be merged, so when both sides changed it stops and makes you choose. It will not lose a save.",
    tags: ["Bash", "Tailscale", "macOS"],
  },
  {
    name: "homelab",
    repo: "moudlajs/homelab",
    blurb: "One CLI for the Mac Mini homelab.",
    description:
      "A C# command-line tool for a Mac Mini M4 homelab: Docker services, networking, VPN, TV control and AI-assisted monitoring, all from the terminal.",
    tags: ["C#", ".NET", "Docker"],
  },
];

// Build-time lookup of the latest release tag. A failed request only drops the
// badge; it must never fail the build.
export async function getLatestRelease(
  repo: string
): Promise<string | undefined> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/releases/latest`,
      { headers, signal: AbortSignal.timeout(5000) }
    );
    return res.ok ? (await res.json()).tag_name : undefined;
  } catch {
    return undefined;
  }
}
