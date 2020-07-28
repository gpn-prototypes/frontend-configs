const joinPath = require("path.join");

/* Пример использования:

// .huskyrc.js
module.exports = {
  hooks: {
    ...require('@gpn-prototypes/frontend-configs/.huskyrc.js').hooks,
    'pre-push': 'yarn test',
  },
};

*/

module.exports = {
  hooks: {
    "pre-commit": `lint-staged -c ${joinPath(
      __dirname,
      "git",
      "lint-staged.config.js"
    )}`,
    "prepare-commit-msg": `${joinPath(
      __dirname,
      "git",
      "prepare-commit-msg.sh"
    )} $HUSKY_GIT_PARAMS`,
  },
};
