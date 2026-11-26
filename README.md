# Landing Bose

Лендінг Bose на Vite, Pug і SCSS. **Варіант 3: BEM + `@layer`, без JavaScript і без фреймворків.** Усі стани (меню, hover, focus) реалізовані на CSS.

- Макет: `TODO: посилання на макет Figma`
- Демо: `TODO: посилання на GitHub Pages після публікації` (workflow уже готовий, див. `.github/workflows/deploy.yml`)

## Команди

| Команда                | Призначення                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `npm install`          | Встановлює залежності та налаштовує Git-хуки                       |
| `npm run dev`          | Запускає локальний сервер Vite                                     |
| `npm run build`        | Створює production-збірку в `dist/` і перевіряє шари CSS           |
| `npm run preview`      | Віддає зібраний `dist/` локально (потрібно для `pixel:check`)      |
| `npm run lint`         | Stylelint для SCSS + Prettier `--check`                            |
| `npm run format`       | Форматує файли через Prettier                                      |
| `npm run images`       | Генерує AVIF, WebP і JPEG-варіанти з `src/assets/images/original/` |
| `npm run optimize:svg` | Оптимізує SVG в іконках і логотипах, зберігаючи `viewBox`          |
| `npm run pixel:check`  | Порівнює сторінку з кадрами Figma (Playwright + sharp), пише звіт  |

## BEM-декомпозиція

Один блок — один partial у `src/styles/components/`, один Pug-міксин у `src/components/`.

| Блок               | Елементи / модифікатори                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| `site-header`      | `__inner`, `__logo`, `__image`, `__actions`                                                                 |
| `nav`              | `__content`, `__list`, `__item`, `__link`, `__phone`, `__call-to-order`; `--menu`                           |
| `menu-toggle`      | `__input`, `__burger`, `__hover`, `__line`, `__close`                                                       |
| `phone-link`       | `__number`; `--header`, `--menu`                                                                            |
| `hero`             | `__picture`, `__image`, `__content`, `__sound-wave`, `__title`, `__line`                                    |
| `product-card`     | `__image`, `__name`, `__type`, `__price`                                                                    |
| `category-card`    | `__image` (+ `--<category>-wide/narrow`), `__label`                                                         |
| `category-gallery` | `__heading`, `__grid`, `__action`                                                                           |
| `section-title`    | `--left`, `--center`                                                                                        |
| `button`           | `--solid`, `--outline`, `--reference-hover`, `--menu`, `--full`                                             |
| `field`            | `__label`, `__control`; `--input`, `--textarea`                                                             |
| `contact`          | `__heading`, `__form`, `__action`, `__details`, `__item`, `__label`, `__value`, `__value-link`, `__address` |
| `why-direct`       | `__heading`, `__benefits`, `__copy`                                                                         |
| `lower-banner`     | `__picture`, `__image`                                                                                      |
| `icon`             | `--phone`, `--burger`, `--close`, `--sound-wave`                                                            |

Layout-блоки: `l-grid` (`--debug`), `l-bleed`, `l-flow` (`__item--<section>`).

## Архітектура стилів

`src/styles/` розкладено за шарами каскаду:

```
abstracts/   _layers.scss, _tokens.scss, _mixins.scss   (без CSS-виводу)
reset/       обнулення
base/        токени у :root і базова типографіка body
layout/      l-grid, l-bleed, l-flow
components/  по одному BEM-блоку на partial
utilities/   шар для утиліт (наразі порожній)
main.scss    порядок підключення
```

- Шари оголошені першим рядком збірки: `@layer reset, base, layout, components, utilities;` (`abstracts/_layers.scss`). Правил поза шарами немає — це перевіряє `scripts/check-layered-css.mjs` після кожного `build`.
- Значення беруться лише з токенів `abstracts/_tokens.scss`; `base/_tokens.scss` емітує їх у CSS-змінні `--color-*`, `--space-*`, `--size-*` тощо.
- Брейкпоінти — лише через `mq()` (`abstracts/_mixins.scss`), mobile-first на контрольних ширинах 744 і 1260 px.
- Заборонено: `id`, тегові селектори в блоках, `!important`, вкладеність > 3. Це закріплено правилами Stylelint (`.stylelintrc.json`).
- Зовнішні відступи секцій централізовані в батьківському layout-шарі (`.l-flow__item--*`), а не в блоках.

Пізніший шар перемагає раніший для звичайних декларацій навіть за меншої специфічності:

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

`utilities` іде після `components`, тому `.u-text-primary` перемагає, попри нижчу специфічність. У продакшн-верстці шар `utilities` навмисно порожній, щоб не відходити від макета; приклад можна перевірити в DevTools, додавши обидва правила на сторінку.

## Сітка

- 2 колонки на 320 px: 130 px, жолоб 20 px, поля 20 px.
- 6 колонок на 744 px: 80 px, жолоб 24 px, поля 72 px.
- 12 колонок на 1260 px: 63 px, жолоб 24 px, поля 120 px.
- Максимальна ширина контенту — 1020 px; на ширинах > 1260 px сітка центрується, а hero і нижній банер лишаються на всю ширину viewport (`.l-bleed`).

Елементи розміщуються explicit `grid-column` у своїх блоках (наприклад, кнопки шапки — в останній колонці, контакти — 5–8 і 8–10). `.l-grid--debug` показує колонки поверх вмісту. Перехідні breakpoint-и у Figma не визначені, тому для сітки використані контрольні ширини макета.

## Зображення

Вихідні фотографії — у `src/assets/images/original/`. Скрипт `npm run images` створює варіанти в `src/assets/images/optimized/` (AVIF, WebP, JPEG; менші за цільову ширину зображення не збільшуються). Розмітка використовує `<picture>` з `srcset`/`sizes`, `width`/`height`, `loading="lazy"` нижче першого екрана та `fetchpriority="high"` для hero.

## Перевірки

- Виміри та порівняння з макетом: [`docs/figma/pixel-report.md`](docs/figma/pixel-report.md).
- Повний аудит чеклиста: [`docs/checklist-audit.md`](docs/checklist-audit.md).
- Lighthouse (локально): [`docs/lighthouse/`](docs/lighthouse/).

### PerfectPixel

`TODO: скриншот PerfectPixel — 320 px`

`TODO: скриншот PerfectPixel — 744 px`

`TODO: скриншот PerfectPixel — 1260 px`

### W3C Validator

`TODO: скриншот результату W3C validator для опублікованого URL`

### PageSpeed Insights

`TODO: скриншот PageSpeed Mobile`

`TODO: скриншот PageSpeed Desktop`
