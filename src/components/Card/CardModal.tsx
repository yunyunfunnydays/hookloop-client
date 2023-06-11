/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, ReactNode } from "react";
import * as icons from "@ant-design/icons";
import dynamic from "next/dynamic";
import {
  Row,
  Col,
  Input,
  Upload,
  Typography,
  Button,
  Select,
  DatePicker,
  Tag,
  Result,
  Divider,
  Form,
  Spin,
  message as msg,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  SettingFilled,
  CloseOutlined,
  BookFilled,
  LinkOutlined,
  MessageFilled,
} from "@ant-design/icons";
import useWebSocket from "react-use-websocket";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { getTags } from "@/service/apis/kanban";
import { getCardById, updateCard, addAttachment, deleteAttachment } from "@/service/apis/card";
import IconRenderer from "@/components/util/IconRender";
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from "dayjs";
import KanbanContext from "@/Context/KanbanContext";
// component
import GlobalContext from "@/Context/GlobalContext";
import CommentList from "./CommentList";
import TagModal from "../Kanban/TagModal";
import Reporter from "./Reporter";
import Assignee from "./Assignee";
import Link from "./Link";
import CustAvatar from "../util/CustAvatar";

// Ariean and you are both working on the same document. Do you want to overwrite the current file?

interface IProps {
  s_kanbanId: string;
  card: ICard;
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

// const QuillNoSSRWrapper = dynamic(
//   async () => {
//     const { default: RQ } = await import("react-quill");

//     const QuillJS = ({ forwardedRef, ...props }: IWrappedComponent) => <RQ ref={forwardedRef} {...props} />;
//     return QuillJS;
//   },
//   { ssr: false },
// );

// 等正式串接時要從 c_workspace 拿到 kanban 資料
const CardModal: React.FC<IProps> = ({ s_kanbanId, card, set_s_showCard }) => {
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  const [modal, modalContextHolder] = Modal.useModal();
  // const quillRef = useRef<typeof ReactQuill>(null); // Create a Ref
  // const router = useRouter();
  const wsUrl = process.env.wsUrl!;
  const { sendMessage, lastMessage } = useWebSocket(wsUrl);
  const { c_user, c_socketNotification, c_memberMap } = useContext(GlobalContext);
  const { c_Tags, set_c_Tags, c_getKanbanByKey } = useContext(KanbanContext);

  const [s_isLoaging, set_s_isLoaging] = useState(false);
  const [s_showTagModal, set_s_showTagModal] = useState(false);
  // 是否顯示建立 Link 的地方
  const [s_showLink, set_s_showLink] = useState(false);
  // kanban 上所有 Link
  const [s_Links, set_s_Links] = useState<ILink[]>([]);
  // 卡片上傳的檔案
  const [s_attachments, set_s_attachments] = useState<any>([]);

  const [s_allComments, set_s_allComments] = useState<Icomment[]>([]);

  const [form] = Form.useForm();
  const f_reporter = Form.useWatch("reporter", form);
  const f_assignee = Form.useWatch("assignee", form);
  const f_description = Form.useWatch("description", form);
  const [messageApi, contextHolder] = msg.useMessage();

  const onSubmit = async (values: ICard) => {
    // const res: AxiosResponse = await addCard(values);

    const newValues: ICard = {
      ...values,
      // kanbanId: s_kanbanId,
      webLink: s_Links,
      actualStartDate: values.actualDate?.[0] || null,
      actualEndDate: values.actualDate?.[1] || null,
      targetStartDate: values.targetDate?.[0] || null,
      targetEndDate: values.targetDate?.[1] || null,
    };
    // console.log("newValues = ", newValues);
    // return;
    delete newValues.targetDate;
    delete newValues.actualDate;
    const res: AxiosResponse = await updateCard(s_kanbanId, card._id, newValues);
    const { status, message } = res.data as IApiResponse;
    if (status === "success") {
      messageApi.success(message);
      c_getKanbanByKey();
      set_s_showCard(false);
    } else {
      messageApi.error(message);
      set_s_showCard(false);
    }
  };

  // 選擇owner
  const chooseOwner = (userId: string) => {
    form.setFieldsValue({
      reporter: userId,
    });
  };

  const chooseAssignee = (data: string[]) => {
    form.setFieldsValue({
      assignee: data,
    });
  };

  const createLink = (data: { name: string; url: string }) => {
    const _links = [...s_Links].concat({ name: data.name, url: data.url });
    set_s_Links(_links);
    set_s_showLink(false);
  };

  const removeLink = (key: string) => {
    const _links = s_Links.filter((item) => item.name + item.url !== key);
    set_s_Links(_links);
  };

  const removeAttachment = async (attachmentId: string) => {
    const res: AxiosResponse = await deleteAttachment(card._id, attachmentId);
    const { status, message, data } = res.data as IApiResponse;
    if (status === "success") {
      set_s_attachments(data.target.attachment);
      messageApi.success(message);
    } else {
      messageApi.error(message);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      // [{ size: [] }],
      // [{ font: [] }],
      // [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      // ["link", "image"],
      [{ color: [] }], // [{ color: ["red", "#785412"] }],
      [{ background: [] }], // [{ background: ["red", "#785412"] }],
    ],
  };

  const writeData = (data: ICard) => {
    form.setFieldsValue({
      ...data,
      // 表單內只存 _id，關於reporter的資訊獨立開一個state儲存
      actualDate: [dayjs(data.actualStartDate), dayjs(data.actualEndDate)],
      targetDate: [dayjs(data.targetStartDate), dayjs(data.targetEndDate)],
    });
    if (data.cardComment) {
      set_s_allComments(data.cardComment);
    }

    if ((data?.attachment || "")?.length > 0) {
      set_s_attachments(data.attachment);
    }

    if ((data?.webLink || "")?.length > 0) {
      set_s_Links(data.webLink);
    }
  };

  const overWrite = (modifyUserId: string, data: ICard) => {
    const confirmModal = modal.confirm({
      icon: <div />,
      // className: "p-0",
      // width: 550,
      content: (
        <Result
          // status="success"
          className="p-0"
          icon={<CustAvatar size={100} info={c_memberMap[modifyUserId]} />}
          title={<span className="text-lg font-bold">Ariean made changed to this document.</span>}
          subTitle="Do you want to overwrite the current file?"
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                writeData(data);
                confirmModal.destroy();
              }}
            >
              Over Write
            </Button>,
            <Button key="buy" className="ml-2" onClick={() => confirmModal.destroy()}>
              Cancel
            </Button>,
          ]}
        />
      ),
      footer: [],
    });
  };

  useEffect(() => {
    // console.log("card._id=  ", card._id);
    sendMessage(JSON.stringify({ type: "enterCard", id: card._id }));

    return () => {
      sendMessage(JSON.stringify({ type: "leaveCard", id: card._id }));
    };
  }, []);

  useEffect(() => {
    // 檢視 WebSocket 訊息
    // console.log("lastMessage: ", lastMessage?.data);
    if (!lastMessage || !lastMessage.data) return;
    const data = JSON.parse(lastMessage.data);

    if (data.type === "comments") {
      if (data.updateUserId !== c_user.userId) {
        c_socketNotification(data.updateUserId, <span>add a comment in this card</span>);
      }
      set_s_allComments(data.result);
    }

    if (data.type === "updateCard") {
      if (data.updateUserId !== c_user.userId) {
        c_socketNotification(data.updateUserId, <span>update in this card</span>);
        overWrite(data.updateUserId, data.result);
      }
    }
    // console.log("lastMessage.data = ", data);updateUserId
  }, [lastMessage]);

  useEffect(() => {
    const call_getCardById = async () => {
      const res: AxiosResponse = await getCardById(card._id);
      const { status, data } = res.data as IApiResponse;
      if (status === "success") {
        // console.log("data = ", data);
        writeData(data);
        // form.setFieldsValue({
        //   ...data,
        //   // 表單內只存 _id，關於reporter的資訊獨立開一個state儲存
        //   actualDate: [dayjs(data.actualStartDate), dayjs(data.actualEndDate)],
        //   targetDate: [dayjs(data.targetStartDate), dayjs(data.targetEndDate)],
        // });

        // set_s_allComments(data.cardComment);

        // if ((data?.attachment || "")?.length > 0) {
        //   set_s_attachments(data.attachment);
        // }

        // if ((data?.webLink || "")?.length > 0) {
        //   set_s_Links(data.webLink);
        // }
      }
    };
    call_getCardById();
  }, []);

  const dropdownRender = (menu: ReactNode) => (
    <>
      {menu}
      <Divider style={{ margin: "8px 0" }} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => set_s_showTagModal(true)}>
        Add item
      </Button>
    </>
  );

  return (
    <Spin spinning={s_isLoaging}>
      {modalContextHolder}
      <Form form={form} onFinish={onSubmit} layout="vertical">
        {/* <div className="flex flex-col"> */}
        {contextHolder}
        {/* 隱藏欄位 */}
        <div>
          {/* <Form.Item name="kanbanId" hidden>
              <Input />
            </Form.Item> */}
          {/* <Form.Item name="_id" hidden>
              <Input />
            </Form.Item> */}
          <Form.Item name="reporter" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="assignee" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="webLink" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="description" hidden>
            <Input />
          </Form.Item>
        </div>
        <section className="no-scrollbar flex h-[70vh] flex-col gap-4 overflow-auto">
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
              {/* <Form.Item label={<FieldLabel>Description</FieldLabel>} name="description">
                  <Input.TextArea placeholder="Write Description" />
                </Form.Item> */}
              <FieldLabel>Description</FieldLabel>
              <ReactQuill
                // forwardedRef={quillRef}
                theme="snow"
                value={f_description}
                modules={modules}
                // formats={formats}
                onBlur={(_, __, editor) => {
                  // console.log("previousRange = ", previousRange);
                  // console.log("source = ", source);
                  // console.log("getSelection = ", editor.getSelection());
                  form.setFieldsValue({
                    description: editor.getHTML(),
                  });
                }}
              />
            </Col>

            <Col span={24}>
              <Row gutter={[12, 0]} align="bottom">
                <Col span={3} className="flex flex-col">
                  <FieldLabel>Owner</FieldLabel>
                  <Reporter reporter={f_reporter} afterChoose={chooseOwner} />
                </Col>

                <Col span={9} className="flex flex-col">
                  <FieldLabel>Member</FieldLabel>
                  <Assignee assignee={f_assignee} afterChoose={chooseAssignee} />
                </Col>
              </Row>
            </Col>
          </Row>

          <GroupTitle>
            <SettingFilled className="mr-1" />
            Setting
          </GroupTitle>

          <Row gutter={[12, 12]}>
            <Col span={24} className="flex flex-col">
              <Form.Item label={<FieldLabel>Target period</FieldLabel>} name="targetDate">
                <DatePicker.RangePicker className="h-[30px] w-full" />
              </Form.Item>
            </Col>

            <Col span={24} className="flex flex-col">
              <Form.Item label={<FieldLabel>Actual period</FieldLabel>} name="actualDate">
                <DatePicker.RangePicker className="h-[30px] w-full" />
              </Form.Item>
            </Col>

            <Col span={12} className="flex flex-col">
              <Form.Item label={<FieldLabel>Priority</FieldLabel>} name="priority">
                <Select
                  placeholder="please select priority"
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
                  placeholder="please select status"
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
                  options={c_Tags?.map((item) => ({
                    label: (
                      <span key={item.color} className={`${item.color} rounded-[100px] px-2 py-1 font-medium`}>
                        <IconRenderer iconName={item.icon as keyof typeof icons} />
                        <span className="ml-2">{item.name}</span>
                      </span>
                    ),
                    value: item._id,
                    key: item._id,
                  }))}
                  dropdownRender={dropdownRender}
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
              <Button
                size="small"
                className="flex items-center text-black"
                onClick={() => set_s_showLink(true)}
                icon={<LinkOutlined />}
              >
                Add link
              </Button>
            </Col>
            <Col span={24}>{s_showLink && <Link afterfinish={createLink} />}</Col>
            {s_Links?.map((item) => (
              <Col key={item.url + item.name} span={24}>
                <DeleteOutlined className="mr-2 cursor-pointer" onClick={() => removeLink(item.name + item.url)} />
                <Typography.Link underline href={item.url} target="_blank">
                  {item.name}
                </Typography.Link>
              </Col>
            ))}
          </Row>

          <Row gutter={[12, 8]}>
            <Col span={12} className="flex gap-3">
              <FieldLabel>Files</FieldLabel>
              {/* <Button size="small" className="text-black flex items-center" icon={<LinkOutlined />}>
                  Add file
                </Button> */}
              <Upload
                itemRender={() => null}
                listType="picture"
                beforeUpload={() => false}
                onChange={async ({ file }) => {
                  set_s_isLoaging(true);
                  const formData = new FormData();
                  formData.append("file", file as any);
                  const res: AxiosResponse = await addAttachment(form.getFieldValue("_id"), formData);
                  const { status, message, data } = res.data as IApiResponse;
                  if (status === "success") {
                    // console.log("data = ", data);
                    set_s_attachments(data.target.attachment);
                    messageApi.success(message);
                  } else {
                    messageApi.error(message);
                  }
                  set_s_isLoaging(false);
                }}
              >
                <Button size="small" className="flex items-center text-black" icon={<LinkOutlined />}>
                  Add file
                </Button>
              </Upload>
            </Col>

            {s_attachments?.map((item: any) => (
              <Col key={item.fileId} span={24}>
                <DeleteOutlined className="mr-2 cursor-pointer" onClick={() => removeAttachment(item.fileId)} />
                <Typography.Link underline href={item.url} target="_blank">
                  {item.name}
                </Typography.Link>
              </Col>
            ))}
          </Row>

          <GroupTitle>
            <MessageFilled className="mr-1" />
            Comment
          </GroupTitle>

          <CommentList cardId={card._id} s_allComments={s_allComments} />
        </section>

        <Divider className="my-3" />

        <Row>
          <Col span={24} className="flex justify-end gap-1">
            <Button type="primary" htmlType="submit">
              Ok
            </Button>
          </Col>
        </Row>
        {/* </div> */}
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
        {s_showTagModal && <TagModal c_Tags={c_Tags} set_c_Tags={set_c_Tags} kanbanId={s_kanbanId} />}
      </Modal>
    </Spin>
  );
};

export default CardModal;
