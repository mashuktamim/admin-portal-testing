// commitlint.config.js
export default {
  rules: {
    "type-enum": [2, "always", [
      "feat",
      "fix",
      "docs",
      "style",
      "refactor",
      "perf",
      "test",
      "build",
      "ci",
      "chore",
      "revert",
    ]],
    "subject-case": [0],
    "subject-full-stop": [0],
    "header-max-length": [2, "always", 200],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(GB-\d+)\]\s(\w+):\s(.+)$/,
      headerCorrespondence: ["ticket", "type", "subject"],
    },
  },
};
