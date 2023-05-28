/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import * as icons from "@ant-design/icons";
import {
  Row,
  Col,
  Input,
  Avatar,
  Typography,
  Button,
  Select,
  DatePicker,
  Tag,
  Divider,
  Form,
  Spin,
  message as msg,
  Modal,
} from "antd";
import {
  EditFilled,
  PlusOutlined,
  SettingFilled,
  CloseOutlined,
  BookFilled,
  LinkOutlined,
  MessageFilled,
} from "@ant-design/icons";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { getTags } from "@/service/apis/kanban";
import { addCard, getCardById, updateCard } from "@/service/apis/card";
import IconRenderer from "@/components/util/IconRender";
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from "dayjs";
// component
import CommentList from "./CommentList";
import TagModal from "../Kanban/TagModal";
import Reporter from "./Reporter";
import Assignee from "./Assignee";

interface IProps {
  set_s_showCard: ISetStateFunction<boolean>;
}

interface IFieldProps {
  children: React.ReactNode;
}

interface IGroupTitle extends IFieldProps {}

// 每個區域的 title
const GroupTitle: React.FC<IGroupTitle> = ({ children }) => (
  <h5 className="bg-[#F0F0F0] p-1 text-base font-bold">{children}</h5>
);

// 可編輯欄位的 label
const FieldLabel: React.FC<IFieldProps> = ({ children }) => (
  <span className="text-base font-medium text-[#8C8C8C]">{children}</span>
);

