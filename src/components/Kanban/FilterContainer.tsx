import React, { useContext } from "react";
import GlobalContext from "@/Context/GlobalContext";
import { Checkbox, Row, Col, Typography, Divider, Select, Radio } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { RadioChangeEvent } from "antd";
import IconRenderer from "@/components/util/IconRender";
import * as icons from "@ant-design/icons";
import CustAvatar from "@/components/util/CustAvatar";

type FilterContainerProps = {
  c_query: IqueryType;
  set_c_query: ISetStateFunction<IqueryType>;
  c_Tags: ITagRecord;
};

type HandleChangeValue = CheckboxValueType | CheckboxValueType[] | boolean;

const FilterContainer: React.FC<FilterContainerProps> = ({ c_Tags, c_query, set_c_query }) => {
  const { c_memberMap } = useContext(GlobalContext);

  const handleChange = (type: keyof IqueryType, value: HandleChangeValue) => {
    set_c_query({
      ...c_query,
      [type]: value,
    });
  };
  console.log("c_query = ", c_query);
  return (
    <div className="flex flex-col">
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Typography.Title level={5}>Members</Typography.Title>
        </Col>
        <Checkbox.Group
          className="member-chackbox flex flex-col gap-2"
          onChange={(values) => handleChange("members", values)}
          value={c_query.members}
          options={
            Object.keys(c_memberMap).length > 0
              ? Object.values(c_memberMap).map((user: Imember) => ({
                  label: (
                    <span>
                      <CustAvatar info={user} />
                      <span className="ml-2">{user.username}</span>
                    </span>
                  ),
                  value: user.userId,
                }))
              : []
          }
        />
        <Divider className="my-2" />
        <Col span={24}>
          <Typography.Title level={5}>Tags</Typography.Title>
        </Col>
        <Checkbox.Group
          className="flex flex-col gap-2"
          onChange={(values) => handleChange("tags", values)}
          value={c_query.tags}
          options={
            Object.keys(c_Tags).length > 0
              ? Object.values(c_Tags).map((tag: ITag) => ({
                  label: (
                    <span className={`${tag.color} w-full rounded-[50px] px-2 py-1`}>
                      <IconRenderer iconName={tag.icon as keyof typeof icons} />
                      <span className="ml-2">{tag.name}</span>
                    </span>
                  ),
                  value: tag?._id || "",
                }))
              : []
          }
        />

        <Col span={24}>
          <Divider className="my-2" />
        </Col>

        <Col span={12}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Typography.Title level={5}>Priority</Typography.Title>
            </Col>
            <Col span={24}>
              <Select
                placeholder="priority"
                className="w-full"
                value={c_query.priority}
                onChange={(value) => handleChange("priority", value)}
                options={[
                  { label: "Low", value: "Low" },
                  { label: "Medium", value: "Medium" },
                  { label: "High", value: "High" },
                ]}
              />
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Typography.Title level={5}>Status</Typography.Title>
            </Col>
            <Col span={24}>
              <Select
                placeholder="Status"
                className="w-full"
                value={c_query.status}
                onChange={(value) => handleChange("status", value)}
                options={[
                  { label: "Pending", value: "Pending" },
                  { label: "In Progress", value: "In Progress" },
                  { label: "Done", value: "Done" },
                ]}
              />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Divider className="my-2" />
        </Col>

        <Col span={24}>
          <Typography.Title level={5}>Match</Typography.Title>
        </Col>

        <Col span={24}>
          <Radio.Group value={c_query.isMatch} onChange={(e) => handleChange("isMatch", e.target.value)}>
            <Radio value={false}>Partially</Radio>
            <Radio value>Fully</Radio>
          </Radio.Group>
        </Col>
      </Row>
    </div>
  );
};

export default FilterContainer;
