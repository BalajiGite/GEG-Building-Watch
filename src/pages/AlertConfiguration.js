import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useEffect, useState } from "react";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function AlertConfiguration(props) {
  const [alertConfId, setAlertConfId] = useState();
  const [confForm] = Form.useForm();
  const {
    onOpenConf,
    confModal,
    onCloseConf,
    confList,
    onAlertClick,
    setSelectedRecord,
    selectedRecord,
    setConfList,
    populateConfList,
  } = props;

  const onEdit = async (record) => {
    confForm.setFieldsValue(record);
    setAlertConfId(record.id);
    onOpenConf();
  };

  const onSubmit = async (formData) => {
    try {
      let tempp = [];
      if (alertConfId) {
        /**const resp = await editAlertConf(alertConfId, {
          ...formData,
          alertId: selectedRecord.id,
        });
        const res = await getAlertConfList();
        populateConfList(selectedRecord, res);**/
        setAlertConfId();
        confForm.resetFields();
        populateForm(selectedRecord);
      } else {
        if (formData.name !== "") {
          /**const resp = await addAlertConf({
            ...formData,
            alertId: selectedRecord.id,
          });
          const res = await getAlertConfList();
          populateConfList(selectedRecord, res);**/
          confForm.resetFields();
          populateForm(selectedRecord);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [checked, setChecked] = useState(false);
  const onChange = (e) => {
    setChecked(true);
    console.log("onchange", e.target.value);
  };

  const onDelete = async (id) => {
    let res = [];
    try {
      //const resp = await deleteAlertConf(id);
      //res = await getAlertConfList();
    } catch (error) {}
    populateConfList(selectedRecord, res);
  };

  useEffect(() => {
    if (selectedRecord && confForm) {
      populateForm(selectedRecord);
    }
  }, [selectedRecord, confForm]);

  const populateForm = (record) => {
    let temp = {
      alertId: record.id,
      name: record.alertname,
      lowerthreshold: "",
      upperthreshold: "",
      frequency: "",
      mailtype: "",
      tomailid: "",
      ccmailid: "",
      bccmailid: "",
      nrmailid: "",
      graphicsbody: "",
      sendonweekends: "",
      enablealert: "",
    };

    confForm?.setFieldsValue({ ...temp });
  };

  const onCancelModal = () => {
    confForm.resetFields();
    populateForm(selectedRecord);
    onCloseConf();
  };
  console.log(confForm.getFieldValue());
  const columns = [
    {
      title: "Edit",
      dataIndex: "",
      key: "1",
      render: (text, record, index) => (
        <>
          <a
            onClick={() => {
              onEdit(record);
            }}
          >
            <GrEdit />
          </a>
        </>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "2",
      render: (text, record, index) => (
        <>
          <a
            onClick={() => {
              onDelete(record.id);
            }}
          >
            {" "}
            <RiDeleteBin6Line />
          </a>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "3",
    },
    {
      title: "Lower Threshold %",
      dataIndex: "lowerthreshold",
      key: "4",
    },
    {
      title: "Upper Threshold %",
      dataIndex: "upperthreshold",
      key: "5",
    },
    {
      title: "Frequency",
      dataIndex: "frequencytype",
      key: "6",
    },
    {
      title: "Mail Type",
      dataIndex: "selectmailtype",
      key: "7",
    },
    {
      title: "To Email ID",
      dataIndex: "tomailid",
      key: "8",
    },
    {
      title: "CC Email ID",
      dataIndex: "ccmailid",
      key: "9",
    },
    {
      title: "BCC Email ID",
      dataIndex: "bccmailid",
      key: "10",
    },
    {
      title: "NR Email ID",
      dataIndex: "nrmailid",
      key: "11",
    },
    {
      title: "Graphic Body",
      dataIndex: "graphicbody",
      key: "12",
      render: (text, record, index) => <span> {text ? "True" : "False"}</span>,
    },
    {
      title: "Send on Holidays",
      dataIndex: "sendonholidays",
      key: "13",
      render: (text, record, index) => <span> {text ? "True" : "False"}</span>,
    },
    {
      title: "Enable Alert",
      dataIndex: "enablealert",
      key: "14",
      render: (text, record, index) => <span> {text ? "True" : "False"}</span>,
    },
  ];
  return (
    <>
      <Modal
        title="New Alert Configuration"
        centered
        open={confModal}
        // onOk={() => setOpenModel(false)}
        onCancel={() => onCloseConf()}
        footer={null}
        width={1000}
        // maskClosable={false}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onSubmit}
          style={{ maxWidth: 1000 }}
          form={confForm}
          validateMessages={"validateMessages"}
        >
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={11}>
              <Form.Item
                name={"name"}
                label="Name"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input className="form_input" value="TEST" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"lowerthreshold"}
                label="Lower Threshold (%)"
                labelCol={{ span: 13 }}
                wrapperCol={{ span: 8 }}
              >
                <Input className="form_input" value="test" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={11}>
              <Form.Item
                name={"frequencytype"}
                label="Frequency"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Select
                  placeholder="Frequency"
                  onChange={() => {}}
                  size="large"
                  style={{ width: "100%" }}
                  options={["Daily", "Weekly", "Monthly"].map(
                    (item, index) => ({
                      value: item,
                      label: item,
                      key: index,
                    })
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"upperthreshold"}
                label="Upper Threshold (%)"
                labelCol={{ span: 13 }}
                wrapperCol={{ span: 8 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"selectmailtype"}
                label="Mail Type"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
              >
                <Select
                  placeholder="Mail Type"
                  // value={selectedItems}
                  onChange={() => {}}
                  size="large"
                  style={{ width: "100%" }}
                  options={[
                    "Target Energy Text Email",
                    "Target Energy Chart Email",
                    "Target Energy Text YTD Chart Email",
                  ].map((item, index) => ({
                    value: item,
                    label: item,
                    key: index,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={11}>
              <Form.Item
                name={"tomailid"}
                label="To Mail iD's"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <textarea className="label_2" rows={3} cols={32}></textarea>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"ccmailid"}
                label="CC Mail ID's:"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
              >
                <textarea className="label_2" rows={3} cols={36}></textarea>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={11}>
              <Form.Item
                name={"bccmailid"}
                label="BCC Mail iD's"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <textarea className="label_2" rows={3} cols={32}></textarea>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"nrmailid"}
                label="NR Mail ID's:"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}

                // rules={[{ required: "" }]}
              >
                <textarea className="label_2" rows={3} cols={36}></textarea>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginLeft: 100 }}>
            <Col span={8}>
              <Form.Item name={"graphicbody"} valuePropName={"checked"}>
                <Checkbox
                  onChange={(e) => {
                    confForm.setFieldValue(
                      "graphicbody",
                      e.target.checked || false
                    );
                  }}
                >
                  Graphic Body
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"sendonholidays"} valuePropName={"checked"}>
                <Checkbox
                  onChange={(e) => {
                    confForm.setFieldValue(
                      "sendonholidays",
                      e.target.checked || false
                    );
                  }}
                >
                  Send on Weekends & Holidays
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"enablealert"} valuePropName={"checked"}>
                <Checkbox
                  onChange={(e) => {
                    confForm.setFieldValue(
                      "enablealert",
                      e.target.checked || false
                    );
                  }}
                >
                  Enable Alert
                </Checkbox>
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
                htmlType="button"
                onClick={() => onCancelModal()}
              >
                Cancel
              </Button>
            </Row>
          </Form.Item>
        </Form>

        <Table
          columns={columns}
          dataSource={confList}
          rowKey={"id"}
          scroll={{
            x: 1000,
          }}
        />
      </Modal>
    </>
  );
}

export default AlertConfiguration;
