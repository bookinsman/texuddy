# Texuddy Project Structure

## Monorepo Organization

```
texuddy/
├── apps/
│   └── web/                          # Next.js web application
│       ├── src/
│       │   ├── app/                  # Next.js App Router pages
│       │   │   ├── page.tsx          # Home/Landing page
│       │   │   ├── kid/              # Kid dashboard routes
│       │   │   │   ├── page.tsx
│       │   │   │   └── layout.tsx
│       │   │   ├── parent/           # Parent dashboard routes
│       │   │   │   └── page.tsx
│       │   │   ├── layout.tsx        # Root layout
│       │   │   └── globals.css       # Global styles
│       │   ├── components/           # React components
│       │   │   ├── dashboard/        # Dashboard components
│       │   │   │   ├── KidDashboard.tsx
│       │   │   │   ├── Sidebar.tsx
│       │   │   │   └── EmailList.tsx
│       │   │   └── email/            # Email flow components
│       │   │       └── EmailFlow.tsx
│       │   ├── hooks/                # Custom React hooks
│       │   │   ├── useUser.ts
│       │   │   └── useEmails.ts
│       │   └── lib/                  # Utilities & data
│       │       ├── data/             # Mock data (ready for Supabase)
│       │       │   ├── emails.ts
│       │       │   └── users.ts
│       │       └── constants.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.js
│       ├── tailwind.config.js
│       └── postcss.config.js
│
├── packages/
│   ├── types/                        # Shared TypeScript types
│   │   ├── src/
│   │   │   └── index.ts             # Email, User, Badge, etc.
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── utils/                        # Shared utilities
│   │   ├── src/
│   │   │   └── index.ts             # AI level calc, points, etc.
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── ui/                           # Shared UI components
│       ├── src/
│       │   ├── index.ts             # Component exports
│       │   ├── Button.tsx
│       │   ├── Card.tsx
│       │   ├── Badge.tsx
│       │   ├── ProgressBar.tsx
│       │   ├── KeywordSelector.tsx
│       │   └── RetypingInterface.tsx
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                      # Root workspace config
├── tsconfig.json                     # Shared TS config
├── turbo.json                        # Turborepo config
├── .gitignore
└── README.md
```

## File Organization Principles

### ✅ Separation of Concerns
- **Components**: UI-only, no business logic
- **Hooks**: State management & side effects
- **Lib/Data**: Data access layer (ready for Supabase)
- **Types**: Centralized type definitions
- **Utils**: Pure functions, no side effects

### ✅ File Size Management
- Components: < 200 lines each
- Hooks: < 100 lines each
- Utils: Single responsibility functions
- Types: Grouped by domain

### ✅ Clean Architecture
- Shared code in `packages/`
- App-specific code in `apps/web/src/`
- No circular dependencies
- Clear import paths with aliases

## Key Features Implemented

### ✅ Core Structure
- Monorepo with Turborepo
- TypeScript throughout
- Next.js 14 (App Router)
- Tailwind CSS for styling

### ✅ UI Components (packages/ui)
- Button (variants, sizes)
- Card (padding options)
- Badge (status variants)
- ProgressBar (with labels)
- KeywordSelector (interactive)
- RetypingInterface (real-time validation)

### ✅ Dashboard Features
- Kid dashboard with sidebar
- Email list with filtering
- AI companion display
- Stats tracking
- Badge system

### ✅ Email Flow
- Problem display
- Keyword selection (3 of 5)
- Retyping with validation
- Success screen with unlock code

### ✅ Data Layer
- Mock email data (ready for Supabase)
- User state management
- Type-safe data structures

## Next Steps (Future)

### 🔄 Authentication
- Supabase Auth integration
- Parent/Kid role management
- Session handling

### 🔄 Database
- Supabase schema setup
- Email storage
- User progress tracking
- Reward codes

### 🔄 Advanced Features
- Real-time updates
- Analytics
- Payment integration (Stripe)
- Mobile app (React Native)

## Development Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build all packages
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS
- **Monorepo**: Turborepo
- **Future**: Supabase, Vercel

