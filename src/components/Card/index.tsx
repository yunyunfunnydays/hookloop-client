import React from "react";
import Image from "next/image";
import { Row, Col, Input, Avatar, Typography, Button, Select, DatePicker, Tag, Divider } from "antd";
import {
  EditFilled,
  PlusOutlined,
  SettingFilled,
  TagOutlined,
  ThunderboltOutlined,
  DatabaseOutlined,
  BugOutlined,
  CloseOutlined,
  BookFilled,
  LinkOutlined,
  MessageFilled,
} from "@ant-design/icons";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import User1 from "@/assets/user1.svg";
import User2 from "@/assets/user2.svg";
import User3 from "@/assets/user3.svg";
import User4 from "@/assets/user4.svg";

interface IProps {
  set_s_showCard: ISetStateFunction<boolean>;
}

interface IFieldProps {
  children: React.ReactNode;
}

interface IGroupTitle extends IFieldProps {}

// 每個區域的 title
const GroupTitle: React.FC<IGroupTitle> = ({ children }) => (
  <h5 className="bg-[#F0F0F0] p-1 text-base font-bold">{children}</h5>
);

// 可編輯欄位的 label
const FieldLabel: React.FC<IFieldProps> = ({ children }) => (
  <span className="text-base font-medium text-[#8C8C8C]">{children}</span>
);

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      closeIcon={<CloseOutlined className="ml-1 text-black" />}
      className="bg-[#edebeb] rounded-xl text-[#595959] text-sm font-medium flex"
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const Card: React.FC<IProps> = ({ set_s_showCard }) => {
  const options = [
    {
      value: "P03",
      label: (
        <span className="flex items-center gap-1">
          <TagOutlined />
          P03
        </span>
      ),
    },
    {
      value: "new",
      label: (
        <span className="flex items-center gap-1">
          <ThunderboltOutlined />
          new
        </span>
      ),
    },
    {
      value: "DB",
      label: (
        <span className="flex items-center gap-1">
          <DatabaseOutlined />
          DB
        </span>
      ),
    },
    {
      value: "bug",
      label: (
        <span className="flex items-center gap-1">
          <BugOutlined />
          bug
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-4 h-[70vh] overflow-auto no-scrollbar">
        <GroupTitle>
          <EditFilled className="mr-1" />
          Content
        </GroupTitle>

        <Row gutter={[12, 0]}>
          <Col span={24}>
            <FieldLabel>Title</FieldLabel>
          </Col>
          <Col span={24}>
            <Input placeholder="Write card name" />
          </Col>
        </Row>

        <Row gutter={[12, 0]}>
          <Col span={24}>
            <FieldLabel>Description</FieldLabel>
          </Col>
          <Col span={24}>
            <Input.TextArea placeholder="Write Description" />
          </Col>
        </Row>

        <Row gutter={[12, 0]} align="bottom">
          <Col span={3} className="flex flex-col">
            <FieldLabel>Owner</FieldLabel>
            <Avatar size={32} src={<Image src={User1} alt="user1" />} />
          </Col>

          <Col span={4} className="flex flex-col">
            <FieldLabel>Member</FieldLabel>
            <Avatar.Group maxCount={2} size={32} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
              <Avatar src={<Image src={User1} alt="user1" />} />
              <Avatar src={<Image src={User2} alt="user2" />} />
              <Avatar src={<Image src={User3} alt="user3" />} />
              <Avatar src={<Image src={User4} alt="user4" />} />
            </Avatar.Group>
          </Col>

          <Col span={5} className="flex justify-start">
            <Button
              className="bg-[#D9D9D9] float-right text-white"
              type="primary"
              size="middle"
              shape="circle"
              icon={<PlusOutlined style={{ verticalAlign: "middle" }} />}
            />
          </Col>
        </Row>

        <GroupTitle>
          <SettingFilled className="mr-1" />
          Setting
        </GroupTitle>

        <Row gutter={[12, 12]}>
          <Col span={12} className="flex flex-col">
            <FieldLabel>Project</FieldLabel>
            <Select placeholder="please select project" />
          </Col>

          <Col span={12} className="flex flex-col">
            <FieldLabel>Board</FieldLabel>
            <Select placeholder="please select board" />
          </Col>

          <Col span={24} className="flex flex-col">
            <FieldLabel>Target period</FieldLabel>
            <DatePicker.RangePicker className="h-[30px]" />
          </Col>

          <Col span={24} className="flex flex-col">
            <FieldLabel>Actual period</FieldLabel>
            <DatePicker.RangePicker className="h-[30px]" />
          </Col>

          <Col span={12} className="flex flex-col">
            <FieldLabel>Priority</FieldLabel>
            <Select placeholder="please select project" />
          </Col>

          <Col span={12} className="flex flex-col">
            <FieldLabel>Status</FieldLabel>
            <Select placeholder="please select board" />
          </Col>

          <Col span={24} className="flex flex-col">
            <FieldLabel>Tags</FieldLabel>
            <Select mode="multiple" showArrow tagRender={tagRender} options={options} />
          </Col>
        </Row>

        <GroupTitle>
          <BookFilled className="mr-1" />
          Reference
        </GroupTitle>

        <Row gutter={[12, 8]}>
          <Col span={24} className="flex gap-3">
            <FieldLabel>Links</FieldLabel>
            <Button size="small" className="text-black flex items-center" icon={<LinkOutlined />}>
              Add link
            </Button>
          </Col>
          <Col span={24}>
            <Typography.Link underline href="https://google.com" target="_blank">
              reference website 1
            </Typography.Link>
          </Col>
          <Col span={24}>
            <Typography.Link underline href="https://google.com" target="_blank">
              reference website 2
            </Typography.Link>
          </Col>
          <Col span={24}>
            <Typography.Link underline href="https://google.com" target="_blank">
              reference website 3
            </Typography.Link>
          </Col>
          <Col span={24}>
            <Typography.Link underline href="https://google.com" target="_blank">
              reference website 4
            </Typography.Link>
          </Col>
        </Row>

        <Row gutter={[12, 8]}>
          <Col span={12} className="flex gap-3">
            <FieldLabel>Files</FieldLabel>
            <Button size="small" className="text-black flex items-center" icon={<LinkOutlined />}>
              Add file
            </Button>
          </Col>
          <Col span={24}>
            <Typography.Link underline href="https://google.com" target="_blank">
              reference website 1
            </Typography.Link>
          </Col>
          <Col span={24}>
            <Typography.Link underline href="https://google.com" target="_blank">
              reference website 2
            </Typography.Link>
          </Col>
          <Col span={24}>
            <Typography.Link underline href="https://google.com" target="_blank">
              reference website 3
            </Typography.Link>
          </Col>
          <Col span={24}>
            <Typography.Link underline href="https://google.com" target="_blank">
              reference website 4
            </Typography.Link>
          </Col>
        </Row>

        <GroupTitle>
          <MessageFilled className="mr-1" />
          Comment
        </GroupTitle>
      </section>

      <Divider className="my-3" />

      <Row>
        <Col span={24} className="flex justify-end gap-1">
          <Button type="primary" onClick={() => set_s_showCard(false)}>
            Ok
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Card;
