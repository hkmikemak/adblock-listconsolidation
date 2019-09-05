# Adblock Hosts File Consoliation

## Requirement

If a url in `adblockSources` has `.7z` file format, `7za` is required in the `PATH`.

## Usage

```shell
node index.js
```

## Configuration

**adblockSources** : List of blocklist url

**domainBlacklist** : List of low-level domains to block

**domainWhitelist** : List of low-level domains (e.g. reddit.com)

**outputType** : `HOSTS` or `UNBOUND`
