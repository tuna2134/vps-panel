FROM node:22-slim AS builder

WORKDIR /src

ENV OUTPUT=standalone
RUN corepack enable

COPY pnpm-lock.yaml package.json .
RUN pnpm install --frozen-lockfile

COPY . .
RUN --mount=type=cache,target=/src/.next pnpm build \
    && cp -r /src/.next /complete

FROM gcr.io/distroless/nodejs22-debian12

ENV NODE_ENV=production
WORKDIR /usr/src

COPY --chown=nonroot:nonroot ./public ./public
COPY --from=builder --chown=nonroot:nonroot /complete/standalone ./
COPY --from=builder --chown=nonroot:nonroot /complete/static ./.next/static

USER nonroot
EXPOSE 3000
CMD ["server.js"]