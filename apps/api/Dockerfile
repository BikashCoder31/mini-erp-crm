FROM node:24-alpine AS build

RUN corepack enable
WORKDIR /workspace

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
RUN pnpm install --frozen-lockfile

COPY apps/api apps/api
RUN pnpm --filter api prisma:generate
RUN pnpm --filter api build
RUN pnpm --filter api deploy --prod --legacy /prod/api
RUN generated_entry="$(grep -rl 'CustomerStatus' /workspace/node_modules/.pnpm/*/node_modules/.prisma/client/index.js | head -n 1)" \
  && test -n "$generated_entry" \
  && generated_client="$(dirname "$generated_entry")" \
  && target_client="$(readlink -f /prod/api/node_modules/@prisma/client)" \
  && target_modules="$(dirname "$(dirname "$target_client")")" \
  && test -n "$target_modules" \
  && mkdir -p "$target_modules/.prisma" \
  && cp -R "$generated_client/." "$target_modules/.prisma/client/"

FROM node:24-alpine AS operations

RUN corepack enable
WORKDIR /workspace

COPY --from=build --chown=node:node /workspace/package.json ./package.json
COPY --from=build --chown=node:node /workspace/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=build --chown=node:node /workspace/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=build --chown=node:node /workspace/node_modules ./node_modules
COPY --from=build --chown=node:node /workspace/apps/api/package.json ./apps/api/package.json
COPY --from=build --chown=node:node /workspace/apps/api/node_modules ./apps/api/node_modules
COPY --from=build --chown=node:node /workspace/apps/api/dist ./apps/api/dist
COPY --from=build --chown=node:node /workspace/apps/api/prisma ./apps/api/prisma

USER node
WORKDIR /workspace/apps/api

FROM node:24-alpine AS runtime

WORKDIR /app
COPY --from=build --chown=node:node /prod/api ./

USER node
EXPOSE 4000

HEALTHCHECK --interval=10s --timeout=3s --start-period=15s --retries=5 \
  CMD wget -qO- http://127.0.0.1:4000/api/v1/health/ready > /dev/null || exit 1

CMD ["node", "dist/main.js"]
