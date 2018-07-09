import axios from 'axios';

const config = require('./config.json');

const downloadFile = (url: string): Promise<string> => {
  return axios
    .get(url, { responseType: 'blob' })
    .then((response) => response.data);
};

const tryAddDomain = (domain: string, result: any): void => {
  if (!result.hasOwnProperty(domain)) {
    result[domain] = null;
  }
};

const isInWhitelist = (domain: string): boolean => {
  config.whitelist.forEach((i: string) => {
    if (domain.endsWith(i))
      return true;
  });
  return false;
};

const processLine = (line: string, result: any): void => {
  let domain = line.replace('127.0.0.1', '').replace('0.0.0.0', '').trim();
  if (!domain.includes(' ') && !isInWhitelist(domain))
    tryAddDomain(domain, result);
};

const processLines = (lines: string, result: any): void => {
  lines
    .split(/\r?\n/)
    .map(i => i.trim().toLocaleLowerCase())
    .filter(i =>
      i.length > 0 &&
      !i.startsWith('#') &&
      !i.startsWith('::') &&
      !i.startsWith('fe80')
    )
    .forEach(i => processLine(i, result));
};

const generateHosts: () => Promise<string[]> = async () => {
  let result = {};
  for (let url of config.blacklists) {
    try {
      console.log(`Download url: ${url}`);
      let lines = await downloadFile(url);
      processLines(lines, result);
      console.log(`So far ${Object.keys(result).length} domain`);
    } catch (err) {
      console.log(`Failed to download or process file: ${url}`, err);
    }
  }
  return Object.keys(result).sort((a, b) => a.localeCompare(b));
};

export { generateHosts };
