const fs = require('fs');
const { spawnSync } = require('child_process');

function parseJiraIdFromBranchName(branchName) {
  const matches = branchName.match(/[A-Z]+-\d+/);
  if (!matches) {
    return undefined;
  }

  return matches[0];
}

const updateGitCommitMessage = () => {
  const branchName = spawnSync('git', ['symbolic-ref', '--short', 'HEAD']).stdout.toString().trim();

  const commitMessageFilePath = process.env.HUSKY_GIT_PARAMS.split(' ')[0];

  if (!fs.existsSync(commitMessageFilePath)) {
    return;
  }

  const commitMessage = fs.readFileSync(commitMessageFilePath, 'utf8');

  if (commitMessage.includes('Jira issue: ')) {
    return;
  }

  const jiraId = parseJiraIdFromBranchName(branchName);
  const jiraMessage = jiraId ? `\n\nJira issue: ${jiraId}` : '';
  const updatedCommitMessage = `${commitMessage}${jiraMessage}`;

  fs.writeFileSync(commitMessageFilePath, updatedCommitMessage, 'utf-8');
};

updateGitCommitMessage();
