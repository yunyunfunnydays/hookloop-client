import React, { useState, useContext } from "react";
import { Row, Col, Input, Divider, Switch, Button, message as msg, Spin } from "antd";
import GlobalContext from "@/Context/GlobalContext";
// api
import { updateWorkspace } from "@/service/apis/workspace";
import { archiveKanban } from "@/service/apis/kanban";
import FieldLabel from "@/components/util/FieldLabel";

interface IProps {
  s_workspace: Iworkspace;
  set_s_showWorkspaceSetting: ISetStateFunction<boolean>;
}

const SettingModal: React.FC<IProps> = ({ s_workspace, set_s_showWorkspaceSetting }) => {
  // console.log("s_workspace = ", s_workspace);
  const { c_getAllWorkspace } = useContext(GlobalContext);
  const [s_loading, set_s_loading] = useState(false);
  const [s_workspaceName, set_s_workspaceName] = useState(s_workspace.workspaceName);
  const [s_kanbans, set_s_kanbans] = useState<Ikanban[]>(s_workspace.kanbans);

  const updateName = async () => {
    set_s_loading(true);
    const res: AxiosResponse = await updateWorkspace(s_workspace.workspaceId, {
      ...s_workspace,
      workspaceName: s_workspaceName,
    });
    const { status, message } = res.data as IApiResponse;
    if (status === "success") {
      msg.success(message);
    } else {
      msg.error(message);
    }
    c_getAllWorkspace();
    set_s_loading(false);
  };

  const openKanban = async (kanban: Ikanban) => {
    set_s_loading(true);
    const res: AxiosResponse = await archiveKanban(kanban.key, {
      ...kanban,
      isArchived: false,
    });
    const { status, message } = res.data as IApiResponse;
    if (status === "success") {
      msg.success(message);
      // console.log("data = ", data);
      const _kanbans = s_kanbans.filter((_kanban: Ikanban) => _kanban.key !== kanban.key);
      set_s_kanbans(_kanbans);
    } else {
      msg.error(message);
    }
    c_getAllWorkspace();
    set_s_loading(false);
  };

  return (
    <Spin spinning={s_loading}>
      <Row gutter={[12, 12]}>
        <Col span={6} className="flex items-center">
          <FieldLabel>Workspace Name</FieldLabel>
        </Col>
        <Col span={15}>
          <Input value={s_workspaceName} onChange={(e) => set_s_workspaceName(e.target.value)} />
        </Col>

        <Col span={3}>
          <Button type="primary" size="large" onClick={updateName}>
            Save
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[12, 12]}>
        <Col span={6}>
          <FieldLabel>Archived Kanban</FieldLabel>
        </Col>

        <Col span={18}>
          <FieldLabel>Switch to open</FieldLabel>
        </Col>
      </Row>
      <Divider className="my-3" />
      {s_kanbans
        ?.filter((kanban: Ikanban) => kanban.isArchived === true)
        ?.map((kanban: Ikanban) => (
          <Row key={kanban._id} gutter={[12, 12]} className="mb-3">
            <Col span={6} className="text-base font-semibold">
              {kanban.name}
            </Col>
            <Col span={18}>
              <Switch checkedChildren="open" unCheckedChildren="open" onChange={() => openKanban(kanban)} />
            </Col>
          </Row>
        ))}

      <Divider />
      <Row gutter={[12, 12]}>
        <Col span={24} className="flex justify-end">
          <Button onClick={() => set_s_showWorkspaceSetting(false)}>Close</Button>
        </Col>
      </Row>
    </Spin>
  );
};

export default SettingModal;
