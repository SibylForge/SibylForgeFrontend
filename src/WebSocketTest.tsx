import { useState, useEffect, useCallback } from 'react';

import webSocket from 'socket.io-client';

export default function WebSocketTes() {
  const [ws, setWs] = useState<any>(null);
  const [loginMessage, setLoginMessage] = useState<any>(null);

  const connectWebSocket = () => {
    // 開啟
    setWs(webSocket('ws://127.0.0.1:8080'));
  };

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
    ws.on('spkt', (message: any) => {
      const data = JSON.parse(message);
      console.log(message);
      console.log(data);
      const { pkt_name } = data;
      switch (pkt_name) {
        case 'sp-net-login':
          return setLoginMessage(data.payload.uuid);
        case 'sp-net-list':
          return message;
        case 'sp-player-chat':
          return message;
        default:
          return 'no such pkt_name';
      }
    });
  }, [ws]);

  useEffect(() => {
    if (ws) {
      console.log('success connect!');
      // 設定監聽
      initWebSocket();
    }
  }, [initWebSocket, ws]);

  const sendMessage = () => {
    // 以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
    ws.emit(
      'pkt-player',
      JSON.stringify({
        pkt_name: 'cp-player-chat',
        identity: 'username',
        head: {
          serial: 12,
        },
        payload: {
          message: 'test',
        },
      })
    );
  };

  return (
    <div>
      <input type="button" value="連線" onClick={connectWebSocket} />
      <input type="button" value="送出訊息" onClick={sendMessage} />
      <div>{loginMessage}</div>
    </div>
  );
}
