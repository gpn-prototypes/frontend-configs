module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix"],
  "*.css": ["stylelint --fix"],
  "*.{js,jsx,ts,tsx, json,md}": ["prettier --write"],
};
