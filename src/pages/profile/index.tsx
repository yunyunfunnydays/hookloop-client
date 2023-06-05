import Image from "next/image";
import { UploadFile, UploadChangeParam } from "antd/lib/upload";
import ChangePassword from "@/components/ChangePassword";
import { getMe, updateMe, closeMe, updateAvatar } from "@/service/api";
import { IApiResponse } from "@/service/instance";
import React, { useEffect, useState, useContext } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Row, Col, Typography, Input, Divider, Avatar, Spin, message as msg, Upload } from "antd";
import GlobalContext from "@/Context/GlobalContext";
import Router from "next/router";
import Cookies from "js-cookie";

const { Title } = Typography;

const Profile = () => {
  const { set_c_user } = useContext(GlobalContext);
  const [s_showChangePassword, set_s_showChangePassword] = useState<boolean>(false);
  const [s_spinning, set_s_spinning] = useState(false);
  const [s_avatarUrl, set_s_avatarUrl] = useState<string>("");
  const [form] = Form.useForm();

  const closeChangePassword = (): void => {
    set_s_showChangePassword(false);
  };

  useEffect(() => {
    (async () => {
      const res = await getMe();
      const { status, data } = res.data as IApiResponse;
      if (status === "success") {
        form.setFieldsValue({
          username: data.userData.username,
          email: data.userData.email,
        });
        set_s_avatarUrl(data.userData.avatar);
      } else {
        msg.error("Failed to get user data");
      }
    })();
  }, [form]);

  const handleFinish = (values: { username: string; email: string }) => {
    (async () => {
      const { username } = values;

      const res = await updateMe({ username });

      const { status, message } = res.data as IApiResponse;

      if (status === "success") {
        msg.success(message);
      } else {
        msg.error(message);
      }
    })();
  };

  const handleCloseAccount = () => {
    (async () => {
      const res = await closeMe();
      const { status } = res.data as IApiResponse;
      if (status === "success") {
        Cookies.set("hookloop-token", "");
        Router.push("/");
        msg.success("Account closed");
      } else {
        msg.error("Failed to close account");
      }
    })();
  };

  const handleChangeAvatar = async (info: UploadChangeParam<UploadFile<any>>) => {
    const { file } = info;

    try {
      set_s_spinning(true);
      const formData = new FormData();
      formData.append("avatar", file as any);

      const res: AxiosResponse = await updateAvatar(formData);
      const { status, message, data } = res.data as IApiResponse;

      if (status === "success") {
        msg.success(message);

        set_c_user(data.userData);
        set_s_avatarUrl(data.userData.avatar);
      } else {
        msg.error(message);
      }
      set_s_spinning(false);
    } catch (err) {
      // error
    }
  };

  return (
    <Spin spinning={s_spinning}>
      <section className="flex h-full justify-center">
        <div className="mt-8 w-[685px]">
          <Row justify="center">
            <Col>
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader flex-center"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={(info) => {
                  handleChangeAvatar(info);
                }}
              >
                {s_avatarUrl ? (
                  <Image
                    src={`https://cdn.filestackcontent.com/${s_avatarUrl}`}
                    alt="avatar"
                    style={{ borderRadius: "100%" }}
                    width="100"
                    height="100"
                  />
                ) : (
                  <Avatar size={80} icon={<UserOutlined />} />
                )}
              </Upload>
            </Col>
          </Row>
          <section className="mb-8">
            <Title level={2}>Basic Info</Title>
            <Divider />
            <Form
              form={form}
              labelCol={{ span: 6 }}
              labelAlign="left"
              onFinish={handleFinish}
              className="mb-4 flex w-full flex-col gap-[20px]"
            >
              <Form.Item name="username" label="Username" className="w-full">
                <Input />
              </Form.Item>
              <Row className="w-full">
                <Col span={6} className="leading-[32px]">
                  Password:
                </Col>
                <Col span={18}>
                  <Button type="text" onClick={() => set_s_showChangePassword(true)} className="p-0 font-bold">
                    Change Password
                  </Button>
                </Col>
              </Row>
              <Form.Item name="email" label="Email" className="w-full">
                <Input disabled />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="rounded">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </section>
          <section className="mb-8">
            <Title level={2}>Preference</Title>
            <Divider />
            <Form
              labelCol={{ span: 6 }}
              labelAlign="left"
              onFinish={handleFinish}
              className="mb-4 flex w-full flex-col gap-[20px]"
              initialValues={{ language: "English (United States) [Default]", colorTheme: "Normal" }}
            >
              <Form.Item name="language" label="Language" className="w-full">
                <Input disabled />
              </Form.Item>
              <Form.Item name="colorTheme" label="Color Theme" className="w-full">
                <Input disabled />
              </Form.Item>
            </Form>
          </section>
          <section>
            <Title level={2}>Groups</Title>
            <Divider />
            <Row className="mb-[20px] w-full">
              <Col span={6} className="leading-[32px]">
                Workspaces:
              </Col>
              <Col span={18}>
                <Button type="text" onClick={() => set_s_showChangePassword(true)} className="p-0 font-bold">
                  Workspace1
                </Button>
              </Col>
            </Row>
            <Row className="w-full">
              <Col span={6} className="leading-[32px]">
                Members:
              </Col>
              <Col span={18}>
                <Button type="text" onClick={() => set_s_showChangePassword(true)} className="p-0 font-bold">
                  Member1
                </Button>
              </Col>
            </Row>
          </section>
          <Button danger className="mt-6 rounded" onClick={() => handleCloseAccount()}>
            Close Account
          </Button>
        </div>
        <ChangePassword open={s_showChangePassword} close={closeChangePassword} />
      </section>
    </Spin>
  );
};

export default Profile;
