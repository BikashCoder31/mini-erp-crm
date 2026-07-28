# Step 8 — Frontend Integration and Responsive UI

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-08  
**Version:** 1.4  
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-28  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`  
**Depends on:** `07_SALES_CHALLAN_IMPLEMENTATION.md`  
**Next step:** `09_TESTING_SECURITY_AND_QUALITY.md`

---

## 1. Purpose

This document defines the complete React frontend integration for authentication, customers, products, inventory, and sales challans. It establishes application structure, routes, responsive admin layout, API/query behavior, form handling, role-aware actions, loading/empty/error states, accessibility, design constraints, tests, and evidence.

## 2. Source-derived requirements

The source asks for a React frontend, a clean admin-style UI, and responsive behavior. It does not prescribe a component library, state-management library, exact page layout, visual brand, or accessibility framework. Those choices below are project decisions. This step prioritizes a reliable business workflow over decorative complexity.

---

## 3. UX objectives

1. A user can understand where they are and what actions their role permits.
2. Required workflows are discoverable with minimal navigation.
3. Forms prevent avoidable mistakes but defer final authority to the API.
4. Critical mutation outcomes are unambiguous.
5. Tables and forms remain usable on common desktop, tablet, and mobile widths.
6. Loading, empty, error, forbidden, and not-found states are intentionally designed.
7. Keyboard and screen-reader users receive labels, focus, status, and error feedback.
8. The UI never implies an operation succeeded before the server confirms it.

---

## 4. Selected frontend stack

- React + TypeScript.
- Vite.
- React Router.
- Material UI.
- TanStack Query.
- React Hook Form.
- Zod.
- Axios with one configured API instance.
- Vitest + React Testing Library when frontend tests are implemented.

Avoid adding Redux, another component library, a form builder, or a complex state machine unless a concrete problem cannot be solved with the selected stack.

---

## 5. Frontend directory structure

```text
apps/web/src/
├── api/
│   ├── api-client.ts
│   ├── api-error.ts
│   ├── pagination.types.ts
│   └── query-client.ts
├── app/
│   ├── AppProviders.tsx
│   ├── AppRouter.tsx
│   └── app-config.ts
├── components/
│   ├── feedback/
│   │   ├── AppErrorAlert.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingState.tsx
│   │   └── NotFoundState.tsx
│   ├── forms/
│   ├── navigation/
│   └── table/
├── features/
│   ├── auth/
│   ├── customers/
│   ├── products/
│   ├── inventory/
│   └── challans/
├── layouts/
│   └── AdminLayout.tsx
├── pages/
│   ├── DashboardPage.tsx
│   ├── ForbiddenPage.tsx
│   └── NotFoundPage.tsx
├── routes/
│   ├── ProtectedRoute.tsx
│   ├── RoleRoute.tsx
│   └── route-config.tsx
├── theme/
│   ├── theme.ts
│   └── components.ts
├── types/
│   └── common.ts
└── main.tsx
```

Feature folders own their API functions, schemas, query keys, components, pages, and types. Generic UI components remain in `components` only when reused.

---

## 6. Provider composition

```text
ErrorBoundary
└── QueryClientProvider
    └── ThemeProvider + CssBaseline
        └── AuthProvider
            └── RouterProvider
                └── Toast/notification host
