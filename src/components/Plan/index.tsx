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
    title: 'Free',
    titleColor: 'black',
    bgColor: '#D9D9D9',
    cost: '0',
    perMonth: false,
    workspaces: '1',
    btnTxt: 'Select it',
    btnPrimary: false,
    planPerMonth: 'Free for your whole team',
    planDescription: 'For individuals or teams looking to organize any project.',
  },
  {
    title: 'Standard',
    titleColor: '#D46B08',
    bgColor: '#FFF7E6',
    cost: '310.0',
    perMonth: true,
    workspaces: '10',
    btnTxt: 'Select it',
    btnPrimary: false,
    planPerMonth: 'Per user/month',
    planDescription: 'For small teams that need to manage work and scale collaboration.',
  },
  {
    title: 'Premium',
    titleColor: 'white',
    bgColor: '#FFA940',
    cost: '207.5',
    costComment: true,
    perMonth: true,
    workspaces: 'Unlimited',
    btnTxt: 'Best choice!',
    btnPrimary: true,
    planPerMonth: 'Per user/month if billed annually',
    planDescription: 'Enhanced Collaboration for Large Teams: Streamline Work and Boost Cooperation',
  },
];

const Plan: React.FC<IPlan> = (props) => {
  const { type } = props;
  const isIndex = type === "index";
  const [s_selected, set_s_selected] = useState(0);

  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap justify-between">
      {boxes.map((box, i) => {
        const selected = !isIndex && s_selected === i;
        return (
          <section className={`relative w-full md:w-[32%] mb-5 md:mb-0`} onClick={() => set_s_selected(i)}>
            <div className={`rounded-lg overflow-hidden flex flex-col ${isIndex ? 'items-center' : ''} border ${selected ? 'border-black border-4' : 'border-[#D9D9D9]'} `}>
              <div className={`w-full py-3 flex-center bg-[${box.bgColor}] text-[${box.titleColor}]`}>
                <h5 className="font-bold text-[28px]">{box.title}</h5>
              </div>
              <div className={`p-6 flex flex-col ${isIndex ? "items-center" : ""} `}>
                <div>
                  <strong className="font-medium text-[28px]">{`NT $ ${box.cost}`}</strong>
                  {isIndex && box.perMonth &&
                    <span className="ml-[16px] text-[24px]">/&nbsp;month</span>
                  }
                </div>
                {isIndex ?
                  <span className="text-[#595959] md:h-[21px] my-1">{box.costComment && "NT $ 2490.0 / year"}</span>
                  :
                  <span className="text-[#595959] h-[21px] my-1">{box.planPerMonth}</span>
                }
                {!isIndex &&
                  <div className="p-2 h-auto md:h-[120px] font-medium leading-normal bg-[#F5F5F5]">
                    {box.planDescription}
                  </div>
                }
                <div className="w-full border-b-2 my-4" />
                <ul className={`list-disc text-[${isIndex ? 20 : 12}px] ml-5`}>
                  <li>
                    <span className={`${box.workspaces === "Unlimited" ? 'font-bold' : ''}`}>{box.workspaces}</span> Workspace
                  </li>
                </ul>
                {isIndex &&
                  <Button
                    type={box.btnPrimary ? 'primary' : 'default'}
                    className={`w-[115px] h-[40px] mt-5 font-bold text-${box.btnPrimary ? 'white' : 'black'}`}
                  >{box.btnTxt}</Button>
                }
              </div>
            </div>
            {selected &&
              <Image
                src={check_circle}
                alt="check-circle"
                className="absolute w-10 h-10 rounded-full top-5 right-5 md:top-auto md:right-auto md:left-[calc(50%-20px)] md:bottom-[-50px]"
              />
            }
          </section>
        )
      })}
    </div >
  );
};

export default Plan;
