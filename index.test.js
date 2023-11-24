import { expect, test } from 'vitest';
import { getKeyValuePair, sanatizeString } from './index.js';

const singleInput = `---------------
Path: /net/openvpn/v3/sessions
Created: Tue Nov 21 12:34:14: 2023    Owner: joydip    Device: tun0
Config name: /etc/openvpn/profile.ovpn  (Config not available)
Session name: vpn.mml.cloud
Status: Connection, Client connected
---------------`;

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

test('should validate sanize string', () => {
  expect(sanatizeString(singleInput))
    .toStrictEqual(`Path: /net/openvpn/v3/sessions
Created: Tue Nov 21 12:34:14: 2023    Owner: joydip    Device: tun0
Config name: /etc/openvpn/profile.ovpn  (Config not available)
Session name: vpn.mml.cloud
Status: Connection, Client connected`);

  expect(sanatizeString(multiInput))
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
  expect(getKeyValuePair(singleInput)).toStrictEqual([
    [
      { Path: '/net/openvpn/v3/sessions' },
      { Created: 'Tue Nov 21 12:34:14: 2023' },
      { Owner: 'joydip' },
      { Device: 'tun0' },
      { 'Config name': '/etc/openvpn/profile.ovpn' },
      { 'Session name': 'vpn.mml.cloud' },
      { Status: 'Connection, Client connected' },
    ],
  ]);
  expect(getKeyValuePair(multiInput)).toStrictEqual([
    [
      { Path: '/net/openvpn/v3/sessions' },
      { Created: 'Tue Nov 22 12:34:14: 2023' },
      { Owner: 'joydip' },
      { Device: 'tun0' },
      { 'Config name': '/etc/openvpn/profile.ovpn' },
      { 'Session name': 'vpn.mml.cloud' },
      { Status: 'Connection, Client connected' },
    ],
    [
      { Path: '/net/openvpn/v3/sessions' },
      { Created: 'Tue Nov 21 12:34:14: 2023' },
      { Owner: 'joydip' },
      { Device: 'tun0' },
      { 'Config name': '/etc/openvpn/profile.ovpn' },
      { 'Session name': 'vpn.mml.cloud' },
      { Status: 'Connection, Connection Auth failed' },
    ],
  ]);
});
