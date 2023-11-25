import Packet from '../../decorator/Packet';
import ServerPacket from '../ServerPacket';
import OnlinePlayer from '../../../entity/OnlinePlayer';

type DataFromPayload = { [key: string]: string };

@Packet('net', 'sp-net-list')
export default class SNetListPacket extends ServerPacket {
  private list: Record<string, OnlinePlayer>;

  constructor(list: Record<string, OnlinePlayer>) {
    super();
    this.list = list;
  }

  public formPayload(): ServerPacket {
    const data: DataFromPayload = {};
    Object.values(this.list).forEach((value) => {
      data[value.getUUID()] = value.getName();
    });
    this.payload = data;
    return this;
  }
}
