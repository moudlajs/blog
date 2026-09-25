export const SITE = {
  website: "https://danielczetner.com/",
  author: "Daniel Czetner",
  profile: "https://github.com/moudlajs",
  desc: "DevOps, side projects, weird bugs and fantasy football.",
  title: "dan@blog",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 20,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/moudlajs/blog/edit/main/",
  },
  showBooks: false, // the bookshelf is ready; flip to publish /books and its nav link
  // Cloudflare Web Analytics token (public; it ends up in every page's source).
  // Get it from the Cloudflare dashboard: Analytics & Logs > Web Analytics >
  // your site > "Manage site" > JS snippet, the value of "token" in
  // data-cf-beacon. Set it to "CF_BEACON_TOKEN_HERE" to switch the beacon off.
  cfBeaconToken: "647ef9fbab3e49b08b56a843813221c4",
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Prague", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
