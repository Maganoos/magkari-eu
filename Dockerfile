# ---- base (Alpine + pnpm) ----
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true

RUN corepack enable

WORKDIR /app
COPY . .

# ---- build stage ----
FROM base AS build
RUN apk add --no-cache git
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
RUN pnpm run build

# ---- final stage (tiny, no Node) ----
FROM nginx:alpine
COPY --from=build /app/_site /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
