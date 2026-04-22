@AGENTS.md

# defi_triangle_site — Project Rules

These rules are non-negotiable. Any PR or edit that violates them should be stopped and flagged before implementation.

## Collaboration

- **Stop, propose, confirm.** No autonomous architectural, dependency, or structural decisions. Present 2–3 options with tradeoffs, recommend one, wait for approval.
- Small edits inside an existing file don't need a stop. New top-level files/folders, new deps, refactors, renames — do.
- Keep the user in the loop. No silent choices.

## Code structure

- **700 LOC hard cap per file** (blanks/comments excluded). Enforced by ESLint `max-lines`.
- **Split-coding.** When a file nears the cap, split by responsibility — extract sub-components, hooks, helpers, or server actions into siblings. Don't split prematurely.

## Security — hard "never"s

### Secrets & config
- No hardcoded secrets, tokens, or API keys in source.
- No secrets in logs, error messages, or API responses.
- `.env*` is never committed. Only `.env.example` with placeholders.
- API keys stay server-only. Audit `NEXT_PUBLIC_*` vars carefully — anything prefixed ships to the client bundle.
- No default credentials or example configs in production.
- No debug flags / dev tools enabled in production builds.

### CORS & dependencies
- CORS scoped to known origins. Never `*` with credentials.
- Block known-vulnerable deps (npm audit / Dependabot in CI).

### Access & API
- Auth verified server-side on every protected route. Hiding URLs is not protection.
- Every data fetch authorizes the caller against the resource (no IDOR — changing `:id` must not leak another user's data).
- Session tokens in HttpOnly + Secure cookies. Never `localStorage`.
- Login/password-reset responses identical regardless of account existence (no user enumeration).
- All endpoints rate-limited.
- Error responses generic. Stack traces and internals stay server-side.
- Endpoints return only the fields needed. No `SELECT *`, no overposting.
- Sensitive actions (delete, email change, payment) require explicit confirmation.
- Admin routes guarded by server-side role checks.

### User input
- All DB access parameterized / ORM-safe. No string-concatenated SQL.
- Treat user text as untrusted. Avoid `dangerouslySetInnerHTML`; sanitize when unavoidable.
- File uploads validate MIME type **and** size **server-side** (client-side checks are UX, not security).
- Payment amounts, entitlements, and prices computed and validated server-side. Never trust client-submitted billing data.
