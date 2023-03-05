

FROM node:18.14.2-alpine as builder

RUN mkdir -p /app
WORKDIR /app

RUN npm i pnpm -g

COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm install

COPY ["tsconfig.json", "./"]
COPY ["package*.json", "./"]
COPY ["src/", "./src"]
RUN pnpm run build

RUN find dist -name "*.map" -type f -delete && \
    find dist -name "*.d.ts" -type f -delete && \
    rm -rf node_modules && \
    pnpm install -r --offline --prod


# ---------------------------
FROM node:18.14.2-alpine

ARG VERSION

ENV VERSION=$VERSION
ENV TZ=Europe/Berlin
ENV LANG=de_DE.UTF-8
ENV NODE_ENV=production

RUN mkdir -p /app
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000/tcp
#VOLUME ["/app/data"]
CMD ["npm", "run", "start:prod"]

