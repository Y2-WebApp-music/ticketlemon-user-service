# Ticketlemon User Service

Elysia user API on [Bun](https://bun.sh) with [Prisma](https://www.prisma.io/) and PostgreSQL.

## Requirements

- [Bun](https://bun.sh)
- PostgreSQL (local or Docker; see `docker-compose.yml`)

## Environment

| Variable       | Description                                                                             |
| -------------- | --------------------------------------------------------------------------------------- |
| `PORT`         | HTTP port (default `8002`)                                                              |
| `DATABASE_URL` | Postgres connection string for the app runtime                                          |
| `DIRECT_URL`   | Used by Prisma CLI (`prisma.config.ts`); often the same as `DATABASE_URL` for local dev |

For Prisma commands, ensure `DIRECT_URL` is set (see `prisma.config.ts`).

## Install & run

```bash
bun install
export DIRECT_URL="postgresql://user:pass@localhost:5432/yourdb"
bunx prisma generate
export DATABASE_URL="$DIRECT_URL"
bun run dev
```

### Docker

```bash
docker compose up --build
```

The compose file maps Postgres on the host to **5433** (container still uses 5432 internally). Configure `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `PORT` to match your setup.

## Scripts

| Script                 | Description           |
| ---------------------- | --------------------- |
| `bun run dev`          | Dev server with watch |
| `bun run format`       | Format with Prettier  |
| `bun run format:check` | Check formatting (CI) |

Seed (configured in `prisma.config.ts`):

```bash
export DIRECT_URL="postgresql://..."
bunx prisma db seed
```

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs Prettier, `prisma validate` / `prisma generate` (with a dummy `DIRECT_URL`), and TypeScript checks on pushes and pull requests to `main`, `master`, and `dev`.
