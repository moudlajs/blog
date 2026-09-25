// Prefixes a root-relative path with the site's base path, so links work
// both at a domain root ("/") and under a sub-path such as "/blog/" on
// GitHub Pages. withBase("/posts/") -> "/blog/posts/".
const base = import.meta.env.BASE_URL.replace(/\/+$/, "");

export const withBase = (path: string) => `${base}${path}`;

// The current pathname without the base, e.g. "/blog/posts/x/" -> "/posts/x/".
export const stripBase = (pathname: string) =>
  base && pathname.startsWith(base)
    ? pathname.slice(base.length) || "/"
    : pathname;
