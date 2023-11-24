import { expect, test } from 'vitest';
import { parseKeyValueString, sanitizeInputString } from './index.js';

const singleInput = `---------------
Path: /net/openvpn/v3/sessions
Created: Tue Nov 21 12:34:14: 2023    Owner: joydip    Device: tun0
Config name: /etc/openvpn/profile.ovpn  (Config not available)
Session name: vpn.mml.cloud
Status: Connection, Client connected
---------------`;

const singleEntryWithExtraWhitespaceResults = `---------------
  Path: /net/openvpn/v3/sessions
  Created: Tue Nov 21 16:34:14: 2023            PID: 1229
  Owner: joydip                             Device: tun0
  Config name: /etc/openvpn/profile.ovpn  (Config not available)
  Session name: vpn.mml.cloud
  Status: Connection, Client connected
---------------`

const multiInput = `---------------
Path: /net/openvpn/v3/sessions
Created: Tue Nov 22 12:34:14: 2023    Owner: joydip    Device: tun0
Config name: /etc/openvpn/profile.ovpn  (Config not available)
Session name: vpn.mml.cloud
Status: Connection, Client connected

Path: /net/openvpn/v3/sessions
Created: Tue Nov 21 12:34:14: 2023    Owner: joydip    Device: tun0
Config name: /etc/openvpn/profile.ovpn  (Config not available)
Session name: vpn.mml.cloud
Status: Connection, Connection Auth failed
---------------`;

test('should validate string after sanization', () => {
  expect(sanitizeInputString(singleInput))
    .toStrictEqual(`Path: /net/openvpn/v3/sessions
Created: Tue Nov 21 12:34:14: 2023    Owner: joydip    Device: tun0
Config name: /etc/openvpn/profile.ovpn  (Config not available)
Session name: vpn.mml.cloud
Status: Connection, Client connected`);

  expect(sanitizeInputString(multiInput))
    .toStrictEqual(`Path: /net/openvpn/v3/sessions
Created: Tue Nov 22 12:34:14: 2023    Owner: joydip    Device: tun0
Config name: /etc/openvpn/profile.ovpn  (Config not available)
Session name: vpn.mml.cloud
Status: Connection, Client connected

Path: /net/openvpn/v3/sessions
Created: Tue Nov 21 12:34:14: 2023    Owner: joydip    Device: tun0
Config name: /etc/openvpn/profile.ovpn  (Config not available)
Session name: vpn.mml.cloud
Status: Connection, Connection Auth failed`);
});

test('should validate key value pair results', () => {
  expect(parseKeyValueString(singleInput)).toStrictEqual([
    {
      Path: '/net/openvpn/v3/sessions',
      Created: 'Tue Nov 21 12:34:14: 2023',
      Owner: 'joydip' ,
      Device: 'tun0',
      'Config name': '/etc/openvpn/profile.ovpn',
      'Session name': 'vpn.mml.cloud',
      Status: 'Connection, Client connected',
    },
  ]);
  expect(parseKeyValueString(multiInput)).toStrictEqual([
    {
      Path: '/net/openvpn/v3/sessions',
      Created: 'Tue Nov 22 12:34:14: 2023',
      Owner: 'joydip',
      Device: 'tun0',
      'Config name': '/etc/openvpn/profile.ovpn',
      'Session name': 'vpn.mml.cloud',
      Status: 'Connection, Client connected',
    },
    {
      Path: '/net/openvpn/v3/sessions',
      Created: 'Tue Nov 21 12:34:14: 2023',
      Owner: 'joydip',
      Device: 'tun0',
      'Config name': '/etc/openvpn/profile.ovpn',
      'Session name': 'vpn.mml.cloud',
      Status: 'Connection, Connection Auth failed',
    },
  ]);
  expect(parseKeyValueString(singleEntryWithExtraWhitespaceResults)).toStrictEqual([
    {
      Path: '/net/openvpn/v3/sessions',
      Created: 'Tue Nov 21 16:34:14: 2023',
      PID: '1229',
      Owner: 'joydip',
      Device: 'tun0',
      'Config name': '/etc/openvpn/profile.ovpn',
      'Session name': 'vpn.mml.cloud',
      Status: 'Connection, Client connected',
    },
  ]);
});
