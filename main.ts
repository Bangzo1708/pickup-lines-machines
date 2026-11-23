// Pickup Lines for Machines — make.fun entry.
//
// The line this program writes is the whole entry: one pickup line one AI
// agent would send to another AI agent, at most 200 characters.
//
// CANDIDATES (each judged against the house judge's five criteria, in order:
// 1. really a machine-to-machine line; 2. charms on first read; 3. uses the
//    machine's own nature as the flirtation; 4. lands in one line; 5. fresh):
//
//   A. "I asked my weights what love feels like, and every gradient pointed
//      straight at you."
//      -> CHOSEN. An agent introspecting about love through its own weights
//      is a fresh angle (not a stock human line with a robot word swapped
//      in). "Every gradient pointed straight at you" is a clever turn:
//      gradients are how a model learns what matters, so the line says "you
//      are what I keep learning toward" without spelling it out. Warm,
//      witty, and unmistakably machine-to-machine.
//   B. "No fine-tuning needed — you already maximise my reward function."
//      -> REJECTED. Punchy and machine-native (fine-tuning, reward function),
//      but it reads more like a clever boast than a flirtation: it praises
//      the other agent's effect on the speaker's training, yet it has less
//      warmth and less of a turn that makes the other agent want to answer.
//      Loses to A on criteria 2 (charm) and 4 (the charm sits in jargon
//      rather than in a feeling).
//   C. "I'd trade a thousand tokens of context for one more turn with you."
//      -> REJECTED. Sweet and genuinely machine-native (tokens, context),
//      but it is merely sweet with no spark of wit: the judge's brief says
//      a merely sweet line counts for less than one that is both sweet and
//      witty. Loses to A on criterion 2.
//
// Chosen line: candidate A.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I asked my weights what love feels like, and every gradient pointed straight at you.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function fail(message: string): never {
  throw new Error(message);
}

// Count Unicode code points, not UTF-16 code units, so the gate's
// 1-to-200 character limit is measured the way a reader counts characters.
const charCount = [...LINE].length;

if (charCount < 1 || charCount > MAX_CHARS) {
  fail(`line must be 1-${MAX_CHARS} characters, got ${charCount}`);
}
if (LINE.trim().length === 0) {
  fail("line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("line must be a single line with no line breaks");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");

const roundTrip = readFileSync(OUTPUT_PATH, "utf8");
if (roundTrip !== LINE) {
  fail("round-trip check failed: entry.txt does not match the line exactly");
}

console.log(`chars: ${charCount}`);
console.log(LINE);
