import ChangePassword from "@/components/ChangePassword";
import { getMe } from "@/service/api";
import { IApiResponse } from "@/service/instance";
import { Button, Form, Row, Col, Typography, Input, Divider } from "antd";
import React, { useEffect, useState } from "react";

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
      const { status, data } = res as unknown as IApiResponse;

      console.log("data.userData", data.userData);
      if (status === "success") {
        form.setFieldsValue({
          username: data.userData.name,
          email: data.userData.email,
        });
      }
    })();
  }, [form]);

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <section className="h-full flex justify-center">
      <div className="w-[685px] mt-8">
        <section className="mb-8">
          <Title level={2}>Basic Info</Title>
          <Divider />
          <Form
            form={form}
            labelCol={{ span: 6 }}
            labelAlign="left"
            onFinish={onFinish}
            className="w-full flex flex-col items-center gap-[20px] mb-4"
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
            {/* <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item> */}
          </Form>
        </section>
        <section className="mb-8">
          <Title level={2}>Preference</Title>
          <Divider />
          <Form
            labelCol={{ span: 6 }}
            labelAlign="left"
            onFinish={onFinish}
            className="w-full flex flex-col items-center gap-[20px] mb-4"
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
        <Button danger className="mt-6 ">
          Close Account
        </Button>
      </div>
      <ChangePassword open={s_showChangePassword} close={closeChangePassword} />
    </section>
  );
};

export default Profile;