const tagRender = (props: CustomTagProps) => {
  // console.log("props = ", props);
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      closeIcon={<CloseOutlined className="ml-1 text-black" />}
      // className="bg-[#edebeb] rounded-xl text-[#595959] text-sm font-medium flex"
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

// 等正式串接時要從 c_workspace 拿到 kanban 資料
const CardModal: React.FC<IProps> = ({ set_s_showCard }) => {
  const workspaceId = "646b682074ca962749815393";
  const kanbanId = "646cf9eabc9294205190f79c";
  const cardId = "646e328d8e59e798344d36a8";
  const [s_isLoaging, set_s_isLoaging] = useState(false);
  const [s_showTagModal, set_s_showTagModal] = useState(false);
  // kanban 上所有 Tag
  const [s_Tags, set_s_Tags] = useState<ITag[]>([]);
  // 卡片的 reporter
  const [s_reporter, set_s_reporter] = useState<IOwner>({
    _id: "",
    username: "",
    avatar: "",
  });

  // 卡片的 assignee
  const [s_assignee, set_s_assignee] = useState<IOwner[]>([]);

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = msg.useMessage();

  const onSubmit = async (values: ICard) => {
    // const res: AxiosResponse = await addCard(values);

    const newValues: ICard = {
      ...values,
      actualStartDate: values.actualDate?.[0] || null,
      actualEndDate: values.actualDate?.[1] || null,
      targetStartDate: values.targetDate?.[0] || null,
      targetEndDate: values.targetDate?.[1] || null,
    };
    // console.log("newValues = ", newValues);
    // return;

    const res: AxiosResponse = await updateCard(form.getFieldValue("_id"), newValues);
    const { status, message } = res.data as IApiResponse;
    if (status === "success") {
      messageApi.success(message);
    } else {
      messageApi.error(message);
    }
  };

  // 選擇owner
  const chooseOwner = (_: any, data: IOwner) => {
    // console.log(data);
    set_s_reporter({
      _id: data._id,
      username: data.username,
      avatar: data.avatar,
    });

    form.setFieldsValue({
      reporter: data._id,
    });
  };

  const chooseAssignee = (data: IOwner[]) => {
    const assignee_Ids = data?.map((item) => item._id) || [];
    form.setFieldsValue({
      assignee: assignee_Ids,
    });
    set_s_assignee(data);
  };

  useEffect(() => {
    const call_getCardById = async () => {
      set_s_isLoaging(true);
      const res: AxiosResponse = await getCardById(cardId);
      const { status, message, data } = res.data as IApiResponse;
      if (status === "success") {
        const tmpTag = data.tag?.map((item: ITag) => item._id);
        const tmpAssignee = data.assignee?.map((item: IOwner) => item._id);
        // const tmpTag = data.tag?.map((item: ITag) => item._id);
        form.setFieldsValue({
          ...data,
          // kanbanId: "646cf5e65916bb0a3de48875",
          kanbanId,
          tag: tmpTag,
          // 表單內只存 _id，關於reporter的資訊獨立開一個state儲存
          reporter: data.reporter?._id || "",
          assignee: tmpAssignee,
          actualDate: [dayjs(data.actualStartDate), dayjs(data.actualEndDate)],
          targetDate: [dayjs(data.targetStartDate), dayjs(data.targetEndDate)],
        });

        // 如果有reporter就獨立開一個state儲存
        if (data.reporter?._id?.length > 0) {
          set_s_reporter(data.reporter);
        }
        // 如果有assignee就獨立開一個state儲存
        if (data.assignee?.length > 0) {
          // console.log("data.assignee = ", data.assignee);
          set_s_assignee(data.assignee);
        }
      } else {
        messageApi.error(message);
      }
      set_s_isLoaging(false);
    };
    const call_getTags = async () => {
      // set_s_isLoaging(true);
      const res: AxiosResponse = await getTags(kanbanId);
      const { status, data } = res.data as IApiResponse;
      if (status === "success") {
        // console.log("Tags = ", data);
        set_s_Tags(data);
      }
      // set_s_isLoaging(false);
    };
    call_getTags();
    call_getCardById();
  }, []);

  return (
    <Spin spinning={s_isLoaging}>
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <div className="flex flex-col">
          {contextHolder}
          {/* 隱藏欄位 */}
          <div>
            <Form.Item name="kanbanId" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="_id" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="reporter" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="assignee" hidden>
              <Input />
            </Form.Item>
          </div>
          <section className="flex flex-col gap-4 h-[70vh] overflow-auto no-scrollbar">
            <GroupTitle>
              <EditFilled className="mr-1" />
              Content
            </GroupTitle>

            <Row gutter={[12, 0]}>
              <Col span={24}>
                <Form.Item label={<FieldLabel>Title</FieldLabel>} name="name">
                  <Input placeholder="Write card name" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[12, 0]}>
              <Col span={24}>
                <Form.Item label={<FieldLabel>Description</FieldLabel>} name="description">
                  <Input.TextArea placeholder="Write Description" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[12, 0]} align="bottom">
              <Col span={3} className="flex flex-col">
                <FieldLabel>Owner</FieldLabel>
                {/* reporter */}
                <Reporter reporter={s_reporter} afterChoose={chooseOwner} />
              </Col>

              <Col span={9} className="flex flex-col">
                <FieldLabel>Member</FieldLabel>
                <Assignee assignee={s_assignee} afterChoose={chooseAssignee} />
                {/* <Avatar.Group maxCount={2} size={32} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                  <Avatar src={<Image src={User1} alt="user1" />} />
                  <Avatar src={<Image src={User2} alt="user2" />} />
                  <Avatar src={<Image src={User3} alt="user3" />} />
                  <Avatar src={<Image src={User4} alt="user4" />} />
                </Avatar.Group> */}
              </Col>

              {/* <Col span={5} className="flex justify-start">
                <Button
                  className="bg-[#D9D9D9] float-right text-white"
                  type="primary"
                  size="middle"
                  shape="circle"
                  icon={<PlusOutlined style={{ verticalAlign: "middle" }} />}
                />
              </Col> */}
            </Row>

            <GroupTitle>
              <SettingFilled className="mr-1" />
              Setting
            </GroupTitle>

            <Row gutter={[12, 12]}>
              <Col span={24} className="flex flex-col">
                <Form.Item label={<FieldLabel>Target period</FieldLabel>} name="targetDate">
                  <DatePicker.RangePicker
                    // value={[s_cardData.targetStartDate, s_cardData.targetEndDate]}
                    className="h-[30px] w-full"
                  />
                </Form.Item>
              </Col>

              <Col span={24} className="flex flex-col">
                <Form.Item label={<FieldLabel>Actual period</FieldLabel>} name="actualDate">
                  <DatePicker.RangePicker
                    // value={[s_cardData.actualStartDate, s_cardData.actualEndDate]}
                    className="h-[30px] w-full"
                  />
                </Form.Item>
              </Col>

              <Col span={12} className="flex flex-col">
                <Form.Item label={<FieldLabel>Priority</FieldLabel>} name="priority">
                  <Select
                    placeholder="please select project"
                    // value={s_cardData.priority}
                    options={[
                      { label: "Low", value: "Low" },
                      { label: "Medium", value: "Medium" },
                      { label: "High", value: "High" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={12} className="flex flex-col">
                <Form.Item label={<FieldLabel>Status</FieldLabel>} name="status">
                  <Select
                    placeholder="please select board"
                    // value={s_cardData.status}
                    options={[
                      { label: "Pending", value: "Pending" },
                      { label: "In Progress", value: "In Progress" },
                      { label: "Done", value: "Done" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={24} className="flex flex-col">
                <Form.Item label={<FieldLabel>Tags</FieldLabel>} name="tag">
                  <Select
                    mode="multiple"
                    showArrow
                    tagRender={tagRender}
                    options={s_Tags.map((item) => ({
                      label: (
                        <span className={`${item.color} px-2 py-1 rounded-[100px] font-medium`}>
                          <IconRenderer iconName={item.icon as keyof typeof icons} />
                          <span className="ml-2">{item.name}</span>
                        </span>
                      ),
                      value: item._id,
                      data: "123",
                    }))}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => set_s_showTagModal(true)}>
                          Add item
                        </Button>
                      </>
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>

            <GroupTitle>
              <BookFilled className="mr-1" />
              Reference
            </GroupTitle>

            <Row gutter={[12, 8]}>
              <Col span={24} className="flex gap-3">
                <FieldLabel>Links</FieldLabel>
                <Button size="small" className="text-black flex items-center" icon={<LinkOutlined />}>
                  Add link
                </Button>
              </Col>
              <Col span={24}>
                <Typography.Link underline href="https://google.com" target="_blank">
                  reference website 1
                </Typography.Link>
              </Col>
              <Col span={24}>
                <Typography.Link underline href="https://google.com" target="_blank">
                  reference website 2
                </Typography.Link>
              </Col>
              <Col span={24}>
                <Typography.Link underline href="https://google.com" target="_blank">
                  reference website 3
                </Typography.Link>
              </Col>
              <Col span={24}>
                <Typography.Link underline href="https://google.com" target="_blank">
                  reference website 4
                </Typography.Link>
              </Col>
            </Row>

            <Row gutter={[12, 8]}>
              <Col span={12} className="flex gap-3">
                <FieldLabel>Files</FieldLabel>
                <Button size="small" className="text-black flex items-center" icon={<LinkOutlined />}>
                  Add file
                </Button>
              </Col>
              <Col span={24}>
                <Typography.Link underline href="https://google.com" target="_blank">
                  reference website 1
                </Typography.Link>
              </Col>
              <Col span={24}>
                <Typography.Link underline href="https://google.com" target="_blank">
                  reference website 2
                </Typography.Link>
              </Col>
              <Col span={24}>
                <Typography.Link underline href="https://google.com" target="_blank">
                  reference website 3
                </Typography.Link>
              </Col>
              <Col span={24}>
                <Typography.Link underline href="https://google.com" target="_blank">
                  reference website 4
                </Typography.Link>
              </Col>
            </Row>

            <GroupTitle>
              <MessageFilled className="mr-1" />
              Comment
            </GroupTitle>

            <CommentList />
          </section>

          <Divider className="my-3" />

          <Row>
            <Col span={24} className="flex justify-end gap-1">
              <Button
                type="primary"
                htmlType="submit"
                // onClick={() => set_s_showCard(false)}
              >
                Ok
              </Button>
            </Col>
          </Row>
        </div>
      </Form>

      {/* tags 的 Modal */}
      <Modal
        title="Tags setting"
        width="472px"
        open={s_showTagModal}
        destroyOnClose
        onCancel={() => set_s_showTagModal(false)}
        maskClosable={false}
        footer={null}
      >
        {s_showTagModal && <TagModal s_Tags={s_Tags} set_s_Tags={set_s_Tags} kanbanId={kanbanId} />}
      </Modal>
    </Spin>
  );
};

export default CardModal;
