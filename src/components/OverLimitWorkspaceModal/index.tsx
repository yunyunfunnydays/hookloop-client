import { Button, Divider, Modal, Space } from "antd";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { useRouter } from "next/router";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const OverLimitWorkspaceModal = (props: ModalProps) => {
  const { open, setOpen } = props;
  const router = useRouter();

  return (
    <Modal open={open} onCancel={() => setOpen(false)} maskClosable={false} footer={false}>
      <Space>
        <ExclamationCircleTwoTone twoToneColor="#ffa940" className="text-[20px] font-bold" />
        <h3 className="text-[20px] font-bold">Oops! No more Workspaces available!</h3>
      </Space>
      <Divider dashed />

      <Button type="primary" className="mx-auto w-full" onClick={() => router.push("/plan")}>
        Want more workspaces ?
      </Button>
    </Modal>
  );
};
export default OverLimitWorkspaceModal;
