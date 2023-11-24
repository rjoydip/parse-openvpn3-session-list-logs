import { Bench } from 'tinybench';
import { parseKeyValueString } from './index.js';

const bench = new Bench({ time: 100 });
const inputString = `
---------------
  Path: /net/openvpn/v3/sessions
  Created: Tue Nov 21 16:34:14: 2023    Owner: joydip    Device: tun0
  Config name: /etc/openvpn/profile.ovpn  (Config not available)
  Session name: vpn.mml.cloud
  Status: Connection, Client connected
---------------
`;

bench
  .add('get key-value pair with sanitize (faster)', () => {
    parseKeyValueString(inputString, {
      sanitize: true,
    });
  })
  .add('get key-value pair without sanitize (slower)', async () => {
    parseKeyValueString(inputString, {
      sanitize: false,
    });
  });

await bench.run();

console.table(bench.table());
