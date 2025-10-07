FROM node:22

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@latest-10 && pnpm i

COPY . .

EXPOSE 4200

CMD ["pnpm", "dev"]
