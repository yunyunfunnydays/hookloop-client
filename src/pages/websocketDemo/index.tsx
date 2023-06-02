import { IApiResponse } from "@/service/instance";
import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { getKanban, renameKanban } from "@/service/api";
import { Button, Input, Typography } from 'antd';
const { Title } = Typography;

const WebsocketDemo = () => {
  const wsUrl = process.env.wsUrl!;
  const [kanbanKey, setKanbanKey] = useState('');
  const [kanbanName, setKanbanName] = useState('');
  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl);
  const [kanbanData, setKanbanData] = useState({
    key: '',
    name: '',
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  // 取得使用者資料
  const call_getKanban = async () => {
    const res: AxiosResponse = await getKanban(kanbanKey);
    const { status } = res.data as IApiResponse;
    if (status === "success") {
      if (res.data && res.data.data && res.data.data.target) {
        const data = res.data.data.target;
        console.log(data);
        setKanbanData(data)
      }
    }
  };

  const handleRenameKanban = async () => {
    if (!kanbanName) return;

    const res: AxiosResponse = await renameKanban(kanbanKey, kanbanName);
    const { status } = res.data as IApiResponse;
    if (status === "success") {
      if (res.data) {
        // 發送訊息給 websocket（這裡示範為發送 timestamp ）
        sendMessage(Date.now().toString());
      }
    }
  };

  useEffect(() => {
    // 設置 kanbanKey（這裡寫死為 kanban123）
    setKanbanKey("kanban123");
    // 發送訊息給 websocket（這裡示範為發送 timestamp ）
    sendMessage(Date.now().toString());
  }, []);

  // websocket 收到訊息時重新取得 kanban
  useEffect(() => {
    // 檢視 WebSocket 訊息
    console.log("lastMessage: ", lastMessage?.data);
    // 重新取得 kanban
    call_getKanban();
  }, [lastMessage]);

  return (
    <div>
      <Title level={3}>
        The WebSocket is currently
        <span style={{ color: "blue" }}> {connectionStatus}</span>
      </Title>
      {connectionStatus === "Open" && <>
        {kanbanData &&
          <div>
            <p><b>Kanban Key:</b> {kanbanData.key}</p>
            <p><b>Kanban Name:</b> {kanbanData.name}</p>
          </div>
        }
        <Input
          placeholder="new kanban name"
          type="text"
          value={kanbanName}
          onChange={e => setKanbanName(e.target.value)}
        />
        <Button type="primary" onClick={handleRenameKanban}>更改看板名稱</Button>
      </>}
    </div>
  );
};

export default WebsocketDemo;
