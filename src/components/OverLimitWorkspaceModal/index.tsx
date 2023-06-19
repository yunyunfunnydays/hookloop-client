import { Button, Modal, Space } from "antd";
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
    <Modal title="Basic Modal" open={open} onCancel={() => setOpen(false)}>
      <section className="flex flex-col text-center">
        <Space>
          <ExclamationCircleTwoTone twoToneColor="#ffa940" />
          <h3 className="text-[32px] font-bold">Oops! No more Workspaces available!</h3>
        </Space>

        <Button type="primary" className="w-46 mx-auto" onClick={() => router.push("/plan")}>
          Want more workspaces ?
        </Button>
      </section>
    </Modal>
  );
};
export default OverLimitWorkspaceModal;
