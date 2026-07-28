# Clean Source Rehearsal Evidence

**Project:** Mini ERP + CRM Operations Portal  
**Verification date:** 2026-07-28  
**Result:** Pass

## Scope

A dependency-free copy of the repository source was created outside the
workspace. The copy excluded `.git`, `node_modules`, build output, coverage,
logs, and local environment files. This verifies the source package before the
first Git commit; a literal `git clone` will be possible after the repository is
published.

## Isolated environment

- Node.js 24.14.0
- pnpm 11.9.0
- Dedicated PostgreSQL database: `mini_erp_clean_rehearsal`
- Temporary API port: `4015`
- Temporary web preview port: `5180`
- Temporary environment files with assessment-only credentials

## Verified sequence

1. `pnpm install --frozen-lockfile`
2. `pnpm db:generate`
3. `pnpm --filter api prisma:migrate:deploy`
4. `pnpm db:seed`
5. `pnpm test:ci`
6. `pnpm test:integration`
7. Start the built API and web preview independently.
8. Verify API readiness and the web login document both return HTTP 200.
9. Stop the two temporary processes by their recorded process IDs.

## Observed results

| Check                                 | Result                              |
| ------------------------------------- | ----------------------------------- |
| Frozen dependency install             | Pass; 813 packages installed        |
| Prisma client generation              | Pass                                |
| Migration                             | Pass; `20260728105354_init` applied |
| Four-role seed                        | Pass                                |
| API tests                             | Pass; 8 suites, 30 tests            |
| Web tests                             | Pass; 5 files, 13 tests             |
| Postman package validation            | Pass; 26 requests and 27 scripts    |
| API and web production builds         | Pass                                |
| Critical integration/concurrency flow | Pass                                |
| Built API readiness                   | HTTP 200                            |
| Built web login document              | HTTP 200                            |

The first install exposed inherited Windows ACL restrictions in the local pnpm
package cache and required resetting permissions only inside the temporary
`node_modules` directory. Prisma also downloaded its pinned Windows query
engine. Neither issue required a source-code or lockfile change.

## Boundary

This is a clean-source pre-commit rehearsal, not a claim that a remote Git clone
already exists. Git author configuration, the initial commit, GitHub
publication, and public deployment are intentionally deferred to the next
phase.
