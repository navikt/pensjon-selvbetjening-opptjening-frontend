FROM gcr.io/distroless/nodejs22-debian12
ENV NODE_ENV=production

WORKDIR /app

USER nonroot

COPY ./package.json .
COPY ./node_modules/ node_modules/
COPY ./build/ build/
COPY ./server.js .

ENTRYPOINT ["/nodejs/bin/node", "--max-http-header-size=32768", "server.js"]
