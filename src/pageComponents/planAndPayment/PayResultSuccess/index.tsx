import { Button, Space, Tag, message } from "antd";
import Image from "next/image";
import logo_black from "@/assets/logo_black.svg";
import icon_menu from "@/assets/icon_menu.svg";
import balloon_orange from "@/assets/balloon_orange.svg";
import balloon_white from "@/assets/balloon_white.svg";
import icon_creditcard from "@/assets/icon_creditcard.svg";
import dayjs from "dayjs";

interface PayResultSuccessProps {
  returnData?: ITradeInfoRecordType;
  setCancelSubscribeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const PayResultSuccess = (props: PayResultSuccessProps) => {
  const { returnData, setCancelSubscribeModalVisible } = props;
  const startDate = dayjs();
  const endDate = startDate.add(30, "day");

  const tableContent = [
    [
      {
        title: "PayTime",
        content: returnData?.PayTime,
      },
      {
        title: "MerchantOrderNo",
        content: returnData?.MerchantOrderNo,
      },
      {
        title: "PaymentType",
        content: returnData?.PaymentType,
      },
    ],
    [
      {
        title: "Plan",
        content: returnData?.ItemDesc,
      },
      {
        title: "Period",
        content: `${startDate.format("YYYY / MM / DD")} ~ ${endDate.format("YYYY / MM / DD")}`,
      },
      {
        title: "Amount",
        content: `$ ${returnData?.Amt || ""}`,
      },
    ],
  ];

  return (
    <section>
      <main className="relative flex flex-col">
        <Image className="mx-auto mb-5" src={logo_black} alt="HOOK LOOP" />
        <div className="border border-black p-8">
          <h2 className="mt-10 flex text-[20px] font-bold">
            <Space>
              <Image className="mr-2 w-6" src={icon_creditcard} alt="icon_creditcard" />
              Billing
              <Tag color="magenta">幾月幾號 PAID</Tag>
            </Space>
          </h2>
          <div className="my-3 w-full border-b-2" />
          <h3 className="font-medium text-gray-400">Credit Card</h3>
          <p className="font-bold">****-****-4444</p>
          <h2 className="mt-10 flex text-[20px] font-bold">
            <Image className="mr-2 w-6" src={icon_menu} alt="icon_menu" />
            Check List / Invoices
          </h2>
          <div className="my-3 w-full border-b-2" />
          <table className="w-full table-auto border border-[#F0F0F0]">
            <tbody>
              {tableContent.map((row, i) => (
                <tr className={`text-left bg-[${i === 0 ? "#F0F0F0" : "black"}]`}>
                  {row.map((col) => (
                    <td className="p-3" key={col.title}>
                      <span className="text-gray-400">{col.title}</span>
                      <p className="font-medium">{col.content}</p>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Button className="mb-2 mt-10 font-bold" type="dashed" onClick={() => setCancelSubscribeModalVisible(true)}>
            Cancel Subscription
          </Button>
          <p>Canceled subscription will remain active until the end of the current billing period.</p>
        </div>
        <Image className="absolute bottom-[-30px] right-[-50px]" src={balloon_orange} alt="balloon_orange" />
        <Image className="absolute bottom-[-160px] right-[-10px]" src={balloon_white} alt="balloon_white" />
      </main>

      <footer className="mx-auto mb-4 mt-16">
        <Button type="primary" onClick={() => message.success("You have successfully subscribed!")}>
          Go to Dashboard
        </Button>
      </footer>
    </section>
  );
};
export default PayResultSuccess;
