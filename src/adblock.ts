import axios from 'axios';

const config = require('./config.json');

const downloadFile = (url: string): Promise<string> => {
  return axios
    .get(url, { responseType: 'blob' })
    .then((response) => response.data);
};

const isDomainValid = (domain: string): boolean => {
  const regex = new RegExp('^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$');
  return regex.test(domain);
};

const tryAddDomain = (domain: string, result: any): void => {
  if (isDomainValid(domain) && !result.hasOwnProperty(domain)) {
    result[domain] = "0.0.0.0";
  }
};

const isInWhitelist = (domain: string, whitelist: string[]): boolean => {
  let result = false;

  for(let i = 0, l = whitelist.length; i < l; i++) {
    if(domain.endsWith(whitelist[i])) {
      result = true;
      break;
    }
  }

  return result;
};

const processLine = (line: string, whitelist: string[], result: any): void => {
  let domain = line.replace('127.0.0.1', '').replace('0.0.0.0', '').trim();
  if (!domain.includes(' ') && !isInWhitelist(domain, whitelist))
    tryAddDomain(domain, result);
};

const processLines = (lines: string, whitelist: string[], result: any): void => {
  lines
    .split(/\r?\n/)
    .map(i => i.trim().toLocaleLowerCase())
    .filter(i =>
      i.length > 0 &&
      !i.startsWith('#') &&
      !i.startsWith('::') &&
      !i.startsWith('fe80')
    )
    .forEach(i => processLine(i, whitelist, result));
};

const generateHosts: () => Promise<any[]> = async () => {
  let result: any = { ...config.hosts };
  let whitelist: string[] = config.whitelist.map((i: string) => i.trim().toLowerCase());

  for (let url of config.blacklists) {
    try {
      console.log(`Download url: ${url}`);
      let lines = await downloadFile(url);
      processLines(lines, whitelist, result);
      console.log(`So far ${Object.keys(result).length} domain`);
    } catch (err) {
      console.log(`Failed to download or process file: ${url}`, err);
    }
  }
  return Object.keys(result).sort((a, b) => a.localeCompare(b)).map((i: string) => ({ key: i, value: result[i] }));
};

export { generateHosts };
