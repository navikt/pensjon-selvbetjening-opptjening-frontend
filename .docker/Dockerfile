FROM gcr.io/distroless/nodejs20-debian12
ENV NODE_ENV=production

WORKDIR /app

USER nonroot

COPY ./package.json .
COPY ./package-lock.json .
COPY ./node_modules/ node_modules/
COPY ./build/ build/
COPY ./server.js .

ENTRYPOINT ["/nodejs/bin/node", "server.js"]
