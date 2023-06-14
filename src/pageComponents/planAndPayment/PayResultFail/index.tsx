import { Button } from "antd";
import { useRouter } from "next/router";

const PayResultFail = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col text-center">
      <h1 className="text-[32px] font-bold">Oops! Something went wrong!</h1>
      <p className="my-6">
        Sorry, there was an issue with your payment. Please try again or contact customer support for assistance.
        contact our customer support team via email at yulaie1012@gmail.com.
      </p>
      <Button type="primary" className="w-46 mx-auto" onClick={() => router.push("/plan")}>
        Try again (這裡怎麼用 form 表單？)
      </Button>
    </section>
  );
};
export default PayResultFail;
