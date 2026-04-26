import { execSync } from "node:child_process";

function getGitDate(filePath) {
  try {
    return new Date(
      execSync(`git log -1 --format=%cI -- "${filePath}"`).toString().trim(),
    );
  } catch {
    return null;
  }
}

export default {
  get(filePath) {
    return getGitDate(filePath);
  },
};
