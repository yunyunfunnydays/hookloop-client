import { Button } from "antd";
import { useRouter } from "next/router";
import PlanComponent from "@/pageComponents/planAndPayment/Plan";

interface ChooseYourPlanProps {
  handleConfirmOrder: () => Promise<void>;
}
const ChooseYourPlan = (props: ChooseYourPlanProps) => {
  const { handleConfirmOrder } = props;
  const router = useRouter();

  return (
    <section>
      <main className="flex flex-col">
        <h1 className="mx-auto text-[32px] font-bold">Confirm Your Order & Payment</h1>
        <p className="mx-auto mt-6">HookLoop is trusted by millions and provides support to teams around the world.</p>
        <p className="mx-auto mb-6">Discover which option suits you.</p>
        <PlanComponent source="plan-page" />
      </main>

      <footer className="mx-auto mb-4 mt-16">
        <Button className="mr-2" type="dashed" onClick={() => router.push("/")}>
          Go Back to Home Page
        </Button>
        <Button type="primary" onClick={handleConfirmOrder}>
          Confirm
        </Button>
      </footer>
    </section>
  );
};
export default ChooseYourPlan;
