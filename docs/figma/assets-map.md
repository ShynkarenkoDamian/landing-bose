# Figma asset map

Production rasters live in `src/assets/images/original/`; optimized variants live in `src/assets/images/optimized/`. `npm run images` caps every output at its source width. Banner viewport crops and Figma logic sheets are references only; the page uses one banner source and CSS cropping. No source files are cropped or enlarged.

## New exports and source dimensions

| Previous name        | Current path                                                                  | What it shows / use                                          | Intrinsic dimensions |     Generated output widths |
| -------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------: | --------------------------: |
| `hero-mobile.jpg`    | `src/assets/images/original/hero-mobile.jpg`                                  | Hero art direction, mobile                                   |         320 × 568 px |                 160, 320 px |
| `hero-tablet.jpg`    | `src/assets/images/original/hero-tablet.jpg`                                  | Hero art direction, tablet                                   |         744 × 992 px |       160, 320, 640, 744 px |
| `hero-desktop.jpg`   | `src/assets/images/original/hero-desktop.jpg`                                 | Hero art direction, desktop                                  |        1260 × 720 px | 160, 320, 640, 744, 1260 px |
| `banner-desktop.jpg` | `src/assets/images/original/banner-bottom.jpg`                                | Shared lower-banner source for all three widths; CSS crop    |        1260 × 456 px | 160, 320, 640, 744, 1260 px |
| `banner-mobile.jpg`  | `docs/figma/reference/images/banner-crops/banner-bottom-mobile-reference.jpg` | Figma mobile crop reference; not used as a production source |         320 × 200 px |                           — |
| `banner-tablet.jpg`  | `docs/figma/reference/images/banner-crops/banner-bottom-tablet-reference.jpg` | Figma tablet crop reference; not used as a production source |         744 × 400 px |                           — |

The three hero files are the approved art-direction sources. Their 2× targets (640, 1488, and 2520 px) are capped to the available source widths; no larger hero files are present.

## Existing production rasters

| Current path                                                | What it shows / use                                                                     | Intrinsic dimensions |    Generated output widths |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------: | -------------------------: |
| `src/assets/images/original/product-1.png`                  | Bose portable smart speaker with handle; Recommended product 1 at 320, 744, and 1260 px |         392 × 392 px |           160, 320, 392 px |
| `src/assets/images/original/product-2.png`                  | SoundLink Flex-style horizontal speaker; Recommended product 2 at all three widths      |         392 × 392 px |           160, 320, 392 px |
| `src/assets/images/original/product-3.png`                  | SoundLink Color-style compact speaker; Recommended product 3 at all three widths        |         392 × 392 px |           160, 320, 392 px |
| `src/assets/images/original/category-headphones-wide.png`   | Headphones & earbuds, first photo; all three widths                                     |         672 × 324 px |           260, 520, 672 px |
| `src/assets/images/original/category-headphones-narrow.png` | Headphones & earbuds, second photo; all three widths                                    |         324 × 324 px |                260, 324 px |
| `src/assets/images/original/category-speakers-wide.png`     | Speakers, first photo; all three widths                                                 |         672 × 324 px |           260, 520, 672 px |
| `src/assets/images/original/category-speakers-narrow.png`   | Speakers, second photo; all three widths                                                |         324 × 324 px |                260, 324 px |
| `src/assets/images/original/category-sunglasses-narrow.png` | Audio sunglasses, first photo; all three widths                                         |         324 × 324 px |                260, 324 px |
| `src/assets/images/original/category-sunglasses-wide.png`   | Audio sunglasses, second photo; all three widths                                        |         672 × 324 px |           260, 520, 672 px |
| `src/assets/images/original/bose-logo.png`                  | Raster Bose wordmark for all three headers                                              |          571 × 72 px | 125, 188, 250, 376, 571 px |

Product sources are transparent PNGs. Category PNGs have alpha channels but fully opaque pixels. The logo is transparent. The optimizer therefore uses PNG fallback for products and logo, and JPEG fallback for categories, hero, and banner photos.

