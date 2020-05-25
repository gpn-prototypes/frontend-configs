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

module.exports = webpackMerge(getCommonConfig({ appConfig, postCssConfig }), myProjectConfig);

```

Принимает на вход

```ts
appConfig: { root: string, port: number, analyze: 0 | 1, mode: 'production' | 'development', entry: string } - конфигурация для настройки вэбпака
postCssConfig - конфиг postCss
```
