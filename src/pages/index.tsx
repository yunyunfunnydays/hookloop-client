import React, { useRef } from "react";
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
import PlanComponent from "@/components/Plan";

const Home: React.FC = () => {
  // const images = [mission, dashboard, kanban, card];
  const carouselRef = useRef(null);

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
        <a href="#" className="shrink-0">
          Quick Start
        </a>
      </nav>

      <section className="h-[calc(100vh_-_160px)] pt-[15px] overflow-auto">
        {/* mission */}
        <section
          className={`
          xl:w-[1200px]
          h-[calc(100vh_-_160px)]
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

        {/* introduce */}
        <section className="py-[40px] px-[12px] md:px-[24px] flex flex-col items-center gap-[40px] bg-[#FAFAFA]">
          <h1 className="font-black text-[24px] lg:text-[40px] font-['Montserrat']">ALL YOU NEED IS HERE</h1>
          {/* dashboard */}
          <div id="Dashboard" className="flex flex-col md:flex-row items-center md:gap-[20px] xl:w-[1155px]">
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
          <div id="Kanban" className="flex flex-col md:flex-row-reverse items-center md:gap-[20px] xl:w-[1155px]">
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
          <div id="Card" className="flex flex-col md:flex-row items-center md:gap-[20px] xl:w-[1155px]">
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

        {/* plan */}
        <section id="Plan" className="w-[90%] md:w-[960px] mx-auto py-[40px] px-[12px] flex flex-col items-center gap-[40px]">
          <h1 className="font-black text-[24px] md:text-[40px] font-['Montserrat']">PLAN & PRICING</h1>
          <PlanComponent type="index" />
        </section>

        {/* slider */}
        <section className="py-[80px] bg-[#434343] flex flex-col items-center">
          <h1 className="font-black text-[24px] lg:text-[40px] font-['Montserrat']">
            KICKSTART YOUR PROJECT IN SECONDS
          </h1>
          <div className="relative w-[80%] my-5 leading-6">
            <div className="absolute carousel-arrow carousel-arrow-left"
              onClick={() => (carouselRef.current as any).prev()}
            ></div>
            <Carousel ref={carouselRef} className="bg-white p-8" >
              <div className="md:flex items-center" >
                <Image src={carousel1} className="w-full md:h-full md:mr-4" alt="carousel1" />
                <div className="w-full md:h-full flex flex-col justify-evenly">
                  <h3 className="text-2xl font-bold mt-8 md:mt-0 text-center md:text-left">
                    Dashboard
                  </h3>
                  <div>
                    <p className="mt-3">
                      Just click the plus button - discover simplicity and efficiency at your fingertips with our instant workspace creation!
                    </p>
                    <p className="mt-3">
                      Take command of your team and kanbans, and search to find what you need within a seamless workspace. Immerse yourself in a clean, intuitive interface that keeps you on track and in control.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:flex items-center" >
                <Image src={carousel1} className="w-full md:h-full md:mr-4" alt="carousel1" />
                <div className="w-full md:h-full flex flex-col justify-evenly">
                  <h3 className="text-2xl font-bold mt-8 md:mt-0 text-center md:text-left">
                    Kanban
                  </h3>
                  <div>
                    <p className="mt-3">
                      Explore our organized kanban, where you can effortlessly add new cards by clicking 'add card' or manage card categories using 'settings.'
                    </p>
                    <p className="mt-3">
                      Click to edit cards or drag and drop them to their perfect positions. Plus, with our multifunctional sidebar, rapidly switch between different kanban by simply clicking on them. Immerse yourself in seamless navigation with just a click and a drag!
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:flex items-center" >
                <Image src={carousel1} className="w-full md:h-full md:mr-4" alt="carousel1" />
                <div className="w-full md:h-full flex flex-col justify-evenly">
                  <h3 className="text-2xl font-bold mt-8 md:mt-0 text-center md:text-left">
                    Card
                  </h3>
                  <div>
                    <p className="mt-3">
                      Streamline your workflow with our feature-rich cards.
                    </p>
                    <p className="mt-3">
                      Edit items with a simple click. Track start and end times, assign cards to team members, and add tags and priorities for optimized search and task organization. Boost collaboration by uploading links and attachments, while ensuring seamless communication with comments.
                    </p>
                  </div>
                </div>
              </div>
            </Carousel>
            <div className="absolute carousel-arrow carousel-arrow-right"
              onClick={() => (carouselRef.current as any).next()}
            ></div>
          </div>
        </section>

        {/* user testmony */}
        <section id="user-testimony" className="py-10 flex flex-col items-center">
          <h1 className="font-black text-2xl leading-[1.2] mb-10 font-['Montserrat'] text-[#262626] lg:text-[40px]">
            USER TESTMONY
          </h1>
          <div className="w-full flex flex-col items-center gap-6 lg:w-auto lg:flex-row">
            <div className="h-[412px] w-[355px] p-6 border-2 border-black lg:w-[310px]">
              <div className="h-[172px] flex flex-col items-center border-b border-[#8C8C8C]">
                <Image src={user1} className="w-20 h-20 rounded-full mb-4" alt="user1" />
                <h4 className="text-xl font-medium font-['Roboto'] text-[#262626]">John M.</h4>
                <h5 className="text-base font-normal font-['Roboto'] text-[#8C8C8C]">Project Manager</h5>
              </div>
              <p className="h-[168px] mt-6 text-base font-normal font-['Roboto'] text-[#434343]">
                &quot;As a project manager, I&apos;ve tried many different task management tools, but HookLoop is by far
                the most user&#8208;friendly and effective. I can easily track progress, assign tasks, and communicate
                with my team all in one place.&quot;
              </p>
            </div>
            <div className="h-[412px] w-[355px] p-6 border-2 border-black lg:w-[310px]">
              <div className="h-[172px] flex flex-col items-center border-b border-[#8C8C8C]">
                <Image src={user2} className="w-20 h-20 rounded-full mb-4" alt="user2" />
                <h4 className="text-xl font-medium font-['Roboto'] text-[#262626]">Emily G.</h4>
                <h5 className="text-base font-normal font-['Roboto'] text-[#8C8C8C]">Entrepreneur</h5>
              </div>
              <p className="h-[168px] mt-6 text-base font-normal font-['Roboto'] text-[#434343]">
                &quot;I&apos;ve been using HookLoop for both personal and professional tasks and it&apos;s been a
                lifesaver. Its flexibility and ease of use have helped me stay organized and focused on what&apos;s
                important.&quot;
              </p>
            </div>
            <div className="h-[412px] w-[355px] p-6 border-2 border-black lg:w-[310px]">
              <div className="h-[172px] flex flex-col items-center border-b border-[#8C8C8C]">
                <Image src={user3} className="w-20 h-20 rounded-full mb-4" alt="user3" />
                <h4 className="text-xl font-medium font-['Roboto'] text-[#262626]">Dave R.</h4>
                <h5 className="text-base font-normal font-['Roboto'] text-[#8C8C8C]">CEO</h5>
              </div>
              <p className="h-[168px] mt-6 text-base font-normal font-['Roboto'] text-[#434343]">
                &quot;HookLoop has been a game changer for my team. The ability to collaborate on tasks and see
                real-time updates has greatly improved our communication and efficiency.
              </p>
            </div>
          </div>
        </section>

        {/* footer */}
        {/* TODO: 先完成手機版的尺寸 */}
        <section id="footer" className=" bg-[#F5F5F5]">
          <div className="pt-6 pb-4 px-6 border-b-[1px] border-[#D9D9D9] lg:flex lg:justify-between">
            <div className="flex flex-col items-center lg:flex-row lg:gap-4">
              <div className="flex items-center mb-5 lg:mb-0">
                <GlobalOutlined className="text-[24px] mr-2" />
                <Dropdown menu={menuProps} className="w-[210px] md:w-[140px]">
                  <Button className="flex justify-between items-center">
                    English
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              <ul className="flex flex-col items-center gap-5 lg:flex-row whitespace-nowrap">
                <li className="text-base font-medium text-['Roboto'] text-[#434343]">
                  <a href="">Contact us</a>
                </li>
                <li className="text-base font-medium text-['Roboto'] text-[#434343]">
                  <a href="">Policy</a>
                </li>
                <li className="text-base font-medium text-['Roboto'] text-[#434343]">
                  <a href="">Terms</a>
                </li>
                <li className="text-base font-medium text-['Roboto'] text-[#434343]">
                  <a href="">Impressum</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center mt-10 lg:flex-row lg:mt-0">
              <h5 className="text-['Roboto'] whitespace-nowrap mr-2">Team members:</h5>
              <div className="mt-2 flex gap-x-2 lg:mt-0">
                <Image src={user4} className="w-10 h-10 rounded-full" alt="user4" />
                <Image src={user5} className="w-10 h-10 rounded-full" alt="user5" />
                <Image src={user6} className="w-10 h-10 rounded-full" alt="user6" />
                <Image src={user7} className="w-10 h-10 rounded-full" alt="user7" />
                <Image src={user8} className="w-10 h-10 rounded-full" alt="user8" />
                <Image src={user9} className="w-10 h-10 rounded-full" alt="user9" />
              </div>
            </div>
          </div>
          <div className="py-6 flex justify-center items-center text-base font-medium text-[#595959]">
            Copyright &copy; 2023 HookLoop
          </div>
        </section>
      </section >
    </>
  );
};

export default Home;
