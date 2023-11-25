import AbstractPacket from '../AbstractPacket';
import { PacketHead } from '../packet.type';

export default abstract class ClientPacket extends AbstractPacket {
  protected identity: string | undefined;

  public static validate(): boolean {
    return true;
  }

  public extractHead(data: PacketHead): ClientPacket {
    this.serial = data.head.serial;
    this.identity = data.identity;
    this.payload = data.payload;

    Object.freeze(this.identity);
    return this.freeze(['serial', 'payload']) as ClientPacket;
  }

  abstract extractPayload(): ClientPacket;
}
