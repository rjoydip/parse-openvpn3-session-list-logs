import { getKeyValuePair } from './index.js';

/* const singleEntryResults = getKeyValuePair(
  `---------------
  Path: /net/openvpn/v3/sessions
  Created: Tue Nov 21 16:34:14: 2023    Owner: joydip    Device: tun0
  Config name: /etc/openvpn/profile.ovpn  (Config not available)
  Session name: vpn.mml.cloud
  Status: Connection, Client connected
---------------`
);

console.log(singleEntryResults);

const multipleEntryResults = getKeyValuePair(
  `---------------
  Path: /net/openvpn/v3/sessions
  Created: Tue Nov 22 12:34:14: 2023    Owner: joydip    Device: tun0
  Config name: /etc/openvpn/profile.ovpn  (Config not available)
  Session name: vpn.mml.cloud
  Status: Connection, Client connected

  Path: /net/openvpn/v3/sessions
  Created: Tue Nov 21 16:34:24: 2023    Owner: joydip    Device: tun0
  Config name: /etc/openvpn/profile.ovpn  (Config not available)
  Session name: vpn.mml.cloud
  Status: Connection, Connection Auth failed
---------------`
);

console.log(multipleEntryResults); */


const singleEntryWithExtraWhitespaceResults = getKeyValuePair(
  `---------------
  Path: /net/openvpn/v3/sessions
  Created: Tue Nov 21 16:34:14: 2023            PID: 1229
  Owner: joydip                             Device: tun0
  Config name: /etc/openvpn/profile.ovpn  (Config not available)
  Session name: vpn.mml.cloud
  Status: Connection, Client connected
---------------`
);

console.log(singleEntryWithExtraWhitespaceResults)