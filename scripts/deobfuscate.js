#!/usr/bin/env node
// Deobfuscates a JS file (e.g. javascript-obfuscator output) using webcrack.
// Usage: node scripts/deobfuscate.js <input-file> [output-dir]

import fs from 'fs';
import path from 'path';
import { webcrack } from 'webcrack';

const inputPath = process.argv[2];
const outputDir = process.argv[3] || 'deobfuscated-output';

if (!inputPath) {
  console.error('Usage: node scripts/deobfuscate.js <input-file> [output-dir]');
  process.exit(1);
}

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const code = fs.readFileSync(inputPath, 'utf-8');

console.log(`Deobfuscating ${inputPath} ...`);

try {
  const result = await webcrack(code);

  fs.mkdirSync(outputDir, { recursive: true });
  await result.save(outputDir);

  // webcrack writes a bundle structure; also drop a flat copy next to the
  // output dir for convenience when the input was a single non-bundled file.
  const flatOutPath = path.join(
    outputDir,
    path.basename(inputPath, path.extname(inputPath)) + '.deobfuscated.js'
  );
  fs.writeFileSync(flatOutPath, result.code, 'utf-8');

  console.log(`Done. Output written to: ${outputDir}`);
  console.log(`Flat single-file copy: ${flatOutPath}`);
} catch (err) {
  console.error('Deobfuscation failed:', err);
  process.exit(1);
}
