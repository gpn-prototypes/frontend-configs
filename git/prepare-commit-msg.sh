#!/bin/bash

# Данному файлу выданы права на исполнение!
# chmod +x prepare-commit-msg.sh

# Оригинал: https://gist.github.com/johncmunson/ca02a8027a923a7f4b2f662c67d6528c

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

# Не запускаем код, если:
# - находимся в detached HEAD state (например, в процессе ребейза)
# - в git-команду передан какой-то флаг, например: -m or --amend (т.е. передан второй параметр в команду)

if [ "$BRANCH_NAME" != "HEAD" ] && [ x = x${2} ]; then

  # Запускаем commitizen
  exec < /dev/tty
  git cz --hook || true

  # Проверяем, что BRANCH_NAME не пустой, и что мы не находимся в detached HEAD state (например, в процессе ребейза).
  # Параметр SKIP_PREPARE_COMMIT_MSG может быть полезен, чтобы пропустить данный хук.
  if [ ! -z "$BRANCH_NAME" ] && [ "$BRANCH_NAME" != "HEAD" ] && [ "$SKIP_PREPARE_COMMIT_MSG" != 1 ]; then

    # Из названия ветки берем ключ задачи из Jira.
    # Добавляем его в конец тела коммита, чтобы связать коммит и задачу
    PREFIX_PATTERN='[A-Z]{2,5}-[0-9]{1,4}'

    [[ $BRANCH_NAME =~ $PREFIX_PATTERN ]]

    PREFIX=${BASH_REMATCH[0]}

    PREFIX_IN_COMMIT=$(grep -c "$PREFIX" $1)

    # Проверяем, что PREFIX есть в BRANCH_NAME, и что его точно нет в теле коммита, чтобы его задублировать
    if [[ -n "$PREFIX" ]] && ! [[ $PREFIX_IN_COMMIT -ge 1 ]]; then
      printf "$(cat $1)\n\nJira issue: $PREFIX\n" > $1
    fi

  fi

fi
