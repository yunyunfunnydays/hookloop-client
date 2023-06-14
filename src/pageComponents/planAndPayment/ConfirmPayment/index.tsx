import { Button, Divider, Form, Input, InputNumber, Space, Tag, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import logo_black from "@/assets/logo_black.svg";
import Image from "next/image";

interface ConfirmPaymentProps {
  handlePrevious: () => void;
  encryptionOderData?: ICreateOrderReturnType;
}
const ConfirmPayment = (props: ConfirmPaymentProps) => {
  const { handlePrevious, encryptionOderData } = props;
  const [form] = Form.useForm<IPaymentTradeInfoType>();

  useEffect(() => {
    console.log("encryptionOderData", encryptionOderData);
    if (encryptionOderData?.tradeInfo) {
      form.setFieldsValue(encryptionOderData?.tradeInfo);
    }
  }, [encryptionOderData]);

  console.log("form: ", form.getFieldsValue());
  return (
    <section>
      <Divider />
      <section>
        <main className="relative flex flex-col">
          <Image className="mx-auto mb-5" src={logo_black} alt="HOOK LOOP" />
          <div className="border border-black p-8">
            <h2 className="mt-10 flex text-[20px] font-bold">Check List / Invoices</h2>
            <div className="my-3 w-full border-b-2" />

            <form action="https://ccore.newebpay.com/MPG/mpg_gateway" method="post">
              <input type="text" name="TradeSha" value={encryptionOderData?.shaEncrypted} hidden />
              <input type="text" name="TradeInfo" value={encryptionOderData?.aesEncrypted} hidden />
              <input type="text" name="TimeStamp" value={encryptionOderData?.tradeInfo?.TimeStamp} hidden />
              <input type="text" name="Version" value={encryptionOderData?.tradeInfo?.Version} hidden />
              <input type="text" name="MerchantID" value={encryptionOderData?.tradeInfo?.MerchantID} hidden />
              <label htmlFor="MerchantOrderNo">
                MerchantOrderNo:{" "}
                <input type="text" name="MerchantOrderNo" value={encryptionOderData?.tradeInfo?.MerchantOrderNo} />
              </label>
              <br />
              <label htmlFor="Amt">
                Amount: <input type="text" name="Amt" value={encryptionOderData?.tradeInfo?.Amt} />
              </label>
              <br />
              <label htmlFor="Email">
                Email:{" "}
                <input
                  type="email"
                  name="Email"
                  value={encryptionOderData?.tradeInfo?.Email}
                  style={{ width: "300px" }}
                />
              </label>
              <Divider />
              <footer>
                <button
                  type="submit"
                  style={{ display: "inline-block", background: "#000", color: "#fff", padding: "5px 15px" }}
                >
                  Pay Now
                </button>

                <Button className="mr-2" onClick={handlePrevious}>
                  Previous
                </Button>
              </footer>
            </form>
          </div>
        </main>
      </section>
    </section>
  );
};
export default ConfirmPayment;
