import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "mcpee.json");

if (!fs.existsSync(manifestPath)) {
  console.error("ERROR: mcpee.json was not found at repository root.");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const missing = [];

const arraysToCheck = ["skills", "instructions", "specs", "prompts", "evals", "examples"];

for (const capability of manifest.capabilities || []) {
  const agentPath = path.join(root, capability.agent || "");
  if (!capability.agent || !fs.existsSync(agentPath)) {
    missing.push({ capability: capability.id, kind: "agent", file: capability.agent || "<missing value>" });
  }

  for (const key of arraysToCheck) {
    const entries = capability[key] || [];
    for (const entry of entries) {
      const entryPath = path.join(root, entry);
      if (!fs.existsSync(entryPath)) {
        missing.push({ capability: capability.id, kind: key, file: entry });
      }
    }
  }
}

if (missing.length > 0) {
  console.error("ERROR: mcpee.json contains references to missing files:\n");
  for (const item of missing) {
    console.error(`- ${item.capability} [${item.kind}] -> ${item.file}`);
  }
  process.exit(1);
}

console.log(`OK: manifest validation passed for ${(manifest.capabilities || []).length} capabilities.`);