## Icons and Figma references

| Current path                                    | What it contains                                           | Intrinsic dimensions |
| ----------------------------------------------- | ---------------------------------------------------------- | -------------------: |
| `src/assets/icons/icon-phone.svg`               | Filled phone icon; `currentColor`                          |           18 × 18 px |
| `src/assets/icons/icon-burger.svg`              | Default three-bar menu icon; hover state is drawn with CSS |           18 × 12 px |
| `src/assets/icons/icon-close.svg`               | Filled close glyph                                         |           24 × 24 px |
| `src/assets/icons/icon-sound-wave.svg`          | Decorative 11-bar sound wave                               |           48 × 58 px |
| `docs/figma/reference/icons-and-logo-sheet.svg` | Figma icon and raster-wordmark sheet; reference only       |         280 × 256 px |

All page, menu, header-hover, and image-logic references are under `docs/figma/reference/images/logic/`, outside the image optimizer. The mobile/tablet banner crop references are under `docs/figma/reference/images/banner-crops/`.

### Figma-only raster reference dimensions

| Reference path                                                                | What it documents               | Intrinsic dimensions |
| ----------------------------------------------------------------------------- | ------------------------------- | -------------------: |
| `docs/figma/reference/images/logic/Bose (320).jpg`                            | Full mobile page frame          |        320 × 4613 px |
| `docs/figma/reference/images/logic/Bose (744).jpg`                            | Full tablet page frame          |        744 × 5617 px |
| `docs/figma/reference/images/logic/Bose (1260).jpg`                           | Full desktop page frame         |       1260 × 4629 px |
| `docs/figma/reference/images/logic/Menu (320).jpg`                            | Mobile menu state               |         320 × 568 px |
| `docs/figma/reference/images/logic/Menu (744).jpg`                            | Tablet menu state               |         744 × 992 px |
| `docs/figma/reference/images/logic/Menu (1260).jpg`                           | Desktop menu state              |        1260 × 700 px |
| `docs/figma/reference/images/logic/Header Hovers.jpg`                         | Header hover states             |         1260 × 96 px |
| `docs/figma/reference/images/logic/hero-crop-guide-mobile.png`                | Hero image-logic frame, mobile  |         742 × 568 px |
| `docs/figma/reference/images/logic/hero-crop-guide-tablet.png`                | Hero image-logic frame, tablet  |        1296 × 992 px |
| `docs/figma/reference/images/logic/hero-crop-guide-desktop.png`               | Hero image-logic frame, desktop |        1260 × 964 px |
| `docs/figma/reference/images/logic/banner-crop-guide-desktop.png`             | Banner image-logic frame        |        1440 × 610 px |
| `docs/figma/reference/images/banner-crops/banner-bottom-mobile-reference.jpg` | Banner mobile crop reference    |         320 × 200 px |
| `docs/figma/reference/images/banner-crops/banner-bottom-tablet-reference.jpg` | Banner tablet crop reference    |         744 × 400 px |

## Needs confirmation / absent

| Resource                                   | Status                                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Extra sunglasses raster, 259 × 194 px      | No separate source file was found. The spec says it sits entirely underneath the main sunglasses photo at 1260 px, so it is omitted rather than replaced with a similar image. |
| `src/assets/logo/Hero.jpg`, 2880 × 2204 px | Retained, not processed. It shows the over-ear-headphone model, but it is not one of the three new page hero sources; its exact helper-source role is unresolved.              |
| Vector Bose wordmark                       | None available. `logo.svg` embedded a PNG and has been removed; the raster `bose-logo.png` is the usable logo source.                                                          |

The old `src/assets/logo/banner.jpg` candidate has been removed in favor of `banner-bottom.jpg`. Figma's mobile and tablet banner crops remain in `docs/figma/reference/` and are not delivered as art-directed banner images.
