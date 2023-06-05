import React from "react";
import { Avatar } from "antd";

// 獲得 Avatar 的 prop 型別, 讓 CustAvatar 繼承
type AvatarProps = React.ComponentProps<typeof Avatar>;

interface IProps extends AvatarProps {
  info: IUser | IOwner;
}

const CustAvatar: React.FC<IProps> = ({ info, ...props }) => {
  return (
    <Avatar
      size={32}
      src={info.avatar.length > 0 && `https://cdn.filestackcontent.com/${info.avatar}`}
      className="cursor-pointer bg-gray-200"
      {...props}
    >
      {info?.avatar.length === 0 ? info.username[0] : null}
    </Avatar>
  );
};

export default CustAvatar;
