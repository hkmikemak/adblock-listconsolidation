import './modules/extension';

import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { cwd } from 'node:process';

import { IConfig } from './interfaces/IConfig';
import { generateHosts } from './modules/adblock';
import { generateFile } from './modules/output';

(async () => {
  const config: IConfig = JSON.parse(readFileSync(resolve(join(cwd(), "config.json")), { encoding: "utf-8" }));
  const file = resolve(join(cwd(), "adblock"));

  const adblockSources = config.adblockSources.unique();
  const domainBlacklist = config.domainBlacklist.map((i) => i.toLocaleLowerCase()).unique();
  const domainWhitelist = [
    ...config.domainWhitelist.map((i) => i.toLocaleLowerCase()),
    ...config.adblockSources.map((i) => (new URL(i)).hostname.toLocaleLowerCase()),
  ].unique();

  const hosts = await generateHosts(adblockSources, domainWhitelist, domainBlacklist);

  generateFile(file, hosts, config.outputType);
})();
