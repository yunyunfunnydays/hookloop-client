import React, { useState, useContext } from "react";
import { DatePicker, Input, Button, Modal } from "antd";
// context
import GlobalContext from "@/Context/GlobalContext";
// component
import CustLayout from "@/components/Layout";
import Workspace from "@/components/Workspace";
import CardModal from "@/components/Card/CardModal";

interface IProps {}

const Dashboard: React.FC<IProps> = () => {
  // workspace 資料
  const { c_workspaces } = useContext(GlobalContext);
  // 是否開啟卡片(測試用)
  const [s_showCard, set_s_showCard] = useState(false);

  return (
    <CustLayout>
      <div className="flex flex-col py-[30px]">
        <section className="flex justify-end gap-3">
          <Button type="primary" size="large" onClick={() => set_s_showCard(true)}>
            測試卡片
          </Button>
          <DatePicker className="w-[250px]" />
          <Input.Search placeholder="input search text" enterButton style={{ width: 250 }} />
        </section>

        <section className="mt-5 flex flex-col gap-8">
          {/* Workspace */}
          {c_workspaces?.map((workspace: Iworkspace) => {
            return <Workspace key={workspace.workspaceId} workspaceData={workspace} />;
          }) || []}
        </section>

        {/* 暫時用來測試 Card 切版 */}
        <Modal
          title="Add Card"
          width="572px"
          open={s_showCard}
          style={{
            top: 20,
          }}
          destroyOnClose
          onCancel={() => set_s_showCard(false)}
          footer={null}
        >
          {/* {s_showCard && <CardModal set_s_showCard={set_s_showCard} />} */}
          {s_showCard === true ? <CardModal set_s_showCard={set_s_showCard} /> : null}
        </Modal>
      </div>
    </CustLayout>
  );
};

export default Dashboard;
