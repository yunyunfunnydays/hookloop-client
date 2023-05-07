import ChangePassword from "@/components/ChangePassword";
import { Button } from "antd";
import React, { useState } from "react";

const Profile = () => {
  const [s_showChangePassword, set_s_showChangePassword] = useState(false);

  const closeChangePassword = (): void => {
    set_s_showChangePassword(false);
  };

  return (
    <section className="h-full flex-center">
      <h1 className="text-[100px]">Profile</h1>
      <Button className="font-bold text-black" onClick={() => set_s_showChangePassword(true)}>
        Change Password
      </Button>
      <ChangePassword open={s_showChangePassword} close={closeChangePassword} />
    </section>
  );
};

export default Profile;
