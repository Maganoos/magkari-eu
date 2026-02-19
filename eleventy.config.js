import tinyCSS from "@sardine/eleventy-plugin-tinycss";
import pluginIcons from "eleventy-plugin-icons";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets/");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPlugin(tinyCSS);
  eleventyConfig.addPlugin(pluginIcons, {
    sources: [
      { name: "simple-icons", path: "node_modules/simple-icons/icons" },
    ],
  });
}
