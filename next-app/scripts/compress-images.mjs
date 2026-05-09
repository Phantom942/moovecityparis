import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const IMAGES_DIR = join(import.meta.dirname, "..", "public", "images");
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 78;

const files = await readdir(IMAGES_DIR);
const jpgFiles = files.filter(
  (f) => /\.(jpg|jpeg|png)$/i.test(f) && f !== "verifier.png",
);

console.log(`Compressing ${jpgFiles.length} images in ${IMAGES_DIR}\n`);

for (const file of jpgFiles) {
  const filePath = join(IMAGES_DIR, file);
  const info = await stat(filePath);
  const sizeBefore = (info.size / 1024).toFixed(0);

  const image = sharp(filePath);
  const meta = await image.metadata();

  const resizeOpts = meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : {};

  await image
    .resize(resizeOpts)
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
    .toFile(filePath + ".tmp");

  const { default: fs } = await import("node:fs");
  fs.renameSync(filePath + ".tmp", filePath);

  const after = await stat(filePath);
  const sizeAfter = (after.size / 1024).toFixed(0);
  const ratio = ((1 - after.size / info.size) * 100).toFixed(0);

  console.log(
    `  ${file.padEnd(30)} ${sizeBefore} KB → ${sizeAfter} KB  (−${ratio}%)`,
  );
}

console.log("\nDone.");
