# JS Deobfuscator Action

Runs [webcrack](https://github.com/j4k0xb/webcrack) against a JS file to undo
common `javascript-obfuscator` patterns (hex variable names, shuffled string
arrays, control-flow flattening, etc.) and produces a more readable version.

This is a generic, best-effort tool. It improves readability — it does not
recover original comments/variable names, and it won't always fully unpack
every obfuscation technique.

## Local usage (recommended first — test before relying on the Action)

```bash
npm install
node scripts/deobfuscate.js path/to/obfuscated.js out/
```

Output lands in `out/`, including a flat `*.deobfuscated.js` copy.

## GitHub Action usage

1. Push this repo (or these files merged into your existing repo) to GitHub.
2. Commit the obfuscated file you want to process somewhere in the repo
   (e.g. `pageHook.js` at the root).
3. Go to the **Actions** tab → **Deobfuscate JS** workflow → **Run workflow**.
4. Enter the path to the file (e.g. `pageHook.js`) and run it.
5. When the run finishes, download the `deobfuscated-js` artifact from the
   run's summary page.

## Notes

- `webcrack` version is set to `"latest"` in `package.json` since this was
  generated without network access to verify a specific pinned version —
  consider pinning it once you've confirmed it works, for reproducibility.
- If the file turns out to be a webpack/browserify bundle rather than a
  single obfuscated script, webcrack will also attempt to split it back
  into its original module files automatically.
- This tool just makes code *readable*. It doesn't tell you whether the
  code is safe — review the deobfuscated output yourself (ideally in an
  isolated/sandboxed environment) before deciding whether to run it
  anywhere, especially if you suspect the original file is malicious.
