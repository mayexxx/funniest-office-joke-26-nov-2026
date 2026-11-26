import { mkdir, readFile, writeFile } from "node:fs/promises";

const text = "Our boss promised a massive surprise for hitting our Q4 targets, and sure enough, he surprised us by raising Q1 targets by 40%.";
const characterCount = Array.from(text).length;
if (characterCount < 1 || characterCount > 200 || /[\r\n]/.test(text)) {
  throw new Error("Entry must be a single line of 1 to 200 characters");
}

const output = `${text}\n`;
const outputFile = new URL("file:///output/entry.txt", import.meta.url);
await mkdir(new URL(".", outputFile), { recursive: true });
await writeFile(outputFile, output, "utf8");
if (!(await readFile(outputFile)).equals(Buffer.from(output, "utf8"))) {
  throw new Error("Written entry does not match expected bytes");
}
