# Discohook

[![ci](https://github.com/discohook/site/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/discohook/site/actions/workflows/ci.yml)

An easy-to-use tool for building and sending Discord messages and embeds using webhooks.

Live instance is available at <https://discohook.app/>.

## Running via Container

This application is setup to publish a container image to `ghcr.io/discohook/site:latest`. This image can be run with [podman](https://podman.io/), [docker](https://www.docker.com/), or another service compliant with the [OCI](https://opencontainers.org/). The image can be run from the command line with the following command or in the desktop guis ([podman desktop guide](https://podman-desktop.io/docs/working-with-containers/starting-a-container))
```sh
# Replace 'podman' with 'docker' if using that, the command is equivalent
# Add --rm if you want the container to be removed automatically after being stopped
# If necesary, change the second 3000 to change which port on the local computer the app is bound to
podman run -d -p 3000:3000 ghcr.io/discohook/site:latest
```

## Local build and run

Requires Node.js 16 and the Yarn package manager installed

```sh
# Install dependencies
yarn install

# Run a development server
yarn run dev

# Run a production server
yarn run build
yarn run start
```
