FROM node:22-slim

WORKDIR /src
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY drizzle.config.ts lib .

CMD ["sleep", "infinity"]