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
  c_Tags: ITag[];
  set_c_Tags: ISetStateFunction<ITag[]>;
}

interface ICreateProps {
  kanbanId: string;
  s_editTag: ITag;
  set_c_Tags: ISetStateFunction<ITag[]>;
  set_s_showCreate: ISetStateFunction<boolean>;
}

const CreateModal: React.FC<ICreateProps> = ({ s_editTag, set_c_Tags, kanbanId, set_s_showCreate }) => {
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
      set_c_Tags(data);
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
      <div className="flex-center h-20 w-full bg-gray-200">
        <div className={`${s_TagColor} flex-center h-3/5 min-w-[100px] gap-2 rounded-[50px] px-5 text-[30px]`}>
          <IconRenderer iconName={s_Icon as keyof typeof icons} />
          {s_TagName}
        </div>
      </div>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <div className="mt-5 font-semibold text-gray-600">icon</div>
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
          <div className="mt-5 font-semibold text-gray-600">Tag Name</div>
          <Input placeholder="type a tag name" value={s_TagName} onChange={(e) => set_s_TagName(e.target.value)} />
        </Col>
      </Row>

      <div className="mt-5 font-semibold text-gray-600">Choose a color</div>
      <Space wrap size="small">
        {TagColors.map((color) => (
          <div
            key={color}
            className={`${color} h-7 w-14 cursor-pointer rounded-sm transition-all hover:opacity-75`}
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

const TagModal: React.FC<IProps> = ({ c_Tags, set_c_Tags, kanbanId }) => {
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
        {c_Tags?.map((tag: ITag) => (
          <div className="flex gap-2">
            <Tag
              key={tag._id}
              // color={tag.color}
              color="#edebeb"
              className={`${tag.color} flex-center h-3/5 flex-1 gap-3 rounded-md px-5 py-2 text-[20px] font-medium`}
              style={{ marginRight: 3 }}
            >
              <IconRenderer iconName={tag.icon as keyof typeof icons} />
              <span>{tag.name}</span>
            </Tag>
            <EditOutlined
              className="cursor-pointer text-[25px]"
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
            set_c_Tags={set_c_Tags}
            kanbanId={kanbanId}
            set_s_showCreate={set_s_showCreate}
          />
        )}
      </Modal>
    </section>
  );
};

export default TagModal;
