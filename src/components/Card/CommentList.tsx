/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { Input, Button, message as msg, Spin } from "antd";
// context
import GlobalContext from "@/Context/GlobalContext";
// api
import { addComment } from "@/service/apis/card";
// component
import CustAvatar from "@/components/util/CustAvatar";
import Comment from "./Comment";

interface IProps {
  cardId: string;
  s_allComments: Icomment[];
}

const CommentList: React.FC<IProps> = ({ cardId, s_allComments }) => {
  const { c_user } = useContext(GlobalContext);
  const [messageApi, contextHolder] = msg.useMessage();
  const [s_newComment, set_s_newComment] = useState("");
  const [s_isLoading, set_s_isLoading] = useState(false);

  // const call_getComments = async () => {
  //   const res: AxiosResponse = await getComments(cardId);
  //   const { status, message, data } = res.data as IApiResponse;
  //   if (status === "success") {
  //     // console.log("all comments = ", data);
  //     set_s_allComments(data);
  //   } else {
  //     messageApi.error(message);
  //   }
  // };

  const sentData = async () => {
    if (s_newComment.length === 0) {
      messageApi.error("place type some text");
      return;
    }
    set_s_isLoading(true);
    const res: AxiosResponse = await addComment(cardId, {
      currentComment: s_newComment,
      userId: c_user.userId,
    });
    const { status, message } = res.data as IApiResponse;
    if (status === "success") {
      messageApi.success("send comment success");
      // call_getComments();
    } else {
      messageApi.error(message);
    }
    set_s_isLoading(false);
    set_s_newComment("");
  };

  useEffect(() => {
    // call_getComments();
  }, []);

  return (
    <Spin spinning={s_isLoading}>
      <div className="flex flex-col">
        {contextHolder}
        {/* 輸入 comment 的位置 */}
        <section className="flex w-full items-center gap-2">
          {/* <Avatar size={36} className="bg-gray-200" src={c_user.avatar.length > 0 && c_user.avatar}>
            {c_user?.avatar.length === 0 ? c_user.username[0] : null}
          </Avatar> */}
          <CustAvatar info={c_user} size={36} />

          <Input
            className="flex-1"
            placeholder="Write a comment..."
            value={s_newComment}
            onChange={(e) => set_s_newComment(e.target.value)}
          />
          <Button size="large" className="font-medium text-black" onClick={sentData}>
            Send
          </Button>
        </section>

        <section className="flex w-full flex-col gap-3 pt-5">
          <Comment comments={s_allComments} />
        </section>
      </div>
    </Spin>
  );
};

export default CommentList;
