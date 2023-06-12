/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Select } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import MemberSelect from "@/components/Member/MemberSelect";
import GlobalContext from "@/Context/GlobalContext";

interface IProps {
  members: Imember[];
  addMember: (_: any, data: any) => void;
  deleteMember: (username: Imember["username"]) => void;
  changeRole: (_: any, newRole: Imember["role"]) => void;
}

const ChooseMember: React.FC<IProps> = ({ members, addMember, changeRole, deleteMember }) => {
  const { c_user } = useContext(GlobalContext);
  const auth = members.find((item) => item.userId === c_user.userId)?.role;
  // console.log("c_user = ", c_user);
  // console.log("members = ", members);
  // console.log("auth = ", auth);
  // console.log();
  return (
    <section>
      <div className="mt-4 flex flex-col">
        <p className="mb-1 text-base font-medium">Invite members</p>
        <MemberSelect disabled={auth === "Member"} value={null} placeholder="input email text" onChange={addMember} />
      </div>

      <section className="mt-4 flex flex-col gap-5">
        {members
          ?.filter((item) => item.state !== "delete")
          ?.map((member: Imember) => (
            <div key={member.username + member.role} className="flex items-center justify-between">
              <p className="text-base leading-[32px]">
                <UserOutlined />
                <span className="ml-2">{member.username}</span>
              </p>
              {member.role === "Owner" ? (
                <span className="flex-center h-8 w-20 rounded-[32px] bg-[#FFF7E6] text-[#D46B08]">Owner</span>
              ) : (
                <div className="flex-center gap-2">
                  <Select
                    className="w-24"
                    disabled={auth === "Member"}
                    onChange={(value) => changeRole(member.username, value)}
                    value={member.role}
                    options={[
                      { value: "Admin", label: "Admin" },
                      { value: "Member", label: "Member" },
                    ]}
                  />
                  {auth !== "Member" && (
                    <DeleteOutlined
                      className="cursor-pointer text-base"
                      onClick={() => deleteMember(member.username)}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
      </section>
    </section>
  );
};

export default ChooseMember;
