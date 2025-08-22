# KarshLinksh

A brief description of the project.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

```bash
git clone https://github.com/utk-dwd/KarshLinksh.git
cd KarshLinksh
```


# KarshLinkSh Project Structure

## Overview
This is a monorepo using Turborepo with a NestJS backend and Next.js frontend. The project uses pnpm as the package manager.

## Root Directory
```
├── .npmrc                 # NPM configuration
├── package.json          # Root package configuration
├── pnpm-workspace.yaml   # PNPM workspace configuration
├── turbo.json           # Turborepo configuration
└── README.md            # Root documentation
```

## Applications (`/apps`)

### Backend (`/apps/backend`)
NestJS application with the following structure:
```
├── src/
│   ├── config/           # Configuration modules
│   │   ├── database.config.ts
│   │   └── jwt.config.ts
│   │
│   ├── modules/          # Feature modules
│   │   ├── analytics/    # Analytics feature
│   │   ├── auth/        # Authentication
│   │   ├── common/      # Shared utilities
│   │   ├── links/       # Link management
│   │   ├── payments/    # Payment processing
│   │   └── users/       # User management
│   │
│   ├── prisma/          # Database layer
│   │   ├── prisma.service.ts
│   │   └── schema.prisma
│   │
│   ├── app.module.ts    # Root application module
│   └── main.ts         # Application entry point
```

### Frontend (`/apps/frontend`)
Next.js application structure:
```
├── app/                 # Next.js 13+ App Router
│   ├── fonts/          # Custom fonts
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
│
├── public/             # Static assets
└── next.config.js      # Next.js configuration
```

## Packages (`/packages`)

### Shared Packages
```
├── eslint-config/      # Shared ESLint configurations
│   ├── base.js
│   ├── next.js
│   └── react-internal.js
│
├── shared/            # Shared React components
│   └── src/
│       ├── button.tsx
│       ├── card.tsx
│       └── code.tsx
│
└── typescript-config/  # Shared TypeScript configurations
    ├── base.json
    ├── nextjs.json
    └── react-library.json
```

## Testing
- Backend E2E tests are located in `/apps/backend/test/`
- Unit tests are co-located with their respective modules

## Configuration Files
- `.prettierrc` - Code formatting
- `eslint.config.mjs` - ESLint configuration
- `tsconfig.json` - TypeScript configuration
- `nest-cli.json` - NestJS CLI configuration

## Development Setup
1. Install pnpm (if not installed)
2. Run `pnpm install` at root
3. Set up environment variables
4. Run `pnpm dev` to start development servers

## Important Notes
- The project uses Prisma as the ORM
- Authentication includes Google OAuth strategy
- Shared components are in the `packages/shared` directory
- ESLint and TypeScript configs are shared across packages

## Usage

Explain how to use the project.

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

This project is licensed under the MIT License.