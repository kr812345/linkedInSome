FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV CI=true

RUN pnpm install 

EXPOSE 3000

CMD ["pnpm", "dev"]