import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-require-imports": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: 'CallExpression[callee.name="require"]',
          message: "Use ES6 import instead of require",
        },
      ],
    },
  }
);
