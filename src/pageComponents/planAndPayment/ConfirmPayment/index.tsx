import { Button, Space, Tag } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";

interface ConfirmPaymentProps {
  handlePrevious: () => void;
  encryptionOderData?: ICreateOrderReturnType;
}
const ConfirmPayment = (props: ConfirmPaymentProps) => {
  const router = useRouter();
  const { handlePrevious, encryptionOderData } = props;
  const inputStyles = { width: "100%", background: "transparent", margin: "3px 0px 12px" };
  const startDate = dayjs();
  const endDate = startDate.add(30, "day");

  console.log("process.env.PAY_TEST_MPG_URL: ", process.env.PAY_TEST_MPG_URL);

  return (
    <section>
      <main className="flex flex-col">
        <h2 className="m-auto mb-5 flex text-[30px] font-bold">Confirm Payment</h2>
        <p className="mx-auto">HookLoop is trusted by millions and provides support to teams around the world.</p>
        <p className="mb-10 mb-5 mt-3 text-center font-semibold">Plan & Payment details as below :</p>

        <div className="relative bg-[#FAFAFA] p-8" style={{ height: 500 }}>
          <Space align="baseline" size={15}>
            <h2 className="text-[20px] font-bold">Plan & Payment</h2>
            <Tag color="red">UN-PAID</Tag>
          </Space>
          <div className="my-3 mb-5 w-full border-b-2" />

          <div style={{ margin: "3px 0px 12px" }}>
            <span className="block text-[14px] font-bold">Plan: </span>
            <span className="text-[14px]">{router.query.targetPlan}</span>
          </div>

          <div style={{ margin: "3px 0px 12px" }}>
            <span className="block text-[14px] font-bold">Period: </span>
            <span className="text-[14px]">
              {startDate.format("YYYY / MM / DD")} ~ {endDate.format("YYYY / MM / DD")}
            </span>
          </div>

          <form action={process.env.PAY_TEST_MPG_URL} method="post" className="block">
            <input type="text" name="TradeSha" value={encryptionOderData?.shaEncrypted} hidden />
            <input type="text" name="TradeInfo" value={encryptionOderData?.aesEncrypted} hidden />
            <input type="text" name="TimeStamp" value={encryptionOderData?.tradeInfo?.TimeStamp} hidden />
            <input type="text" name="Version" value={encryptionOderData?.tradeInfo?.Version} hidden />
            <input type="text" name="MerchantID" value={encryptionOderData?.tradeInfo?.MerchantID} hidden />
            <label htmlFor="MerchantOrderNo" className="block text-[14px] font-bold">
              MerchantOrderNo:{" "}
            </label>
            <input
              type="text"
              name="MerchantOrderNo"
              value={encryptionOderData?.tradeInfo?.MerchantOrderNo}
              style={inputStyles}
            />
            <br />
            <label htmlFor="Amt" className="block text-[14px] font-bold">
              Amount:{" "}
            </label>
            <input type="text" name="Amt" value={encryptionOderData?.tradeInfo?.Amt} style={inputStyles} />
            <br />
            <label htmlFor="Email" className="block text-[14px] font-bold">
              Email:{" "}
            </label>
            <input type="email" name="Email" value={encryptionOderData?.tradeInfo?.Email} style={inputStyles} />
            <footer style={{ position: "absolute", bottom: 15, left: "50%", transform: "translateX(-50%)" }}>
              <Button onClick={handlePrevious}>Previous</Button>
              <button
                type="submit"
                style={{ display: "inline-block", background: "#000", color: "#fff", padding: "5px 15px", margin: 10 }}
              >
                Pay Now
              </button>
            </footer>
          </form>
        </div>
      </main>
    </section>
  );
};
export default ConfirmPayment;
