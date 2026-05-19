# Manzil Mart — MERN E-Commerce

## Structure

Two independent apps in `Frontend/` and `Backend/` — **no root `package.json`**.

| App | PM | Entry | Type | Port |
|-----|----|-------|------|------|
| Frontend | `pnpm` | `Frontend/` — Vite + React 19 + TS | ESM | `:5173` (Vite) |
| Backend | `npm` | `Backend/server.js` → `src/app.js` | CommonJS | `:3000` |

## Commands

### Frontend (`Frontend/`)
```sh
pnpm dev          # vite
pnpm build        # tsc -b && vite build
pnpm lint         # eslint flat config (ts/tsx only)
pnpm typecheck    # tsc --noEmit
pnpm format       # prettier --write "**/*.{ts,tsx}"
```

### Backend (`Backend/`)
```sh
npm run dev       # npx nodemon server.js
```

**Order**: `lint` → `typecheck` → `build` (no test suite exists).

## Key Quirks

- **Two package managers**: `pnpm` for frontend, `npm` for backend. `pnpm-lock.yaml` and `package-lock.json` both tracked.
- **Tailwind v4**: uses `@import "tailwindcss"` in CSS, **not** v3 `@tailwind` directives. Plugin via `@tailwindcss/vite`.
- **shadcn/ui v4**: Radix Maia style. Components in `src/components/ui/`. Add new ones with `npx shadcn@latest add <name>`.
- **`@/` alias** → `src/` (configured in both Vite and tsconfig).
- **Express 5**: breaking changes from Express 4 (e.g., `req.body` parsing, async error handling).
- **Mongoose 9**: check for API deprecations vs v8.
- **Auth**: JWT in httpOnly cookies — `token` (user/vendor), `adminToken` (admin). Three middleware tiers: `authMiddleware`, `authVendorMiddleware`, `authAdminMiddleware`.
- **Image uploads**: Multer (memory storage) → ImageKit service. Profile pics to `manzil-mart/profile-pictures`, product images to `manzil-mart/product-images`.
- **Cart**: Zustand with `persist` middleware → localStorage key `cart-storage`.
- **`cn()` utility** in `src/lib/utils.ts` (clsx + tailwind-merge). Prettier sorts Tailwind classes via `prettier-plugin-tailwindcss` with `tailwindFunctions: ["cn", "cva"]`.
- **Prettier**: no semicolons, double quotes, trailingComma es5, tabWidth 2, LF. Formats only `.ts,.tsx`.
- **TS strict**: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` all on. Must use `import type` for type-only imports.
- **API prefix**: all routes under `/api/v1/{auth,vendor,product,order,admin}`.
- **No tests, no CI/CD** in the repo.

## Env

`Frontend/.env`:
```
VITE_API_URL=http://localhost:3000/api/v1
```

`Backend/.env`:
```
MONGO_URI=<atlas-uri>
JWT_SECRET=<hex>
IMAGEKIT_PRIVATE_KEY=<key>
PORT=3000
FRONTEND_URL=http://localhost:5173
```

## Three Roles

1. **User** — browses, orders, cancels own orders
2. **Vendor** — applies via `/auth/apply`, approved by admin, manages products, updates item-level order status
3. **Admin** — login via `/admin/login`, approves/rejects vendors, sees all products/orders

## Design Rules

1. **SHADCN** — ALways use shadcn components for designing. dont modify the code of them and also dont change the design structure and theme of it becuase it uses the theme colors.
2. **TAILWINDCSS**: — Use tailwindcss theme colors. no harcoded colors
3. Keep everything minimal and modern and take inspiration from other components.