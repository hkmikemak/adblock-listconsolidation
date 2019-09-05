enum OUTPUT_TYPE {
  HOSTS = "HOSTS",
  UNBOUND = "UNBOUND",
}

interface IConfig {
  adblockSources: string[];
  domainWhitelist: string[];
  domainBlacklist: string[];
  outputType: OUTPUT_TYPE;
}

export { IConfig, OUTPUT_TYPE };
