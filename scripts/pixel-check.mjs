import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "docs/figma/overlays");
const baseUrl = process.env.PIXEL_BASE_URL ?? "http://127.0.0.1:4173/landing-bose/";
const referenceWidths = [320, 744, 1260];
const responsiveWidths = [360, 414, 600, 900, 1024, 1440, 1920, 2560];
const measuredSelectors = {
    "site-header": ".site-header",
    "header-logo": ".site-header__logo",
    "header-phone": ".phone-link--header",
    "menu-toggle": ".menu-toggle",
    hero: ".hero",
    "hero-wave": ".hero__sound-wave",
    "hero-title": ".hero__title",
    "flow-hero": ".l-flow__item--hero",
    "flow-recommended": ".l-flow__item--recommended",
    recommended: ".recommended",
    "recommended-heading": ".recommended__heading .section-title",
    "recommended-card": ".product-card",
    "product-image": ".product-card__image",
    "flow-categories": ".l-flow__item--category-gallery",
    categories: ".category-gallery",
    "categories-heading": ".category-gallery__heading .section-title",
    "category-card": ".category-card",
    "category-image": ".category-card__image",
    "category-label": ".category-card__label",
    "category-action": ".category-gallery__action",
    "flow-why-direct": ".l-flow__item--why-direct",
    "why-direct": ".why-direct",
    "why-heading": ".why-direct__heading .section-title",
    benefits: ".why-direct__benefits",
    "why-copy": ".why-direct__copy",
    "flow-contact": ".l-flow__item--contact",
    contact: ".contact",
    "contact-heading": ".contact__heading .section-title",
    "contact-field": ".field__control",
    "contact-send": ".contact__action .button",
    "contact-details": ".contact__details",
    "flow-banner": ".l-flow__item--lower-banner",
    "lower-banner": ".lower-banner",
    "hero-image": ".hero__image",
    "banner-image": ".lower-banner__image",
};

function rounded(value) {
    return Math.round(value * 1000) / 1000;
}

