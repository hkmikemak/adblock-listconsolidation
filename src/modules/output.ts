
import * as fs from 'fs';

import { OUTPUT_TYPE } from '../interfaces/IConfig';

const generateFile = (filename: string, hosts: string[], outputType: OUTPUT_TYPE, ip: string = "0.0.0.0") => {
  if (outputType === OUTPUT_TYPE.UNBOUND) {
    fs.writeFileSync(filename, hosts.map((i) => `local-zone: "${i}" redirect\r\nlocal-data: "${i} A ${ip}"`).join("\r\n"));
  } else {
    fs.writeFileSync(filename, hosts.map((i) => `${ip} ${i}`).join("\r\n"));
  }
}

export { generateFile };
