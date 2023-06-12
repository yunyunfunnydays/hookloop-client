/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "antd";
import check_circle from "@/assets/check_circle.svg";

interface IPlan {
  type: string;
}

const boxes = [
  {
    title: "Free",
    titleColor: "black",
    bgColor: "#D9D9D9",
    cost: "0",
    perMonth: false,
    workspaces: "1",
    btnTxt: "Select it",
    btnPrimary: false,
    planPerMonth: "Free for your whole team",
    planDescription: "For individuals or teams looking to organize any project.",
  },
  {
    title: "Standard",
    titleColor: "#D46B08",
    bgColor: "#FFF7E6",
    cost: "310.0",
    perMonth: true,
    workspaces: "10",
    btnTxt: "Select it",
    btnPrimary: false,
    planPerMonth: "Per user/month",
    planDescription: "For small teams that need to manage work and scale collaboration.",
  },
  {
    title: "Premium",
    titleColor: "#fff",
    bgColor: "#FFA940",
    cost: "207.5",
    costComment: true,
    perMonth: true,
    workspaces: "Unlimited",
    btnTxt: "Best choice!",
    btnPrimary: true,
    planPerMonth: "Per user/month if billed annually",
    planDescription: "Enhanced Collaboration for Large Teams: Streamline Work and Boost Cooperation",
  },
];

const Plan: React.FC<IPlan> = (props) => {
  const { type } = props;
  const isIndex = type === "index";
  const [s_selected, set_s_selected] = useState(0);

  return (
    <div className="flex w-full flex-col flex-wrap justify-between md:flex-row">
      {boxes.map((box, i) => {
        const selected = !isIndex && s_selected === i;
        return (
          <section className="relative mb-5 w-full md:mb-0 md:w-[32%]">
            <div
              className={`flex flex-col overflow-hidden rounded-lg ${isIndex ? "items-center" : ""} border ${
                selected ? "border-4 border-black" : "border-[#D9D9D9]"
              } `}
            >
              <div className={`flex-center w-full py-3 bg-[${box.bgColor}] text-[${box.titleColor}]`}>
                <h5 className="text-[28px] font-bold">{box.title}</h5>
              </div>
              <div className={`flex flex-col p-6 ${isIndex ? "items-center" : ""} `}>
                <div>
                  <strong className="text-[28px] font-medium">{`NT $ ${box.cost}`}</strong>
                  {isIndex && box.perMonth && <span className="ml-[16px] text-[24px]">/&nbsp;month</span>}
                </div>
                {isIndex ? (
                  <span className="my-1 text-[#595959] md:h-[21px]">{box.costComment && "NT $ 2490.0 / year"}</span>
                ) : (
                  <span className="my-1 h-[21px] text-[#595959]">{box.planPerMonth}</span>
                )}
                {!isIndex && (
                  <div className="h-auto bg-[#F5F5F5] p-2 font-medium leading-normal md:h-[120px]">
                    {box.planDescription}
                  </div>
                )}
                <div className="my-4 w-full border-b-2" />
                <ul className={`list-disc text-[${isIndex ? 20 : 12}px] ml-5`}>
                  <li>
                    <span className={`${box.workspaces === "Unlimited" ? "font-bold" : ""}`}>{box.workspaces}</span>{" "}
                    Workspace
                  </li>
                </ul>
                {isIndex && (
                  <Button
                    type={box.btnPrimary ? "primary" : "default"}
                    className={`mt-5 h-[40px] w-[115px] font-bold text-${box.btnPrimary ? "white" : "black"}`}
                  >
                    {box.btnTxt}
                  </Button>
                )}
              </div>
            </div>

            {selected && (
              <Image
                src={check_circle}
                alt="check-circle"
                className="absolute right-5 top-5 h-10 w-10 rounded-full md:bottom-[-50px] md:left-[calc(50%-20px)] md:right-auto md:top-auto"
              />
            )}
          </section>
        );
      })}
    </div>
  );
};

export default Plan;
