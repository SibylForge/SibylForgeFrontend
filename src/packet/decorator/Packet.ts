import { join } from 'path';

import AbstractPacket from '../AbstractPacket';
import ClientPacket from '../client/ClientPacket';
import ServerPacket from '../server/ServerPacket';

export default function Packet(namespace: string, pktName: string): ClassDecorator {
  return (target: any) => {
    // eslint-disable-next-line no-param-reassign
    target.PKT_CONSTANT_NAME = pktName;

    const isClientPkt = target.prototype instanceof ClientPacket;
    const isServerPkt = target.prototype instanceof ServerPacket;
    if (!isClientPkt && !isServerPkt) {
      throw new Error(`Packet ${pktName} should extends ClientPacket or ServerPacket.`);
    }

    const pkgPath = join(__dirname, '..', isClientPkt ? 'client' : 'server', namespace, target.name);
    import(pkgPath).then((module) => {
      AbstractPacket.mapClass(pktName, module[target.name]);
    });
  };
}
