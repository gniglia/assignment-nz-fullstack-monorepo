# Claude Code Commands

This file contains helpful commands for this React UI assignment project.

## Development Commands

```bash
# Start development server
npm run dev

# Start mock API server
npm run api

# Run both development and API servers concurrently
npm run dev & npm run api

# Build for production
npm run build

# Preview production build
npm run preview
```

## Code Quality Commands

```bash
# Run ESLint
npm run lint

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm test -- --watch

# Check TypeScript types
npx tsc --noEmit
```

## Useful Development URLs

- Development Server: http://localhost:9000
- Mock API: http://localhost:3001
- API Endpoints:
  - Users: http://localhost:3001/users
  - Metrics: http://localhost:3001/metrics
  - Analytics: http://localhost:3001/analytics

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/dashboard-metrics

# Add and commit changes
git add .
git commit -m "feat: implement dashboard metrics cards"

# Push changes
git push origin feature/dashboard-metrics
```

## Testing Commands

```bash
# Run specific test file
npm test Button.test.tsx

# Run tests with coverage
npm test -- --coverage

# Run tests for changed files only
npm test -- --changed
```

## Debugging

```bash
# Check package versions
npm list

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npx tsc --noEmit --watch
```

## Assignment Specific Commands

```bash
# Install additional dependencies (if needed)
npm install axios react-query

# Add testing utilities
npm install -D @testing-library/user-event

# Check bundle size
npm run build && npx vite-bundle-analyzer dist
```