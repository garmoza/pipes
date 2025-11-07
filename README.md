How init new project?

```
mkdir ts-game
cd ts-game
npm init -y

# Установка зависимостей
npm install -D typescript @types/node webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin
```

Start project

```
# Установка зависимостей (если еще не установлены)
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для production
npm run build
```

Code Style

```
# Установка ESLint и Prettier
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier prettier

# Дополнительные полезные плагины
npm install -D eslint-plugin-import eslint-plugin-unused-imports
```

Check Code Style
```
# Проверить code style
npm run lint

# Исправить автоматически исправляемые проблемы
npm run lint:fix

# Форматировать код
npm run format

# Проверить форматирование
npm run format:check

# Всё вместе
npm run style
```
