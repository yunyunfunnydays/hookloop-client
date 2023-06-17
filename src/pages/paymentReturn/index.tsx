import { useRouter } from "next/router";
import { useEffect } from "react";

const PaymentReturn = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(window.location.href);
  }, []);

  return <>付款結束，藍新金流導轉前端畫面</>;
};
export default PaymentReturn;
