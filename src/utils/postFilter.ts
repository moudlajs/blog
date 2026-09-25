import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  // The dev server shows drafts and scheduled posts so they can be previewed.
  return import.meta.env.DEV || (!data.draft && isPublishTimePassed);
};

export default postFilter;
