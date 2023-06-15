import { Button, Divider } from "antd";
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
        <h2 className="m-auto mb-3 flex text-[30px] font-bold">Choose Your Plan</h2>
        <p className="mx-auto">HookLoop is trusted by millions and provides support to teams around the world.</p>
        <p className="mx-auto mb-10">Discover which option suits you.</p>
        <PlanComponent source="plan-page" />
      </main>

      <footer className="mt-30 mx-auto mb-4 block">
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
