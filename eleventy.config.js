import tinyCSS from "@sardine/eleventy-plugin-tinycss";
import pluginIcons from "eleventy-plugin-icons";
import faviconPlugin from "eleventy-favicon";
import safeLinks from "@sardine/eleventy-plugin-external-links";
import poison from "eleventy-plugin-poison";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets/");
  eleventyConfig.addPlugin(tinyCSS);
  eleventyConfig.addPlugin(faviconPlugin);
  eleventyConfig.addPlugin(safeLinks);
  eleventyConfig.addPlugin(poison, {
    includeCSS: true,
  });
  eleventyConfig.addPlugin(pluginIcons, {
    sources: [
      { name: "simple-icons", path: "node_modules/simple-icons/icons" },
    ],
  });
}
