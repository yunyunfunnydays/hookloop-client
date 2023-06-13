import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { Avatar, Popover, Switch } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import useWebSocket from "react-use-websocket";
// context
import GlobalContext from "@/Context/GlobalContext";
import { getNotificationsByUserId, isReadNotification, markAllIsReadByUserId } from "@/service/apis/notification";

const Notification: React.FC = () => {
  const { c_user } = useContext(GlobalContext);
  const wsUrl = process.env.wsUrl!;
  const { lastMessage, sendMessage } = useWebSocket(wsUrl);
  const [s_showUnreadOnly, set_s_showUnreadOnly] = useState(true);
  const [s_notifications, set_s_notifications] = useState([
    {
      _id: "",
      createdAt: "",
      content: "",
      subject: "",
      fromUserId: {
        _id: "",
        username: "",
        avatar: "",
      },
      kanbanId: {
        _id: "",
        name: "",
        key: "",
      },
      isRead: false,
    },
  ]);

  const c_getNotificationsByUserId = async () => {
    const res: AxiosResponse = await getNotificationsByUserId(c_user.userId);
    const { status, data } = res.data as IApiResponse;
    if (status === "success") {
      set_s_notifications(data);
    }
  };

  const markIsRead = async (id: string) => {
    const res: AxiosResponse = await isReadNotification(id);
    const { status, message, data } = res.data as IApiResponse;
    if (status === "success") {
      console.log(message);
      console.log(data);
      c_getNotificationsByUserId();
    }
  };

  const markAllIsRead = async () => {
    const res: AxiosResponse = await markAllIsReadByUserId(c_user.userId);
    const { status, message, data } = res.data as IApiResponse;
    if (status === "success") {
      console.log(message);
      console.log(data);
      c_getNotificationsByUserId();
    }
  };

  // 初始化
  useEffect(() => {
    // 更新訊息
    c_getNotificationsByUserId();

    // 註冊 Websocket
    console.log(`enterNotification: ${c_user.userId}`);
    sendMessage(JSON.stringify({ type: "enterNotification", id: c_user.userId }));

    // 登出 Websocket
    return () => {
      console.log(`leaveNotification: ${c_user.userId}`);
      sendMessage(JSON.stringify({ type: "leaveNotification", id: c_user.userId }));
    };
  }, []);

  // 檢視 WebSocket 訊息
  useEffect(() => {
    if (!lastMessage || !lastMessage.data) return;
    const data = JSON.parse(lastMessage.data);

    if (data.type === "notification") {
      const { toUserId } = data.result;
      if (toUserId === c_user.userId) {
        console.log("socket: notification");
        c_getNotificationsByUserId();
      }
    }
  }, [lastMessage]);

  return (
    <Popover
      arrow={false}
      className="custPopover"
      title={
        <div className="flex border-b pb-2">
          <h3 className="mr-auto text-[24px] font-medium">Notification</h3>
          <div className="mt-1 flex items-center">
            <Switch size="small" defaultChecked onClick={() => set_s_showUnreadOnly((state) => !state)} />
            <p className="ml-1">unread only</p>
          </div>
        </div>
      }
      content={
        <div>
          <a className="block text-right" onClick={() => markAllIsRead()}>
            mark all as read
          </a>
          {s_notifications.map((msg, i) => (
            <div
              key={i}
              className={`my-3 rounded border p-3 shadow-md shadow-slate-100 ${
                s_showUnreadOnly && msg.isRead ? "hidden" : ""
              } `}
            >
              <div className="flex items-center">
                <h3 className="text-[20px] font-medium">{msg.subject}</h3>
                <div className="ml-auto mt-1">
                  <Switch
                    size="small"
                    className="mx-auto block"
                    disabled={msg.isRead}
                    defaultChecked={!msg.isRead}
                    onClick={() => markIsRead(msg._id)}
                  />
                  <small className="ml-auto block">mark as read</small>
                </div>
              </div>
              <p className="msg-content">{msg.content}</p>
              <small className="font-medium">
                in <Link href={`/kanban/${msg.kanbanId.key}`}>{msg.kanbanId.name}</Link>
              </small>
              <div className="flex flex-wrap items-end">
                <Avatar
                  size={20}
                  src={msg.fromUserId.avatar.length > 0 && `https://cdn.filestackcontent.com/${msg.fromUserId.avatar}`}
                />
                <p className="ml-1 font-medium">{msg.fromUserId.username}</p>
                <small className="ml-1">{msg.createdAt}</small>
              </div>
            </div>
          ))}
        </div>
      }
      trigger="click"
    >
      <NotificationOutlined className="custPopover text-white" style={{ fontSize: 28 }} />
    </Popover>
  );
};

export default Notification;
