import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "app",
    react: true,
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
  },
  {
    ignores: [
      "**/.gitignore",
      "**/package-lock.json",
      "**/package.json",
      "**/.github/**",
      "**/dist/**",
      "**/node_modules/**",
      "**/build/**",
      "**/.husky/**",
    ],
    rules: {
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
    },
  },
);
