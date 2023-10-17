/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "antd";
import check_circle from "@/assets/check_circle.svg";
import { useRouter } from "next/router";

interface IPlan {
  source: "landing-page" | "plan-page";
  s_selected: PlanOptions;
  set_s_selected: ISetStateFunction<PlanOptions>;
}
export enum PriceOptions {
  FREE = 0,
  STANDARD = 250,
  PREMIUM = 310,
}
export enum PlanOptions {
  FREE = "Free",
  STANDARD = "Standard",
  PREMIUM = "Premium",
}
const plans = [
  {
    title: PlanOptions.FREE,
    titleColor: "black",
    bgColor: "#D9D9D9",
    cost: PriceOptions.FREE,
    perMonth: false,
    workspaces: "1",
    btnTxt: "Get Start",
    btnPrimary: false,
    planPerMonth: "Free for your whole team",
    planDescription: "For individuals or teams looking to organize any project.",
  },
  {
    title: PlanOptions.STANDARD,
    titleColor: "#D46B08",
    bgColor: "#FFF7E6",
    cost: PriceOptions.STANDARD,
    perMonth: true,
    workspaces: "10",
    btnTxt: "Select it",
    btnPrimary: false,
    planPerMonth: "Per user/month",
    planDescription: "For small teams that need to manage work and scale collaboration.",
  },
  {
    title: PlanOptions.PREMIUM,
    titleColor: "#fff",
    bgColor: "#FFA940",
    cost: PriceOptions.PREMIUM,
    costComment: true,
    perMonth: true,
    workspaces: "Unlimited",
    btnTxt: "Best choice!",
    btnPrimary: true,
    planPerMonth: "Per user/month", //  if billed annually
    planDescription: "Enhanced Collaboration for Large Teams: Streamline Work and Boost Cooperation",
  },
];

const Plan: React.FC<IPlan> = ({ source, s_selected = PlanOptions.FREE, set_s_selected = () => {} }) => {
  const router = useRouter();
  const isIndex = source === "landing-page";

  const enterPlanPage = (targetPlan: PlanOptions) => {
    router.push(`/plan?targetPlan=${targetPlan}`);
  };

  const handleSelectedPlan = (
    targetPlan: PlanOptions,
    e: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    if (isIndex) enterPlanPage(targetPlan);
    if ("button" in e || ("key" in e && e.key === "Enter")) set_s_selected(targetPlan);
  };

  useEffect(() => {
    if (router.pathname === "/plan") {
      const { targetPlan } = router.query as { targetPlan: PlanOptions };
      set_s_selected(targetPlan);
    }
  }, [router.asPath, router.pathname, router.query]);

  return (
    <div className="flex w-full flex-col flex-wrap justify-between md:flex-row" role="menu">
      {plans.map((plan, index) => {
        return (
          <section
            key={plan.title}
            className="relative mb-5 w-full cursor-pointer md:mb-0 md:w-[32%]"
            role="menuitem"
            tabIndex={index}
            onClick={(e) => handleSelectedPlan(plan.title, e)}
            onKeyDown={(e) => handleSelectedPlan(plan.title, e)}
          >
            <div
              className={`flex flex-col overflow-hidden rounded-lg border border-gray-300  ${
                isIndex ? "items-center" : ""
              }  ${!isIndex && s_selected === plan.title ? "scale-105 shadow-lg" : ""} `}
            >
              <header className={`flex-center w-full py-3 bg-[${plan.bgColor}]`}>
                <h5 className={`text-[28px] font-bold text-[${plan.titleColor}]`}>{plan.title}</h5>
              </header>
              <main className={`flex w-full flex-col p-6 ${isIndex ? "items-center" : ""} `}>
                <div>
                  <strong className="text-[28px] font-medium">{`NT $ ${plan.cost}`}</strong>
                  {isIndex && plan.perMonth && <span className="ml-[16px] text-[24px]">/&nbsp;month</span>}
                </div>

                {isIndex ? (
                  <span className="my-1 text-[#595959] md:h-[21px]">{plan.costComment}</span> // && "NT $ 2490.0 / year"
                ) : (
                  <span className="my-1 h-[21px] text-[#595959]">{plan.planPerMonth}</span>
                )}

                {!isIndex && (
                  <div className="h-auto bg-[#F5F5F5] p-3 leading-normal md:h-[120px]">{plan.planDescription}</div>
                )}

                <div className="my-4 w-full border-b-2" />
                <ul className={`list-disc text-[${isIndex ? 20 : 12}px] ml-5`}>
                  <li>
                    <span className={`${plan.workspaces === "Unlimited" ? "font-bold" : ""}`}>{plan.workspaces}</span>{" "}
                    Workspace
                  </li>
                </ul>

                {isIndex && (
                  <Button
                    type={plan.btnPrimary ? "primary" : "default"}
                    className={`mt-5 h-[40px] w-[115px] font-bold text-${plan.btnPrimary ? "white" : "black"}`}
                    onClick={() => enterPlanPage(plan.title)}
                  >
                    {plan.btnTxt}
                  </Button>
                )}
              </main>
            </div>

            {!isIndex && s_selected === plan.title && (
              <Image
                src={check_circle}
                alt="check-circle"
                className="absolute right-5 top-8 h-10 w-10 rounded-full md:bottom-[-55px] md:left-[calc(50%-20px)] md:right-auto md:top-auto"
              />
            )}
          </section>
        );
      })}
    </div>
  );
};

export default Plan;
