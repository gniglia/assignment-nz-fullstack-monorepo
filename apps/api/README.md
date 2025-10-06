# Assignment API

A Fastify-based API with TypeScript, Prisma, and PostgreSQL.

## Tech Stack

- **Fastify** - Fast and low overhead web framework
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **Zod** - Schema validation

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (package manager)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your database credentials
```

3. Set up the database:
```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Or run migrations
pnpm db:migrate
```

4. Start the development server:
```bash
pnpm dev
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Metrics
- `GET /api/metrics` - Get all metrics
- `GET /api/metrics/:id` - Get metric by ID
- `POST /api/metrics` - Create new metric
- `PUT /api/metrics/:id` - Update metric
- `DELETE /api/metrics/:id` - Delete metric

## Development

### Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm db:studio` - Open Prisma Studio

### Project Structure

```
src/
├── routes/          # Fastify route plugins (thin HTTP layer)
├── usecases/        # Business logic as pure functions
├── repos/           # Data access functions (Prisma)
├── schemas/         # Zod input/output validators and DTOs
├── lib/             # Cross-cutting utilities (Result type, etc.)
├── adapters/        # Stateful integrations (if needed)
├── app.ts           # App builder with dependency injection
└── server.ts        # Main server entry point
```

### Architecture Principles

- **Functional-first**: Pure functions over classes
- **Dependency injection**: Pass dependencies as parameters
- **Result types**: Handle errors without throwing across layers
- **Schema validation**: Zod for input/output validation
- **Clean separation**: Routes → Use cases → Repositories
