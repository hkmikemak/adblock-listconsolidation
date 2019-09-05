import { path7za } from '7zip-bin';
import axios from 'axios';
import chalk from 'chalk';
import { exec } from 'child_process';
import del from 'del';
import * as fs from 'fs';
import path from 'path';
import * as tmp from 'tmp';

const downloadText = async (url: string): Promise<string> => {
  if (url.toLocaleLowerCase().endsWith("7z")) {
    const tmpDir: string = tmp.dirSync().name;
    const tmpFile: string = tmp.tmpNameSync();

    // Download file
    const response = await axios.get(url, { responseType: "stream" });

    // Save file to disk
    await new Promise<void>((resolve, reject) => {
      const stream = fs.createWriteStream(tmpFile);
      response.data.pipe(stream);
      stream.on("finish", resolve);
      stream.on("err", reject);
    });

    await new Promise<void>((resolve, reject) => {
      exec(`${path7za} x "${tmpFile}" -o"${tmpDir}" -r`, (err, stdout, strerr) => {
        if (err) {
          console.log(chalk.red(`Failed to extract - ${err.message}`));
          console.log(chalk.red(`Failed to extract - ${stdout}`));
          console.log(chalk.red(`Failed to extract - ${strerr}`));
          reject(err);
        }
        resolve();
      });
    });

    // Read Files
    const files = fs.readdirSync(tmpDir);
    const result: string = files.map((i) => path.resolve(tmpDir, i)).map((i) => fs.readFileSync(i)).reduce((aggr, i) => aggr + "\r\n" + i, "");

    // Cleanup
    del.sync([tmpFile], { force: true });
    del.sync([tmpDir], { force: true });

    return result;
  } else {
    const response = await axios.get(url, { responseType: "blob" });
    return response.data as string;
  }
};

export { downloadText };
