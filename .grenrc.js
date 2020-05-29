/**
 * Конфиг от пакета "github-release-notes", который используется в github actions
 * и нужен для генерации чейнджлога
 */
module.exports = {
  "dataSource": 'prs',
  "prefix": "",
  "includeMessages": 'commits',
  "changelogFilename": 'CHANGELOG.md',
  "onlyMilestones": false,
  "groupBy": false,
  template: {
    issue: ({ text, url, name }) => (
      `- ${name.replace(/((GINF|TSUB)-\d*)/, '[$1](https://jira.csssr.io/browse/$1)')} [${text}](${url})`
    ),
    changelogTitle: '### Изменения\n\n',
    release: '{{body}}'
  }
}
