import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1. Ignore builds del front y dependencias
  {
    ignores: ["node_modules/**", "dist/**"]
  },
  // 2. Backend: server/**
  {
    files: ["server/**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node}
    }
  },
  // 3. Frontend: src
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser}
    }
  },
]);
 