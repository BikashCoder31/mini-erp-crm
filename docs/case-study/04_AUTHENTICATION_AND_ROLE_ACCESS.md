# Step 4 — Authentication and Role-Based Access

**Project:** Mini ERP + CRM Operations Portal  
**Document ID:** CASE-STUDY-STEP-04  
**Version:** 1.2  
**Documentation status:** Complete  
**Implementation status:** Complete  
**Date:** 2026-07-28  
**Source assignment:** `Full Stack Developer Case Study (1).pdf`  
**Depends on:** Steps 1–3

---

## 1. Purpose

This document defines authentication, password storage, JWT issuance and verification, required seeded accounts, backend role enforcement, frontend protected routes, session behavior, and security tests for the four assignment roles.

The objective is a simple but defensible assessment implementation. It deliberately avoids registration, password reset, refresh tokens, social login, and enterprise identity features because they are outside the case-study scope.

---

## 2. Source-derived requirements

**[SOURCE]** The application must provide login functionality with role-based access.

**[SOURCE]** Required roles are Admin, Sales, Warehouse, and Accounts.

**[SOURCE]** Simple JWT-based authentication is acceptable.

**[SOURCE]** Final submission must provide test login credentials for every role.

---

## 3. Authentication boundary

### 3.1 Included

- Email/password login.
- bcrypt password hashing.
- One short-lived JWT access token.
- Bearer authentication.
- User-active check.
- Four seeded role accounts.
- Backend role guard.
- Frontend protected routes and role-aware actions.
- Logout by clearing client session state.
- Login rate limiting.
- Authentication and authorization tests.

### 3.2 Excluded

- Public registration.
- User-management UI.
- Password reset or change.
- Refresh tokens.
- Email verification.
- Multi-factor authentication.
- OAuth/social sign-in.
- Single sign-on.
- Persistent “remember me”.
- Account lockout administration.

These exclusions must be listed in final known limitations rather than hidden.

---

## 4. Password policy and storage

### 4.1 Seed password requirements

- 12–128 characters for assessment seed accounts.
- Must not equal the email, role, or common placeholder such as `password`.
- Supplied only through seed environment variables.
- May be shared with the evaluator through the final submission, but not committed into source code.

### 4.2 Hashing

**[DECISION]** Use bcrypt with a work factor of 12 unless local performance testing shows it prevents practical evaluation. Any change must be documented.

Rules:

- Hash in the seed service before database upsert.
- Compare using bcrypt's constant-time comparison implementation.
- Never log plaintext passwords or hashes.
- Never return `passwordHash` through Prisma selections used by controllers.
- Do not trim passwords; whitespace may be intentional. Email is trimmed and lowercased.

---

## 5. JWT contract

### 5.1 Algorithm and secret

- Algorithm: HS256 for the small case-study service.
- Secret: at least 32 random bytes, supplied by `JWT_SECRET`.
- Token lifetime: 8 hours (`28800` seconds) for convenient same-day evaluation.
- Issuer: `JWT_ISSUER`.
- Audience: `JWT_AUDIENCE`.

### 5.2 Claims

```json
{
  "sub": "user-uuid",
  "email": "sales@example.com",
  "role": "SALES",
  "type": "access",
  "iss": "mini-erp-api",
  "aud": "mini-erp-web",
  "iat": 1785225600,
  "exp": 1785254400
}
```

Rules:

- `sub` is the canonical user identifier.
- Only known enum roles are accepted.
- `type` must equal `access`.
- The API verifies signature, issuer, audience, and expiration.
- The token contains no password, hash, sensitive profile data, or authorization list beyond role.

### 5.3 Active-user validation

The JWT strategy loads the user by `sub` on each authenticated request and confirms `isActive = true`. This adds a database query but lets deactivation take effect before token expiry, which is acceptable for the small assignment workload.

The request user object contains only:

```ts
interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
```

---

## 6. Backend module design

```text
src/auth/
├── decorators/
│   ├── current-user.decorator.ts
│   └── roles.decorator.ts
├── dto/
│   └── login.dto.ts
├── guards/
│   ├── jwt-auth.guard.ts
│   └── roles.guard.ts
├── strategies/
│   └── jwt.strategy.ts
├── auth.controller.ts
├── auth.module.ts
├── auth.service.ts
└── auth.types.ts
```

### 6.1 Responsibilities

#### `AuthController`

- `POST /auth/login`
- `GET /auth/me`
- No password comparison logic.

