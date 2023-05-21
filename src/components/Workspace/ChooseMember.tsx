import React from "react";
import { Select } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import MemberSelect from "@/components/Member/MemberSelect";

const ChooseMember = () => {
  return (
    <section>
      <div className="flex flex-col mt-4">
        <p className="text-base font-medium mb-1">Invite members</p>
        {/* <Input.Search placeholder="input search text" enterButton /> */}
        <MemberSelect />
      </div>

      <section className="flex flex-col mt-4 gap-5">
        <div className="flex justify-between">
          <p className="text-base leading-[32px]">
            <UserOutlined />
            <span className="ml-2">Ariean Jian</span>
          </p>

          <span className="flex-center h-8 w-20 bg-[#FFF7E6] text-[#D46B08] rounded-[32px]">Owner</span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-base">
            <UserOutlined />
            <span className="ml-2">Emi Chang</span>
          </p>

          <div className="flex-center gap-2">
            <Select
              className="w-24"
              options={[
                { value: "Admain", label: "Admain" },
                { value: "Member", label: "Member" },
              ]}
            />
            <DeleteOutlined className="text-base cursor-pointer" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-base">
            <UserOutlined />
            <span className="ml-2">Kevin Lin</span>
          </p>

          <div className="flex-center gap-2">
            <Select
              className="w-24"
              options={[
                { value: "Admain", label: "Admain" },
                { value: "Member", label: "Member" },
              ]}
            />
            <DeleteOutlined className="text-base cursor-pointer" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default ChooseMember;
