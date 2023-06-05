import React, { useState, useContext } from "react";
import Image from "next/image";
import Router from "next/router";

import {
  Grid,
  Row,
  Col,
  Modal,
  Typography,
  Form,
  Input,
  Button,
  Tag,
  notification,
  message as msg,
  Spin,
  Space,
} from "antd";
// import { EyeOutlined, EyeInvisibleOutlined, CloseOutlined } from "@ant-design/icons";
// eslint-disable-next-line import/no-extraneous-dependencies

import Cookies from "js-cookie";
// logo
import logo from "@/assets/logo_black.svg";
// context
import GlobalContext from "@/Context/GlobalContext";
// api
import { IApiResponse } from "@/service/instance";
import { createUser, forgetPassword, login } from "@/service/api";
import Timer from "@/components/Timer";

interface ILogin {
  open: boolean;
  close: () => void;
}

const { useBreakpoint } = Grid;

const { Title, Text, Paragraph } = Typography;

const Login: React.FC<ILogin> = (props) => {
  /*
   * 型別請參考 ILogin
   * open 用來控制要不要開啟登入彈窗
   * close 關閉彈窗時執行
   */
  const { open, close } = props;
  const { set_c_user } = useContext(GlobalContext);
  const [form] = Form.useForm();
  // API 錯誤時用來讓使用者明確知道錯在哪裡
  const [api, contextHolder] = notification.useNotification();
  // antd 用來監聽畫面寬度變化
  const screens: Record<string, boolean> = useBreakpoint();
  // 判斷目前情境是[登入]還是[註冊]
  const [s_editType, set_s_editType] = useState<"login" | "signUp" | "forgetPassword">("login");
  // const [s_passwordVisible, set_s_passwordVisible] = useState(false);
  // 點擊按鈕 call API 等待過程，給轉圈圈優化使用者體驗
  const [s_loading, set_s_loading] = useState(false);
  const [s_reset_password_email_status, set_s_reset_password_email_status] = useState(false);
  const [s_reset_password_timer, set_s_reset_password_timer] = useState(false);


  // const ICON_STYLE = "cursor-pointer mb-2";

  // 按鈕基本樣式
  const SUBMIT_BTN = "w-[120px] h-[32px] py-[4px] px-[15px] font-semibold";
  const RESET_PASSWORD_SUBMIT_BTN = `w-[250px] h-[32px] py-[4px] px-[15px] font-semibold`;

  // 用來切換[登入]、[註冊]
  const toggleEditType = (type?: "login" | "signUp" | "forgetPassword") => {
    set_s_editType(type || "login");
    // 切換時重置 form value
    form.resetFields();
  };

  // 關閉彈窗
  const handleCancel = (): void => {
    // ...
    close();
  };

  // 取得彈窗寬度，每一個size都寫是方便之後改寬度
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
      Router.push("/dashboard");
      close();
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
  const onFinish = async (values: IUser) => {
    if (s_editType === "login") {
      set_s_loading(true);
      const res: AxiosResponse = await login(values);

      const { status } = res.data as IApiResponse;
      if (status === "success") {
        handleResponse(res.data);
      } else {
        handleError(res.data);
      }
      set_s_loading(false);
    }

    if (s_editType === "signUp") {
      set_s_loading(true);
      const res: AxiosResponse = await createUser(values);
      const { status } = res.data as IApiResponse;
      if (status === "success") {
        handleResponse(res.data);
      } else {
        handleError(res.data);
      }
      set_s_loading(false);
    }

    if (s_editType === "forgetPassword") {
      set_s_loading(true);
      const res: AxiosResponse = await forgetPassword({ email: values.email });
      const { status, message } = res.data as IApiResponse;
      if (status === "success") {
        set_s_reset_password_email_status(true);
        set_s_reset_password_timer(true);
        msg.success(message);
      } else {
        set_s_reset_password_email_status(false);
        handleError(res.data);
      }
      set_s_loading(false);
    }
  };

  useEffect(() => {
    if (open) {
      set_s_editType("login");
      set_s_reset_password_email_status(false);
      set_s_reset_password_timer(false);
    }
  }, [open]);

  return (
    <Modal width={getWidth()} destroyOnClose open={open} onCancel={handleCancel} footer={null}>
      <Spin spinning={s_loading}>
        {contextHolder}
        <div className="flex flex-col items-center p-[25px] pt-[7px]">
          <Form
            layout="vertical"
            name="basic"
            form={form}
            onFinish={onFinish}
            className="flex w-full flex-col items-center gap-[40px]"
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
                name="username"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="type your username" />
              </Form.Item>
            )}

            {s_editType !== "forgetPassword" && (
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
                      // iconRender={(_) => <div />}
                      // visibilityToggle={{
                      //   visible: s_passwordVisible,
                      // }}
                    />
                  </Form.Item>
                  {/* {s_passwordVisible ? (
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
                  )} */}
                </Col>
              </Row>
            )}

            {s_editType === "signUp" && (
              <Row className="w-full">
                <Col span={24}>
                  <Form.Item
                    name="confirm"
                    label={<Title level={5}>Confirm Password</Title>}
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
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
            )}

            <Row className="w-full">
              <Col span={24}>
                <Form.Item className="flex-center mb-2">
                  <Button
                    type="primary"
                    className={s_editType === "forgetPassword" ? RESET_PASSWORD_SUBMIT_BTN : SUBMIT_BTN}
                    htmlType="submit"
                    disabled={s_editType === "forgetPassword" && s_reset_password_timer === true}
                  >
                    {s_editType === "login" && "Log in"}
                    {s_editType === "signUp" && "Sign up"}
                    {s_editType === "forgetPassword" && s_reset_password_timer === true && (
                      <Space>
                        Re-Send Email in
                        <Timer setTimerTrigger={set_s_reset_password_timer} />
                      </Space>
                    )}
                    {s_editType === "forgetPassword" && s_reset_password_timer === false && "Send Reset Password Email"}
                  </Button>
                </Form.Item>
              </Col>

              {s_editType === "login" && (
                <Col span={24}>
                  <Text
                    type="secondary"
                    underline
                    className="flex-center cursor-pointer"
                    onClick={() => toggleEditType("forgetPassword")}
                  >
                    Forget your password?
                  </Text>
                </Col>
              )}
            </Row>
          </Form>

          <div className="flex-center mt-[40px] h-[105px] w-full flex-col gap-2 bg-[#F5F5F5]">
            <Title level={5}>{s_editType === "login" ? "Not have account yet?" : "Already have an account?"}</Title>
            <Button
              className={`text-black ${SUBMIT_BTN}`}
              onClick={() => {
                if (s_editType === "login") {
                  toggleEditType("signUp");
                } else {
                  toggleEditType("login");
                }
              }}
            >
              {s_editType === "login" ? "Sign up" : "Log in"}
            </Button>
          </div>
          {s_reset_password_email_status && (
            <div className="flex-center mt-[20px] w-full flex-col bg-[#ffe8eb] p-[20px]">
              <Title level={5} type="danger">
                An email has been sent to your email.
              </Title>
              <Paragraph type="danger">
                Follow the directions in the email to reset your password. <br />
                The email reset authorization is availablefor 10 minutes.
              </Paragraph>
            </div>
          )}
        </div>
        {/* {useTimer(10000, set_s_reset_password_timer).minute}:{useTimer(10000, set_s_reset_password_timer).second} */}
      </Spin>
    </Modal>
  );
};

export default Login;
