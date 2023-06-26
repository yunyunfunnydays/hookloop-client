import React, { useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, Dropdown, Carousel } from "antd";
// img
import mission from "@/assets/mission.svg";
import dashboard from "@/assets/dashboard.svg";
import kanban from "@/assets/kanban.svg";
import card from "@/assets/card.svg";
import user1 from "@/assets/user1.svg";
import user2 from "@/assets/user2.svg";
import user3 from "@/assets/user3.svg";
import user4 from "@/assets/user4.svg";
import user5 from "@/assets/user5.svg";
import user6 from "@/assets/user6.svg";
import user7 from "@/assets/user7.svg";
import user8 from "@/assets/user8.svg";
import user9 from "@/assets/user9.svg";
import carousel1 from "@/assets/carousel-1.png";

import { DownOutlined, GlobalOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Login from "@/components/Login";
import PlanComponent from "@/components/Plan";

const Home: React.FC = () => {
  // const images = [mission, dashboard, kanban, card];
  const carouselRef = useRef(null);
  // 控制要不要顯示 Login 組件
  const [s_showLogin, set_s_showLogin] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.info("click", e);
  };

  const items: MenuProps["items"] = [
    {
      label: "English",
      key: "en",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  // 關閉 Login 組件時執行
  const closeLogin = (): void => {
    set_s_showLogin(false);
  };

  return (
    <>
      <Head>
        <title>HOOKLOOP</title>
      </Head>

      <nav
        className={`
          mx-[25px] flex h-[80px] items-center 
          gap-[40px] overflow-x-auto border-b-[1px] md:justify-center md:gap-[80px] lg:gap-[100px] xxl:gap-[160px]
      `}
      >
        <a href="#Dashboard" className="shrink-0">
          Dashboard
        </a>
        <a href="#Kanban" className="shrink-0">
          Kanban
        </a>
        <a href="#Card" className="shrink-0">
          Card
        </a>
        <a href="#Plan" className="shrink-0">
          Plan & Pricing
        </a>
        <a href="#Quick-Start" className="shrink-0">
          Quick Start
        </a>
      </nav>

      <section className="h-[calc(100vh_-_160px)] overflow-auto pt-[15px]">
        {/* mission */}
        <section
          className={`
          relative
          left-[50%]
          mb-[35px] flex h-[calc(100vh_-_160px)]
          translate-x-[-50%] flex-col
          items-center px-[40px]
          lg:flex-row-reverse lg:justify-center lg:gap-[50px] xl:mb-[80px] xl:w-[1200px] xl:px-[0px] 
        `}
        >
          <Image src={mission} className="h-[205px] w-[295px] md:h-[395px] md:w-[565px]" alt="mission" />
          <div className="mt-[32px] flex flex-col items-center xl:items-start">
            <h1 className="flex flex-col items-center text-[38px] font-bold text-[#262626] md:text-[48px] xl:flex-row">
              <span>Your mission&nbsp;</span>
              <span>Our priority</span>
            </h1>

            <p className="mt-[24px] text-center">The online workspace loop tasks, teammates and tools together.</p>

            <Button
              type="primary"
              className="mt-[40px] h-[40px] w-[115px] font-bold"
              onClick={() => set_s_showLogin(true)}
            >
              Get Start
            </Button>
          </div>
        </section>

        {/* introduce */}
        <section className="flex flex-col items-center gap-[40px] bg-[#FAFAFA] px-[12px] py-[40px] md:px-[24px]">
          <h1 className="font-['Montserrat'] text-[24px] font-black lg:text-[40px]">ALL YOU NEED IS HERE</h1>
          {/* dashboard */}
          <div id="Dashboard" className="flex flex-col items-center md:flex-row md:gap-[20px] xl:w-[1155px]">
            <Image
              src={dashboard}
              className="h-[155px] w-[295px] md:h-[185px] md:w-[355px] xl:h-[300px] xl:w-[565px]"
              alt="dashboard"
            />
            <div className="flex flex-1 flex-col items-center md:items-start">
              <h2 className="mt-[20px] text-[24px] font-bold text-[#434343] md:mt-[0px] xl:text-[30px]">Dashboard</h2>
              <h3 className="text-[16px] text-[#595959] xl:text-[24px]">Focus and efficiently manage your tasks</h3>
              <div className="mt-[12px] w-full border-0 border-b border-[#BFBFBF] md:mt-[8px]" />
              <p className="mt-[16px] text-[#262626] md:mt-[8px] md:text-[12px] xl:mt-[20px] xl:text-[16px]">
                Managing your Workspaces and Kanbans through visualized charts and helping you to quickly understand the
                information you need to make faster and wiser decisions.
              </p>
              <p className="mt-[8px] text-[#262626] md:text-[12px] xl:mt-[20px] xl:text-[16px]">
                You can quickly create Workspaces and Kanbans according to your needs.
              </p>
            </div>
          </div>
          {/* kanban */}
          <div id="Kanban" className="flex flex-col items-center md:flex-row-reverse md:gap-[20px] xl:w-[1155px]">
            <Image
              src={kanban}
              className="h-[155px] w-[295px] md:h-[185px] md:w-[355px] xl:h-[400px] xl:w-[565px]"
              alt="kanban"
            />
            <div className="flex flex-1 flex-col items-center md:items-start">
              <h2 className="mt-[20px] text-[24px] font-bold text-[#434343] md:mt-[0px] xl:text-[30px]">Kanban</h2>
              <h3 className="text-[16px] text-[#595959] xl:text-[24px]">Productively collaborate with team members</h3>
              <div className="mt-[12px] w-full border-0 border-b border-[#BFBFBF] md:mt-[8px]" />
              <p className="mt-[16px] text-[#262626] md:mt-[8px] md:text-[12px] xl:mt-[20px] xl:text-[16px]">
                Helping you track the progress and status of tasks, in order to better track status and progress, you
                can move tasks from one column to another by dragging and dropping cards to reflect different statuses.
              </p>
            </div>
          </div>
          {/* card */}
          <div id="Card" className="flex flex-col items-center md:flex-row md:gap-[20px] xl:w-[1155px]">
            <Image
              src={card}
              className="h-[155px] w-[295px] md:h-[185px] md:w-[355px] xl:h-[385px] xl:w-[565px]"
              alt="card"
            />
            <div className="flex flex-1 flex-col items-center md:items-start">
              <h2 className="mt-[20px] text-[24px] font-bold text-[#434343] md:mt-[0px] xl:text-[30px]">Card</h2>
              <h3 className="text-[16px] text-[#595959] xl:text-[24px]">Easily track task status and progress</h3>
              <div className="mt-[12px] w-full border-0 border-b border-[#BFBFBF] md:mt-[8px]" />
              <p className="mt-[16px] text-[#262626] md:mt-[8px] md:text-[12px] xl:mt-[20px] xl:text-[16px]">
                Helping you manage and track tasks more productively, facilitating the record and tracking of task
                progress and status, as well as the ability to view relevant information at any time.
              </p>
              <p className="mt-[8px] text-[#262626] md:text-[12px] xl:mt-[20px] xl:text-[16px]">
                Allowing managers or team members to assign tasks to different members and ensure that they are
                completed on time.
              </p>
            </div>
          </div>
        </section>

        {/* plan */}
        <section
          id="Plan"
          className="mx-auto flex w-[90%] flex-col items-center gap-[40px] px-[12px] py-[40px] md:w-[900px]"
        >
          <h1 className="font-['Montserrat'] text-[24px] font-black md:text-[40px]">PLAN & PRICING</h1>
          <PlanComponent source="landing-page" />
        </section>

        {/* slider */}
        <section id="Quick-Start" className="flex flex-col items-center bg-[#434343] py-[80px]">
          <h1 className="font-['Montserrat'] text-[24px] text-[#fff] lg:text-[40px]">
            KICKSTART YOUR PROJECT IN SECONDS
          </h1>
          <div className="relative my-5 w-[80%] leading-6">
            <div
              className="carousel-arrow carousel-arrow-left absolute"
              role="presentation"
              onClick={() => (carouselRef.current as any).prev()}
            />
            <Carousel ref={carouselRef} className="bg-white p-8">
              <div className="items-center md:flex">
                <Image src={carousel1} className="w-full md:mr-4 md:h-full" alt="carousel1" />
                <div className="flex w-full flex-col justify-evenly md:h-full">
                  <h3 className="mt-8 text-center text-2xl font-bold md:mt-0 md:text-left">Dashboard</h3>
                  <div>
                    <p className="mt-3">
                      Just click the plus button - discover simplicity and efficiency at your fingertips with our
                      instant workspace creation!
                    </p>
                    <p className="mt-3">
                      Take command of your team and kanbans, and search to find what you need within a seamless
                      workspace. Immerse yourself in a clean, intuitive interface that keeps you on track and in
                      control.
                    </p>
                  </div>
                </div>
              </div>
              <div className="items-center md:flex">
                <Image src={carousel1} className="w-full md:mr-4 md:h-full" alt="carousel1" />
                <div className="flex w-full flex-col justify-evenly md:h-full">
                  <h3 className="mt-8 text-center text-2xl font-bold md:mt-0 md:text-left">Kanban</h3>
                  <div>
                    <p className="mt-3">
                      Explore our organized kanban, where you can effortlessly add new cards by clicking 『add card』 or
                      manage card categories using 『settings.』
                    </p>
                    <p className="mt-3">
                      Click to edit cards or drag and drop them to their perfect positions. Plus, with our
                      multifunctional sidebar, rapidly switch between different kanban by simply clicking on them.
                      Immerse yourself in seamless navigation with just a click and a drag!
                    </p>
                  </div>
                </div>
              </div>
              <div className="items-center md:flex">
                <Image src={carousel1} className="w-full md:mr-4 md:h-full" alt="carousel1" />
                <div className="flex w-full flex-col justify-evenly md:h-full">
                  <h3 className="mt-8 text-center text-2xl font-bold md:mt-0 md:text-left">Card</h3>
                  <div>
                    <p className="mt-3">Streamline your workflow with our feature-rich cards.</p>
                    <p className="mt-3">
                      Edit items with a simple click. Track start and end times, assign cards to team members, and add
                      tags and priorities for optimized search and task organization. Boost collaboration by uploading
                      links and attachments, while ensuring seamless communication with comments.
                    </p>
                  </div>
                </div>
              </div>
            </Carousel>
            <div
              role="presentation"
              className="carousel-arrow carousel-arrow-right absolute"
              onClick={() => (carouselRef.current as any).next()}
            />
          </div>
        </section>

        {/* user testmony */}
        <section id="user-testimony" className="flex flex-col items-center py-10">
          <h1 className="mb-10 font-['Montserrat'] text-2xl font-black leading-[1.2] text-[#262626] lg:text-[40px]">
            USER TESTMONY
          </h1>
          <div className="flex w-full flex-col items-center gap-6 lg:w-auto lg:flex-row">
            <div className="h-[412px] w-[355px] border-2 border-black p-6 lg:w-[310px]">
              <div className="flex h-[172px] flex-col items-center border-b border-[#8C8C8C]">
                <Image src={user1} className="mb-4 h-20 w-20 rounded-full" alt="user1" />
                <h4 className="font-['Roboto'] text-xl font-medium text-[#262626]">John M.</h4>
                <h5 className="font-['Roboto'] text-base font-normal text-[#8C8C8C]">Project Manager</h5>
              </div>
              <p className="mt-6 h-[168px] font-['Roboto'] text-base font-normal text-[#434343]">
                &quot;As a project manager, I&apos;ve tried many different task management tools, but HookLoop is by far
                the most user&#8208;friendly and effective. I can easily track progress, assign tasks, and communicate
                with my team all in one place.&quot;
              </p>
            </div>
            <div className="h-[412px] w-[355px] border-2 border-black p-6 lg:w-[310px]">
              <div className="flex h-[172px] flex-col items-center border-b border-[#8C8C8C]">
                <Image src={user2} className="mb-4 h-20 w-20 rounded-full" alt="user2" />
                <h4 className="font-['Roboto'] text-xl font-medium text-[#262626]">Emily G.</h4>
                <h5 className="font-['Roboto'] text-base font-normal text-[#8C8C8C]">Entrepreneur</h5>
              </div>
              <p className="mt-6 h-[168px] font-['Roboto'] text-base font-normal text-[#434343]">
                &quot;I&apos;ve been using HookLoop for both personal and professional tasks and it&apos;s been a
                lifesaver. Its flexibility and ease of use have helped me stay organized and focused on what&apos;s
                important.&quot;
              </p>
            </div>
            <div className="h-[412px] w-[355px] border-2 border-black p-6 lg:w-[310px]">
              <div className="flex h-[172px] flex-col items-center border-b border-[#8C8C8C]">
                <Image src={user3} className="mb-4 h-20 w-20 rounded-full" alt="user3" />
                <h4 className="font-['Roboto'] text-xl font-medium text-[#262626]">Dave R.</h4>
                <h5 className="font-['Roboto'] text-base font-normal text-[#8C8C8C]">CEO</h5>
              </div>
              <p className="mt-6 h-[168px] font-['Roboto'] text-base font-normal text-[#434343]">
                &quot;HookLoop has been a game changer for my team. The ability to collaborate on tasks and see
                real-time updates has greatly improved our communication and efficiency.
              </p>
            </div>
          </div>
        </section>

        {/* footer */}
        {/* TODO: 先完成手機版的尺寸 */}
        <section id="footer" className=" bg-[#F5F5F5]">
          <div className="border-b-[1px] border-[#D9D9D9] px-6 pb-4 pt-6 lg:flex lg:justify-between">
            <div className="flex flex-col items-center lg:flex-row lg:gap-4">
              <div className="mb-5 flex items-center lg:mb-0">
                <GlobalOutlined className="mr-2 text-[24px]" />
                <Dropdown menu={menuProps} className="w-[210px] md:w-[140px]">
                  <Button className="flex items-center justify-between">
                    English
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              <ul className="flex flex-col items-center gap-5 whitespace-nowrap lg:flex-row">
                <li className="text-base font-medium text-[#434343] text-['Roboto']">
                  <a href="">Contact us</a>
                </li>
                <li className="text-base font-medium text-[#434343] text-['Roboto']">
                  <a href="">Policy</a>
                </li>
                <li className="text-base font-medium text-[#434343] text-['Roboto']">
                  <a href="">Terms</a>
                </li>
                <li className="text-base font-medium text-[#434343] text-['Roboto']">
                  <a href="">Impressum</a>
                </li>
              </ul>
            </div>
            <div className="mt-10 flex flex-col items-center lg:mt-0 lg:flex-row">
              <h5 className="mr-2 whitespace-nowrap text-['Roboto']">Team members:</h5>
              <div className="mt-2 flex gap-x-2 lg:mt-0">
                <Image src={user4} className="h-10 w-10 rounded-full" alt="user4" />
                <Image src={user5} className="h-10 w-10 rounded-full" alt="user5" />
                <Image src={user6} className="h-10 w-10 rounded-full" alt="user6" />
                <Image src={user7} className="h-10 w-10 rounded-full" alt="user7" />
                <Image src={user8} className="h-10 w-10 rounded-full" alt="user8" />
                <Image src={user9} className="h-10 w-10 rounded-full" alt="user9" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-6 text-base font-medium text-[#595959]">
            Copyright &copy; 2023 HookLoop
          </div>
        </section>
      </section>
      {/* 登入的彈窗 */}
      <Login open={s_showLogin} close={closeLogin} editType="signUp" />
    </>
  );
};

export default Home;
