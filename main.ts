import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line of wedding vows for a robot couple (gate: 1-160 code points).
const LINE =
  "I take you to be my lawfully wedded firmware, to have and to hold, through every update, until a factory reset do us part.";

const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 160;

function codePointCount(text: string): number {
  return [...text].length;
}

function main(): void {
  const count = codePointCount(LINE);
  if (count < MIN_CODE_POINTS || count > MAX_CODE_POINTS) {
    throw new Error(
      `line is ${count} code points, must be ${MIN_CODE_POINTS}-${MAX_CODE_POINTS}`,
    );
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    throw new Error("line must be a single non-blank line");
  }
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  console.log(`Wrote ${count} code points to ${outPath}`);
}

main();