async function waitForPage(page, url) {
    if (page.url() !== "about:blank") return;
    console.log(`Navigating to ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    console.log("DOM loaded");
    await page.evaluate(async () => {
        const fontReady = Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 8000))]);
        for (const image of document.querySelectorAll('img[loading="lazy"]')) {
            image.loading = "eager";
        }
        const imageReady = Promise.all(
            Array.from(document.images, (image) =>
                image.complete
                    ? Promise.resolve()
                    : new Promise((resolve) => {
                          image.addEventListener("load", resolve, { once: true });
                          image.addEventListener("error", resolve, { once: true });
                      }),
            ),
        );
        await Promise.all([
            fontReady,
            Promise.race([imageReady, new Promise((resolve) => setTimeout(resolve, 10000))]),
        ]);
    });
    console.log("Font/image wait finished");
}
async function waitForResponsiveImages(page) {
    await page.evaluate(async () => {
        for (const image of document.querySelectorAll('img[loading="lazy"]')) {
            image.loading = "eager";
        }
        await Promise.race([
            Promise.all(Array.from(document.images, (image) => image.decode().catch(() => {}))),
            new Promise((resolve) => setTimeout(resolve, 5000)),
        ]);
    });
}
async function readMeasurements(page, viewportWidth) {
    return page.evaluate((selectors) => {
        const box = (element) => {
            const rect = element.getBoundingClientRect();
            const styles = getComputedStyle(element);
            return {
                x: Math.round(rect.x * 1000) / 1000,
                y: Math.round((rect.y + window.scrollY) * 1000) / 1000,
                width: Math.round(rect.width * 1000) / 1000,
                height: Math.round(rect.height * 1000) / 1000,
                right: Math.round(rect.right * 1000) / 1000,
                bottom: Math.round((rect.bottom + window.scrollY) * 1000) / 1000,
                fontSize: styles.fontSize,
                lineHeight: styles.lineHeight,
                objectFit: styles.objectFit || null,
                objectPosition: styles.objectPosition || null,
            };
        };
        const elements = Object.fromEntries(
            Object.entries(selectors).map(([name, selector]) => [
                name,
                Array.from(document.querySelectorAll(selector), (element) => ({
                    className: typeof element.className === "string" ? element.className : "",
                    ...box(element),
                })),
            ]),
        );
        const topLevelItems = Array.from(document.querySelector("main")?.children ?? []).map((element) => ({
            className: typeof element.className === "string" ? element.className : "",
            ...box(element),
        }));
        const overlaps = topLevelItems.slice(1).flatMap((item, index) => {
            const previous = topLevelItems[index];
            return previous.bottom > item.y + 1
                ? [{ previousBottom: previous.bottom, nextTop: item.y, overlap: previous.bottom - item.y }]
                : [];
        });
        const criticalBoxes = Array.from(
            document.querySelectorAll(".l-grid, .hero, .site-header, .lower-banner"),
            (element) => ({ className: element.className, ...box(element) }),
        );
        const horizontalOverflows = criticalBoxes.filter(
            (element) => element.x < -1 || element.right > window.innerWidth + 1,
        );
        const brokenImages = Array.from(document.images)
            .filter((image) => image.complete && image.naturalWidth === 0)
            .map((image) => ({ src: image.currentSrc || image.src, alt: image.alt }));
        return {
            viewportWidth: window.innerWidth,
            innerWidth: window.innerWidth,
            devicePixelRatio: window.devicePixelRatio,
            documentWidth: document.documentElement.scrollWidth,
            bodyWidth: document.body.scrollWidth,
            documentHeight: document.documentElement.scrollHeight,
            hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth,
            topLevelOverlap: overlaps,
            horizontalOverflows,
            brokenImages,
            fonts: {
                interRegular: document.fonts.check("400 16px Inter"),
                interBoldItalic: document.fonts.check("italic 800 32px Inter"),
            },
            elements,
        };
    }, measuredSelectors);
}

async function createDiff(referencePath, actualPath, diffPath) {
    const reference = await sharp(referencePath)
        .flatten({ background: "#ffffff" })
        .removeAlpha()
        .toColourspace("srgb")
        .raw()
        .toBuffer({
            resolveWithObject: true,
        });
    const actual = await sharp(actualPath)
        .flatten({ background: "#ffffff" })
        .removeAlpha()
        .toColourspace("srgb")
        .raw()
        .toBuffer({
            resolveWithObject: true,
        });
    const width = reference.info.width;
    const height = reference.info.height;
    const paddedActual = Buffer.alloc(width * height * 3, 255);
    const overlapWidth = Math.min(width, actual.info.width);
    const overlapHeight = Math.min(height, actual.info.height);
    for (let y = 0; y < overlapHeight; y += 1) {
        actual.data.copy(
            paddedActual,
            y * width * 3,
            y * actual.info.width * 3,
            y * actual.info.width * 3 + overlapWidth * 3,
        );
    }
    const heatmap = Buffer.alloc(width * height * 3);
    let changedPixels = 0;
    let absoluteError = 0;
    let maxError = 0;
    for (let pixel = 0; pixel < width * height; pixel += 1) {
        const offset = pixel * 3;
        const error = Math.max(
            Math.abs(reference.data[offset] - paddedActual[offset]),
            Math.abs(reference.data[offset + 1] - paddedActual[offset + 1]),
            Math.abs(reference.data[offset + 2] - paddedActual[offset + 2]),
        );
        if (error > 16) changedPixels += 1;
        absoluteError += error;
        maxError = Math.max(maxError, error);
        heatmap[offset] = Math.min(255, error * 5);
        heatmap[offset + 1] = Math.min(255, Math.max(0, error * 2 - 60));
        heatmap[offset + 2] = Math.min(255, Math.max(0, error * 2 - 60));
    }
    await sharp(heatmap, { raw: { width, height, channels: 3 } })
        .png()
        .toFile(diffPath);
    return {
        referenceWidth: width,
        referenceHeight: height,
        actualWidth: actual.info.width,
        actualHeight: actual.info.height,
        changedPixelsAbove16: changedPixels,
        changedPercent: rounded((changedPixels / (width * height)) * 100),
        meanMaxChannelError: rounded(absoluteError / (width * height)),
        maxChannelError: maxError,
    };
}

await fs.mkdir(outputDirectory, { recursive: true });
console.log("Launching Edge");
const browser = await chromium.launch({ channel: "msedge", headless: true });
console.log("Edge launched");
const context = await browser.newContext({ deviceScaleFactor: 1, reducedMotion: "reduce" });
const page = await context.newPage();
const consoleErrors = [];
page.on("pageerror", (error) => consoleErrors.push(error.message));
page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
});

const report = { baseUrl, screenshots: {}, responsive: {}, consoleErrors };
try {
    for (const width of referenceWidths) {
        await page.setViewportSize({ width, height: 900 });
        await waitForPage(page, baseUrl);
        await waitForResponsiveImages(page);
        console.log(`Measuring ${width}`);
        const measurements = await readMeasurements(page, width);
        const screenshotPath = path.join(outputDirectory, `after-${width}.png`);
        console.log(`Capturing ${screenshotPath}`);
        await page.screenshot({ path: screenshotPath, fullPage: true, animations: "disabled" });
        console.log(`Captured ${width}`);
        const referencePath = path.join(outputDirectory, `figma-${width}.png`);
        const diffPath = path.join(outputDirectory, `diff-${width}.png`);
        report.screenshots[width] = {
            screenshot: path.basename(screenshotPath),
            measurements,
            diff: (
                await fs.access(referencePath).then(() => createDiff(referencePath, screenshotPath, diffPath))
            ).valueOf(),
        };
    }
    for (const width of responsiveWidths) {
        await page.setViewportSize({ width, height: 900 });
        await waitForPage(page, baseUrl);
        await waitForResponsiveImages(page);
        report.responsive[width] = await readMeasurements(page, width);
    }
    report.consoleErrors = consoleErrors;
    const measurementsPath = path.join(outputDirectory, "pixel-measurements.json");
    await fs.writeFile(measurementsPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    console.log(
        JSON.stringify(
            {
                screenshots: Object.fromEntries(
                    Object.entries(report.screenshots).map(([width, result]) => [
                        width,
                        {
                            screenshot: result.screenshot,
                            documentHeight: result.measurements.documentHeight,
                            dpr: result.measurements.devicePixelRatio,
                            overflow: result.measurements.hasHorizontalScroll,
                            brokenImages: result.measurements.brokenImages.length,
                            diff: result.diff,
                        },
                    ]),
                ),
                responsive: Object.fromEntries(
                    Object.entries(report.responsive).map(([width, result]) => [
                        width,
                        {
                            innerWidth: result.innerWidth,
                            documentWidth: result.documentWidth,
                            documentHeight: result.documentHeight,
                            overflow: result.hasHorizontalScroll,
                            overlaps: result.topLevelOverlap.length,
                            brokenImages: result.brokenImages.length,
                        },
                    ]),
                ),
                consoleErrors,
                measurementsPath,
            },
            null,
            2,
        ),
    );
} finally {
    await browser.close();
}
