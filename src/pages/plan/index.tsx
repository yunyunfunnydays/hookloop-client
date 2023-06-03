import React, { useState } from "react";
import Image from "next/image";
import { Button, message, Modal, Steps } from "antd";

import PlanComponent from "@/components/Plan";
import exclamation_circle from "@/assets/exclamation_circle.svg";
import balloon_orange from "@/assets/balloon_orange.svg";
import balloon_white from "@/assets/balloon_white.svg";
import logo_black from "@/assets/logo_black.svg";
import icon_menu from "@/assets/icon_menu.svg";
import icon_creditcard from "@/assets/icon_creditcard.svg";

const Plan = () => {
  const [s_current, set_s_current] = useState(0);
  const [s_showModal, set_s_showModal] = useState(false);

  const next = () => {
    set_s_current(s_current + 1);
  };

  const prev = () => {
    set_s_current(s_current - 1);
  };

  const tableContent = [
    [
      {
        title: 'Date',
        content: 'Mar 13, 2023',
      },
      {
        title: 'MerchantOrderNo',
        content: 'qj513az2q6d4',
      },
      {
        title: '',
        content: '',
      },
    ],
    [
      {
        title: 'Plan',
        content: 'Standard',
      },
      {
        title: 'Period',
        content: 'Mar 13, 2023 - Apr 13, 2023',
      },
      {
        title: 'Amount',
        content: '$ 310',
      },
    ],
  ];

  const steps = [
    {
      title: 'Plan',
      content:
        <section className="flex flex-col" >
          <h1 className="mx-auto text-[32px] font-bold">Your mission Our priority</h1>
          <p className="mx-auto mt-6">HookLoop is trusted by millions and provides support to teams around the world.</p>
          <p className="mx-auto mb-6">Discover which option suits you.</p>
          <PlanComponent type="plan-page" />
        </section>
    },
    {
      title: 'Failed',
      content:
        <section className="flex flex-col text-center" >
          <h1 className="text-[32px] font-bold">Oops! Something went wrong!</h1>
          <p className="mt-6">Sorry, there was an issue with your payment. Please try again or contact customer support for assistance. You can contact our customer support team via email at yulaie1012@gmail.com.</p>
        </section>
    },
    {
      title: 'Pay',
      content:
        <section className="relative flex flex-col">
          <Image className="mx-auto mb-5" src={logo_black} alt="HOOK LOOP" />
          <div className="p-8 border border-black">
            <h2 className="mt-10 text-[20px] font-bold flex">
              <Image className="w-6 mr-2" src={icon_creditcard} alt="icon_creditcard" />
              Billing
            </h2>
            <div className="w-full border-b-2 my-3" />
            <h3 className="font-medium text-gray-400">Credit Card</h3>
            <p className="font-bold">****-****-4444</p>
            <h2 className="mt-10 text-[20px] font-bold flex">
              <Image className="w-6 mr-2" src={icon_menu} alt="icon_menu" />
              Invoices
            </h2>
            <div className="w-full border-b-2 my-3" />
            <table className="border border-[#F0F0F0] w-full table-auto">
              <tbody>
                {tableContent.map((row, i) =>
                  <tr className={`text-left bg-[${i === 0 ? '#F0F0F0' : 'black'}]`}>
                    {row.map(col =>
                      <td className="p-3">
                        <span className="text-gray-400">{col.title}</span>
                        <p className="font-medium">{col.content}</p>
                      </td>
                    )}
                  </tr>
                )}
              </tbody>
            </table>
            <Button className="font-bold mt-10 mb-2" onClick={() => set_s_showModal(true)} >Cancel Subscription</Button>
            <p>Canceled subscription will remain active until the end of the current billing period.</p>
          </div>

          <Image className="absolute bottom-[-30px] right-[-50px]" src={balloon_orange} alt="balloon_orange" />
          <Image className="absolute bottom-[-160px] right-[-10px]" src={balloon_white} alt="balloon_white" />
        </section>
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <section className="w-[80%] lg:w-[860px] mx-auto h-full flex flex-col justify-center mt-8">
        <Steps current={s_current} items={items} />
        <div className="my-8">{steps[s_current].content}</div>
        <div className="mx-auto mt-8 mb-4">
          {s_current < 1 && (
            <Button className="mr-2">
              Cancel
            </Button>
          )}
          {s_current > 0 && (
            <Button className="mr-2" onClick={() => prev()}>
              Previous
            </Button>
          )}
          {s_current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {s_current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('You have successfully subscribed!')}>
              Done
            </Button>
          )}
        </div>
      </section>

      {/* 取消訂閱的 Modal */}
      <Modal
        title={
          <span className="flex">
            <Image className="mr-2" src={exclamation_circle} alt="exclamation_circle" />
            Are you sure you what to unsubscribe?
          </span>
        }
        width="472px"
        open={s_showModal}
        destroyOnClose
        onCancel={() => set_s_showModal(false)}
        maskClosable={false}
        footer={null}
      >
        <div className="flex">
          <Button className="ml-auto" onClick={() => set_s_showModal(false)}>
            No
          </Button>
          <Button className="ml-2" type="primary" onClick={() => set_s_showModal(false)}>
            Yes
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Plan;