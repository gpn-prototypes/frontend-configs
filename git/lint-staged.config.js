module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'git add'],
  '*.css': ['stylelint --fix', 'git add'],
  '*.{json,md}': ['prettier --write', 'git add'],
};
