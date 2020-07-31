module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '*.css': ['stylelint --fix'],
  '*.md': ['remark . --output --'],
  '*.json': ['prettier --write'],
};
