<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Mandatory Workspace Rule: Backend-First Logic Placement
Whenever any requirement or feature is requested by the USER:
1. **Analyze Separation of Concerns**: Always determine whether the logic belongs on the Backend or Frontend.
2. **Backend-First Rule**: All core business logic, financial calculations (prices, splits, balances, commissions), data validation, authentication/authorization, inventory management, and digital asset decryption/delivery MUST live on the Backend.
3. **Frontend Responsibility**: The Frontend is strictly a consumer of Backend APIs, responsible for presentation, UX, and displaying validated state. Never trust client-provided numbers, prices, or roles.
