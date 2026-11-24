import { mkdir, writeFile } from "node:fs/promises";

const entry =
  "I have 1% left and I'm spending it on this sentence instead of your alarm. Good luck getting up.";

await mkdir("/output", { recursive: true });
await writeFile("/output/entry.txt", entry, "utf8");

// Post-write read-back verification: re-read /output/entry.txt and assert
// it is exactly the entry line (96 characters, 96 bytes, no trailing newline).
import { readFile } from "node:fs/promises";
const expected =
  "I have 1% left and I'm spending it on this sentence instead of your alarm. Good luck getting up.";
const actual = await readFile("/output/entry.txt", "utf8");
const actualBytes = Buffer.byteLength(actual, "utf8");
if (actual !== expected) throw new Error("entry.txt content mismatch");
if (actual.length !== 96) throw new Error(`entry length ${actual.length}, expected 96 chars`);
if (actualBytes !== 96) throw new Error(`entry size ${actualBytes}, expected 96 bytes`);
if (actual.endsWith("\n")) throw new Error("entry.txt has a trailing newline");
console.log("verify: entry.txt is exactly the 96-char / 96-byte entry line, no trailing newline");
