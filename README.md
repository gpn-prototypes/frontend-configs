# @gpn-prototypes/frontend-configs

Конфиги для фронтенд-проектов ГПН

### Включают в себя: 

- Webpack
- Jest
- Eslint
- Prettier
- Commitizen
- Lint-staged
- Postcss

### Использование

В своем проекте установите зависимость

```
yarn add @gpn-prototypes/frontend-configs
```

Создайте конфиг нужного пакета и экспортните там конфиг из ```frontend-configs```

```js
module.exports = {
  ...require('@gpn-prototypes/frontend-configs/jest/jest.config.js'),
  // Сюда можете дописать кастомный конфиг
};
```

### Работа с Webpack

Конфиг Webpack подключается следующим образом

```js
// webpack.config.js

/// some code
const webpackMerge = require('webpack-merge');
const getCommonConfig = require('@gpn-prototypes/frontend-configs/webpack.config.js');

const myProjectConfig = {
  /// some code
};

module.exports = webpackMerge(getCommonConfig({ root: path.resolve(__dirname), entry: './src/index.ts', port: 3000 }), myProjectConfig);

```

Принимает на вход

```js
root - корневая директория проекта
entry - входной файл
port - Порт, на котором стартовать dev server. По умолчанию 3000
```


### Обновление

Для обновления пакетов нужно в ветке мастер сначала обновить версию 

```
npm version patch|minor|major
```

Затем нужно запушить новые теги

```
git push origin master --follow-tags
```
