import { Button } from "antd";

interface PayResultProps {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
const PayResultFail = (props: PayResultProps) => {
  const { setCurrent } = props;

  return (
    <section className="flex flex-col text-center">
      <h1 className="text-[32px] font-bold">Oops! Something went wrong!</h1>
      <p className="text-[16px]">Sorry, there was an issue with your payment.</p>
      <p className="text-[16px]">
        Please try again or contact customer support for assistance. contact our customer support team via email at{" "}
        <a href="mailto:hookloop.official@gmail.com">Service Mail</a> .
      </p>
      <Button type="primary" className="w-46 mx-auto mt-10" onClick={() => setCurrent(0)}>
        Try again
      </Button>
    </section>
  );
};
export default PayResultFail;
