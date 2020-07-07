# @gpn-prototypes/frontend-configs

Конфиги для фронтенд-проектов ГПН

[Инструкция по публикации](docs/publish.md)

### Включают в себя:

- Webpack
- Jest
- Eslint
- Prettier
- Commitizen
  - коммиты именуются согласно спеке [Conventional Commits](https://www.conventionalcommits.org/)
- Lint-staged
- Postcss
- EditorConfig
- Babel
- Stylelint
- TypeScript

### Использование

Чтобы установить пакеты, сначала необходимо авторизоваться в github npm registry. Для этого нужно сделать следующее:

1. Сгенерировать токен: <a href="https://github.com/settings/tokens">https://github.com/settings/tokens</a> → Generate new token. Дополнительно нужно отметить `read:packages` и `write:packages`.

2. Авторизоваться из текущей директории в Github-реджистри через npm:

```bash
$ npm login --registry=https://npm.pkg.github.com`
> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

3. Добавьте в свой проект файл `.npmrc` со следующий содержанием:

```
@gpn-prototypes:registry=https://npm.pkg.github.com
```

4. Установите проект

```
yarn add @gpn-prototypes/frontend-configs
```

5. Создайте конфиг нужного пакета и экспортните там конфиг из `frontend-configs`

```js
module.exports = {
  ...require("@gpn-prototypes/frontend-configs/jest/jest.config.js"),
  // Сюда можете дописать кастомный конфиг
};
```

### Работа с Webpack

Конфиг Webpack подключается следующим образом

```js
// webpack.config.js

const webpackMerge = require('webpack-merge');
const gpnWebpackConfig = require('@gpn-prototypes/frontend-configs/webpack.config.js');

const myProjectConfig = {
  ...
};

module.exports = webpackMerge(
  gpnWebpackConfig({ appConfig, postCssConfig }),
  myProjectConfig,
);

```

Принимает на вход

```ts
webpackConfig = {
  root: string, // корневая директория проекта
  port: number, // порт для старта дев сервера
  analyze: 0 | 1, // нужен ли WebpackBundleAnalyzer
  mode: 'production' | 'development', // режим сборки
  entry: string // точка входа проекта
} - конфигурация для настройки webpack'а
postCssConfig - конфиг postCss
```
