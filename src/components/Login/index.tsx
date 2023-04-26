import React, { useState } from "react";
import { Grid, Modal, Typography, Form, Input, Button } from "antd";

interface ILogin {
  open: boolean;
  close: () => void;
}

const { useBreakpoint } = Grid;

const { Title, Text, Link } = Typography;

const Login: React.FC<ILogin> = (props) => {
  const { open, close } = props;
  const [form] = Form.useForm();
  const screens: Record<string, boolean> = useBreakpoint();

  const [s_editType, set_s_editType] = useState<"login" | "signUp">("login");

  const toggleEditType = () => {
    const _type = s_editType === "login" ? "signUp" : "login";

    set_s_editType(_type);
    form.resetFields();
  };

  const handleCancel = (): void => {
    // ...
    close();
  };

  const handleOk = (): void => {
    // ...
    close();
  };

  const getWidth = () => {
    if (screens.xxl) {
      return "30%";
    }

    if (screens.xl) {
      return "40%";
    }

    if (screens.lg) {
      return "60%";
    }

    return "60%";
  };

  const onFinish = () => {
    // ...
  };

  return (
    <Modal
      width={getWidth()}
      // title="Login HookLoop"
      cancelText="cancel"
      okText="Sign In"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      // afterClose={() => console.log("afterClose")}
      footer={null}
    >
      <div className="flex flex-col items-center mt-5">
        <Title level={2} className="m-0">
          {s_editType === "login" ? "Hello Again!" : "Create New Account!"}
        </Title>

        <Form
          layout="vertical"
          name="basic"
          form={form}
          onFinish={onFinish}
          autoComplete="no-autofill"
          className="w-full mt-10"
          initialValues={{ username: "" }}
        >
          <Form.Item
            label="username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="w-full" size="large" />
          </Form.Item>

          {s_editType === "signUp" && (
            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input your email!" }]}>
              <Input className="w-full" size="large" />
            </Form.Item>
          )}

          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="w-full" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" className="w-full" size="large" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-10">
          <Text type="secondary">{s_editType === "login" ? "Don't have an account yet?" : "have an account?"}</Text>
          <Link className="ml-2" onClick={toggleEditType}>
            {s_editType === "login" ? "Sign Up" : "Login"}
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
