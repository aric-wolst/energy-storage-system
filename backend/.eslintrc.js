module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "max-len": [
      "error",
      {
        "ignoreComments": true,
        "code": 120,
      }
    ],
    "dot-location": ["error", "property"],
    "yoda": "error",
    "@typescript-eslint/indent": ["error", 2, {
      "SwitchCase": 1
    }],
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "next|authorization|dataType" }],
    "@typescript-eslint/no-extra-parens": ["error"],
    "@typescript-eslint/ban-tslint-comment": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/member-delimiter-style": ["error", {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'comma',
        requireLast: false,
      },
    }],
    "@typescript-eslint/explicit-function-return-type": "error",
  },
  "ignorePatterns": [".eslintrc.js"]
}