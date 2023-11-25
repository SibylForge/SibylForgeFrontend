export type PacketHead = {
  head: { serial: number };
  identity: string;
  payload: any;
};
