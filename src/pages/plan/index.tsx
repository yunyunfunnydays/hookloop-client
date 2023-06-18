import React, { useEffect, useState } from "react";
import { Spin, Steps, message } from "antd";

import { PlanOptions } from "@/pageComponents/planAndPayment/Plan";
import { useRouter } from "next/router";
import { createOrder, verifyUserToken } from "@/service/api";
import Login from "@/components/Login";
import CancelSubscribeModal from "@/pageComponents/planAndPayment/CancelSubscribeModal";
import PayResultSuccess from "@/pageComponents/planAndPayment/PayResultSuccess";
import ChooseYourPlan from "@/pageComponents/planAndPayment/ChooseYourPlan";
import ConfirmPayment from "@/pageComponents/planAndPayment/ConfirmPayment";

const Plan = () => {
  const router = useRouter();
  const [s_current, set_s_current] = useState(0);
  const [s_showModal, set_s_showModal] = useState(false);
  const [s_loading, set_s_loading] = useState(false);
  const [s_showLogin, set_s_showLogin] = useState(false);
  const [s_encryptionOderData, set_s_encryptionOderData] = useState<ICreateOrderReturnType>();

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
  const handlePaymentReturn = () => {
    // 擷取 URL 中的查詢字串參數
    const searchParams = new URLSearchParams(window.location.search);
    const formData = Object.fromEntries(searchParams.entries());

    // 根據回傳資料進行相應的處理
    if (formData.Status === "SUCCESS") {
      // 支付成功處理邏輯
      console.log("支付成功");
      console.log("訊息:", formData.Message);
      // 其他相關處理
    } else {
      // 支付失敗處理邏輯
      console.log("支付失敗");
      console.log("錯誤訊息:", formData.Message);
      // 其他相關處理
    }
  };

  useEffect(() => {
    if (router.query.paymentReturn === "true") {
      // 在頁面載入時處理藍新金流回傳資訊
      handlePaymentReturn();
      console.log("--- window: ", window.location.href);
      console.log("--- router: ", router);
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
      content: (
        <PayResultSuccess encryptionOderData={s_encryptionOderData} setCancelSubscribeModalVisible={set_s_showModal} />
      ),
    },
    // {
    //   title: "Pay Results : Failed",
    //   content: <PayResultFail />,
    // },
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
