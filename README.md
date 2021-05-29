# Discohook

[![ci](https://github.com/discohook/site/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/discohook/site/actions/workflows/ci.yml)

An easy-to-use tool for building and sending Discord messages and embeds using webhooks.

Live instance is available at <https://discohook.app/>.


## Check if node is installed

```
node --version
```

If

> -bash: node: command not found

appears, yarn is not installed! Then do the following:

```
apt update

apt install nodejs -y
```

Now let's install NPM:

```
apt install npm -y
```

## Check if yarn is installed

```
yarn --version
```

If

> -bash: yarn: command not found

appears, yarn is not installed! Then do the following:

```
npm install --global yarn
```


## Setup

Requires Node.js 12 and the Yarn package manager installed

```sh
# Install dependencies
yarn install

# Run a development server
yarn run dev

# Run a production server
yarn run build
yarn run start
```
