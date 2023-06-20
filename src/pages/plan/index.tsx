import React, { useContext, useEffect, useState } from "react";
import { Spin, Steps, message, notification } from "antd";

import { PlanOptions } from "@/components/Plan";
import { useRouter } from "next/router";
import { createOrder } from "@/service/api";
import Login from "@/components/Login";
import CancelSubscribeModal from "@/pageComponents/planAndPayment/CancelSubscribeModal";
import PayResultSuccess from "@/pageComponents/planAndPayment/PayResultSuccess";
import ChooseYourPlan from "@/pageComponents/planAndPayment/ChooseYourPlan";
import ConfirmPayment from "@/pageComponents/planAndPayment/ConfirmPayment";
import PayResultFail from "@/pageComponents/planAndPayment/PayResultFail";
import GlobalContext from "@/Context/GlobalContext";

const Plan = () => {
  const router = useRouter();
  const { c_user } = useContext(GlobalContext);
  const [api, contextHolder] = notification.useNotification();
  const [s_current, set_s_current] = useState(0);
  const [s_showModal, set_s_showModal] = useState(false);
  const [s_loading, set_s_loading] = useState(false);
  const [s_showLogin, set_s_showLogin] = useState(false);
  const [s_encryptionOderData, set_s_encryptionOderData] = useState<ICreateOrderReturnType>();
  const [s_returnData, set_s_returnData] = useState<ITradeInfoRecordType>();

  const prev = () => {
    set_s_encryptionOderData(undefined);
    set_s_current(s_current - 1);
  };

  // 關閉 Login 組件時執行
  const closeLogin = (): void => {
    set_s_showLogin(false);
  };

  const handleCreateOrder = async () => {
    set_s_loading(true);
    try {
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

  const handleConfirmOrder = async () => {
    // (1) 確認方案
    if (!router.query.targetPlan) {
      message.error("Choose a target Paln!");
    }

    // (2) 確認使用者身份
    if (!c_user.email) {
      set_s_showLogin(true);
      return;
    }

    // (3) 確認使用者使用方案 與 選擇是否衝突
    if (c_user.currentPlan?.name && c_user.currentPlan.name === router.query.targetPlan) {
      // (3-1) 檢查付款時間是否已過期 與 付款狀態
      const today = new Date();
      const validEndDate = new Date(c_user.currentPlan.endAt);
      if (
        c_user.currentPlan.name === PlanOptions.FREE ||
        (c_user.currentPlan.status === "PAY-SUCCESS" && validEndDate > today)
      ) {
        api.warning({
          message: `You have subscribed ${c_user.currentPlan.name} plan!`,
          placement: "topLeft",
        });
        router.push("/dashboard");
        return;
      }
    }

    if (c_user.currentPlan?.name && c_user.currentPlan.name !== router.query.targetPlan) {
      // (3-2) 檢查原方案(已付費) 與 目標方案 是否會衝突
      const originalPlan = c_user.currentPlan.name;
      const targetPlan = router.query.targetPlan?.toString();
      if (
        c_user.currentPlan.status === "PAY-SUCCESS" &&
        targetPlan === PlanOptions.FREE &&
        originalPlan !== PlanOptions.FREE
      ) {
        api.warning({
          message: (
            <>
              <h4>You can`&apos;`t change to {PlanOptions.FREE} plan !</h4>
              <p>Choose original plan : {originalPlan} for keeping your workspaces !</p>
              <p>Recommended: {PlanOptions.PREMIUM} for unlimited workspaces !</p>
            </>
          ),
          placement: "topLeft",
        });
        return;
      }
      if (
        c_user.currentPlan.status === "PAY-SUCCESS" &&
        targetPlan === PlanOptions.STANDARD &&
        originalPlan === PlanOptions.PREMIUM
      ) {
        api.warning({
          message: (
            <>
              <h4>You can`&apos;`t change to {PlanOptions.STANDARD} plan !</h4>
              <p>Choose original plan : {originalPlan} for keeping your workspaces !</p>
            </>
          ),
          placement: "topLeft",
        });
        return;
      }
    }

    // (4) 付費方案：取得加密訂單資料
    if (router.query.targetPlan !== PlanOptions.FREE) {
      await handleCreateOrder();
      return;
    }

    // 免費方案，登入後直接進入 Dashboard 頁面
    router.push("/dashboard");
  };

  useEffect(() => {
    const [_, queryData] = decodeURI(router.asPath).split("?");
    if (!queryData) {
      return;
    }
    const query: { [key: string]: string } = {};
    queryData.split("&").forEach((item) => {
      const [key, value] = item.split("=");
      query[key] = value;
    });
    const { Status, MerchantOrderNo, PaymentType, PayTime, Amt, ItemDesc } = query;
    if (MerchantOrderNo) {
      // 存回傳結果資料
      set_s_returnData({
        Status: `${Status}`,
        MerchantOrderNo: `${MerchantOrderNo}`,
        PaymentType: `${PaymentType}`,
        PayTime: `${decodeURI(PayTime as string)}`,
        Amt: Number(`${Amt}`),
        ItemDesc: `${ItemDesc}`,
      });

      // 導向下一步：付款結果
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
          <PayResultFail setCurrent={set_s_current} />
        ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Spin spinning={s_loading} tip={s_current === 0 ? "Create Order..." : "Create Order..."}>
      {contextHolder}
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
