import Packet from '../../decorator/Packet';

import CNetPacket from './CNetPacket';

@Packet('net', 'cp-net-logout')
export default class CNetLogoutPacket extends CNetPacket {
  extractPayload(): CNetLogoutPacket {
    return this;
  }
}
