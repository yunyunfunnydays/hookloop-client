import { Button, Modal } from "antd";
import Image from "next/image";
import exclamation_circle from "@/assets/exclamation_circle.svg";

interface CancelSubscribeModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const CancelSubscribeModal = (props: CancelSubscribeModalProps) => {
  const { visible, setVisible } = props;
  return (
    <Modal
      title={
        <span className="flex">
          <Image className="mr-2" src={exclamation_circle} alt="exclamation_circle" />
          Are you sure you what to unsubscribe?
        </span>
      }
      width="472px"
      open={visible}
      destroyOnClose
      onCancel={() => setVisible(false)}
      maskClosable={false}
      footer={null}
    >
      <div className="flex">
        <Button className="ml-auto" onClick={() => setVisible(false)}>
          No
        </Button>
        <Button className="ml-2" type="primary" onClick={() => setVisible(false)}>
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default CancelSubscribeModal;