#### `AuthService`

- Normalize email.
- Load user with password hash only for login.
- Verify password.
- Reject inactive users through the same generic login response.
- Sign JWT.
- Return the safe user projection.

#### `JwtStrategy`

- Validate token claims.
- Load active user.
- Return the safe request user.

#### `JwtAuthGuard`

- Require a valid bearer token.
- Map missing, expired, and invalid tokens to stable error codes.

#### `RolesGuard`

- Read role metadata from the handler/class.
- Allow when no role restriction is declared but authentication is required.
- Reject unauthorized roles with `403 FORBIDDEN_ROLE`.
- Never trust a role supplied in request body, query, or headers.

---

## 7. Decorator pattern

```ts
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
```

Example:

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SALES)
@Post()
createCustomer(...) {}
```

For consistency, controllers may apply `JwtAuthGuard` and `RolesGuard` at class level and role decorators per mutation.

---

## 8. Login flow

```text
Browser submits email/password
        │
        ▼
POST /api/v1/auth/login
        │
        ├─ Validate DTO
        ├─ Normalize email
        ├─ Find user including passwordHash
        ├─ bcrypt.compare
        ├─ Confirm isActive
        ├─ Sign JWT claims
        └─ Return token + safe user
        │
        ▼
Frontend stores assessment session
        │
        ├─ Attach Bearer token to API calls
        ├─ Load /auth/me on refresh
        └─ Route by authenticated state
```

Every login failure caused by unknown email, wrong password, or inactive user returns:

```json
{
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password.",
    "requestId": "req_01J..."
  }
}
```

This avoids account enumeration.

---

## 9. Login rate limiting

**[DECISION]** Apply a stricter route-level limit to login, for example five attempts per minute per IP, while keeping a more generous general API limit.

Requirements:

- Return `429 RATE_LIMIT_EXCEEDED`.
- Do not reveal whether an account exists.
- Ensure proxy trust is configured correctly on hosted environments before relying on forwarded client IPs.
- Document that in-memory rate limits reset on service restart and are not distributed; acceptable for a single assessment instance.

---

## 10. Seeded role accounts

The seed script defined in Step 2 must upsert:

| Display name | Role | Email variable | Password variable |
|---|---|---|---|
| Admin User | ADMIN | `ADMIN_SEED_EMAIL` | `ADMIN_SEED_PASSWORD` |
| Sales User | SALES | `SALES_SEED_EMAIL` | `SALES_SEED_PASSWORD` |
| Warehouse User | WAREHOUSE | `WAREHOUSE_SEED_EMAIL` | `WAREHOUSE_SEED_PASSWORD` |
| Accounts User | ACCOUNTS | `ACCOUNTS_SEED_EMAIL` | `ACCOUNTS_SEED_PASSWORD` |

Seed behavior:

1. Validate all values.
2. Normalize each email.
3. Hash each password.
4. Upsert by email.
5. Set expected name, role, and active status.
6. Print only safe messages such as role and email; never passwords.

The final README/submission may list assessment passwords separately, but the repository must not contain real production secrets.

---

## 11. Canonical role-permission matrix

| Capability | ADMIN | SALES | WAREHOUSE | ACCOUNTS |
|---|---:|---:|---:|---:|
| View own session | Yes | Yes | Yes | Yes |
| View customers | Yes | Yes | Yes | Yes |
| Create/edit customers | Yes | Yes | No | No |
| Add customer follow-up | Yes | Yes | No | No |
| View products | Yes | Yes | Yes | Yes |
| Create/edit/deactivate products | Yes | No | Yes | No |
| Add manual stock IN/OUT | Yes | No | Yes | No |
| View stock movements | Yes | Yes | Yes | Yes |
| View challans | Yes | Yes | Yes | Yes |
| Create/edit/confirm challans | Yes | Yes | No | No |
| Cancel a Draft challan | Yes | Yes | No | No |
| Cancel a Confirmed challan | Yes | No | No | No |
| View dashboard | Yes | Yes | Yes | Yes |

**[ASSUMPTION]** Accounts is read-only because the required scope does not define accounting mutations. Warehouse can read customers and challans to support fulfillment context but cannot alter them.

---

## 12. Frontend session strategy

### 12.1 Storage choice

**[DECISION]** Store the access token and minimal user projection in `sessionStorage`, mirrored in React state.

Reasons:

- Simpler than cross-origin HttpOnly-cookie and CSRF handling within 48 hours.
- Survives a page refresh.
- Clears when the browser tab/session closes.
- Better than long-lived `localStorage` persistence for this assessment.

**[RISK]** Any JavaScript-accessible token is exposed if the application has an XSS vulnerability. Mitigations include no raw HTML rendering, dependency discipline, escaped React text output, CSP where hosting permits, short lifetime, and session rather than persistent storage. This limitation must be disclosed.

### 12.2 Authentication provider

```text
src/features/auth/
├── api.ts
├── auth-context.tsx
├── auth-storage.ts
├── auth-types.ts
├── login-schema.ts
└── use-auth.ts
```

State:

```ts
type AuthState =
  | { status: 'loading'; user: null }
  | { status: 'anonymous'; user: null }
  | { status: 'authenticated'; user: AuthUser };
