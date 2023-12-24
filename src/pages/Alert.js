import React, { useState } from "react";
import { Spin, Divider, Select } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal } from "antd";
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
import { getAlertConfList } from "../services/alertConfService";
import { getApiDataFromAws, postAlertsApiDataToAws } from "../services/apis";
import {
  addAlerts,
  deleteAlerts,
  editAlerts,
  getAlertsList,
} from "../services/alertsService";
import { RiDeleteBin6Line } from "react-icons/ri";
import AlertModel from "./AlertConfiguration";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const FREQUENCY = ["Daily", "Weekly", "Monthly"];
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
function Alerts() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [tempData, setTempData] = useState();
  const [confModal, setConfModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confList, setConfList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState();
  const [searchText, setSearchText] = useState();
  const [form] = Form.useForm();
  // const [confForm] = Form.useForm();
  const filteredOptions = OPTIONS.filter((O) => !selectedItems.includes(O));
  const filteredFrequency = FREQUENCY.filter((O) => !selectedItems.includes(O));
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
  const [open, setOpen] = useState(false);
  // console.log(open);
  let resp = [];
  const onAlertClick = async (record) => {
    debugger;
    try {
      resp = await getAlertConfList();
    } catch (error) {}

    populateConfList(record, resp);
    setSelectedRecord(record);
    onOpenConf();
  };

  const populateConfList = (record, data) => {
    let alertConfigurations = [];
    alertConfigurations = data?.filter((item) => item.alertId === record.id);
    setConfList(alertConfigurations);
  };

  const onOpenConf = () => {
    setConfModal(true);
  };

  const onCloseConf = () => {
    setConfModal(false);
  };

  const onCancelModal = () => {
    setOpen(false);
    setAlertsId();
    form.resetFields();
  };
  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "0",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Site Name",
      dataIndex: "sitename",
      key: "1",
      sorter: (a, b) => a.sitename.localeCompare(b.sitename),
    },
    {
      title: "Utility Type",
      dataIndex: "utilitytype",
      key: "2",
      sorter: (a, b) => a.utilitytype.localeCompare(b.utilitytype),
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "3",
      sorter: (a, b) => a.project.localeCompare(b.project),
    },
    {
      title: "Report Type",
      dataIndex: "reporttype",
      key: "4",
      sorter: (a, b) => a.reporttype.localeCompare(b.reporttype),
    },
    {
      title: "Frequency",
      dataIndex: "freq",
      key: "5",
      sorter: (a, b) => a.freq.localeCompare(b.freq),
    },
    {
      title: "Timezone",
      dataIndex: "tz",
      key: "6",
      sorter: (a, b) => a.tz.localeCompare(b.tz),
    },
    {
      title: "Recipient Emails",
      dataIndex: "recipientemails",
      key: "7",
      sorter: (a, b) => a.recipientemails.localeCompare(b.recipientemails),
    },
    {
      title: "Error Emails",
      dataIndex: "erroremails",
      key: "8",
      sorter: (a, b) => a.erroremails.localeCompare(b.erroremails),
    },
    {
      title: "Is Active",
      dataIndex: "isactive",
      key: "9",
      sorter: (a, b) => a.isactive - b.isactive,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "14",
      render: (text, record, index) => (
        <>
          <a
            onClick={() => {
              onEdit(record.id);
            }}
            style={{ marginRight: 8 }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              onDelete(record.id);
            }}
          >
            Delete
          </a>
        </>
      ),
    },
  ];

  const [post, setPost] = useState({});
  const [loading, setloading] = useState(true);
  const [AlertsId, setAlertsId] = useState();

  let data = [];
  const getData = async () => {
    setIsLoading(true);
    try {

      const body = {
        funcName: "getAlertConfigurationsData"
      };
      const alertsData = await postAlertsApiDataToAws(body);
      const resp = await getAlertsList();
      // console.log(resp);
      setPost(alertsData);
      setTempData(alertsData);
      setloading(false);
      setIsLoading(false);
    } catch (error) {}
  };

  const setData = async (formData) => {
    try {
      if (AlertsId) {
        const resp = await editAlerts(AlertsId, formData);
      } else {
        const resp = await addAlerts(formData);
      }
      onCancelModal();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    try {
      const resp = await deleteAlerts(id);
      getData();
    } catch (error) {}
  };

  const onEdit = async (record) => {
    form.setFieldsValue(record);
    setAlertsId(record.id);
    setOpen(true);
  };

  data = loading ? [] : post;

  // const filter = (text) => {
  //   const filterData = data.filter((record) => {
  //     record.projectno.toString().includes(text.toString());
  //   });
  //   setTempData(filterData);
  // };

  const filter = (text) => {
    const filterData = data.filter(
      (record) =>
        record.projectname.toLowerCase().includes(text.toLowerCase()) ||
        record.projectno.toString().includes(text.toLowerCase()) ||
        record.projecttype.toLowerCase().includes(text.toLowerCase()) ||
        record.building.toLowerCase().includes(text.toLowerCase()) ||
        record.asset.toLowerCase().includes(text.toLowerCase()) ||
        record.monitorpoint.toLowerCase().includes(text.toLowerCase()) ||
        record.measure.toString().includes(text.toLowerCase()) ||
        record.alertname.toLowerCase().includes(text.toLowerCase()) ||
        record.lowerthreshold.toLowerCase().includes(text.toLowerCase()) ||
        record.upperthreshold.toLowerCase().includes(text.toLowerCase()) ||
        record.frequencytype.toLowerCase().includes(text.toLowerCase())
    );
    setTempData(filterData);
  };
  const onChangeText = (text) => {
    // console.log(text);
    setSearchText(text);
    filter(text);
    if (text === "" || !text) {
      setPost(post);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {" "}
      <Button className="mb-5" type="primary" onClick={() => setOpen(true)}>
        Create New
      </Button>
      <Row>
        <Col span={17}></Col>

        <Col span={7} style={{ marginBottom: 10 }}>
          <Input
            size="small"
            placeholder="search here ..."
            value={searchText}
            onChange={(e) => onChangeText(e.target.value)}
          />
        </Col>
      </Row>
      <Modal
        style={{ textAlign: "left" }}
        title="Create New Alerts"
        centered
        open={open}
        onCancel={() => onCancelModal()}
        width={1000}
        footer={null}
        maskClosable={false}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={setData}
          style={{ maxWidth: 1000 }}
          form={form}
          validateMessages={validateMessages}
        >
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"projectno"}
                label="Project No"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"projectname"}
                label="Project Name"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"projecttype"}
                label="Project Types"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
              >
                <Select
                  placeholder="Select Project"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                  options={filteredOptions.map((item, index) => ({
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
                name={"building"}
                label="Building"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"asset"}
                label="Asset"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}

                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={11}>
              <Form.Item
                name={"monitorpoint"}
                label="Monitor Point"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"measure"}
                label="Measure"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}

                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={11}>
              <Form.Item
                name={"lowerthreshold"}
                label="Lower Threshold (%)"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"alertname"}
                label="Alert Name"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={11}>
              <Form.Item
                name={"upperthreshold"}
                label="Upper Threshold (%)"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"frequencytype"}
                label="Frequency"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Select
                  placeholder="Frequency"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                  options={filteredFrequency.map((item, index) => ({
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
                name={"active"}
                label="Active"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"demand"}
                label="On Demand"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}

                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
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
      </Modal>{" "}
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={tempData}
          rowKey={"id"}
          scroll={{
            x: 1000,
          }}
        />
      </Spin>
      <AlertModel
        onOpenConf={onOpenConf}
        onCloseConf={onCloseConf}
        confModal={confModal}
        // confForm={confForm}
        confList={confList}
        setSelectedRecord={setSelectedRecord}
        selectedRecord={selectedRecord}
        setConfList={setConfList}
        populateConfList={populateConfList}
      />
    </>
  );
}

export default Alerts;
