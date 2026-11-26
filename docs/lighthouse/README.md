# Lighthouse — локальні заміри

Попередня оцінка на локальному `npm run preview` (production-збірка, `dist/`). Офіційний PageSpeed Insights на опублікованому URL перевіряє власник проєкту.

- Дата: 2026-11-26
- Lighthouse 13.6.0, Microsoft Edge (Chromium 158), headless
- Mobile: емуляція 412 × 823, DPR 1.75, CPU ×4, simulated 4G
- Desktop: 1350 × 940, DPR 1, без тротлінгу
- Звіти: [mobile](mobile.report.html) · [desktop](desktop.report.html); машиночитні [mobile](mobile.report.json) · [desktop](desktop.report.json)

## Оцінки

| Категорія      | Mobile | Desktop |
| -------------- | -----: | ------: |
| Performance    |    100 |     100 |
| Accessibility  |     96 |      96 |
| Best Practices |    100 |     100 |
| SEO            |    100 |     100 |

## Метрики

| Метрика                  | Mobile | Desktop |
| ------------------------ | -----: | ------: |
| First Contentful Paint   |  0.8 s |   0.2 s |
| Largest Contentful Paint |  1.5 s |   0.5 s |
| Total Blocking Time      |  90 ms |    0 ms |
| Cumulative Layout Shift  |      0 |       0 |
| Speed Index              |  0.8 s |   0.3 s |

## Що знижує Accessibility до 96

Єдина проблема — `color-contrast` для трьох підписів `Phone / Email / Address` у блоці контактів: колір `--color-contact-label` (`#9fadc2`) на білому дає 2.27:1 замість 4.5:1. Це колір із макета (C6 у `docs/figma/spec.md`), тому без рішення власника проєкту його не змінено.

## Інші зауваження

- `render-blocking-insight`: зовнішній stylesheet Google Fonts (Inter) блокує рендер; шрифт підключений через `<link rel="stylesheet">` за макетом. Локальний self-host дасть кращий показник, але це зміна підходу до ресурсів.
- `network-dependency-tree-insight` і `max-potential-fid` (mobile) — інформаційні інсайти, на бали не впливають.
