import React from "react";
import { Modal, Form, Input, Button, message as msg } from "antd";
import { updatePassword } from "@/service/api";
import { IApiResponse } from "@/service/instance";

interface IChangePassword {
  open: boolean;
  close: () => void;
}

const ChangePassword: React.FC<IChangePassword> = (props) => {
  const { open, close } = props;
  const [form] = Form.useForm();

  const handleCancel = (): void => {
    close();
  };

  const onFinish = async (values: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
    // 驗證密碼和確認密碼是否相同
    if (values.newPassword !== values.confirmPassword) {
      msg.error("密碼不一致");
      return;
    }

    // 處理修改密碼邏輯
    try {
      const { oldPassword, newPassword } = values;
      const res = await updatePassword({ oldPassword, newPassword });

      const { message, status } = res.data as IApiResponse;
      if (status === "success") {
        msg.success(message);
        form.resetFields();
        close();
      } else {
        msg.error(message);
      }
    } catch (error) {
      msg.error("密碼修改失敗");
      // console.error(error);
    }
  };

  return (
    <Modal width={685} title="Change Password" destroyOnClose open={open} onCancel={handleCancel} footer={null}>
      <div className="flex flex-col items-center p-[25px] pt-[7px]">
        <Form
          name="changePassword"
          form={form}
          labelCol={{ span: 6 }}
          labelAlign="left"
          onFinish={onFinish}
          className="flex w-full flex-col items-center gap-[20px]"
        >
          <Form.Item
            name="oldPassword"
            className="w-full"
            label="Old Password"
            rules={[
              { required: true, message: "Please enter your old password" },
              { min: 8, max: 20, message: "Password must be between 8 and 20 characters" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            className="w-full"
            label="New Password"
            rules={[
              { required: true, message: "Please enter your new password" },
              { min: 8, max: 20, message: "Password must be between 8 and 20 characters" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            className="w-full"
            label="Confirm Password"
            rules={[
              { required: true, message: "Please confirm your new password" },
              { min: 8, max: 20, message: "Password must be between 8 and 20 characters" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="h-[32px] w-[120px] px-[15px] py-[4px] font-semibold">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ChangePassword;
