# Adblock Hosts File Consoliation

## Build

```sh
npm run dev
```

## Usage

```sh
node index.js
```

## Configuration

**adblockSources** : List of blocklist url

**domainBlacklist** : List of low-level domains to block

**domainWhitelist** : List of low-level domains (e.g. reddit.com)

**outputType** : `HOSTS` or `UNBOUND`

## Use in docker

1. `npm run gulp`
2. `docker build --tag adblock .`
3. Setup crontab with scripts

   ```sh
   #/bin/sh

   set -ex

   id=$(docker run --detach adblock)
   docker wait $id
   docker cp $id:/app/adblock .
   docker rm $id
   /etc/init.d/dnsmasq restart
   ```
