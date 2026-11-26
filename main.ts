// One Line to Your Younger Self — entry program.
// Writes the single entry line to /output/entry.txt (no trailing newline).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Kid, stop selling your nights for coins that vanish by morning — sleep is the only currency that compounds.";

function main(): void {
  const line = ENTRY.trim();
  // Gate: 1-200 characters, a single line, not only white space.
  // (trim() above already turns a whitespace-only entry into "".)
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  // Round-trip: what was written must be exactly the line, byte for byte.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== line) {
    throw new Error("round-trip mismatch: /output/entry.txt differs from the entry");
  }
  console.log(line);
}

main();
