FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true

RUN corepack enable

WORKDIR /app
COPY . .

FROM base AS deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS build
RUN apk add --no-cache git
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
RUN pnpm run build

FROM caddy:alpine

# Copy build output to Caddy's default web root
COPY --from=build /app/_site /usr/share/caddy

# Optional: custom config (see below)
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
