import { Button, Divider, Modal, Space } from "antd";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { useRouter } from "next/router";
import Image from "next/image";
import workspace from "@/assets/workspace.svg";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const OverLimitWorkspaceModal = (props: ModalProps) => {
  const { open, setOpen } = props;
  const router = useRouter();

  const handleClick = () => {
    setOpen(false);
    router.push("/plan");
  };

  return (
    <Modal open={open} onCancel={() => setOpen(false)} maskClosable={false} footer={false}>
      <Space>
        <ExclamationCircleTwoTone twoToneColor="#ffa940" className="text-[20px] font-bold" />
        <h3 className="text-[20px] font-bold">Oops! No more Workspaces available!</h3>
      </Space>
      <p className="mt-3 indent-[30px] text-[16px]">Payment required for continued access to our services.</p>

      <Image src={workspace} className="mb-4 mt-4 w-full" alt="workspace" />
      <Divider dashed />
      <Button type="primary" className="mx-auto w-full" onClick={handleClick}>
        Want more workspaces ?
      </Button>
    </Modal>
  );
};
export default OverLimitWorkspaceModal;
