import React from "react";
import { ConfigProvider } from "antd";

const withTheme = (node: JSX.Element) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#262626",
        borderRadius: 2,
      },
      components: {
        Menu: {
          colorSubItemBg: "#FFF",
          colorItemBgHover: "rgba(0, 0, 0, 0.06)",
          colorItemBgSelected: "rgba(0, 0, 0, 0.06)",
          colorItemText: "#595959",
          colorSplit: "transprant",
          margin: 4,
        },
        Layout: {
          colorBgLayout: "#FFF",
          colorBgHeader: "#FFF",
          padding: 0,
        },
        DatePicker: {
          controlHeight: 40,
          fontSize: 16,
        },
        Button: {
          colorText: "#6C6C6C",
          borderRadius: 2,
          borderRadiusLG: 2,
          borderRadiusSM: 2,
          controlOutline: "",
        },
        Input: {
          borderRadius: 2,
          borderRadiusLG: 2,
          borderRadiusSM: 2,
          controlHeight: 40,
          fontSize: 16,
        },
        Modal: {
          borderRadiusLG: 2,
          borderRadiusSM: 2,
          paddingContentHorizontalLG: 25,
          padding: 25,
          paddingLG: 25,
          paddingMD: 25,
          wireframe: true,
        },
        Typography: {
          colorLink: "#6989ba",
          sizeMarginHeadingVerticalEnd: 0,
          fontWeightStrong: 500,
        },
        Form: {
          margin: 0,
          marginLG: 0,
          marginXS: 0,
          marginXXS: 0,
        },
      },
    }}
  >
    {node}
  </ConfigProvider>
);

export default withTheme;
