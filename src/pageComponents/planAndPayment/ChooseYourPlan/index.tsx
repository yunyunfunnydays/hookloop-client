import { Button, Space } from "antd";
import { useRouter } from "next/router";
import PlanComponent, { PlanOptions } from "@/components/Plan";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "@/Context/GlobalContext";
import { CheckCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";

interface ChooseYourPlanProps {
  handleConfirmOrder: () => Promise<void>;
}
const ChooseYourPlan = (props: ChooseYourPlanProps) => {
  const { handleConfirmOrder } = props;
  const router = useRouter();
  const { c_user } = useContext(GlobalContext);
  const [s_selected, set_s_selected] = useState<PlanOptions>(PlanOptions.FREE);
  const [s_submit, set_s_submit] = useState<boolean>(false);

  const handleSelectOrder = () => {
    set_s_submit(true);
    console.log(s_selected);
    router.push(`/plan?targetPlan=${s_selected}`);
  };

  useEffect(() => {
    console.log(123);
    if (s_submit) handleConfirmOrder();
  }, [router.query]);

  return (
    <section>
      <main className="flex flex-col">
        <h2 className="m-auto mb-3 flex text-[30px] font-bold">Choose Your Plan</h2>
        <p className="mx-auto">HookLoop is trusted by millions and provides support to teams around the world.</p>
        <p className="mb-10 mb-5 mt-3 text-center font-semibold">Discover which option suits you.</p>
        <PlanComponent source="plan-page" s_selected={s_selected} set_s_selected={set_s_selected} />
      </main>

      <footer className="m-auto mt-20 block text-center">
        <Space>
          <Button type="dashed" onClick={() => router.push("/")}>
            Go Back to Home Page
          </Button>
          {c_user.email ? (
            <Button type="primary" onClick={handleSelectOrder}>
              <Space>
                <CheckCircleOutlined /> Valid User & Next Step
              </Space>
            </Button>
          ) : (
            <Button type="default" danger onClick={handleSelectOrder}>
              Log In / Sign Up
            </Button>
          )}
        </Space>
      </footer>
    </section>
  );
};
export default ChooseYourPlan;
