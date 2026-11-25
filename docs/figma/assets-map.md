# Figma asset map

The exported files are in `src/assets/`. Raster exports remain in `images/original/`; framing diagrams remain in `images/logic/`; icons and the logo sit in their own folders. The six category images match the spec by content, but their exported pixel sizes are smaller or differently cropped than the source sizes recorded in the spec.

## Renamed assets

| Previous path                                 | What the image shows                                                                | New path                                                    | Current dimensions |
| --------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------ |
| `src/assets/images/original/Image1.png`       | Woman wearing wireless earbuds; wide headphones category image                      | `src/assets/images/original/category-headphones-wide.png`   | 672 × 324 px       |
| `src/assets/images/original/Image (2).png`    | Woman wearing over-ear headphones; square headphones category image                 | `src/assets/images/original/category-headphones-narrow.png` | 324 × 324 px       |
| `src/assets/images/original/Image (3).png`    | Person holding a portable blue speaker; wide speakers category image                | `src/assets/images/original/category-speakers-wide.png`     | 672 × 324 px       |
| `src/assets/images/original/Image (4).png`    | Upright blue speaker outdoors; square speakers category image                       | `src/assets/images/original/category-speakers-narrow.png`   | 324 × 324 px       |
| `src/assets/images/original/Image (5).png`    | Man wearing audio sunglasses; square sunglasses category image                      | `src/assets/images/original/category-sunglasses-narrow.png` | 324 × 324 px       |
| `src/assets/images/original/Image (6).png`    | Woman wearing audio sunglasses; wide sunglasses category image                      | `src/assets/images/original/category-sunglasses-wide.png`   | 672 × 324 px       |
| `src/assets/images/logic/Image logic.png`     | Hero crop guide for the 320 px layout                                               | `src/assets/images/logic/hero-crop-guide-mobile.png`        | 742 × 568 px       |
| `src/assets/images/logic/Image logic (1).png` | Hero crop guide for the 744 px layout                                               | `src/assets/images/logic/hero-crop-guide-tablet.png`        | 1296 × 992 px      |
| `src/assets/images/logic/Image logic (2).png` | Hero crop guide for the 1260 px layout                                              | `src/assets/images/logic/hero-crop-guide-desktop.png`       | 1260 × 964 px      |
| `src/assets/images/logic/Image logic (3).png` | Lower banner crop guide                                                             | `src/assets/images/logic/banner-crop-guide-desktop.png`     | 1440 × 610 px      |
| `src/assets/icons/Vector.svg`                 | Filled phone handset icon                                                           | `src/assets/icons/icon-phone.svg`                           | 18 × 18 px         |
| `src/assets/icons/Vector (1).svg`             | Three-line default burger icon                                                      | `src/assets/icons/icon-burger.svg`                          | 18 × 12 px         |
| `src/assets/icons/Sound waves.svg`            | Eleven-bar sound wave                                                               | `src/assets/icons/icon-sound-wave.svg`                      | 48 × 58 px         |
| `src/assets/icons/Icons & Logo.svg`           | Reference sheet with phone, default and hover burger, close icon, and Bose wordmark | `src/assets/icons/icons-and-logo-sheet.svg`                 | 280 × 256 px       |
| `src/assets/icons/image 4.svg`                | Bose wordmark; the SVG contains an embedded raster image                            | `src/assets/logo/logo.svg`                                  | 127 × 16 px        |

## Needs confirmation

| Current path                               | What I see                                                                                           | Why it remains unchanged                                                                                                                                                       |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/assets/images/original/Image (1).png` | Woman wearing an earbud, used as the background in the lower-banner crop guide                       | It is 1440 × 610 px, while the spec identifies a shared 1920 × 1080 px JPEG source. I cannot confirm whether this is the production banner or only a cropped reference export. |
| `src/assets/images/original/image.png`     | Woman wearing over-ear headphones against a pale sky; the same photo appears in the hero crop guides | It is 1440 × 1102 px, while the spec identifies a separate 2304 × 1536 px source and three other hero exports. I cannot confirm which source role this file has.               |

## Referenced resources not found in the current export

The spec describes three page hero PNGs (640 × 1136, 1488 × 1984, and 2520 × 1440), three recommended-product photos (320 × 272/273), an extra sunglasses photo (259 × 194), a 1920 × 1080 lower-banner source, a 2000 × 251 logo PNG, and a 486 × 534 grid-settings screenshot. These exact-sized resources are not present in `src/assets/`. The six category photos are present by visual content, but at smaller/different dimensions than their source sizes in the spec.

The burger-hover artwork is visible in `icons-and-logo-sheet.svg`. A separate hover SVG was not made; the hover state can be drawn from CSS bars. The close icon is also present only in that reference sheet, not as a separate export.
