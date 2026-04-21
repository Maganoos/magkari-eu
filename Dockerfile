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

FROM node:20-alpine

RUN npm install -g serve

WORKDIR /app
COPY --from=build /app/_site /app

EXPOSE 8080

CMD ["serve", "-s", ".", "-l", "8080"]
