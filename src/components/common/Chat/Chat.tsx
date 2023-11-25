import { useState, useEffect, useCallback, useRef } from 'react';

import webSocket from 'socket.io-client';
import Utils from '../../../utils';
import SPlayerChatPacket from '../../../packet/server/player/SPlayerChatPacket';
import SNetLoginPacket from '../../../packet/server/net/SNetLoginPacket';
import SNetListPacket from '../../../packet/server/net/SNetListPacket';
import { Box, Button, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { uniqueId } from 'lodash';
import useScroll from '@/hook/useScroll';

export default function Chat() {
  const [ws, setWs] = useState<any>(webSocket('ws://localhost:8080'));
  const [sNetLoginPacket, setSNetLoginPacket] = useState<SNetLoginPacket | null>(null);
  const [sNetListPacket, setSNetListPacket] = useState<SNetListPacket | null>(null);
  const [chatRoomMessages, setChatRoomMessages] = useState<SPlayerChatPacket[]>([]);
  const [message, setMessage] = useState<string>('');
  const listRef = useRef<HTMLDivElement>(null);
  const { setScroll } = useScroll(listRef);

  const initWebSocket = useCallback(() => {
    // 對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    ws.emit(
      'pkt-net',
      JSON.stringify({
        pkt_name: 'cp-net-login',
        head: {
          serial: 12,
        },
        payload: {
          account: 'username',
          name: 'username',
        },
      })
    );

    ws.on('spkt', (message: string) => {
      const data = Utils.serializer(JSON.parse(message)) as any;
      console.log(data);
      switch (data.pktName) {
        case 'sp-net-login':
          setSNetLoginPacket(data as SNetLoginPacket);
          return;
        case 'sp-net-list':
          setSNetListPacket(data as SNetListPacket);
          return;
        case 'sp-player-chat':
          setChatRoomMessages([...chatRoomMessages, data as SPlayerChatPacket]);
          setScroll(true);
          return;
        default:
          console.log('Unknown packet');
      }
    });
  }, [chatRoomMessages, ws]);

  initWebSocket();

  const sendMessage = () => {
    if (!sNetLoginPacket || !message) return;
    ws.emit(
      'pkt-player',
      JSON.stringify({
        pkt_name: 'cp-player-chat',
        identity: sNetLoginPacket.payload.uuid,
        head: {
          serial: 12,
        },
        payload: {
          message: message,
        },
      })
    );
    setMessage('');
  };

  return (
    <Flex ref={listRef} zIndex={2} bottom="-100vh" direction="column" position="absolute" w="250px">
      <Box
        border="1px"
        height="100%"
        maxHeight="160px"
        minHeight="160px"
        borderColor="gray.700"
        overflowY="scroll"
        borderRadius="7px"
        borderBottomRadius="0px"
        backgroundColor="gray.900"
        mb="40px"
      >
        {chatRoomMessages.map((m) => (
          <Flex pl="8px" pb="4px" key={uniqueId()}>
            {sNetListPacket?.payload[m.payload.from]}:{m.payload.message}
          </Flex>
        ))}
      </Box>

      <InputGroup size="md" position="fixed" w="250px" zIndex={10} bottom="1px" backgroundColor="gray.800">
        <Input
          borderTopRadius="0px"
          pr="4.5rem"
          type="text"
          placeholder="輸入對話"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={sendMessage}>
            送出
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}
