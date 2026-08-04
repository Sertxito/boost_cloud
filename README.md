# mcpee-cloud

[![CI](../../actions/workflows/ci.yml/badge.svg)](../../actions/workflows/ci.yml)
[![Docs Freshness](../../actions/workflows/docs-freshness.yml/badge.svg)](../../actions/workflows/docs-freshness.yml)

Cloud boost for MCPEE — 36 enterprise capabilities covering Azure and AWS, ready to plug into any MCPEE-compatible agent runtime.

## Overview

Agents, skills, instructions, prompts, specs, evals, and examples for cloud architecture, operations, security, and DevOps across two providers:

| Provider | Capabilities |
|---|---|
| Cross-cloud | 4 (Well-Architected, Security, DR, DevOps) |
| Azure | 15 |
| AWS | 17 |

Every capability is fully wired in `mcpee.json` — no partial entries, no broken paths.
See [docs/coverage-matrix.md](docs/coverage-matrix.md) for the full domain breakdown.

## Quick Start

```bash
npm install mcpee-cloud
# Optional: install the MCPEE core runtime when you need it
npm install @mcpee/core
```

## Scripts

| Command | What it does |
|---|---|
| `npm run validate` | Manifest integrity + dry-run pack |
| `npm run validate:manifest` | Checks all paths in `mcpee.json` exist on disk |
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
mcpee.json         capability manifest (source of truth)
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

Do not edit files directly inside `node_modules/mcpee-cloud`. Use project-level override folders:

```text
.mcpee/generated-skills/cloud/
.mcpee/overrides/cloud/
.mcpee/knowledge/
.mcpee/memory/
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md).
