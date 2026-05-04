# Admin Portal — Coding Guidelines

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Import Order](#import-order)
- [Naming Conventions](#naming-conventions)
- [File Naming Conventions](#file-naming-conventions)
- [TypeScript Rules](#typescript-rules)
- [React Rules](#react-rules)
- [Code Quality Rules](#code-quality-rules)
- [Git & Commit Convention](#git--commit-convention)
- [Pre-commit Hooks](#pre-commit-hooks)
- [ESLint Quick Reference](#eslint-quick-reference)
- [Available Scripts](#available-scripts)

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | React | 19.x |
| Language | TypeScript | 6.x |
| Build Tool | Vite | 8.x |
| Styling | Tailwind CSS | 4.x |
| Linting | ESLint | 10.x |
| Compiler | React Compiler (Babel) | 1.x |

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Project Structure

```
admin-portal/
├── .husky/                  # Git hooks
│   ├── pre-commit           # Runs lint-staged + build
│   └── commit-msg           # Validates commit message
├── src/
│   ├── assets/              # Static assets (images, icons, fonts)
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page-level components (routes)
│   ├── services/            # API calls and external services
│   ├── types/               # Shared TypeScript types/interfaces
│   ├── utils/               # Utility/helper functions
│   ├── constants/           # Constants and configuration
│   ├── context/             # React context providers
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── eslint.config.mjs        # ESLint flat config
├── commitlint.config.js     # Commit message rules
├── tsconfig.json            # Root TypeScript config
├── tsconfig.app.json        # App TypeScript config
├── tsconfig.node.json       # Node (Vite) TypeScript config
└── package.json
```

---

## Import Order

Imports **must** be grouped in the following order with a blank line between each group. Imports are sorted alphabetically within each group.

```typescript
// 1. React (always first)
import { useState, useEffect } from "react";

// 2. Third-party libraries (alphabetical)
import axios from "axios";
import { z } from "zod";

// 3. Internal absolute imports — @/ alias (alphabetical)
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/Button";
import type { User } from "@/types/User";

// 4. Relative parent imports — ../ (alphabetical)
import { formatDate } from "../utils/formatDate";
import type { ApiResponse } from "../types";

// 5. Relative sibling imports — ./ (alphabetical)
import { config } from "./config";
import { helper } from "./helper";

// 6. Type-only imports
import type { FormState } from "./types";

// 7. Styles (always last)
import "./styles.css";
```

**Rules:**

- Always use `import type` for type-only imports
- Always use `@/` alias instead of deep relative paths (`../../..`)
- No duplicate imports from the same module
- Blank line required between each group
- Can be auto-fixed with `npm run lint:fix`

---

## Naming Conventions

### Variables

| Type | Convention | Example |
|---|---|---|
| Regular variables | camelCase | `userName`, `items`, `config` |
| Global constants | UPPER_SNAKE_CASE, camelCase, or PascalCase | `API_BASE_URL`, `apiBaseUrl`, `ApiBaseUrl` |
| Components (variables) | PascalCase | `UserCard`, `NavBar` |
| Boolean variables | camelCase with `is/has/can/should/will/did` prefix | `isLoading`, `hasError`, `canEdit`, `shouldUpdate` |
| Destructured variables | No naming restriction (booleans still need `is/has/can/should/will/did` prefix) | `const { name } = data` |

### Functions

| Type | Convention | Example |
|---|---|---|
| Regular functions | camelCase | `handleSubmit()`, `fetchUsers()` |
| Components | PascalCase | `function UserCard() {}` |
| Event handlers | camelCase with `handle` prefix | `handleClick()`, `handleSubmit()` |
| Custom hooks | camelCase with `use` prefix | `useAuth()`, `useLocalStorage()` |

### TypeScript

| Type | Convention | Example |
|---|---|---|
| Interfaces | PascalCase, `I` prefix required | `IUser`, `IButtonProps` |
| Types | PascalCase | `Status`, `FormState` |
| Enums | PascalCase for name and values | `enum Status { Active, Inactive }` |
| Type parameters | `T` or `TName` | `T`, `TResponse`, `K`, `V` |
| Props types | PascalCase with `Props` suffix | `UserCardProps`, `ButtonProps` |
| State types | PascalCase with `State` suffix | `AppState`, `FormState` |

### Class Members

| Type | Convention | Example |
|---|---|---|
| Public members | camelCase | `name`, `getData()` |
| Private members | camelCase with `_` prefix | `_internalState`, `_processData()` |
| Protected members | camelCase with `_` prefix | `_sharedLogic`, `_helperMethod()` |

### Parameters

| Type | Convention | Example |
|---|---|---|
| Regular parameters | camelCase | `data`, `options` |
| Unused parameters | `_` prefix (still flagged by `no-unused-vars`, so prefer `_` only with rest siblings) | `_event`, `_index` |

---

## File Naming Conventions

| Type | Convention | Example |
|---|---|---|
| React components | PascalCase | `UserCard.tsx`, `NavBar.tsx` |
| Pages/Views | PascalCase | `Dashboard.tsx`, `Settings.tsx` |
| Custom hooks | camelCase with `use` prefix | `useAuth.ts`, `useFetch.ts` |
| Utilities | camelCase | `formatDate.ts`, `calculateTax.ts` |
| Constants | camelCase | `apiEndpoints.ts`, `routes.ts` |
| Types/Interfaces | PascalCase | `User.ts`, `ApiResponse.ts` |
| Context providers | PascalCase | `AuthContext.tsx`, `ThemeContext.tsx` |
| Services | camelCase | `authService.ts`, `userService.ts` |
| Test files | PascalCase with `.test` | `UserCard.test.tsx` |
| Styles | Same as component | `UserCard.css` |
| Folders | kebab-case or camelCase | `components/`, `api-services/` |

---

## TypeScript Rules

### Forbidden

```typescript
// ❌ Never use `any`
function process(data: any) {}

// ❌ Never leave promises floating
fetch("/api/data");

// ❌ Never pass promises to non-async functions
[1, 2].forEach(async (n) => await process(n));

// ❌ Never use unnecessary type assertions
const name: string = "John";
const upper = (name as string).toUpperCase();

// ❌ Never use unnecessary conditions
const val = 5;
if (typeof val === "number") {}

// ❌ Never use method signature style
interface IApi {
  fetch(url: string): Promise<void>;
}
```

### Required

```typescript
// ✅ Use specific types or unknown
function process(data: string) {}
function process(data: unknown) {
  if (typeof data === "string") { /* ... */ }
}

// ✅ Use proper null checks
if (user.name) {
  const upper = user.name.toUpperCase();
}

// ✅ Always handle promises
await fetch("/api/data");
// or
fetch("/api/data").catch(console.error);
// or explicitly ignore
void fetch("/api/data");

// ✅ Use type imports for types
import type { IUser } from "@/types/User";

// ✅ Use optional chaining
const city = user?.address?.city;

// ✅ Use nullish coalescing
const name = user.name ?? "Anonymous";

// ✅ Exhaustive switch cases
type Status = "active" | "inactive" | "pending";
function getLabel(status: Status) {
  switch (status) {
    case "active": return "Active";
    case "inactive": return "Inactive";
    case "pending": return "Pending";
  }
}

// ✅ Use property style for methods
interface IApi {
  fetch: (url: string) => Promise<void>;
}

// ✅ Both interface and type are allowed (consistent-type-definitions is off)
interface IUser { name: string; }
type UserRole = { role: string; };
```

---

## React Rules

### Hooks

```typescript
// ❌ Never call hooks conditionally
function Component({ show }) {
  if (show) {
    const [count, setCount] = useState(0);
  }
}

// ✅ Always call hooks at the top level
function Component({ show }) {
  const [count, setCount] = useState(0);
  if (!show) return null;
  return <div>{count}</div>;
}
```

### Dependencies

```typescript
// ❌ Never omit dependencies from useEffect
function Profile({ userId }) {
  useEffect(() => {
    fetchUser(userId);
  }, []); // missing userId
}

// ✅ Always include all dependencies
function Profile({ userId }) {
  useEffect(() => {
    fetchUser(userId);
  }, [userId]);
}
```

### Fast Refresh

```typescript
// ❌ Do not export non-component values from component files
export const API_URL = "/api";
export function UserCard() { return <div>User</div>; }

// ✅ Keep constants in separate files
// constants.ts
export const API_URL = "/api";
// UserCard.tsx
export function UserCard() { return <div>User</div>; }

// ✅ Or use allowConstantExport (configured)
export const API_URL = "/api"; // allowed with allowConstantExport
export default function UserCard() { return <div>User</div>; }
```

---

## Code Quality Rules

### Style

```typescript
// ✅ 2-space indentation
// ✅ Always use semicolons
// ✅ Double quotes (single allowed inside strings)
// ✅ Always use braces for if/else/for/while
// ✅ Always use === instead of ==
```

### Forbidden Patterns

```typescript
// ❌ console.log (use console.warn or console.error)
console.log("debugging");

// ❌ debugger statements
debugger;

// ❌ var (use const or let)
var count = 0;

// ❌ Self comparison
if (value === value) {}

// ❌ Template literals in regular strings
const msg = "Hello ${name}"; // forgot backticks

// ❌ Useless returns
function greet(name: string) {
  return;
}
```

### Required Patterns

```typescript
// ✅ Use const when variable is not reassigned
const MAX = 100;
let counter = 0; // only when reassigning

// ✅ Use object shorthand
const user = { name, age };

// ✅ Use arrow callbacks
const ids = users.map((u) => u.id);

// ✅ Use template literals for concatenation
const greeting = `Hello, ${name}!`;

// ✅ Use ** instead of Math.pow
const area = radius ** 2;

// ✅ Use arrow functions for parameters
// ✅ Prefer early returns over deep nesting

// ✅ No unused variables (use rest siblings to omit)
const { id: _id, ...rest } = user; // _id is allowed via ignoreRestSiblings
// Note: _-prefixed variables are NOT automatically ignored for unused checks
```

---

## Git & Commit Convention

### Branch Naming

```
feature/GB-123-add-user-management
fix/GB-456-login-crash
refactor/GB-789-api-service
```

### Commit Message Format

All commit messages **must** follow this format:

```
[GB-<ticket-number>] <type>: <subject>
```

**Example:**

```
[GB-123] feat: add user management page
[GB-456] fix: resolve login crash on invalid token
[GB-789] refactor: extract API service layer
```

### Commit Types

| Type | Usage |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, whitespace) |
| `refactor` | Code refactoring (no feature/fix) |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `build` | Build system or dependency changes |
| `ci` | CI/CD configuration changes |
| `chore` | Maintenance tasks |
| `revert` | Reverting a previous commit |

### Rules

- Subject must not end with a period
- Maximum header length: 200 characters
- Commit messages are validated by `commitlint` via Husky hook

---

## Pre-commit Hooks

Husky runs two hooks before your changes are committed:

### 1. Pre-commit (`.husky/pre-commit`)

Runs **lint-staged** followed by **build**:

```bash
npx lint-staged    # Runs ESLint on staged files
npm run build      # Ensures project builds successfully
```

If either step fails, the commit is **aborted**.

### 2. Commit-msg (`.husky/commit-msg`)

Validates commit message format:

```bash
npx --no -- commitlint --edit "$1"
```

Invalid format = **commit rejected**.

---

## ESLint Quick Reference

### Auto-fix

```bash
# Fix all auto-fixable issues
npm run lint:fix
```

The following rules are auto-fixable:
- `indent`, `semi`, `quotes`
- `import-x/order` (import sorting)
- `prefer-const`, `object-shorthand`
- `prefer-arrow-callback`, `prefer-template`
- `@typescript-eslint/consistent-type-imports`
- `@typescript-eslint/prefer-nullish-coalescing`
- `@typescript-eslint/prefer-optional-chain`

### Error Levels

| Level | Meaning |
|---|---|
| `error` | Will fail the build. Must fix. |
| `warn` | Warning. Should fix but won't block. |

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Vite) |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run ESLint on all files |
| `npm run lint:fix` | Run ESLint and auto-fix issues |
| `npm run preview` | Preview production build locally |

---

## Path Aliases

| Alias | Resolves To |
|---|---|
| `@/*` | `./src/*` |

```typescript
// ✅ Use alias
import { Button } from "@/components/Button";

// ❌ Avoid deep relative paths
import { Button } from "../../../components/Button";
```

---

## Checklist Before Committing

- [ ] No `console.log` statements (use `console.warn` or `console.error` if needed)
- [ ] No `debugger` statements
- [ ] No `any` types
- [ ] All imports are properly sorted and grouped
- [ ] All types use `import type` syntax
- [ ] No unused variables
- [ ] Boolean variables use `is/has/can/should/will/did` prefix (including destructured)
- [ ] Interface names use `I` prefix (e.g., `IUser`, `IButtonProps`)
- [ ] Commit message follows `[GB-xxx] type: subject` format
- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` passes successfully
