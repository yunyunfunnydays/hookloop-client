/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button } from "antd";

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
  },
];


const Plan: React.FC<IPlan> = (props) => {

  return (
    <div className="w-full flex flex-col lg:flex-row flex-wrap justify-between ">
      {boxes.map(box =>
        <section className="w-full lg:w-[32%] mb-5 lg-mb-0 rounded-lg overflow-hidden flex flex-col items-center border border-[#D9D9D9]">
          <div className={`w-full py-3 flex-center bg-[${box.bgColor}] text-[${box.titleColor}]`}>
            <h5 className="font-bold text-[30px]">{box.title}</h5>
          </div>
          <div className="p-6 flex flex-col items-center">
            <div className="flex-center">
              <strong className="font-medium text-[28px]">{`NT $ ${box.cost}`}</strong>
              {box.perMonth &&
                <span className="ml-[16px] text-[24px]">/&nbsp;month</span>
              }
            </div>
            <span className="text-[#595959] h-[21px] my-1">{box.costComment && "NT $ 2490.0 / year"}</span>
            <div className="w-full border-0 border-b-2 my-4" />
            <ul className="list-disc text-[20px]">
              <li>
                <span className={`${box.workspaces === "Unlimited" ? 'font-bold' : ''}`}>{box.workspaces}</span> Workspace
              </li>
            </ul>
            <Button
              type={box.btnPrimary ? 'primary' : 'default'}
              className={`w-[115px] h-[40px] mt-5 font-bold text-${box.btnPrimary ? 'white' : 'black'}`}
            >{box.btnTxt}</Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Plan;
