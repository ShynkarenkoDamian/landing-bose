# Figma asset map

Production image sources are in `src/assets/`. Figma-only references are in `docs/figma/reference/`, outside the Vite source tree and image optimizer inputs. The six category images match the spec by content, but their exported pixel sizes are smaller or differently cropped than the source sizes recorded in the spec.

## Renamed assets

| Previous path                                           | What the image shows                                                                | New path                                                          | Current dimensions |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------ |
| `src/assets/images/original/Image1.png`                 | Woman wearing wireless earbuds; wide headphones category image                      | `src/assets/images/original/category-headphones-wide.png`         | 672 × 324 px       |
| `src/assets/images/original/Image (2).png`              | Woman wearing over-ear headphones; square headphones category image                 | `src/assets/images/original/category-headphones-narrow.png`       | 324 × 324 px       |
| `src/assets/images/original/Image (3).png`              | Person holding a portable blue speaker; wide speakers category image                | `src/assets/images/original/category-speakers-wide.png`           | 672 × 324 px       |
| `src/assets/images/original/Image (4).png`              | Upright blue speaker outdoors; square speakers category image                       | `src/assets/images/original/category-speakers-narrow.png`         | 324 × 324 px       |
| `src/assets/images/original/Image (5).png`              | Man wearing audio sunglasses; square sunglasses category image                      | `src/assets/images/original/category-sunglasses-narrow.png`       | 324 × 324 px       |
| `src/assets/images/original/Image (6).png`              | Woman wearing audio sunglasses; wide sunglasses category image                      | `src/assets/images/original/category-sunglasses-wide.png`         | 672 × 324 px       |
| `src/assets/images/logic/Image logic.png`               | Hero crop guide for the 320 px layout                                               | `docs/figma/reference/images/logic/hero-crop-guide-mobile.png`    | 742 × 568 px       |
| `src/assets/images/logic/Image logic (1).png`           | Hero crop guide for the 744 px layout                                               | `docs/figma/reference/images/logic/hero-crop-guide-tablet.png`    | 1296 × 992 px      |
| `src/assets/images/logic/Image logic (2).png`           | Hero crop guide for the 1260 px layout                                              | `docs/figma/reference/images/logic/hero-crop-guide-desktop.png`   | 1260 × 964 px      |
| `src/assets/images/logic/Image logic (3).png`           | Lower banner crop guide                                                             | `docs/figma/reference/images/logic/banner-crop-guide-desktop.png` | 1440 × 610 px      |
| `src/assets/images/logic/Bose (320).jpg`                | Full-page mobile landing reference                                                  | `docs/figma/reference/images/logic/Bose (320).jpg`                | 320 × 4613 px      |
| `src/assets/images/logic/Bose (744).jpg`                | Full-page tablet landing reference                                                  | `docs/figma/reference/images/logic/Bose (744).jpg`                | 744 × 5617 px      |
| `src/assets/images/logic/Bose (1260).jpg`               | Full-page desktop landing reference                                                 | `docs/figma/reference/images/logic/Bose (1260).jpg`               | 1260 × 4629 px     |
| `src/assets/images/logic/Menu (320).jpg`                | Mobile open-menu reference                                                          | `docs/figma/reference/images/logic/Menu (320).jpg`                | 320 × 568 px       |
| `src/assets/images/logic/Menu (744).jpg`                | Tablet open-menu reference                                                          | `docs/figma/reference/images/logic/Menu (744).jpg`                | 744 × 992 px       |
| `src/assets/images/logic/Menu (1260).jpg`               | Desktop open-menu reference                                                         | `docs/figma/reference/images/logic/Menu (1260).jpg`               | 1260 × 700 px      |
| `src/assets/images/logic/Header Hovers.jpg`             | Header hover-state reference                                                        | `docs/figma/reference/images/logic/Header Hovers.jpg`             | 1260 × 96 px       |
| `src/assets/icons/Vector.svg`                           | Filled phone handset icon                                                           | `src/assets/icons/icon-phone.svg`                                 | 18 × 18 px         |
| `src/assets/icons/Vector (1).svg`                       | Three-line default burger icon                                                      | `src/assets/icons/icon-burger.svg`                                | 18 × 12 px         |
| `src/assets/icons/icons-and-logo-sheet.svg` close glyph | Rounded close icon extracted from the reference sheet                               | `src/assets/icons/icon-close.svg`                                 | 24 × 24 px viewBox |
| `src/assets/icons/Sound waves.svg`                      | Eleven-bar sound wave                                                               | `src/assets/icons/icon-sound-wave.svg`                            | 48 × 58 px         |
| `src/assets/icons/Icons & Logo.svg`                     | Reference sheet with phone, default and hover burger, close icon, and Bose wordmark | `docs/figma/reference/icons-and-logo-sheet.svg`                   | 280 × 256 px       |
| `src/assets/icons/image 4.svg`                          | Bose wordmark; the SVG contains an embedded raster image                            | `src/assets/logo/logo.svg`                                        | 127 × 16 px        |

