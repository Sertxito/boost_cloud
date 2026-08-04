# Contributing to mcpee-cloud

Thank you for contributing.

## Development Workflow

1. Create a branch from `main`.
2. Make focused changes.
3. Run local checks.
4. Open a Pull Request.
5. Wait for review and CI checks.

Direct pushes to `main` are not part of the expected workflow.

## Local Validation

Run these commands before opening a PR:

```bash
npm run validate:manifest
npm run pack:check
```

If you changed multiple artifacts, also run:

```bash
npm run validate
```

If you added or modified an `instructions/*.instructions.md` file:

```bash
npm run check:docs
```

## What to Include in a PR

- Clear description of what changed and why.
- Linked issue if applicable.
- Scope kept as small as possible.
- Updated docs/specs/prompts/evals/examples when capability behavior changes.

## Capability Integrity Rules

- Keep `mcpee.json` as the source of truth.
- Every capability path in `mcpee.json` must exist on disk.
- Avoid partial capability additions (agent without specs/prompts/evals/examples).
- New capabilities must appear in [docs/coverage-matrix.md](docs/coverage-matrix.md).

## Instruction File Rules

- Every `instructions/*.instructions.md` file that is based on official docs **must** have a `Source:` line referencing those docs.
- Add or update the corresponding entry in `docs/doc-sources.json` so the weekly freshness check can track it.
- Run `npm run check:docs:update` locally to set the initial ETag/Last-Modified baseline for new entries.

## Commit Guidance

Use clear commit messages, for example:

- `feat: add azure network governance capability`
- `fix: repair manifest references for aws prompts`
- `ci: stabilize publish workflow`

## Review Ownership

Code ownership is defined in `.github/CODEOWNERS`.
Changes will request review from listed owners.
