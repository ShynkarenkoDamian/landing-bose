# Landing Bose

Стартова збірка для лендінгу на Vite, Pug і SCSS. У проєкті налаштовані PostCSS, Prettier, Stylelint, Husky, lint-staged та скрипт оптимізації зображень.

## Команди

| Команда          | Призначення                                                  |
| ---------------- | ------------------------------------------------------------ |
| `npm install`    | Встановлює залежності та налаштовує Git-хуки                 |
| `npm run dev`    | Запускає локальний сервер Vite                               |
| `npm run build`  | Створює production-збірку в `dist/`                          |
| `npm run images` | Генерує AVIF, WebP і JPEG-варіанти з `images-src/`           |
| `npm run format` | Форматує файли через Prettier                                |
| `npm run lint`   | Перевіряє SCSS через Stylelint і форматування через Prettier |

## Структура SCSS

Стилі розкладені за шарами `reset`, `base`, `layout`, `components` та `utilities`. Усі правила оголошуються всередині відповідного `@layer`. Брейкпоінти описані в токенах і використовуються через mobile-first міксин `mq()`.

У `images-src/` можна додавати вихідні зображення. Скрипт `npm run images` створить варіанти шириною 400 і 800 пікселів у `src/assets/images/`.
