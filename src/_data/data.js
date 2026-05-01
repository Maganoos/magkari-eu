import childProcess from "node:child_process";

export default () => {
  const latestGitCommitHash = childProcess
    .execSync("git rev-parse --short HEAD")
    .toString()
    .trim();

  const longGitCommitHash = childProcess
    .execSync("git rev-parse HEAD")
    .toString()
    .trim();

  return {
    shortHash: latestGitCommitHash,
    longHash: longGitCommitHash,
  };
};
