import { Button, Divider } from "antd";

interface ConfirmPaymentProps {
  handlePrevious: () => void;
  encryptionOderData?: ICreateOrderReturnType;
}
const ConfirmPayment = (props: ConfirmPaymentProps) => {
  const { handlePrevious, encryptionOderData } = props;

  return (
    <section>
      <main className="relative flex flex-col">
        {/* <Image className="mx-auto mb-5" src={logo_black} alt="HOOK LOOP" /> */}

        <h2 className="m-auto mb-5 flex text-[30px] font-bold">Confirm Payment</h2>
        <div className="border border-black p-8">
          <h2 className="flex text-[20px] font-bold">Check List</h2>
          <div className="my-3 w-full border-b-2" />

          <form action="https://ccore.newebpay.com/MPG/mpg_gateway" method="post">
            <input type="text" name="TradeSha" value={encryptionOderData?.shaEncrypted} hidden />
            <input type="text" name="TradeInfo" value={encryptionOderData?.aesEncrypted} hidden />
            <input type="text" name="TimeStamp" value={encryptionOderData?.tradeInfo?.TimeStamp} hidden />
            <input type="text" name="Version" value={encryptionOderData?.tradeInfo?.Version} hidden />
            <input type="text" name="MerchantID" value={encryptionOderData?.tradeInfo?.MerchantID} hidden />
            <label htmlFor="MerchantOrderNo" className="text-[14px] font-bold">
              MerchantOrderNo:{" "}
              <input type="text" name="MerchantOrderNo" value={encryptionOderData?.tradeInfo?.MerchantOrderNo} />
            </label>
            <br />
            <label htmlFor="Amt" className="text-[14px] font-bold">
              Amount: <input type="text" name="Amt" value={encryptionOderData?.tradeInfo?.Amt} />
            </label>
            <br />
            <label htmlFor="Email" className="text-[14px] font-bold">
              Email:{" "}
              <input
                type="email"
                name="Email"
                value={encryptionOderData?.tradeInfo?.Email}
                style={{ width: "300px" }}
              />
            </label>
            <Divider />
            <footer className="m-auto">
              <Button onClick={handlePrevious}>Previous</Button>
              <button
                type="submit"
                style={{ display: "inline-block", background: "#000", color: "#fff", padding: "5px 15px" }}
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
