# Texuddy

**Prepare for future challenges - Build a better mind via retyping professional texts**

Educational platform where children (ages 9-14) prepare for future challenges by retyping professional texts to build better minds and develop communication skills.

## How It Works

### The Science Behind Retyping

By retyping professional responses, students teach their brains to:

- **Memorize Vocabulary** - Professional terms, phrases, and business language become part of their active vocabulary through repeated exposure and practice
- **Learn Sentence Structure** - Complex professional sentence patterns, formal constructions, and persuasive language structures are internalized through focused repetition
- **Insert into Subconscious** - Through consistent retyping practice, professional communication patterns become second nature, stored in the subconscious mind for automatic recall

### Focus Areas

The platform focuses on real-world professional scenarios including:

- **Communication Skills** - Clear, effective professional communication, team collaboration, client relations
- **Sales Mastery** - Persuasive proposals, client retention strategies, closing techniques, value propositions
- **Negotiation Skills** - Diplomatic negotiations, contract discussions, partnership proposals, win-win solutions

### The Learning Process

1. **Read** - Students read professional responses to real business situations
2. **Retype** - They carefully retype each word, building muscle memory and neural pathways
3. **Internalize** - Vocabulary, sentence structures, and communication patterns are stored in long-term memory
4. **Apply** - These patterns become available for future use in real-world professional situations

Each retyping session builds neural pathways that make professional communication feel natural and automatic, preparing students for future career challenges.

## Project Structure

```
texuddy/
├── apps/
│   ├── web/              # Next.js web application
│   └── mobile/           # React Native app (Expo)
├── packages/
│   ├── ui/               # Shared UI components
│   ├── utils/            # Shared utilities
│   └── types/            # TypeScript type definitions
├── package.json          # Root workspace config
├── turbo.json           # Turborepo config
└── tsconfig.json        # Shared TypeScript config
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- For mobile: Expo CLI (`npm install -g expo-cli`) or Expo Go app on your phone

### Installation

```bash
# Install dependencies
npm install

# Run web development server
cd apps/web
npm run dev
```

The web app will be available at `http://localhost:3000`

### Mobile App

```bash
# Navigate to mobile app
cd apps/mobile

# Install mobile dependencies (if needed)
npm install

# Start Expo development server
npm start
# or
npx expo start
```

Then scan the QR code with Expo Go app (iOS/Android) or press `w` to open in web browser.

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Monorepo**: Turborepo
- **Future**: Supabase (auth + database), Vercel (hosting)

## Development

```bash
# Run all apps in dev mode
npm run dev

# Build all packages
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

## Features (In Development)

- ✅ Monorepo structure
- ✅ TypeScript setup
- ✅ Shared UI components
- ✅ Web app (Next.js)
- ✅ Mobile app (React Native/Expo)
- ✅ Email system
- ✅ AI companion system
- ✅ Retyping interface
- ✅ Gamification system
- ✅ Parent/Kid dashboards
- 🔄 Authentication system (Supabase ready)

## License

Private
