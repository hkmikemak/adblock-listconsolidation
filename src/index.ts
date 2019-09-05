import "./modules/extension";

import * as path from "path";

import { IConfig } from "./interfaces/IConfig";
import { generateHosts } from "./modules/adblock";
import { generateFile } from "./modules/output";

(async () => {
  const config: IConfig = require("./config.json");
  const file = path.resolve(__dirname, "./adblock");

  const adblockSources = config.adblockSources.unique();
  const domainBlacklist = config.domainBlacklist.map((i) => i.toLocaleLowerCase()).unique();
  const domainWhitelist = [
    ...config.domainWhitelist.map((i) => i.toLocaleLowerCase()),
    ...config.adblockSources.map((i) => (new URL(i)).hostname.toLocaleLowerCase()),
  ].unique();

  const hosts = await generateHosts(adblockSources, domainWhitelist, domainBlacklist);

  generateFile(file, hosts, config.outputType);
})();
