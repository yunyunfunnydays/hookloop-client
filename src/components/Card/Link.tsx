import React, { useState } from "react";
import { Input, Button, Row, Col } from "antd";

interface IProps {
  afterfinish: (data: { name: string; url: string }) => void;
}

const Link: React.FC<IProps> = ({ afterfinish }) => {
  const [s_value, set_s_value] = useState({
    name: "",
    url: "",
  });
  const handelChange = (type: string, value: string) => {
    const _tmp = { ...s_value, [type]: value };
    set_s_value(_tmp);
  };
  return (
    <Row gutter={[12, 12]}>
      <Col span={10}>
        <h5>Link Text</h5>
        <Input placeholder="please enter" value={s_value.name} onChange={(e) => handelChange("name", e.target.value)} />
      </Col>
      <Col span={11}>
        <h5>URL</h5>
        <Input placeholder="please enter" value={s_value.url} onChange={(e) => handelChange("url", e.target.value)} />
      </Col>
      <Col span={2} className="flex items-end">
        <Button size="large" type="primary" onClick={() => afterfinish(s_value)}>
          OK
        </Button>
      </Col>
    </Row>
  );
};

export default Link;
