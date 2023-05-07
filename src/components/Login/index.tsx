/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Grid, Row, Col, Modal, Typography, Form, Input, Button, Tag, notification, message as msg } from "antd";
import { EyeOutlined, EyeInvisibleOutlined, CloseOutlined } from "@ant-design/icons";
// logo
import logo from "@/assets/logo.svg";
// api
import { IApiResponse } from "@/service/instance";
import { getUsers, createUser, login } from "@/service/api";

interface ILogin {
  open: boolean;
  close: () => void;
}

const { useBreakpoint } = Grid;

const { Title, Text, Link } = Typography;

const Login: React.FC<ILogin> = (props) => {
  const { open, close } = props;
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const screens: Record<string, boolean> = useBreakpoint();

  const [s_editType, set_s_editType] = useState<"login" | "signUp">("login");
  const [s_passwordVisible, set_s_passwordVisible] = useState(false);

  const ICON_STYLE = "cursor-pointer mb-2";

  const SUBMIT_BTN = "w-[120px] h-[32px] py-[4px] px-[15px] font-semibold";

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
    // window width >= 1600
    if (screens.xxl) {
      return 685;
    }

    // window width >= 1200
    if (screens.xl) {
      return 685;
    }
    // window width >= 992
    if (screens.lg) {
      return 685;
    }
    // window width >= 768
    if (screens.md) {
      return 685;
    }

    // window width >= 576
    if (screens.sm) {
      return "90%";
    }

    // window width < 576
    if (screens.sm) {
      return "90%";
    }

    return "90%";
  };

  const onFinish = async (values: IUser) => {
    // ...
    if (s_editType === "login") {
      const res = await login(values);
      // 暫時無法解決型別問題，先用any
      const { data, message, status } = res as unknown as IApiResponse;
      // const { data, message, status } = res as unknown as AxiosResponse<IApiSuccessResponse<unknown>>;
      if (status === "success") {
        msg.success(message);
      } else {
        // msg.error(message);
        api.info({
          message,
          duration: 10,
          placement: "topLeft",
          description: (
            <div>
              <Tag>{data.field}</Tag>
              <span className="ml-2">{data.error}</span>
            </div>
          ),
        });
      }
    }

    if (s_editType === "signUp") {
      const res = await createUser(values);
      // 暫時無法解決型別問題，先用any
      const { data, message, status } = res as unknown as IApiResponse;
      if (status === "success") {
        msg.success(message);
      } else {
        msg.error(message);
      }
    }
  };

  // useEffect(() => {
  //   const call_getUsers = async () => {
  //     const res: AxiosResponse<IApiResponse> = await getUsers();
  //     const { data, message, status } = res as any;
  //     msg.error(message);
  //     if (status === "success") {
  //       msg.success(message);
  //     } else {
  //       msg.error(message);
  //     }
  //   };
  //   call_getUsers();
  // }, []);

  // console.log("getWidth = ", getWidth());

  return (
    <Modal
      width={getWidth()}
      cancelText="cancel"
      okText="Sign In"
      destroyOnClose
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {contextHolder}
      <div className="flex flex-col items-center p-[25px] pt-[7px]">
        <Form
          layout="vertical"
          name="basic"
          form={form}
          onFinish={onFinish}
          className="w-full flex flex-col items-center gap-[40px]"
          initialValues={{ username: "" }}
        >
          <Image src={logo} alt="HOOK LOOP" className="mt-5" />

          <Form.Item
            name="email"
            className="w-full"
            label={<Title level={5}>Email</Title>}
            rules={[
              { required: true },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input placeholder="type your email" size="large" />
          </Form.Item>

          {s_editType === "signUp" && (
            <Form.Item
              label={<Title level={5}>Username</Title>}
              className="w-full"
              name="name"
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="type your username" />
            </Form.Item>
          )}

          <Row className="w-full">
            <Col span={24} className="flex items-end gap-1">
              <Form.Item
                className="flex-1"
                label={<Title level={5}>Password</Title>}
                name="password"
                rules={[{ required: true }, { max: 20 }, { min: 8 }]}
              >
                <Input.Password
                  size="large"
                  placeholder="enter 8 to 20 letters."
                  iconRender={(_) => <div />}
                  visibilityToggle={{
                    visible: s_passwordVisible,
                  }}
                />
              </Form.Item>
              {s_passwordVisible ? (
                <EyeOutlined
                  className={ICON_STYLE}
                  onClick={() => set_s_passwordVisible((prev) => !prev)}
                  style={{ fontSize: "24px" }}
                />
              ) : (
                <EyeInvisibleOutlined
                  className={ICON_STYLE}
                  onClick={() => set_s_passwordVisible((prev) => !prev)}
                  style={{ fontSize: "24px" }}
                />
              )}
            </Col>
          </Row>

          <Row className="w-full">
            <Col span={24}>
              <Form.Item className="flex-center mb-2">
                <Button type="primary" className={SUBMIT_BTN} htmlType="submit">
                  {s_editType === "login" ? "Log in" : "Sign up"}
                </Button>
              </Form.Item>
            </Col>

            {s_editType === "login" && (
              <Col span={24}>
                <Text type="secondary" underline className="cursor-pointer flex-center">
                  Forget your password?
                </Text>
              </Col>
            )}
          </Row>
        </Form>

        <div className="w-full h-[105px] mt-[40px] bg-[#F5F5F5] flex-center flex-col gap-2">
          <Title level={5}>{s_editType === "login" ? "Not have account yet?" : "Already have an account?"}</Title>
          <Button className={`text-black ${SUBMIT_BTN}`} onClick={toggleEditType}>
            {s_editType === "login" ? "Sign up" : "Log in"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
