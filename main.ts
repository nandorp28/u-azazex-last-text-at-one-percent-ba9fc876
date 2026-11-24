// Last Text at One Percent — make.fun entry (u-azazex-last-text-at-one-percent-ba9fc876).
// The phone's own final text, sent at one percent battery: a confession
// that it faked its battery level to get charged, and it regrets nothing.
// The line is 95 characters, inside the 1-200 gate.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Confession: I've been at 1% for six hours. I lied so you'd finally charge me. I regret nothing.";

// Gate (competition.yaml): /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: what was written is exactly the validated line.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
console.log(`Wrote ${chars.length} characters to ${outPath}`);
