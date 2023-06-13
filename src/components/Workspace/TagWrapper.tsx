/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { getTags } from "@/service/apis/kanban";
import TagModal from "../Kanban/TagModal";

interface IProps {
  kanbanId: string;
}

const TagWrapper: React.FC<IProps> = ({ kanbanId }) => {
  const [c_Tags, set_c_Tags] = useState<ITag[]>([]);
  const [s_spin, set_s_spin] = useState(false);

  const c_getAllTags = async () => {
    if (!kanbanId) return;
    set_s_spin(true);
    const res: AxiosResponse = await getTags(kanbanId);
    const { status, data } = res.data as IApiResponse;
    if (status === "success") {
      set_c_Tags(data);
    }
    set_s_spin(false);
  };

  useEffect(() => {
    c_getAllTags();
  }, [kanbanId]);

  return (
    <Spin spinning={s_spin}>
      {/* @ts-ignore */}
      <TagModal c_Tags={c_Tags} set_c_Tags={set_c_Tags} kanbanId={kanbanId} />
    </Spin>
  );
};

export default TagWrapper;
