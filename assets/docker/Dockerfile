FROM oven/bun:1.3.7

WORKDIR /app
RUN chown bun:bun /app
USER bun

COPY --chown=bun:bun package.json  bun.lock ./

RUN bun install --frozen-lockfile

COPY --chown=bun:bun . ./
EXPOSE 4200

CMD ["bun", "run", "dev"]
