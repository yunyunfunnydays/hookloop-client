import ChangePassword from "@/components/ChangePassword";
import { getMe, updateMe, closeMe } from "@/service/api";
import { IApiResponse } from "@/service/instance";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Row, Col, Typography, Input, Divider, Avatar, message as msg } from "antd";
import Router from "next/router";
import Cookies from "js-cookie";

const { Title } = Typography;

const Profile = () => {
  const [s_showChangePassword, set_s_showChangePassword] = useState(false);
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

  return (
    <section className="h-full flex justify-center">
      <div className="w-[685px] mt-8">
        <div className="w-full flex-center mb-2">
          <Avatar size={80} icon={<UserOutlined />} />
        </div>
        <section className="mb-8">
          <Title level={2}>Basic Info</Title>
          <Divider />
          <Form
            form={form}
            labelCol={{ span: 6 }}
            labelAlign="left"
            onFinish={handleFinish}
            className="w-full flex flex-col gap-[20px] mb-4"
          >
            <Form.Item name="username" label="Username" className="w-full">
              <Input />
            </Form.Item>
            <Row className="w-full">
              <Col span={6} className="leading-[32px]">
                Password:
              </Col>
              <Col span={18}>
                <Button type="text" onClick={() => set_s_showChangePassword(true)} className="font-bold p-0">
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
            className="w-full flex flex-col gap-[20px] mb-4"
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
          <Row className="w-full mb-[20px]">
            <Col span={6} className="leading-[32px]">
              Workspaces:
            </Col>
            <Col span={18}>
              <Button type="text" onClick={() => set_s_showChangePassword(true)} className="font-bold p-0">
                Workspace1
              </Button>
            </Col>
          </Row>
          <Row className="w-full">
            <Col span={6} className="leading-[32px]">
              Members:
            </Col>
            <Col span={18}>
              <Button type="text" onClick={() => set_s_showChangePassword(true)} className="font-bold p-0">
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
  );
};

export default Profile;
