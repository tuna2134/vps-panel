FROM node:22-slim AS builder

WORKDIR /src

RUN corepack enable
COPY pnpm-lock.yaml package.json .
RUN pnpm install --frozen-lockfile

COPY . .

CMD ["pnpm", "dev"]