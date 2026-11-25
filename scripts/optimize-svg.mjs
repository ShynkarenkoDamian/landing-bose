import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { optimize } from "svgo";
import config from "../svgo.config.mjs";

const SVG_DIRS = [path.join("src", "assets", "icons"), path.join("src", "assets", "logo")];

async function main() {
    for (const directory of SVG_DIRS) {
        const files = (await readdir(directory)).filter((file) => file.toLowerCase().endsWith(".svg")).sort();

        for (const file of files) {
            const filepath = path.join(directory, file);
            const original = await readFile(filepath, "utf8");
            const optimized = optimize(original, { ...config, path: filepath });

            await writeFile(filepath, optimized.data, "utf8");
            console.log(`${filepath}: ${Buffer.byteLength(original)} -> ${Buffer.byteLength(optimized.data)} bytes`);
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
