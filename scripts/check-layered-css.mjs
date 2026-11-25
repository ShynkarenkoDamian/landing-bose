import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";

const ASSETS_DIR = path.join("dist", "assets");
const EXPECTED_LAYER_ORDER = "reset,base,layout,components,utilities";
const STYLE_AT_RULES = new Set(["counter-style", "font-face", "keyframes", "page", "property"]);

function isInsideLayer(node) {
    for (let parent = node.parent; parent; parent = parent.parent) {
        if (parent.type === "atrule" && parent.name === "layer" && parent.nodes) {
            return true;
        }
    }

    return false;
}

async function main() {
    const files = (await readdir(ASSETS_DIR)).filter((file) => file.endsWith(".css")).sort();

    if (!files.length) {
        throw new Error(`No CSS files found in ${ASSETS_DIR}/.`);
    }

    for (const file of files) {
        const filepath = path.join(ASSETS_DIR, file);
        const css = postcss.parse(await readFile(filepath, "utf8"), { from: filepath });
        const firstNode = css.nodes.find((node) => node.type !== "comment");
        const layerOrder = firstNode?.params.replaceAll(/\s+/g, "");

        if (
            firstNode?.type !== "atrule" ||
            firstNode.name !== "layer" ||
            firstNode.nodes ||
            layerOrder !== EXPECTED_LAYER_ORDER
        ) {
            throw new Error(`${file}: expected the layer order declaration to be the first CSS rule.`);
        }

        css.walkRules((rule) => {
            if (!isInsideLayer(rule)) {
                throw new Error(`${file}: unlayered selector found: ${rule.selector}`);
            }
        });

        css.walkAtRules((rule) => {
            if (STYLE_AT_RULES.has(rule.name) && !isInsideLayer(rule)) {
                throw new Error(`${file}: unlayered @${rule.name} rule found.`);
            }
        });
    }

    const html = await readFile(path.join("dist", "index.html"), "utf8");
    if (/<script\b/i.test(html)) {
        throw new Error("dist/index.html contains a script element.");
    }

    console.log(
        `Checked ${files.length} CSS file(s): layer order is first, all styles are layered, and index.html has no scripts.`,
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
