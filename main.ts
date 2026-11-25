// Tell a Whole Story in 32 Characters — make.fun entry.
//
// Writes one Wi-Fi network name to <MAKEFUN_OUTPUT_DIR>/entry.txt.
// The gate: /output/entry.txt must be UTF-8 text of 1 to 32 characters,
// not only white space. The entry is validated here before anything is
// written, so an invalid entry can never reach the scorer.
//
// The entry: "Dumped him. Kept the Wi-Fi."
// A whole breakup in two beats — she dumped him, and the Wi-Fi was the
// thing worth keeping. Situation, character, and something that
// happened, in 27 characters a stranger reads in a network list.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "Dumped him. Kept the Wi-Fi.";

const MAX_CHARS = 32;

function validateEntry(text: string): number {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("entry must be non-empty text");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // Count characters as code points, so any non-ASCII text is measured
  // the way a reader counts it. This entry is plain ASCII, so code
  // points == characters.
  const charCount = Array.from(text).length;
  if (charCount > MAX_CHARS) {
    throw new Error(
      `entry is ${charCount} characters, over the 32-character gate`,
    );
  }
  return charCount;
}

function main(): void {
  const charCount = validateEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`Wrote ${charCount}-character entry to ${join(outDir, "entry.txt")}`);
}

main();