## Newly inspected image exports

| Previous path                          | New path                                   | What the image shows                             |   Dimensions | Spec usage                                                                      |
| -------------------------------------- | ------------------------------------------ | ------------------------------------------------ | -----------: | ------------------------------------------------------------------------------- |
| `src/assets/images/original/item1.png` | `src/assets/images/original/product-1.png` | Bose portable smart speaker with handle          | 392 × 392 px | Recommended, product 1; all three page widths: 320, 744, and 1260 px            |
| `src/assets/images/original/item2.png` | `src/assets/images/original/product-2.png` | SoundLink Flex-style horizontal portable speaker | 392 × 392 px | Recommended, product 2; all three page widths: 320, 744, and 1260 px            |
| `src/assets/images/original/item3.png` | `src/assets/images/original/product-3.png` | SoundLink Color-style compact speaker            | 392 × 392 px | Recommended, product 3; all three page widths: 320, 744, and 1260 px            |
| `src/assets/logo/image 4.png`          | `src/assets/images/original/bose-logo.png` | Bose wordmark with transparent background        |  571 × 72 px | Header logo at 320, 744, and 1260 px; the spec's source export is 2000 × 251 px |

The product roles match the order and imagery of the three Recommended products in the spec. Their pixels are square and larger than the spec's 320 × 272/273 px source exports.

## Additional raster exports

| Previous path                 | What the image shows                                  | Current path                               |     Dimensions | Spec usage                                                                            |
| ----------------------------- | ----------------------------------------------------- | ------------------------------------------ | -------------: | ------------------------------------------------------------------------------------- |
| `src/assets/logo/Hero.jpg`    | Woman wearing over-ear headphones against a pale sky  | `src/assets/logo/Hero.jpg`                 | 2880 × 2204 px | Helper hero crop reference; no page hero export assigned                              |
| `src/assets/logo/banner.jpg`  | Woman wearing an earbud; lower-banner image candidate | `src/assets/logo/banner.jpg`               | 2880 × 1220 px | Lower-banner candidate for 320, 744, and 1260 px; exact production source unconfirmed |
| `src/assets/logo/image 4.png` | Bose wordmark with transparent background             | `src/assets/images/original/bose-logo.png` |    571 × 72 px | Logo is shown in all three headers; spec source is 2000 × 251 px                      |

## Needs confirmation

| Current path                 | What needs confirmation                                                 | Why it remains unchanged                                                                                                                  |
| ---------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `src/assets/logo/Hero.jpg`   | Whether this is only the helper crop source or a production hero source | It is 2880 × 2204 px; the spec records a 2304 × 1536 px helper image and three separate page hero exports.                                |
| `src/assets/logo/banner.jpg` | Whether this is the full production banner source                       | It is 2880 × 1220 px, while the spec records a 1920 × 1080 px source. Its aspect ratio matches the 1440 × 610 px crop-guide canvas at 2×. |

## Referenced resources not found in the current export

The three Recommended product photos are now present as `product-1.png` through `product-3.png` and are used in that section at 320, 744, and 1260 px. Their current dimensions are 392 × 392 px each; the spec records 320 × 272/273 px exports. The source-sized assets described by the spec that are still absent are the three page hero PNGs (640 × 1136, 1488 × 1984, and 2520 × 1440), the extra sunglasses photo (259 × 194), the 1920 × 1080 lower-banner JPEG, the 2000 × 251 logo PNG, and the 486 × 534 grid-settings screenshot. `Hero.jpg` and `banner.jpg` are available candidates but remain unconfirmed because their dimensions differ from the corresponding spec resources. A smaller 571 × 72 px raster Bose wordmark is present at `src/assets/images/original/bose-logo.png`. The six category photos match by visual content but have smaller or differently cropped dimensions than the spec sources.

The burger-hover artwork is visible in `docs/figma/reference/icons-and-logo-sheet.svg`. A separate hover SVG was not made; the hover state can be drawn from CSS bars. `icon-close.svg` is extracted from the close glyph in the reference sheet. Standalone icon fills use `currentColor`; the logo and reference sheet retain their source colors. The logo SVG wrapper embeds raster data and is not a vector wordmark. No vector Bose wordmark is present in the available production assets.
