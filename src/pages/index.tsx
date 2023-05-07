import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Grid, Button } from "antd";
// imgs
import mission from "@/assets/mission.svg";
import dashboard from "@/assets/dashboard.svg";
import kanban from "@/assets/kanban.svg";
import card from "@/assets/card.svg";

const Home: React.FC = () => {
  const screens = Grid.useBreakpoint();

  console.log("screens = ", screens);

  return (
    <>
      <Head>
        <title>Landing Page</title>
      </Head>

      <nav
        className={`
          h-[80px] mx-[25px] border-b-[1px] overflow-x-auto 
          flex md:justify-center items-center gap-[40px] md:gap-[80px] lg:gap-[100px] xxl:gap-[160px]
      `}
      >
        <a href="#" className="shrink-0">
          Dashboard
        </a>
        <a href="#" className="shrink-0">
          Kanban
        </a>
        <a href="#" className="shrink-0">
          Card
        </a>
        <a href="#" className="shrink-0">
          Plan & Pricing
        </a>
        <a href="#" className="shrink-0">
          Quick Start
        </a>
      </nav>

      <section className="h-[calc(100vh_-_160px)] pt-[15px] overflow-auto">
        {/* mission */}
        <section
          className={`
          xl:w-[1200px]
          relative left-[50%] translate-x-[-50%]
          px-[40px] xl:px-[0px]
          mb-[35px] xl:mb-[80px]
          flex flex-col lg:flex-row-reverse lg:justify-center items-center lg:gap-[50px] 
        `}
        >
          <Image src={mission} className="w-[295px] md:w-[565px] h-[205px] md:h-[395px]" alt="mission" />
          <div className="flex flex-col items-center xl:items-start mt-[32px]">
            <h1 className="font-bold text-[38px] md:text-[48px] text-[#262626] flex flex-col xl:flex-row items-center">
              <span>Your mission&nbsp;</span>
              <span>Our priority</span>
            </h1>

            <p className="text-center mt-[24px]">The online workspace loop tasks, teammates and tools together.</p>

            <Button type="primary" className="mt-[40px] w-[115px] h-[40px] font-bold">
              Get Start
            </Button>
          </div>
        </section>

        <section className="py-[40px] px-[12px] md:px-[24px] flex flex-col items-center gap-[40px] bg-[#FAFAFA]">
          <h1 className="font-black text-[24px] font-['Montserrat']">ALL YOU NEED IS HERE</h1>
          {/* dashboard */}
          <div className="flex flex-col md:flex-row items-center md:gap-[20px] xl:w-[1155px]">
            <Image
              src={dashboard}
              className="w-[295px] md:w-[355px] xl:w-[565px] h-[155px] md:h-[185px] xl:h-[300px]"
              alt="dashboard"
            />
            <div className="flex flex-col items-center md:items-start flex-1">
              <h2 className="mt-[20px] md:mt-[0px] font-bold text-[24px] xl:text-[30px] text-[#434343]">Dashboard</h2>
              <h3 className="text-[16px] xl:text-[24px] text-[#595959]">Focus and efficiently manage your tasks</h3>
              <div className="w-full border-0 border-b border-[#BFBFBF] mt-[12px] md:mt-[8px]" />
              <p className="mt-[16px] md:mt-[8px] xl:mt-[20px] text-[#262626] md:text-[12px] xl:text-[16px]">
                Managing your Workspaces and Kanbans through visualized charts and helping you to quickly understand the
                information you need to make faster and wiser decisions.
              </p>
              <p className="mt-[8px] xl:mt-[20px] text-[#262626] md:text-[12px] xl:text-[16px]">
                You can quickly create Workspaces and Kanbans according to your needs.
              </p>
            </div>
          </div>
          {/* kanban */}
          <div className="flex flex-col md:flex-row-reverse items-center md:gap-[20px] xl:w-[1155px]">
            <Image
              src={kanban}
              className="w-[295px] md:w-[355px] xl:w-[565px] h-[155px] md:h-[185px] xl:h-[400px]"
              alt="kanban"
            />
            <div className="flex flex-col items-center md:items-start flex-1">
              <h2 className="mt-[20px] md:mt-[0px] font-bold text-[24px] xl:text-[30px] text-[#434343]">Kanban</h2>
              <h3 className="text-[16px] xl:text-[24px] text-[#595959]">Productively collaborate with team members</h3>
              <div className="w-full border-0 border-b border-[#BFBFBF] mt-[12px] md:mt-[8px]" />
              <p className="mt-[16px] md:mt-[8px] xl:mt-[20px] text-[#262626] md:text-[12px] xl:text-[16px]">
                Helping you track the progress and status of tasks, in order to better track status and progress, you
                can move tasks from one column to another by dragging and dropping cards to reflect different statuses.
              </p>
            </div>
          </div>
          {/* card */}
          <div className="flex flex-col md:flex-row items-center md:gap-[20px] xl:w-[1155px]">
            <Image
              src={card}
              className="w-[295px] md:w-[355px] xl:w-[565px] h-[155px] md:h-[185px] xl:h-[385px]"
              alt="card"
            />
            <div className="flex flex-col items-center md:items-start flex-1">
              <h2 className="mt-[20px] md:mt-[0px] font-bold text-[24px] xl:text-[30px] text-[#434343]">Card</h2>
              <h3 className="text-[16px] xl:text-[24px] text-[#595959]">Easily track task status and progress</h3>
              <div className="w-full border-0 border-b border-[#BFBFBF] mt-[12px] md:mt-[8px]" />
              <p className="mt-[16px] md:mt-[8px] xl:mt-[20px] text-[#262626] md:text-[12px] xl:text-[16px]">
                Helping you manage and track tasks more productively, facilitating the record and tracking of task
                progress and status, as well as the ability to view relevant information at any time.
              </p>
              <p className="mt-[8px] xl:mt-[20px] text-[#262626] md:text-[12px] xl:text-[16px]">
                Allowing managers or team members to assign tasks to different members and ensure that they are
                completed on time.
              </p>
            </div>
          </div>
        </section>

        <section className="py-[40px] px-[12px] flex flex-col items-center gap-[40px]">
          <h1 className="font-black text-[24px] font-['Montserrat']">PLAN & PRICING</h1>
        </section>
      </section>

      {/* <section className="h-full flex-center">
        <h1 className="text-[100px]">Home Page</h1>
      </section> */}
    </>
  );
};

export default Home;
