# boost-cloud

[![CI](../../actions/workflows/ci.yml/badge.svg)](../../actions/workflows/ci.yml)
[![Docs Freshness](../../actions/workflows/docs-freshness.yml/badge.svg)](../../actions/workflows/docs-freshness.yml)

Cloud boost for GitHub Copilot — 36 enterprise capabilities covering Azure and AWS. Standalone: one command installs agents, skills, prompts and instructions where Copilot discovers them.

## Overview

Agents, skills, instructions, prompts, specs, evals, and examples for cloud architecture, operations, security, and DevOps across two providers:

| Provider | Capabilities |
|---|---|
| Cross-cloud | 4 (Well-Architected, Security, DR, DevOps) |
| Azure | 15 |
| AWS | 17 |

Every capability is fully wired in `boost.json` — no partial entries, no broken paths.
See [docs/coverage-matrix.md](docs/coverage-matrix.md) for the full domain breakdown.

## Quick Start
This boost is **self-contained**: it does not need any runtime, plugin or MCP server. One command copies its assets to the places where GitHub Copilot / VS Code discover them automatically.

```bash
# From the root of YOUR project
npx github:Sertxito/boost_cloud
# or, once published on npm
npx boost-cloud
```

| Asset | Installed into |
|---|---|
| Agents | `.github/agents/*.agent.md` |
| Skills | `.github/skills/<name>/SKILL.md` and `.agents/skills/<name>/SKILL.md` |
| Prompts | `.github/prompts/*.prompt.md` |
| Instructions | `.github/instructions/*.instructions.md` |
| Global instructions | `.github/copilot-instructions.md` (only if the project has none) |

Options: `--target <dir>`, `--force` (overwrite), `--dry-run`, `--no-agents-dir` (skip `.agents/skills`), `--check` (verify install), `--uninstall`.
Existing files are never overwritten without `--force`, so several boosts can coexist in the same project.

**Verify:** run `npx boost-cloud --check`, reload VS Code (`Developer: Reload Window`), then type `@` in Copilot Chat (agents), `/` (prompts) and open the *Configure Tools / Skills* picker.

## Scripts

| Command | What it does |
|---|---|
| `npm run validate` | Manifest integrity + dry-run pack |
| `npm run validate:manifest` | Checks all paths in `boost.json` exist on disk |
| `npm run pack:check` | Dry-run `npm pack` to catch missing `files` entries |
| `npm run check:docs` | HEAD-checks all official source URLs in `docs/doc-sources.json` |
| `npm run check:docs:update` | Same check, then writes new ETags/Last-Modified as baseline |

## Structure

```text
agents/            specialists per domain
skills/            operational procedures
instructions/      coding and architecture guidelines (with source URLs)
prompts/           per-capability interaction templates
specs/             technical criteria and checklists
evals/             evaluation criteria
examples/          expected output shapes
docs/
  coverage-matrix.md   domain coverage overview
  doc-sources.json     official source URL registry for freshness tracking
boost.json         capability manifest (source of truth)
```

## Doc Freshness

Official cloud docs change. A [weekly CI job](.github/workflows/docs-freshness.yml) HEAD-checks every URL in `docs/doc-sources.json` and opens a GitHub issue when:

- A source URL returns 4xx/5xx (broken link)
- An ETag or Last-Modified header differs from the stored baseline (content drift)

To refresh the baseline after reviewing and updating an instruction file:

```bash
npm run check:docs:update
```

Or trigger the `docs-freshness` workflow manually with **Update baseline** enabled.

## Local Customization

Installed files are plain files in your project (`.github/`). Edit them freely; re-run with `--force` to restore the originals.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md).

## Naming and collisions

Installed assets are prefixed with `cloud-` (e.g. `.github/agents/cloud-<name>.agent.md`, `.github/skills/cloud-<name>/`) so several boosts can live in the same project, and internal references are rewritten to match.

- Nothing that already exists in the target is overwritten: each ignored file is reported with a `[WARN] ... already existed ... IGNORED` message. Use `--force` to overwrite.
- An existing `.github/copilot-instructions.md` is kept; the boost's global guidance is installed as `cloud-global.instructions.md` instead.
- Re-running the installer is safe; `--check` and `--uninstall` work from the manifest.

