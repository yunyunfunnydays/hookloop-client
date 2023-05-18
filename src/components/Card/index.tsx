import React from "react";
import Image from "next/image";
import { Row, Col, Input, Avatar, Button, Select, DatePicker } from "antd";
import { EditFilled, PlusOutlined, SettingFilled } from "@ant-design/icons";
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

const Card: React.FC<IProps> = ({ set_s_showCard }) => {
  return (
    <div className="flex flex-col gap-4">
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
      </Row>
    </div>
  );
};

export default Card;
