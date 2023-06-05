/* eslint-disable no-console */
import React, { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Row, Col, Typography, Form, Input, Button, Tag, notification, message as msg, Spin } from "antd";
import Cookies from "js-cookie";
import GlobalContext from "@/Context/GlobalContext";
import { IApiResponse } from "@/service/instance";
import { verifyPassword } from "@/service/api";
import Image from "next/image";
import mission from "@/assets/mission.svg";

const { Title } = Typography;

const ResetPassword = () => {
  const router = useRouter();
  const { set_c_user } = useContext(GlobalContext);
  const [form] = Form.useForm();
  // API 錯誤時用來讓使用者明確知道錯在哪裡
  const [api, contextHolder] = notification.useNotification();
  const [s_loading, set_s_loading] = useState(false);

  // 按鈕基本樣式
  const SUBMIT_BTN = "w-[250px] h-[32px] py-[4px] px-[15px] font-semibold";

  // 因為登入、註冊完成時要做的事情一樣，所以將功能拉出來共用
  const handleResponse = (res: IApiResponse) => {
    const { data, message, status } = res;
    if (status === "success") {
      msg.success(message);
      Cookies.set("hookloop-token", data.token);
      set_c_user({
        ...data.user,
        userId: data.user.id,
      });
      Router.push("/");
    } else {
      msg.error(message);
    }
    set_s_loading(false);
  };

  // 因為登入、註冊完成時要做的事情一樣，所以將功能拉出來共用
  const handleError = (res: IApiResponse) => {
    api.info({
      message: res.message,
      duration: 10,
      placement: "topLeft",
      description: (
        <div>
          {res.data.field && <Tag>{res.data.field}</Tag>}
          <span>{res.data.error}</span>
        </div>
      ),
    });
  };

  // 確定送出
  const onFinish = async ({ newPassword }: { newPassword: string }) => {
    set_s_loading(true);
    const res: AxiosResponse = await verifyPassword({
      newPassword,
      resetPasswordToken: router.query.resetToken?.toString()!,
    });
    const { status, data } = res.data as IApiResponse;
    if (status === "success") {
      handleResponse(res.data);
      Cookies.set("hookloop-token", data.token);
      set_c_user({
        ...data.user,
        userId: data.user.id,
      });
      Router.push("/dashboard");
    } else {
      handleError(res.data);
    }
    set_s_loading(false);
  };

  useEffect(() => {
    // console.log("🚀 ~ file: index.tsx:114 ~ useEffect ~ window.location.href:", window.location.href);
    router.replace(window.location.href);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin spinning={s_loading}>
      {contextHolder}
      <div className="m-auto flex max-w-[600px] flex-col items-center p-[25px]">
        <Form
          layout="vertical"
          name="basic"
          form={form}
          onFinish={onFinish}
          className="flex w-full flex-col items-center gap-[40px]"
        >
          <Title level={3}>Reset Your Password</Title>

          <Row className="w-full">
            <Col span={24} className="flex items-end gap-1">
              <Form.Item
                className="flex-1"
                label={<Title level={5}>Password</Title>}
                name="newPassword"
                rules={[{ required: true }, { max: 20 }, { min: 8 }]}
              >
                <Input.Password size="large" placeholder="enter 8 to 20 letters." />
              </Form.Item>
            </Col>
          </Row>

          <Row className="w-full">
            <Col span={24}>
              <Form.Item
                name="confirm"
                label={<Title level={5}>Confirm Password</Title>}
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("The two passwords that you entered do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password size="large" placeholder="please confirm your password" />
              </Form.Item>
            </Col>
          </Row>

          <Row className="w-full">
            <Col span={24}>
              <Form.Item className="flex-center mb-2">
                <Button danger className={SUBMIT_BTN} htmlType="submit">
                  Reset Password
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Image src={mission} className="mt-20 h-[205px] w-[295px] md:h-[395px] md:w-[565px]" alt="mission" />
      </div>
    </Spin>
  );
};

export default ResetPassword;
