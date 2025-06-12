import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "react/prop-types": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/exhaustive-deps": "off",
    },
    overrides: [
      {
        files: ["*.ts", "*.tsx"],
        rules: {
          "@typescript-eslint/explicit-module-boundary-types": "off", // Disable for TS files
        },
      },
    ],
  },
];

export default eslintConfig;
