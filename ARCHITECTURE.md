# ReplyGenius Architecture

## Project Structure Overview

This monorepo is structured to support:
- **Mobile app** (React Native/Expo) for kids
- **Web app** (Next.js) for parents/admin
- **Shared packages** for code reuse
- **Future Supabase integration** (database, auth, real-time)
- **Future Vercel deployment** (web app)

## Directory Structure

```
replygenius/
├── apps/
│   ├── mobile/                 # React Native (Expo) app
│   │   ├── app/                # Expo Router screens
│   │   │   ├── (tabs)/        # Tab navigation
│   │   │   ├── _layout.tsx    # Root layout
│   │   │   └── index.tsx      # Home screen
│   │   ├── components/        # Mobile-specific components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/             # Mobile-specific utilities
│   │   ├── assets/            # Images, icons, fonts
│   │   ├── app.json           # Expo configuration
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/                    # Next.js web app
│       ├── app/               # Next.js App Router
│       │   ├── layout.tsx     # Root layout
│       │   ├── page.tsx       # Home page
│       │   └── globals.css    # Global styles
│       ├── components/        # Web-specific components
│       ├── lib/               # Utilities (future: Supabase client)
│       ├── styles/            # Additional styles
│       ├── package.json
│       ├── tsconfig.json
│       └── next.config.js
│
├── packages/
│   ├── ui/                     # Shared UI components
│   │   ├── src/
│   │   │   ├── Button.tsx     # Reusable button component
│   │   │   ├── Card.tsx       # Reusable card component
│   │   │   └── index.ts       # Exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── utils/                  # Shared utilities
│   │   ├── src/
│   │   │   ├── date.ts        # Date formatting
│   │   │   ├── validation.ts  # Input validation
│   │   │   ├── formatting.ts  # Text formatting
│   │   │   └── index.ts       # Exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── config/                 # Configuration & constants
│   │   ├── src/
│   │   │   ├── constants.ts   # App constants (badges, levels, etc.)
│   │   │   ├── env.ts         # Environment variables
│   │   │   └── index.ts       # Exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── supabase/               # Supabase client (placeholder)
│       ├── src/
│       │   ├── types.ts       # Database types
│       │   ├── client.ts      # Supabase client setup (placeholder)
│       │   └── index.ts       # Exports
│       ├── package.json
│       └── tsconfig.json
│
├── supabase/                   # Supabase project files
│   ├── migrations/            # SQL migrations (future)
│   ├── functions/             # Edge functions (future)
│   └── config.toml            # Supabase config
│
├── package.json               # Root workspace config
├── turbo.json                 # Turborepo configuration
├── tsconfig.json              # Shared TypeScript config
├── .gitignore
├── .prettierrc
├── .env.example
└── README.md
```

## Package Dependencies

### Root Dependencies
- `turbo` - Monorepo build system
- `prettier` - Code formatting
- `typescript` - Type checking

### Mobile App Dependencies
- `expo` - Expo framework
- `expo-router` - File-based routing
- `react-native` - React Native core
- Shared packages: `@replygenius/ui`, `@replygenius/utils`, `@replygenius/config`

### Web App Dependencies
- `next` - Next.js framework
- `react` - React library
- Shared packages: `@replygenius/ui`, `@replygenius/utils`, `@replygenius/config`

## Future Integration Points

### Supabase Integration
When ready to integrate Supabase:

1. **Install Supabase client**:
   ```bash
   npm install @supabase/supabase-js --workspace=@replygenius/supabase
   ```

2. **Update `packages/supabase/src/client.ts`**:
   - Create actual Supabase client instance
   - Configure with environment variables

3. **Database Schema**:
   - Create migrations in `supabase/migrations/`
   - Generate TypeScript types: `supabase gen types typescript`

4. **Authentication**:
   - Parent accounts (email/password)
   - Kid profiles (linked to parent)

### Vercel Deployment
When ready to deploy web app:

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Configure `apps/web/next.config.js`**:
   - Add image optimization
   - Configure environment variables

3. **Deploy**:
   - Connect GitHub repo to Vercel
   - Vercel will auto-detect Next.js app
   - Configure build command: `npm run build --workspace=@replygenius/web`

## Development Workflow

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development**:
   ```bash
   npm run dev
   ```
   This starts both mobile and web apps concurrently.

3. **Build packages**:
   ```bash
   npm run build
   ```
   Builds all packages and apps in dependency order.

4. **Run linting**:
   ```bash
   npm run lint
   ```

## Type Safety

- All packages use TypeScript
- Shared types defined in `packages/supabase/src/types.ts`
- Type checking runs on build and can be checked with `tsc --noEmit`

## Code Sharing Strategy

- **UI Components**: Use `@replygenius/ui` for components that work on both web and mobile
- **Utilities**: Use `@replygenius/utils` for pure functions (date, validation, formatting)
- **Configuration**: Use `@replygenius/config` for constants and environment variables
- **Database**: Use `@replygenius/supabase` for database client and types

## Next Steps

1. Set up Supabase project
2. Create database schema (users, emails, progress)
3. Implement authentication flows
4. Build email system with pre-written content
5. Implement AI companion gamification
6. Build retyping interface
7. Create parent dashboard
8. Add payment integration (Stripe)

