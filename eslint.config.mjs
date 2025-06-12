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
      // Disable a specific rule
      "@typescript-eslint/no-unused-vars": "off",  // Example rule
      "react/prop-types": "off",  // Disable PropTypes rule in React
      "@next/next/no-img-element": "off", // Disable the rule for <img> tag in Next.js
      "react-hooks/exhaustive-deps": "off", // Disable exhaustive deps warning in useEffect
    },
  },
];

export default eslintConfig;
