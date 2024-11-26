FROM --platform=$BUILDPLATFORM node:22.11.0-alpine3.20 AS client-builder
WORKDIR /ui
# cache packages in layer
COPY ui/package.json /ui/package.json
COPY ui/package-lock.json /ui/package-lock.json

RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci

# install
COPY ui /ui
RUN npm run build

FROM alpine
LABEL org.opencontainers.image.title="Dive" \
    org.opencontainers.image.description="Integration with Dive CLI." \
    org.opencontainers.image.vendor="Sandip Chitale" \
    com.docker.desktop.extension.api.version="0.3.4" \
    com.docker.extension.screenshots="" \
    com.docker.desktop.extension.icon="" \
    com.docker.extension.detailed-description="" \
    com.docker.extension.publisher-url="" \
    com.docker.extension.additional-urls="" \
    com.docker.extension.categories="" \
    com.docker.extension.changelog=""

COPY docker-compose.yaml .
COPY metadata.json .
COPY dive.svg .
COPY /dive /dive
COPY --from=client-builder /ui/dist/docker-desktop-dive/browser ui

