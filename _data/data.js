const childProcess = require("child_process");

module.exports = () => {
  const latestGitCommitHash = childProcess
    .execSync("git rev-parse --short HEAD")
    .toString()
    .trim();
  const longGitCommitHash = childProcess
    .execSync("git rev-parse HEAD")
    .toString()
    .trim();

  return {
    year: new Date().getFullYear(),
    shortHash: latestGitCommitHash,
    longHash: longGitCommitHash,
  };
};
