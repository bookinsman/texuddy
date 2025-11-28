# ReplyGenius Monorepo

**Your AI Partner in Helping Others**

Educational platform where children (ages 9-14) become "Helper Agents" who assist real people with problems by retyping expert advice.

## 🏗️ Project Structure

```
replygenius/
├── apps/
│   ├── mobile/          # React Native app (Expo)
│   └── web/             # Next.js app
├── packages/
│   ├── ui/              # Shared UI components
│   ├── utils/           # Shared utilities
│   ├── config/          # Configuration & constants
│   └── supabase/        # Supabase client & types (placeholder)
├── supabase/
│   ├── migrations/      # SQL migrations (future)
│   └── functions/       # Edge functions (future)
└── package.json         # Workspace root
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Development

```bash
# Run all apps in development mode
npm run dev

# Run specific app
npm run dev --workspace=@replygenius/mobile
npm run dev --workspace=@replygenius/web
```

### Building

```bash
# Build all packages and apps
npm run build

# Build specific package
npm run build --workspace=@replygenius/ui
```

## 📦 Workspaces

### Apps

- **@replygenius/mobile** - React Native Expo app
- **@replygenius/web** - Next.js web app

### Packages

- **@replygenius/ui** - Shared UI components (React Native compatible)
- **@replygenius/utils** - Shared utilities (date, validation, formatting)
- **@replygenius/config** - Configuration and constants
- **@replygenius/supabase** - Supabase client setup (placeholder for future)

## 🛠️ Tech Stack

- **Monorepo**: Turborepo
- **Mobile**: React Native (Expo)
- **Web**: Next.js 14
- **Language**: TypeScript
- **Package Manager**: npm workspaces

## 🔮 Future Integrations

This structure is prepared for:

- **Supabase**: Database, authentication, real-time features
- **Vercel**: Web app deployment
- **Stripe**: Payment processing
- **Analytics**: User behavior tracking

## 📝 Scripts

- `npm run dev` - Start all apps in development
- `npm run build` - Build all packages and apps
- `npm run lint` - Lint all packages
- `npm run test` - Run tests
- `npm run clean` - Clean build artifacts

## 🎯 Core Features (To Be Implemented)

1. User Authentication (Parent & Kid accounts)
2. Email System (100+ pre-written emails)
3. AI Companion System (gamification)
4. Keyword Selection Interface
5. Retyping Interface with validation
6. Gamification (points, streaks, badges)
7. Reward System (unlock codes)
8. Parent Dashboard
9. Progress Tracking

## 📄 License

Private - All rights reserved

