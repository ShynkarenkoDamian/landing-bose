# Landing Bose

Стартова збірка для лендінгу на Vite, Pug і SCSS. У проєкті налаштовані PostCSS, Prettier, Stylelint, Husky, lint-staged та скрипт оптимізації зображень.

## Команди

| Команда                | Призначення                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `npm install`          | Встановлює залежності та налаштовує Git-хуки                       |
| `npm run dev`          | Запускає локальний сервер Vite                                     |
| `npm run build`        | Створює production-збірку в `dist/`                                |
| `npm run images`       | Генерує AVIF, WebP і JPEG-варіанти з `src/assets/images/original/` |
| `npm run optimize:svg` | Оптимізує SVG в іконках і логотипах, зберігаючи `viewBox`          |
| `npm run format`       | Форматує файли через Prettier                                      |
| `npm run lint`         | Перевіряє SCSS через Stylelint і форматування через Prettier       |

## Структура SCSS

Стилі розкладені за шарами `reset`, `base`, `layout`, `components` та `utilities`. Усі правила оголошуються всередині відповідного `@layer`. Брейкпоінти описані в токенах і використовуються через mobile-first міксин `mq()`.

Шари оголошені в `abstracts/_layers.scss` до підключення решти SCSS. Пізніший шар перемагає раніший для звичайних декларацій навіть за меншої специфічності:

```scss
@layer components {
  .button.button {
    color: var(--color-text);
  }
}

@layer utilities {
  .u-text-primary {
    color: var(--color-contact-value);
  }
}
```

`utilities` іде після `components`, тому його правило перемагає.

`l-grid` задає сітку 2 / 6 / 12 колонок за контрольними ширинами 320 / 744 / 1260 px. Перехідні breakpoint-и у Figma не визначені; для сітки використані tablet і desktop контрольні ширини з макета. Дочірній `.l-grid__bleed` розтягує hero чи банер на всю ширину viewport, а `.l-grid--debug` показує колонки поверх вмісту.

Вихідні фотографії зберігаються в `src/assets/images/original/`. Скрипт `npm run images` створює варіанти в `src/assets/images/optimized/`; зображення, менші за ширину варіанта, не збільшуються.
