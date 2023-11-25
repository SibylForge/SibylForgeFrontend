import Packet from '../../decorator/Packet';

import CPlayerPacket from './CPlayerPacket';

export default class CPlayerChatPacket extends CPlayerPacket {
  private message?: string;

  public getMessage(): string | undefined {
    return this.message;
  }

  extractPayload(): CPlayerChatPacket {
    this.message = this.payload.message;
    return this;
  }
}
