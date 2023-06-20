import { Button, Divider, Modal, Space } from "antd";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { useRouter } from "next/router";
import { PlanOptions } from "@/components/Plan";
import Image from "next/image";
import expiredPlan from "@/assets/expiredPlan.svg";
import Cookies from "js-cookie";
import { useContext } from "react";
import GlobalContext from "@/Context/GlobalContext";
import { userInitValue } from "../util/initValue";

interface ModalProps {
  targetPlan?: PlanOptions;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ExpiredOrInvalidPaymentModal = (props: ModalProps) => {
  const { targetPlan, open, setOpen } = props;
  const router = useRouter();
  const { set_c_user } = useContext(GlobalContext);

  const handleClick = () => {
    router.push(targetPlan ? `/plan?targetPlan=${targetPlan}` : "/plan");
    setOpen(false);
  };
  const handleClose = () => {
    Cookies.set("hookloop-token", "");
    set_c_user(userInitValue);
    router.push("/");
    setOpen(false);
  };

  return (
    <Modal open={open} onCancel={handleClose} maskClosable={false} footer={false}>
      <Space>
        <ExclamationCircleTwoTone twoToneColor="#ffa940" className="text-[20px] font-bold" />
        <h3 className="text-[20px] font-bold">Your subscription has expired!</h3>
      </Space>
      <p className="mt-3 indent-[30px] text-[16px]">Payment required for continued access to our services.</p>

      <Image src={expiredPlan} className="mb-4 mt-4 w-full" alt="expiredPlan" />
      <Divider dashed />
      <Button type="primary" className="mx-auto w-full" onClick={handleClick}>
        Go to Payment
      </Button>
    </Modal>
  );
};
export default ExpiredOrInvalidPaymentModal;
