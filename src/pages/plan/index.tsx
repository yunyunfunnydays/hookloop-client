import React, { useEffect, useState } from "react";
import { Spin, Steps, message } from "antd";

import { PlanOptions } from "@/components/Plan";
import { useRouter } from "next/router";
import { createOrder, verifyUserToken } from "@/service/api";
import Login from "@/components/Login";
import CancelSubscribeModal from "@/pageComponents/planAndPayment/CancelSubscribeModal";
import PayResultSuccess from "@/pageComponents/planAndPayment/PayResultSuccess";
import ChooseYourPlan from "@/pageComponents/planAndPayment/ChooseYourPlan";
import ConfirmPayment from "@/pageComponents/planAndPayment/ConfirmPayment";
import PayResultFail from "@/pageComponents/planAndPayment/PayResultFail";

const Plan = () => {
  const router = useRouter();
  const [s_current, set_s_current] = useState(0);
  const [s_showModal, set_s_showModal] = useState(false);
  const [s_loading, set_s_loading] = useState(false);
  const [s_showLogin, set_s_showLogin] = useState(false);
  const [s_encryptionOderData, set_s_encryptionOderData] = useState<ICreateOrderReturnType>();
  const [s_returnData, set_s_returnData] = useState<ITradeInfoRecordType>();

  // const next = () => {
  //   set_s_current(s_current + 1);
  // };

  const prev = () => {
    set_s_encryptionOderData(undefined);
    set_s_current(s_current - 1);
  };

  // 關閉 Login 組件時執行
  const closeLogin = (): void => {
    set_s_showLogin(false);
  };

  const handleConfirmOrder = async () => {
    set_s_loading(true);
    try {
      // (1) 確認方案：
      if (!router.query.targetPlan) {
        message.error("Choose a target Paln!");
      }

      // (2) 確認使用者身份：
      const verifyUserResult = await verifyUserToken();
      const { status, data } = verifyUserResult.data as IApiResponse;
      if (status !== "success" || !data._id) {
        // (3) 導向 登入Ｍodal 畫面
        set_s_showLogin(true);
        return;
      }
      // (4) 取得加密訂單資料
      const orderData: IPlanOrder = {
        targetPlan: router.query.targetPlan as PlanOptions,
      };
      const res = await createOrder(orderData);
      set_s_encryptionOderData(res.data.data);
      set_s_current(s_current + 1);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("verifyUserResult/encryptionOderData err: ", err);
      message.error("Fail to create order!");
    } finally {
      set_s_loading(false);
    }
  };

  useEffect(() => {
    console.log("--- router: ", router);
    const [_, queryData] = decodeURI(router.asPath).split("?");
    const query: { [key: string]: string } = {};
    queryData.split("&").forEach((item) => {
      const [key, value] = item.split("=");
      query[key] = value;
    });
    const { Status, MerchantOrderNo, PaymentType, PayTime, Amt, ItemDesc } = query;
    console.log("🚀 ~ file: index.tsx:77 ~ useEffect ~ query:", query);
    if (MerchantOrderNo) {
      set_s_returnData({
        Status: `${Status}`,
        MerchantOrderNo: `${MerchantOrderNo}`,
        PaymentType: `${PaymentType}`,
        PayTime: `${decodeURI(PayTime as string)}`,
        Amt: Number(`${Amt}`),
        ItemDesc: `${ItemDesc}`,
      });
      set_s_current(2);
    }
  }, [router.asPath]);

  const steps = [
    {
      title: "Choose Your Plan",
      content: <ChooseYourPlan handleConfirmOrder={handleConfirmOrder} />,
    },
    {
      title: "Confirm Payment",
      content: <ConfirmPayment handlePrevious={prev} encryptionOderData={s_encryptionOderData} />,
    },
    {
      title: "Payment Result",
      content:
        router.query.Status === "SUCCESS" ? (
          <PayResultSuccess returnData={s_returnData} setCancelSubscribeModalVisible={set_s_showModal} />
        ) : (
          <PayResultFail />
        ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Spin spinning={s_loading} tip="Create Order...">
      <section className="mx-auto mt-8 flex h-full w-[80%] flex-col justify-center lg:w-[900px]">
        <Steps progressDot current={s_current} items={items} />
        <div className="my-8">{steps[s_current].content}</div>
      </section>

      {/* 登入的彈窗 */}
      <Login
        open={s_showLogin}
        close={closeLogin}
        editType={router.query.targetPlan === PlanOptions.FREE ? "signUp" : "login"}
      />

      {/* 取消訂閱的 Modal */}
      <CancelSubscribeModal visible={s_showModal} setVisible={set_s_showModal} />
    </Spin>
  );
};

export default Plan;
