FROM alpine:3.12.0

RUN	apk add --no-cache nodejs npm libc6-compat && \
		addgroup -g 1000 node && \
		adduser -D -H -G node -s /bin/nologin -u 1000 node && \
		mkdir /app && \
		chown node:node /app && \
		mkdir /home/node && \
		chown node:node /home/node

WORKDIR /app
USER node

COPY --chown=node:node ./dist/config.json config.json
COPY --chown=node:node ./dist/package.json package.json
COPY --chown=node:node ./dist/index.js index.js

RUN npm install --only=production

CMD ["node", "index.js"]
