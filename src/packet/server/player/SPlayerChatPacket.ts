import Packet from '../../decorator/Packet';
import ServerPacket from '../ServerPacket';

@Packet('player', 'sp-player-chat')
export default class SPlayerChatPacket extends ServerPacket {
  private from: string;

  private message: string;

  constructor(from: string, message: string) {
    super();
    this.from = from;
    this.message = message;
  }

  public formPayload() {
    this.payload = {
      from: this.from,
      message: this.message,
    };
    return this;
  }
}