```

Methods:

- `login(email, password)`
- `logout()`
- `restoreSession()`
- `hasRole(...roles)`

### 12.3 Restore flow

1. Read token from `sessionStorage`.
2. If absent, set anonymous state.
3. If present, call `/auth/me`.
4. On success, refresh user state.
5. On 401, clear storage and redirect to login.
6. On temporary network failure, show a recoverable session-check error rather than treating it as confirmed invalid credentials.

### 12.4 Axios/client interceptor

Request:

- Attach `Authorization: Bearer <token>` when present.

Response:

- On `401 AUTH_TOKEN_EXPIRED`, `AUTH_TOKEN_INVALID`, or `AUTH_USER_INACTIVE`, clear session and redirect to login once.
- Avoid redirect loops for the login request itself.
- Do not automatically retry non-idempotent operations after authentication failures.

---

## 13. Protected and role-aware routes

### 13.1 Components

- `RequireAuth`: blocks anonymous users.
- `RequireRole`: blocks authenticated users without required roles.
- `PublicOnlyRoute`: redirects already-authenticated users away from login.
- `ForbiddenPage`: explains lack of access without exposing sensitive details.

### 13.2 Route behavior

| Situation | Behavior |
|---|---|
| Anonymous user opens protected route | Redirect to `/login` with safe return path |
| Authenticated user opens `/login` | Redirect to `/dashboard` |
| User lacks route role | Render `/403` |
| Token expires during use | Clear session and redirect to login |
| Unknown route | Render `/404` |

Validate return paths so an attacker cannot create an external open redirect.

### 13.3 UI permissions

- Hide or disable actions the role cannot perform.
- Tooltips may explain read-only access.
- Never rely on hidden buttons as security.
- If backend returns 403 despite UI gating, display the safe server message.

---

## 14. Login page requirements

The page must include:

- Product/app name.
- Email field.
- Password field with show/hide control.
- Submit button.
- Loading state.
- Generic invalid-credential message.
- Keyboard submission.
- Accessible labels and focus behavior.
- Optional assessment credential hint only when explicitly enabled by a non-secret public flag; otherwise credentials remain in README/submission.

Do not display all role passwords directly on a public production login page.

---

## 15. Validation and error behavior

### 15.1 Login DTO

```ts
class LoginDto {
  email: string;    // required, email, <= 254
  password: string; // required, 8–128
}
```

### 15.2 Authentication errors

| Status | Code | Client behavior |
|---:|---|---|
| 400 | `VALIDATION_FAILED` | Show field validation |
| 401 | `AUTH_INVALID_CREDENTIALS` | Show generic login error |
| 401 | `AUTH_TOKEN_MISSING` | Redirect protected access to login |
| 401 | `AUTH_TOKEN_INVALID` | Clear session and redirect |
| 401 | `AUTH_TOKEN_EXPIRED` | Clear session and redirect |
| 401 | `AUTH_USER_INACTIVE` | Clear session and show account unavailable message |
| 403 | `FORBIDDEN_ROLE` | Show 403 page or action error |
| 429 | `RATE_LIMIT_EXCEEDED` | Ask user to retry later without a countdown promise |

---

## 16. Logging and audit boundaries

Log safe events:

- Login success with user ID, role, request ID, and timestamp.
- Login failure with normalized email hash or redacted identifier, IP context, request ID, and reason category internally.
- Authorization denial with user ID, role, route, and request ID.
- Session user inactive.

Never log:

- Passwords.
- JWTs.
- `Authorization` headers.
- Password hashes.
- Full environment variables.

The assignment does not require a separate authentication audit table. Structured application logs are sufficient for P0.

---

## 17. Testing plan

### 17.1 Unit tests

- Email normalization.
- Correct password returns token.
- Wrong password returns generic unauthorized error.
- Unknown user returns the same public error.
- Inactive user returns the same login error.
- JWT payload contains required claims only.
- Roles guard allows/denies correct combinations.

### 17.2 API integration tests

- `POST /auth/login` succeeds for all four seeded roles.
- Invalid DTO returns 400.
- Invalid password returns 401.
- Missing token returns 401.
- Expired token returns 401 with stable code.
- Modified signature returns 401.
- `/auth/me` returns safe user data and no hash.
- Deactivating a user invalidates subsequent authenticated requests.
- Sales can create customer but Warehouse cannot.
- Warehouse can create product but Accounts cannot.
- Sales can create challan but Warehouse cannot.
- Only Admin can cancel a Confirmed challan.

### 17.3 Frontend tests/manual verification

- Login submit and loading state.
- Failed login retains email but clears or does not expose password.
- Refresh restores a valid session.
- Logout clears storage and queries.
- Unauthorized menu items are not shown.
- Direct URL access still receives 403 or route protection.
- Expired token exits the session cleanly.
- Return path does not permit external redirect.

---

## 18. Security review checklist

- [x] Passwords are bcrypt-hashed with the documented work factor.
- [x] Password hash is omitted from normal Prisma selections.
- [x] JWT secret length is validated.
- [x] JWT verifies algorithm, issuer, audience, type, and expiration.
- [x] Token user is loaded and active.
- [x] Backend guards protect every non-public endpoint.
- [x] Role values come from trusted token/user records only.
- [x] Login responses do not enumerate users.
- [x] Login is rate-limited.
- [x] Tokens and passwords are excluded from logs.
- [x] Browser session clears on logout and authentication failure.
- [x] Raw HTML rendering is not used.
- [x] CORS remains explicit.

---

## 19. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Access token in JavaScript storage | Use sessionStorage, short lifetime, no `dangerouslySetInnerHTML`, strict input rendering, disclose limitation |
| Role guard omitted from one endpoint | Central review against the Step 2 endpoint matrix and authorization integration tests |
| Seed credentials are committed | Environment-driven seed; secret scan and Git review |
| Database lookup per authenticated request adds latency | Acceptable for small app; select only needed fields and index user ID |
| Evaluator loses session when closing tab | Document session behavior and provide credentials clearly |
| Rate limit blocks demo after repeated mistakes | Use a reasonable threshold and document how local reset works without disabling protection |
| JWT secret changes after deployment | Treat as planned token invalidation; redeploy all API instances consistently |

---

## 20. Acceptance criteria

Documentation is complete when:

- [x] Password, JWT, seed-user, backend guard, frontend session, protected route, error, logging, test, and security contracts are defined.
- [x] The four-role permission matrix is locked.
- [x] Scope exclusions and storage limitation are explicit.

Implementation is complete only when:

- [x] Four seeded accounts can log in.
- [x] JWT claims and expiry match the contract.
- [x] `/auth/me` returns safe active-user data.
- [x] Every protected endpoint rejects missing/invalid tokens.
- [x] Backend role tests pass for all mutation groups.
- [x] Frontend session restore, logout, protected routes, and 403 behavior work.
- [x] Login rate limiting and safe logging are verified.
- [x] No secrets or credentials are committed.

---

## 21. Deliverables and evidence

- Auth module source files.
- User seed implementation.
- Environment validation.
- Swagger login and bearer scheme.
- Backend authentication/authorization test output.
- Screenshots for all four role sessions.
- Evidence that restricted actions return 403.
- Secret scan or repository search output.
- Git commit hash.

---

## 22. Handoff to Step 5

Step 5 implements customer CRM using the role rules in this document. Admin and Sales can mutate customer and follow-up data; Warehouse and Accounts are read-only. Customer APIs and UI must use the global contracts from Step 2 and authentication/session foundation from this step.

---

## 23. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-28 | Defined password hashing, JWT claims, active-user checks, seeded roles, backend guards, frontend session handling, protected routes, rate limits, security, and tests. |
| 1.1 | 2026-07-28 | Aligned implementation status with the defined `Not Started` vocabulary; no code or implementation evidence is claimed. |
| 1.2 | 2026-07-28 | Recorded verified four-role authentication, safe JWT/session behavior, backend guards, rate limiting, logging, CORS, and secret checks. |
