module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.css': ['stylelint --fix'],
  '*.{json,md}': ['prettier --write'],
};
