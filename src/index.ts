import * as fs from "fs";
import * as path from "path";
import { exec } from 'child_process';
import { generateHosts } from './adblock';

const runCommand = (command: string) => {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      console.log(error);
      console.log(stderr);
      console.log(stdout);
      resolve();
    });
  });
}

(async () => {
  let file = path.resolve(__dirname, './adblock');

  let hosts = await generateHosts();
  fs.writeFileSync(file, hosts.map(i => `${i.value} ${i.key}`).join('\r\n'));

  // await runCommand(`sshpass -p "27688918" scp "${file}" root@192.168.1.1:/etc/adblock_hosts`);
  // await runCommand(`sshpass -p "27688918" ssh root@192.168.1.1 "killall -HUP dnsmasq"`);
  // await runCommand(`sshpass -p "27688918" ssh root@192.168.1.1 "/etc/init.d/dnsmasq restart"`);
})();
