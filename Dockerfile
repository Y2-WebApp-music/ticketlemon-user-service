FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Install dependencies
FROM base AS install
COPY package.json bun.lock ./
COPY prisma ./prisma/
RUN bun install --frozen-lockfile
RUN bunx prisma generate

# Build the application
FROM base AS release
COPY . .
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY --from=install /usr/src/app/src/generated ./src/generated

CMD ["bun", "run", "dev"]