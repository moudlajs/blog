import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";

// Site URL and base path come from the environment so the same code can run
// at a domain root or under a sub-path (e.g. moudlajs.github.io/blog/).
const site = process.env.SITE_URL || SITE.website;
const base = process.env.BASE_PATH || "/";
// "/blog/", "blog", "/blog" all become "/blog"; "/" becomes "".
const baseNoSlash = base.replace(/^\/+|\/+$/g, "")
  ? "/" + base.replace(/^\/+|\/+$/g, "")
  : "";

// Rewrites root-relative links in Markdown ("/projects/") to include the base.
const rehypeBaseLinks = () => (tree: unknown) => {
  const visit = (node: {
    type?: string;
    tagName?: string;
    properties?: Record<string, unknown>;
    children?: unknown[];
  }) => {
    const href = node.properties?.href;
    if (
      node.type === "element" &&
      node.tagName === "a" &&
      typeof href === "string" &&
      href.startsWith("/") &&
      !href.startsWith("//") &&
      baseNoSlash &&
      href !== baseNoSlash &&
      !href.startsWith(baseNoSlash + "/")
    ) {
      node.properties!.href = baseNoSlash + href;
    }
    node.children?.forEach(child => visit(child as typeof node));
  };
  visit(tree as Parameters<typeof visit>[0]);
};

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    rehypePlugins: [rehypeBaseLinks],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
  },
});
