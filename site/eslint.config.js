import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

/* ── What this checks ──
   One rule earns its keep here above all the others: react-hooks'
   exhaustive-deps. Every bug this repository has had in its effects was
   the same bug — a dependency array that named some of what the effect
   read and not the rest, so the effect ran once against the wrong thing
   and never again. There were thirteen `eslint-disable` comments for it
   before there was an ESLint to disable, which read as "checked and
   waived" when nothing had checked them.

   The suppressions that remain are deliberate and each says why. The
   rule is a warning rather than an error so a build is never blocked by
   one; `npm run lint` is where they are read.

   The browser globals are the site's; the build files and scripts run in
   Node. */
export default [
  { ignores: ["dist/**", "public/**", "originals/**", "node_modules/**"] },
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      /* the JSX in a file is what uses the names this would call unused */
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]", argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["vite.config.js", "seo-routes.js", "tests/**/*.mjs", "scripts/**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: { ...globals.node, ...globals.browser },
    },
  },
];
