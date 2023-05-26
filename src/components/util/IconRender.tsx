import React, { FC } from "react";
import * as AntdIcons from "@ant-design/icons";

interface IconRendererProps {
  iconName: keyof typeof AntdIcons;
}

const IconRenderer: FC<IconRendererProps> = ({ iconName }) => {
  const AntdIcon = AntdIcons[iconName] as any; // consider AntdIcon as any

  // Check if AntdIcon is a valid React component
  if (AntdIcon && AntdIcon.$$typeof === Symbol.for("react.forward_ref")) {
    const ValidAntdIcon = AntdIcon as React.ComponentType; // then cast it to React.ComponentType
    return <ValidAntdIcon />;
  }
  // console.log("e04");
  // return null or a placeholder for invalid icons
  return null;
};

export default IconRenderer;
