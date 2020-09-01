const fs = require('fs');
const path = require('path');

/* Пример использования:

// .huskyrc.js
module.exports = {
  hooks: {
    ...require('@gpn-prototypes/frontend-configs/.huskyrc.js').hooks,
    'pre-push': 'yarn test',
  },
};

*/

function join(...args) {
  let fullPath = path.join(...args);

  if (process.platform === 'win32') {
    fullPath = fullPath.replace(/\\/g, '/');
  }

  return fullPath;
}

const defaultLintStagedConfigPath = join(__dirname, 'git', 'lint-staged.config.js');

let lintStagedConfigPath = defaultLintStagedConfigPath;

const userLintStagedConfigPath = join(process.cwd(), 'lint-staged.config.js');

if (fs.existsSync(userLintStagedConfigPath)) {
  lintStagedConfigPath = userLintStagedConfigPath;
}

module.exports = {
  hooks: {
    'pre-commit': `lint-staged -c ${lintStagedConfigPath}`,
    'prepare-commit-msg': `${join(__dirname, 'git', 'prepare-commit-msg.sh')} $HUSKY_GIT_PARAMS`,
  },
};
