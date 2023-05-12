/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { DatePicker, Input } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

interface IContent {
  setCollapsed: (value: any) => void;
}

const CustContent = ({ setCollapsed }: IContent) => {
  return (
    <section className="flex flex-col ">
      <div
        className="w-[64px] h-[64px] bg-[#F5F5F5] absolute top-0 left-0 cursor-pointer flex-center"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <DoubleRightOutlined />
      </div>
      <section className="flex justify-end gap-5">
        <DatePicker className="w-[250px] mr-5" />
        <Input.Search placeholder="input search text" enterButton style={{ width: 250 }} />
      </section>
    </section>
  );
};

export default CustContent;
