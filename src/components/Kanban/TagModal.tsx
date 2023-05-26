/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { Tag, Button, Modal, Input, Space, Select, Row, Col, Divider } from "antd";
import * as icons from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import IconRenderer from "@/components/util/IconRender";
import { createTag, updateTag } from "@/service/apis/kanban";
import TagColors from "../util/TagColors";

interface IProps {
  kanbanId: string;
  s_Tags: ITag[];
  set_s_Tags: ISetStateFunction<ITag[]>;
}

interface ICreateProps {
  kanbanId: string;
  s_editTag: ITag;
  set_s_Tags: ISetStateFunction<ITag[]>;
  set_s_showCreate: ISetStateFunction<boolean>;
}

const CreateModal: React.FC<ICreateProps> = ({ s_editTag, set_s_Tags, kanbanId, set_s_showCreate }) => {
  const [s_TagName, set_s_TagName] = useState("");
  const [s_Icon, set_s_Icon] = useState("");
  const [s_TagColor, set_s_TagColor] = useState("bg-lime-200 text-slate-600");
  const iconNames = Object.keys(icons);

  const type = s_editTag?.name?.length > 0 ? "edit" : "create";
  const handleCreate = async () => {
    let res: AxiosResponse;
    if (type === "create") {
      res = await createTag(kanbanId, { icon: s_Icon, color: s_TagColor, name: s_TagName });
    } else {
      res = await updateTag(kanbanId, { icon: s_Icon, color: s_TagColor, name: s_TagName }, s_editTag?._id);
    }

    const { status, data } = res.data as IApiResponse;
    if (status === "success") {
      // console.log("Tags = ", data);
      set_s_Tags(data);
    }
    set_s_showCreate(false);
  };

  useEffect(() => {
    if ("name" in s_editTag) {
      set_s_TagName(s_editTag.name);
      set_s_Icon(s_editTag.icon);
      set_s_TagColor(s_editTag.color);
    }
  }, []);

  return (
    <section className="flex flex-col">
      <div className="w-full h-20 flex-center bg-gray-200">
        <div className={`${s_TagColor} min-w-[100px] px-5 h-3/5 rounded-[50px] flex-center gap-2 text-[30px]`}>
          <IconRenderer iconName={s_Icon as keyof typeof icons} />
          {s_TagName}
        </div>
      </div>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <div className="font-semibold text-gray-600 mt-5">icon</div>
          <Select
            onChange={(value) => set_s_Icon(value)}
            className="w-full"
            size="large"
            options={iconNames.map((item) => ({
              label: <IconRenderer iconName={item as keyof typeof icons} />,
              value: item,
            }))}
          />
        </Col>
        <Col span={16}>
          <div className="font-semibold text-gray-600 mt-5">Tag Name</div>
          <Input placeholder="type a tag name" value={s_TagName} onChange={(e) => set_s_TagName(e.target.value)} />
        </Col>
      </Row>

      <div className="font-semibold text-gray-600 mt-5">Choose a color</div>
      <Space wrap size="small">
        {TagColors.map((color) => (
          <div
            key={color}
            className={`${color} w-14 h-7 rounded-sm hover:opacity-75 transition-all cursor-pointer`}
            onClick={() => set_s_TagColor(color)}
          />
        ))}
      </Space>

      <Divider />

      <div className="flex justify-end">
        <Button type="primary" onClick={handleCreate}>
          {type === "create" ? "create tag" : "edit tag"}
        </Button>
      </div>
    </section>
  );
};

const TagModal: React.FC<IProps> = ({ s_Tags, set_s_Tags, kanbanId }) => {
  const [s_showCreate, set_s_showCreate] = useState(false);

  const [s_editTag, set_s_editTag] = useState<ITag>({
    name: "",
    icon: "",
    color: "",
    kanbanId: "",
  });

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-3">
        {s_Tags?.map((tag: ITag) => (
          <div className="flex gap-2">
            <Tag
              key={tag._id}
              // color={tag.color}
              color="#edebeb"
              className={`${tag.color} flex-1 font-medium py-2 px-5 h-3/5 rounded-md flex-center gap-3 text-[20px]`}
              style={{ marginRight: 3 }}
            >
              <IconRenderer iconName={tag.icon as keyof typeof icons} />
              <span>{tag.name}</span>
            </Tag>
            <EditOutlined
              className="text-[25px] cursor-pointer"
              onClick={() => {
                set_s_editTag(tag);
                set_s_showCreate(true);
              }}
            />
          </div>
        ))}
      </div>

      <Button type="primary" className="mt-3" onClick={() => set_s_showCreate(true)}>
        Create new Tag
      </Button>

      {/* 建立 Tag 的 Modal */}
      <Modal
        title="create new tag"
        width="350px"
        open={s_showCreate}
        destroyOnClose
        onCancel={() => {
          set_s_showCreate(false);
          set_s_editTag({
            name: "",
            icon: "",
            color: "",
            kanbanId: "",
          });
        }}
        footer={null}
      >
        {s_showCreate && (
          <CreateModal
            s_editTag={s_editTag}
            set_s_Tags={set_s_Tags}
            kanbanId={kanbanId}
            set_s_showCreate={set_s_showCreate}
          />
        )}
      </Modal>
    </section>
  );
};

export default TagModal;
