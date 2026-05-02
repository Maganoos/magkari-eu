import tinyCSS from "@sardine/eleventy-plugin-tinycss";
import pluginIcons from "eleventy-plugin-icons";
import faviconPlugin from "eleventy-favicon";
import safeLinks from "@sardine/eleventy-plugin-external-links";
import poison from "eleventy-plugin-poison";
import eleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";
import readingTime from "eleventy-plugin-reading-time";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import EleventyPluginOgImage from "eleventy-plugin-og-image";
import fs from "node:fs";
import sitemap from "@quasibit/eleventy-plugin-sitemap";

const baseUrl = process.env.URL || "http://localhost:8080";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets/");

  eleventyConfig.addPlugin(faviconPlugin);
  eleventyConfig.addPlugin(safeLinks);
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(poison);
  eleventyConfig.addPlugin(tinyCSS);
  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addPlugin(pluginIcons, {
    sources: [
      { name: "simple-icons", path: "node_modules/simple-icons/icons" },
    ],
  });

  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    urlPath: "/og-images/",

    async shortcodeOutput(ogImage) {
      const url = await ogImage.outputUrl();
      return `<meta property="og:image" content="${baseUrl}${url}">`;
    },

    satoriOptions: {
      fonts: [
        {
          name: "Open Sans",
          data: fs.readFileSync("./src/assets/font/OpenSans-Regular.ttf"),
          weight: 700,
          style: "normal",
        },
      ],
    },
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "feed.xml",
    collection: {
      name: "posts",
      limit: 0,
    },
    metadata: {
      language: "en",
      title: "Magnus",
      subtitle: "Random shit I write",
      base: baseUrl,
      author: { name: "Maganoos" },
    },
  });

  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: baseUrl,
    },
  });

  eleventyConfig.addCollection("htmlPages", function (collectionApi) {
    return collectionApi.getAll().filter((item) => {
      return item.outputPath && item.outputPath.endsWith(".html");
    });
  });

  eleventyConfig.addFilter("displayDate", (dateObj) => {
    const d = new Date(dateObj);
    if (!dateObj || isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter(
    "toAbsoluteUrl",
    function (url = "", base = baseUrl) {
      try {
        return new URL(url, base).href;
      } catch (err) {
        console.error(err);
        return url;
      }
    },
  );

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
}
