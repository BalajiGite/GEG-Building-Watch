import { Button, Col, Divider, Form, Input, Modal, Row, Select, Space } from "antd";
import { useState } from "react";
import React from "react";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
function TargetConf({ setOpenTarget, openTarget }) {
  const [form] = Form.useForm();
  const [selectedItems, setSelectedItems] = useState();

  const setData = (formData) => {
    console.log(formData);
  };

  const onCancelModal = () => {
    setOpenTarget(false);
  };
  return (
    <>
      {/* <Button type="primary" onClick={() => setOpenTarget(true)}>
        Open Modal of 1000px width
      </Button> */}
      <Modal
        title="NCCC004166-E1"
        centered
        open={openTarget}
        onOk={() => setOpenTarget(false)}
        onCancel={() => setOpenTarget(false)}
        width={800}
        footer={null}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={setData}
          style={{ maxWidth: 720 ,
            //  overflow: "auto", height: "800px"
          }}
          form={form}
          validateMessages={validateMessages}
        >
         
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={16}>
              <Form.Item
                name={"energytypemeasure"}
                label="Energy Type Measure"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 18 }}
              >
                <Select
                  placeholder="Select Enerygy Type Measure"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                  options={["electricity kWh - kWh", "unit2", "unit3"].map(
                    (item, index) => ({
                      value: item,
                      label: item,
                      key: index,
                    })
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={16}>
              <Form.Item
                name={"energyprofile"}
                label="Energy Profile"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 18 }}
              >
                <Select
                  placeholder="Energy Profile"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                  options={["system profile", "type2", "type3"].map(
                    (item, index) => ({
                      value: item,
                      label: item,
                      key: index,
                    })
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row  justify={"center"} gutter={[30, 30]}> <h2>Target/Month </h2> </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"january"}
                label="January"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" placeholder="20" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"february"}
                label="February"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" placeholder="17" disabled/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"march"}
                label="March"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" placeholder="23" disabled/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"april"}
                label="April"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" placeholder="27" disabled/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"may"}
                label="May"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" placeholder="15" disabled/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"june"}
                label="June"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" placeholder="24" disabled/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"july"}
                label="July"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" placeholder="20" disabled/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"august"}
                label="August"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" placeholder="19" disabled/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"september"}
                label="September"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" placeholder="22" disabled/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"october"}
                label="October"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" placeholder="30" disabled/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"november "}
                label="November "
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" placeholder="28" disabled/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"december"}
                label="December"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                // rules={[{ required: "" }]}
              >
                <Space/>
                <Input className="form_input"  placeholder="22" disabled/>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            wrapperCol={{
              offset: 11,
              span: 16,
            }}
          >
            <Row>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                type=""
                style={{ marginLeft: 10 }}
                htmlType=""
                onClick={() => onCancelModal()}
              >
                Cancel
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default TargetConf;
