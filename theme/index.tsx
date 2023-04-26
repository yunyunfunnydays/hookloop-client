import React from "react";
import { ConfigProvider } from "antd";

const withTheme = (node: JSX.Element) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#6989ba",
      },
      components: {
        Layout: {
          colorBgLayout: "#FFF",
          colorBgHeader: "#FFF",
          padding: 0,
        },
        Typography: {
          colorLink: "#6989ba",
          margin: 0,
          marginLG: 0,
          marginMD: 0,
          marginSM: 0,
          marginXL: 0,
          marginXS: 0,
          marginXXL: 0,
          marginXXS: 0,
        },
      },
    }}
  >
    {node}
  </ConfigProvider>
);

export default withTheme;
