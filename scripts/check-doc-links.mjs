#!/usr/bin/env node
/**
 * Checks official documentation source URLs for liveness and content drift.
 *
 * Modes:
 *   node check-doc-links.mjs            → check all URLs, report broken + drift
 *   node check-doc-links.mjs --update   → same check, then write new ETags/Last-Modified to doc-sources.json
 *
 * Exit codes:
 *   0 → all URLs reachable (drift warnings are printed but do not fail)
 *   1 → one or more URLs unreachable (4xx / 5xx / network error)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcesPath = path.join(root, "docs", "doc-sources.json");
const TIMEOUT_MS = 15_000;
const UPDATE_MODE = process.argv.includes("--update");

const sources = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));

// ── helpers ─────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().slice(0, 10);
}

async function headRequest(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": "mcpee-cloud/doc-freshness-check" },
      redirect: "follow",
    });
    return { ok: res.ok, status: res.status, etag: res.headers.get("etag"), lastModified: res.headers.get("last-modified") };
  } catch (err) {
    return { ok: false, status: null, etag: null, lastModified: null, error: err.message };
  } finally {
    clearTimeout(timer);
  }
}

// ── main ─────────────────────────────────────────────────────────────────────

const broken = [];
const drifted = [];
const ok = [];

for (const [file, config] of Object.entries(sources)) {
  for (const entry of config.sources) {
    const { url, label } = entry;
    process.stdout.write(`  checking ${label} … `);
    const result = await headRequest(url);

    if (!result.ok) {
      console.log(`❌ ${result.status ?? "network error"}${result.error ? ` (${result.error})` : ""}`);
      broken.push({ file, label, url, status: result.status, error: result.error });
      continue;
    }

    const currentEtag = result.etag;
    const currentLM = result.lastModified;
    const hasBaseline = entry.etag !== null || entry.lastModified !== null;

    let driftDetected = false;
    if (hasBaseline) {
      if (entry.etag && currentEtag && entry.etag !== currentEtag) driftDetected = true;
      if (!entry.etag && entry.lastModified && currentLM && entry.lastModified !== currentLM) driftDetected = true;
    }

    if (driftDetected) {
      console.log(`⚠️  CHANGED (was: ${entry.etag ?? entry.lastModified} → now: ${currentEtag ?? currentLM})`);
      drifted.push({ file, label, url, was: entry.etag ?? entry.lastModified, now: currentEtag ?? currentLM });
    } else if (!hasBaseline) {
      console.log(`✅ ${result.status} (no baseline — run --update to set)`);
    } else {
      console.log(`✅ ${result.status} unchanged`);
    }

    ok.push({ entry, currentEtag, currentLM });

    if (UPDATE_MODE) {
      entry.lastChecked = today();
      entry.etag = currentEtag;
      entry.lastModified = currentLM;
    }
  }
}

// ── summary ──────────────────────────────────────────────────────────────────

console.log("\n── Summary ──────────────────────────────────");
console.log(`  ✅  Reachable : ${ok.length}`);
console.log(`  ⚠️   Drifted  : ${drifted.length}`);
console.log(`  ❌  Broken   : ${broken.length}`);

if (drifted.length > 0) {
  console.log("\n⚠️  Drifted sources (review these instruction files):");
  for (const d of drifted) {
    console.log(`  ${d.file}\n    [${d.label}] ${d.url}`);
  }
}

if (broken.length > 0) {
  console.log("\n❌ Broken sources:");
  for (const b of broken) {
    console.log(`  ${b.file}\n    [${b.label}] ${b.url} → ${b.status ?? b.error}`);
  }
}

if (UPDATE_MODE && (ok.length > 0 || drifted.length > 0)) {
  fs.writeFileSync(sourcesPath, JSON.stringify(sources, null, 2) + "\n");
  console.log(`\n✏️  doc-sources.json updated (${today()})`);
}

// Emit machine-readable output for the GH Actions workflow
if (process.env.GITHUB_OUTPUT) {
  const output = fs.openSync(process.env.GITHUB_OUTPUT, "a");
  fs.writeSync(output, `broken_count=${broken.length}\n`);
  fs.writeSync(output, `drift_count=${drifted.length}\n`);
  if (drifted.length > 0) {
    const summary = drifted.map((d) => `- \`${d.file}\`: [${d.label}](${d.url})`).join("\n");
    fs.writeSync(output, `drift_summary<<EOF\n${summary}\nEOF\n`);
  }
  if (broken.length > 0) {
    const summary = broken.map((b) => `- \`${b.file}\`: [${b.label}](${b.url}) → \`${b.status ?? b.error}\``).join("\n");
    fs.writeSync(output, `broken_summary<<EOF\n${summary}\nEOF\n`);
  }
  fs.closeSync(output);
}

process.exit(broken.length > 0 ? 1 : 0);
