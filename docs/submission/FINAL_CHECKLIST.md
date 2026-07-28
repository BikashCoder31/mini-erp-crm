# Final submission checklist

## Completed and verified

- [x] Four role accounts authenticate.
- [x] Representative backend role denials pass.
- [x] Customer CRM and follow-up flow works.
- [x] Product, opening stock, IN/OUT, and ledger flow works.
- [x] Negative stock is rejected.
- [x] Draft challans do not change stock.
- [x] Confirmation, snapshots, and full rollback are verified.
- [x] Repeated confirmation cannot double-deduct.
- [x] Admin cancellation restores stock once.
- [x] Accounts behavior is read-only.
- [x] Critical pages are usable at the tested mobile viewport.
- [x] Formatting, lint, types, unit tests, builds, and integration pass.
- [x] Swagger and the Postman package are present.
- [x] Development and production-style local instructions are documented.
- [x] Docker migration, seed, API, web, CORS, health, and security checks pass.
- [x] Secrets and generated dependencies are ignored.
- [x] Assumptions and limitations are stated.

## Candidate-owned closeout

- [ ] Add candidate name and contact information.
- [x] Configure Git author identity and create the verified implementation commit.
- [x] Push to an evaluator-accessible repository.
- [ ] Decide whether to deploy publicly; if so, verify HTTPS and replace local
      link wording.
- [ ] Record the full demonstration using `RECORDING_SCRIPT.md`.
- [ ] Upload the recording and verify its permission in a logged-out browser.
- [x] Review the screenshot set for current demo data and secrets.
- [ ] Update the Step 11 record, repository/recording links, and final hash.
- [ ] Send the submission and preserve the receipt.

## No-false-claims check

Do not mark public deployment, recording access, repository access, final
commit, or submission receipt complete until each has been independently
verified. The pre-commit clean-source rehearsal is independently recorded under
`docs/evidence/quality/CLEAN_SOURCE_REHEARSAL.md`.
