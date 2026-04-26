import fs from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ");

if (!title) {
  console.error("Usage: pnpm new-post <title>");
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const date = new Date().toISOString();

const filePath = path.join("src/posts", `${slug}.md`);

const content = `---
title: "${title}"
description: "Write your description here..."
date: ${date}
layout: post.njk
tags: posts
---

Write your post here...
`;

fs.writeFileSync(filePath, content);

console.log(`Created: ${filePath}`);