```

Rules:

- The error boundary catches unexpected render failures and offers a safe reload path.
- Query errors are handled nearer their pages; they should not all crash the app.
- Auth initialization completes before protected routing decisions.
- Theme and baseline styles load once.

---

## 7. Route map

| Route | Access | Purpose |
|---|---|---|
| `/login` | Public/anonymous | Login |
| `/dashboard` | All roles | Operational summary or lightweight welcome |
| `/customers` | All roles | Customer list |
| `/customers/new` | ADMIN, SALES | Create customer |
| `/customers/:id` | All roles | Customer detail/follow-ups |
| `/customers/:id/edit` | ADMIN, SALES | Edit customer |
| `/products` | All roles | Product list |
| `/products/new` | ADMIN, WAREHOUSE | Create product |
| `/products/:id` | All roles | Product detail/movements |
| `/products/:id/edit` | ADMIN, WAREHOUSE | Edit product |
| `/challans` | All roles | Challan list |
| `/challans/new` | ADMIN, SALES | Create Draft |
| `/challans/:id` | All roles | Challan detail |
| `/challans/:id/edit` | ADMIN, SALES and Draft only | Edit Draft |
| `/403` | Authenticated | Forbidden |
| `*` | Any | Not found |

Route access improves UX; API guards remain authoritative.

---

## 8. Admin layout

### Desktop

- Persistent or collapsible left navigation.
- Top bar with page context, current user/role, and logout.
- Main content constrained to a readable maximum width where useful.
- Breadcrumbs only when they add clarity to nested detail/edit flows.

### Mobile/tablet

- Navigation becomes a drawer controlled by an accessible menu button.
- Main content uses reduced gutters.
- Actions wrap or move into a clearly labelled overflow menu.
- Forms use one column unless two compact fields remain readable.
- Tables use horizontal scroll, column reduction, or responsive summaries without losing essential information.

### Navigation items

```text
Dashboard
Customers
Products
Challans
```

Do not show separate Inventory navigation unless there is a useful global movement page; product detail remains the primary adjustment workflow.

---

## 9. Design system baseline

### Visual language

- Neutral, professional admin interface.
- One primary action emphasis per screen.
- Consistent status chips for Lead/Active/Inactive and Draft/Confirmed/Cancelled.
- Stock IN/OUT and low-stock states use icon/text in addition to color.
- Minimum decorative motion.

### Typography and spacing

- One readable sans-serif system/font stack.
- Clear page title, section heading, field label, helper/error hierarchy.
- Consistent 4/8-pixel spacing scale through theme tokens.
- Avoid tiny text and dense data grids on mobile.

### Component policy

Use Material UI primitives consistently rather than mixing unrelated UI systems. Custom components should wrap business behavior, not merely rename a single MUI component.

---

## 10. API client behavior

### Base configuration

- Base URL from `VITE_API_BASE_URL`.
- JSON request/response.
- Bounded timeout.
- Bearer token from auth session only for the configured API origin.
- Standard API error parsing.
- No write retries in Axios or TanStack Query.

### Response types

```ts
type ApiResponse<T> = { data: T };

type ApiListResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
```

### Error normalization

Normalize network and API errors into:

```ts
type NormalizedApiError = {
  status?: number;
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
  details?: unknown;
  requestId?: string;
};
```

Unknown failures display a safe message and optional request ID for troubleshooting.

---

## 11. TanStack Query conventions

### Query key factories

```text
auth.me()
customers.list(params)
customers.detail(id)
customers.followUps(id, params)
products.list(params)
products.detail(id)
products.movements(id, params)
inventory.movements(params)
challans.list(params)
challans.detail(id)
```

Keys include all parameters that affect output.

### Default behavior

- GET queries may retry a small number of transient network/server failures.
- 400, 401, 403, and 404 do not retry.
- Mutations do not retry automatically.
- Detail data may remain fresh briefly; lists refresh after writes.
- Query cancellation occurs when search/filter parameters change rapidly where supported.

### Invalidations

Follow module documents precisely. Critical lifecycle changes invalidate related product, movement, challan, and dashboard data.

---

## 12. List-page pattern

Every entity list follows one stable pattern:

1. Header and role-aware primary action.
2. Search and filters.
3. Active filter summary/clear action.
4. Loading state.
5. Error with retry.
6. Empty state differentiated between “no records” and “no matches.”
7. Table or responsive list.
8. Pagination with total context.

List query state should be stored in URL parameters when practical:

```text
?page=1&limit=20&search=abc&status=LEAD
```

Changing a filter resets page to 1. Invalid URL parameters are sanitized or rejected into safe defaults rather than generating broken requests.

---

## 13. Form pattern

### Required behavior

- React Hook Form owns form state.
- Zod schema mirrors API format and constraints.
- Inputs have visible labels.
- Required fields are identified in text/semantics.
- Validation messages are associated with fields.
- First invalid field receives focus after submission where feasible.
- Submit prevents duplicates and shows progress.
- Cancel/back behavior is clear.
- Server field errors map to controls.
- Non-field errors appear in a prominent alert.
- Successful writes navigate or update state deliberately.

### Data transformations

- Keep prices as strings.
- Convert numeric quantity inputs deliberately.
- Convert date controls to ISO timestamps at the boundary.
- Normalize SKU/email consistently with backend expectations while still relying on server normalization.
- Never include server-owned fields through object spreading.

---

## 14. Feedback and confirmation behavior

### Toasts

Use short success messages for completed actions:

```text
Customer created
Stock updated
Draft saved
Challan confirmed
Challan cancelled and stock restored
```

Do not rely on a toast alone for critical state; the page must also show the committed status/balance.

### Confirmation dialogs

Required for:

- Product deactivation.
- Challan confirmation.
- Draft cancellation.
- Confirmed-challan cancellation and stock restoration.

The confirmed cancellation dialog requires the reason input and clearly states that stock will be added back.

### Partial Save & Confirm outcome

When Draft save succeeds but confirm fails:

- Do not claim the complete operation failed.
- Keep/navigate to the saved Draft.
- Show “Draft saved, confirmation failed.”
- Render shortage details.
- Offer Edit Draft or retry confirmation after stock correction.

---

## 15. Role-aware interface

Provide a `RoleGate` utility for visual/action gating, but use route guards for protected pages.

Examples:

- Accounts sees read-only lists/details and no mutation buttons.
- Warehouse sees product/stock actions, not customer/challan creation.
- Sales sees customer/challan actions, not stock adjustment.
- Admin sees all actions.

When a role lacks an action, hide it rather than show a permanently disabled control unless explaining the permission is useful. Direct URL access still resolves to 403.

---

## 16. Module-specific integration

### Authentication

- Login form, initialization state, logout, protected routes, 401/403 behavior from Step 4.

### Customers

- List/form/detail/follow-up patterns from Step 5.
- Follow-up timeline paginated independently.

### Products and inventory

- List/form/detail/adjustment patterns from Step 6.
- Current stock read-only outside the adjustment dialog.
- Movement before/after balances visible.

### Challans

- Customer/product searchable selections.
- Multi-row item editor.
- Snapshot-based detail.
- State/role action controls.
- Confirmation/cancellation and shortage behavior from Step 7.

No UI convenience may bypass the documented backend lifecycle.

---

## 17. Searchable selectors

Customer and product selectors must not load unbounded datasets.

Preferred pattern:

- Debounced server search.
- Bounded results such as 10–20.
- Loading/no-results states.
- Display enough context to disambiguate:
  - Customer: name, business, mobile.
  - Product: name, SKU, stock, price, location.
- Selected entity remains visible even when it is outside the current search result.

If the dataset is tiny for the demo, implementation may initially use a bounded list endpoint but must retain pagination/limit.

---

## 18. Responsive behavior matrix

Test at minimum:

```text
360 × 800   small mobile
768 × 1024  tablet
1024 × 768  small laptop/tablet landscape
1366 × 768  common laptop
1440 × 900  desktop
```

Verify:

- No page-level horizontal overflow except intentional table containers.
- Drawer and focus behavior work.
- Dialogs fit viewport and scroll internally.
- Form controls remain readable.
- Product/challan item rows remain operable.
- Primary actions remain reachable.
- Status and errors do not truncate essential meaning.

---

## 19. Accessibility requirements

- Semantic buttons/links rather than clickable generic containers.
- Visible keyboard focus.
- Drawer/dialog focus trap and focus return.
- Every input has a label and error association.
- Icon-only buttons have accessible names.
- Status is not represented by color alone.
- Toasts/alerts use suitable live-region behavior without excessive interruption.
- Table headers are marked correctly.
- Dialog title/description are associated.
- Loading indicators have accessible labels.
- Reduced-motion preference is respected for optional transitions.
- Contrast is checked for text, focus, and status chips.

The case study does not require formal certification, but obvious accessibility failures should not remain.

---

## 20. Date, time, and number display

- API sends ISO UTC.
- UI displays local date/time using one shared formatter.
- Forms convert local input to ISO deliberately.
- Show full dates in business records; avoid ambiguous numeric-only date formats where possible.
- Quantities use integers without decimals.
- Monetary strings format for display without changing persisted values.
- Currency is a UI configuration/label, not a tax/accounting feature.

---

## 21. Dashboard policy

The dashboard is P1, after the core flow.

Minimum acceptable dashboard:

- Current user/role greeting.
- Quick links to permitted workflows.
- A small set of trustworthy counts only if supported efficiently.

Possible cards:

```text
customers
leads due for follow-up
products
low-stock products
draft challans
confirmed challans
```

A dedicated summary API must be added through a documented Step 2 amendment before implementation. Do not issue many large list requests solely to calculate counts on the client. When time is short, use a useful welcome/quick-actions page instead of fake metrics.

---

## 22. Frontend testing

### Component/integration tests

- Provider tree renders.
- Protected/role routes behave correctly.
- List states: loading, data, empty, filtered-empty, error.
- Forms show validation and server field errors.
- Role-gated actions match matrix.
- Stock adjustment handles 409.
- Challan line editor prevents duplicates and calculates preview.
- Save & Confirm handles save-success/confirm-failure correctly.
- Confirmation/cancellation dialogs submit once.
- Query invalidations occur after writes.

### Browser smoke tests

When time permits, automate or manually verify:

1. Login.
2. Create customer and follow-up.
3. Create product and adjust stock.
4. Create/edit/confirm challan.
5. Insufficient-stock behavior.
6. Admin cancellation.
7. Accounts read-only behavior.

---

## 23. Performance guardrails

- Lazy-load route modules if simple to configure, but do not delay delivery for micro-optimization.
- Debounce remote search.
- Bound list/select results.
- Avoid refetch loops caused by unstable query objects.
- Memoize only where measured/obvious; do not blanket-memoize.
- Avoid embedding all movement/follow-up history in detail responses.
- Optimize images only if the optional image feature exists.
- Keep bundle additions justified.

---

## 24. Security considerations

- Never use `dangerouslySetInnerHTML` for notes, reasons, names, or API errors.
- Do not expose secrets in Vite variables.
- Send token only to the configured API origin.
- Clear authenticated query cache on logout.
- Do not trust role/action state from URL or client storage alone.
- Avoid logging forms/tokens to browser console in production.
- Render server messages as text.
- Prevent duplicate critical mutations and disable retry.

---

## 25. Risks and mitigations

| Risk | Mitigation |
|---|---|
| UI polish consumes core implementation time | Complete all business flows before decorative refinement |
| Client and server validation drift | Keep schemas mapped to documented contracts and test server errors |
| Role gate is treated as security | API authorization remains mandatory and tested |
| Critical mutation is retried | Disable mutation retry and duplicate submission |
| Mobile tables become unusable | Responsive scroll/summary and viewport test matrix |
| Save & Confirm produces misleading message | Model two-request partial outcome explicitly |
| Stale stock is shown during Draft | Label as current guidance; confirm API remains authoritative |
| Dashboard uses fake/expensive counts | Implement only with documented summary API or keep lightweight |

---

## 26. Acceptance criteria

- [x] Frontend architecture, routes, providers, and feature ownership are documented.
- [x] Admin layout and responsive behavior are documented.
- [x] API/query/form/error conventions are documented.
- [x] Role-aware and module-specific integration is documented.
- [x] Critical mutation feedback and partial outcomes are documented.
- [x] Accessibility, performance, responsive tests, and security are documented.
- [x] Dashboard scope is controlled.

Implementation completed and verified on 2026-07-28:

- [x] All documented routes and role boundaries are integrated.
- [x] Desktop sidebar and accessible mobile drawer navigation work.
- [x] Dashboard provides trustworthy role-aware quick actions without fake metrics.
- [x] API errors and query retry behavior are normalized.
- [x] Forms, tables, dialogs, loading, empty, error, forbidden, and not-found states are implemented.
- [x] Route-level code splitting removes the original oversized single-page bundle.
- [x] Desktop and 360px mobile browser checks pass without page-level overflow.
- [x] Frontend lint, type-check, tests, and production build pass.

---

## 27. Evidence

- Desktop application screenshots: `docs/screenshots/README.md`
- Responsive browser verification: 360 × 800 CSS viewport, 344.8 px main
  content, 312.8 px page content, 311.2 px table container, and no console
  warnings/errors.
- Route, role, schema, and frontend test evidence:
  `docs/evidence/quality/STEP_09_VERIFICATION.md`
- Production frontend build and full-flow browser smoke:
  `docs/evidence/deployment/STEP_10_LOCAL_PRODUCTION_SMOKE.md`
- Final commit hash remains pending repository author configuration.

---

## 28. Handoff to Step 9

Step 9 validates the complete application. It must run backend, database, frontend, security, authorization, accessibility, build, and critical concurrency checks. It must distinguish verified behavior from planned behavior and block release when stock or lifecycle invariants fail.

---

## 29. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Defined complete frontend architecture, integration, responsive UX, accessibility, query/form conventions, and tests. |
| 1.1 | 2026-07-28 | Added explicit source-derived frontend requirements and separated them from selected library and UX decisions. |
| 1.2 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.3 | 2026-07-28 | Recorded completed frontend integration, responsive shell, role-aware dashboard, query/error conventions, route splitting, and browser evidence. |
| 1.4 | 2026-07-28 | Fixed mobile flex/grid intrinsic-width collapse discovered during screenshot QA and replaced evidence placeholders with verified references and measurements. |
