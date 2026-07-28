# Demonstration recording script

Target length: 8–10 minutes. Use fake assessment data, hide notifications, and
do not display environment files, tokens, or infrastructure secrets.

## 00:00–00:45 — Context

- Introduce the wholesale/distribution operations portal.
- Name the React, NestJS, PostgreSQL, and Prisma architecture.
- State the key invariant: Draft does not affect stock; Confirm is atomic.

## 00:45–02:15 — Warehouse and inventory

- Sign in as Warehouse.
- Create a product with opening stock.
- Open its ledger and identify the opening movement.
- Record an IN movement.
- Attempt an excessive OUT and show that the balance is unchanged.

## 02:15–03:30 — Customer CRM

- Sign in as Sales.
- Create or search for a customer.
- Open the customer detail and append a follow-up.

## 03:30–06:15 — Challan lifecycle

- Create a two-line Draft and show that product balances are unchanged.
- Edit the Draft, then Confirm it.
- Show the Confirmed snapshot values and matching OUT movements.
- Attempt a second confirmation and show the safe conflict.
- Create another Draft with insufficient quantity, attempt confirmation, and
  show that no product was partially deducted.

## 06:15–07:30 — Roles and reversal

- Sign in as Accounts and show read-only pages/actions.
- Sign in as Admin and cancel the earlier Confirmed challan with a reason.
- Show the Cancelled status, reversal movements, restored balances, and
  repeated-cancellation conflict.

## 07:30–08:30 — Documentation and operations

- Open Swagger and the Postman folder.
- Show the README setup, architecture, tests, and limitations.
- Mention the isolated full-stack Docker fallback and health endpoint.
- State clearly that public HTTPS hosting is not claimed unless completed
  before submission.

## Final review

- Verify that URLs and credentials shown match the final package.
- Remove pauses or accidental secret/personal exposure.
- Upload, then test the recording link in a logged-out browser.
