import { Button, Space } from "antd";
import { useRouter } from "next/router";
import PlanComponent from "@/components/Plan";
import { useContext } from "react";
import GlobalContext from "@/Context/GlobalContext";
import { CheckCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";

interface ChooseYourPlanProps {
  handleConfirmOrder: () => Promise<void>;
}
const ChooseYourPlan = (props: ChooseYourPlanProps) => {
  const { handleConfirmOrder } = props;
  const router = useRouter();
  const { c_user } = useContext(GlobalContext);

  return (
    <section>
      <main className="flex flex-col">
        <h2 className="m-auto mb-3 flex text-[30px] font-bold">Choose Your Plan</h2>
        <p className="mx-auto">HookLoop is trusted by millions and provides support to teams around the world.</p>
        <p className="mb-10 mb-5 mt-3 text-center font-semibold">Discover which option suits you.</p>
        <PlanComponent source="plan-page" />
      </main>

      <footer className="m-auto mt-20 block text-center">
        <Space>
          <Button type="dashed" onClick={() => router.push("/")}>
            Go Back to Home Page
          </Button>
          {c_user.email ? (
            <Button type="primary" onClick={handleConfirmOrder}>
              <Space>
                <CheckCircleOutlined /> Valid User & Next Step
              </Space>
            </Button>
          ) : (
            <Button type="default" danger onClick={handleConfirmOrder}>
              Log In / Sign Up
            </Button>
          )}
        </Space>
      </footer>
    </section>
  );
};
export default ChooseYourPlan;
