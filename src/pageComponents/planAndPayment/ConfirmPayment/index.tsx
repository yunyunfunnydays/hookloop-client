import { Button, Divider, Form, Input, InputNumber } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

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
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        // onFinish={onFinish}
        form={form}
        action="https://ccore.spgateway.com/MPG/mpg_gateway"
        method="post"
      >
        <Form.Item label="MerchantID" name="MerchantID">
          <Input disabled />
        </Form.Item>
        <Form.Item label="RespondType" name="RespondType" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item label="TimeStamp" name="TimeStamp">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Version" name="Version" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item label="LoginType" name="LoginType" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item label="MerchantOrderNo" name="MerchantOrderNo">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Amt" name="Amt">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="ItemDesc" name="ItemDesc">
          <Input disabled />
        </Form.Item>
        <Form.Item label="TradeLimit" name="TradeLimit">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="TradeSha" name="TradeSha" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item label="ReturnURL" name="ReturnURL" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item label="NotifyURL" name="NotifyURL" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item label="TradeInfo" name="TradeInfo" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item label="Email" name="Email">
          <Input disabled />
        </Form.Item>
        <Form.Item label="EmailModify" name="Email">
          <Input disabled />
        </Form.Item>
        <Form.Item label="WEBATM" name="WEBATM" hidden>
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Pay Now
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <form action="https://ccore.spgateway.com/MPG/mpg_gateway" method="post">
        <input type="text" name="MerchantID" value={encryptionOderData?.tradeInfo?.MerchantID} />
        <input type="text" name="TradeSha" value={encryptionOderData?.shaEncrypted} />
        <input type="text" name="TradeInfo" value={encryptionOderData?.aesEncrypted} />
        <input type="text" name="TimeStamp" value={encryptionOderData?.tradeInfo?.TimeStamp} />
        <input type="text" name="Version" value={encryptionOderData?.tradeInfo?.Version} />
        <input type="text" name="MerchantOrderNo" value={encryptionOderData?.tradeInfo?.MerchantOrderNo} />
        <input type="text" name="Amt" value={encryptionOderData?.tradeInfo?.Amt} />
        <input type="email" name="Email" value={encryptionOderData?.tradeInfo?.Email} />
        <button type="submit">Pay Now</button>
      </form>
      <Divider />
      <footer className="mx-auto mb-4 mt-16">
        <Button className="mr-2" onClick={handlePrevious}>
          Previous
        </Button>
        {/* <Button type="primary">
            Pay Now form submit
        </Button> */}
      </footer>
    </section>
  );
};
export default ConfirmPayment;
