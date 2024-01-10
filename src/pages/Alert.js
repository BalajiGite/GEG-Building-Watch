import React, { useState, useRef } from "react";
import { Spin, Divider, Select, Tooltip } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal, Popover, ConfigProvider } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
import { getAlertConfList } from "../services/alertConfService";
import { getApiDataFromAws, postAlertsApiDataToAws, getConfigDataFromAws } from "../services/apis";
// import { AlertTabeWidget } from "../components/widgets/AlertTableswidgest/AlertTable"
import {
  addAlerts,
  deleteAlerts,
  editAlerts,
  getAlertsList,
} from "../services/alertsService";
import { RiDeleteBin6Line } from "react-icons/ri";
import AlertModel from "./AlertConfiguration";
import spinnerjiff from "../assets/images/loader.gif";
// import { showalertscolumns } from "../components/widgets/AlertTableswidgest/AlertTable"
import { buildQueries } from "@testing-library/react";

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
  const [tempData, setTempData] = useState([]);
  const [confModal, setConfModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confList, setConfList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState();
  const [searchText, setSearchText] = useState();
  const [alertListData, setAlertListData] = useState([]);
  const [post, setPost] = useState([]);
  const [loading, setloading] = useState(true);
  const [AlertsId, setAlertsId] = useState();
  const [active, setActive] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState();
  const [showalertsData, setShowAlertsData] = useState([]);
  const [btnValues, setbtnValue] = useState(0);
  const [form] = Form.useForm();
  const Id = useRef(1);
  // const [confForm] = Form.useForm();
  const screenHeight = window.innerHeight - 340;

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
    // debugger;
    try {
      resp = await getAlertConfList();
    } catch (error) { }

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

  const DynamicColumns = (data) => {
    let dynamicColumns = [];
    if (data.some(item => item.alertconfigurationid)) {
      dynamicColumns.push(
        {
          title: "Alert Configuration Id",
          dataIndex: "alertconfigurationid",
          key: "1",
          width: 300,
          ellipsis: true,
          sorter: (a, b) => a.id.localeCompare(b.id),

        })
    }

    if (data.some(item => item.startdate)) {
      dynamicColumns.push(
        {
          title: "Start Date",
          dataIndex: "startdate",
          key: "6",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.armsProjectId.localeCompare(b.armsProjectId),
        }
      )
    }

    if (data.some(item => item.enddata)) {
      dynamicColumns.push(
        {
          title: "End Date",
          dataIndex: "enddate",
          key: "7",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.tz.localeCompare(b.tz),
        }
      )
    }

    if (data.some(item => item.emailsendtime)) {
      dynamicColumns.push(
        {
          title: "Email Send Time",
          dataIndex: "emailsendtime",
          key: "9",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.observesHolidays.localeCompare(b.observesHolidays),
        }
      )
    }
    if (data.some(item => item.rangeconsumption)) {
      dynamicColumns.push(
        {
          title: "Range Consumption",
          dataIndex: "rangeconsumption",
          key: "10",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.geoCountry.localeCompare(b.geoCountry),

        }
      )
    }
    if (data.some(item => item.rangetarget)) {
      dynamicColumns.push(
        {
          title: "Range Target",
          dataIndex: "rangetarget",
          key: "11",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.geoAddress.localeCompare(b.geoAddress),
        }
      )
    }
    if (data.some(item => item.ytdconsumption)) {
      dynamicColumns.push(
        {
          title: "Ytd Consumption",
          dataIndex: "ytdconsumption",
          key: "12",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.long.localeCompare(b.long),
        },
      )
    }
    if (data.some(item => item.ytdtarget)) {
      dynamicColumns.push(
        {
          title: "Ytd Target",
          dataIndex: "ytdtarget",
          key: "13",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.lat.localeCompare(b.lat),
        },
      )
    }
    return dynamicColumns;
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "0",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Site Name",
      dataIndex: "sitename",
      key: "1",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.sitename.localeCompare(b.sitename),
      filters: Array.from(new Set(post.map(item => item.sitename))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.sitename.startsWith(value),
    },
    {
      title: "Utility Type",
      dataIndex: "utilitytype",
      key: "2",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.utilitytype.localeCompare(b.utilitytype),
      filters: Array.from(new Set(post.map(item => item.utilitytype))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.utilitytype.startsWith(value),
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "3",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.project.localeCompare(b.project),
      filters: Array.from(new Set(post.map(item => item.project))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.project.startsWith(value),
    },
    {
      title: "Report Type",
      dataIndex: "reporttype",
      key: "4",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.reporttype.localeCompare(b.reporttype),
      filters: Array.from(new Set(post.map(item => item.reporttype))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.reporttype.startsWith(value),
    },
    {
      title: "Frequency",
      dataIndex: "freq",
      key: "5",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.freq.localeCompare(b.freq),
      filters: Array.from(new Set(post.map(item => item.freq))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.freq.startsWith(value),
    },
    {
      title: "Timezone",
      dataIndex: "tz",
      key: "6",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.tz.localeCompare(b.tz),
      filters: Array.from(new Set(post.map(item => item.tz))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.tz.startsWith(value),
    },
    {
      title: "Recipient Emails",
      dataIndex: "recipientemails",
      key: "7",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.recipientemails.localeCompare(b.recipientemails),
      filters: Array.from(new Set(post.map(item => item.recipientemails))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.recipientemails.startsWith(value),
      render: (text) => (
        <Tooltip title={text}>
          <span>{text.length > 18 ? `${text.slice(0, 18)}...` : text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Error Emails",
      dataIndex: "erroremails",
      key: "8",
      width: 200,

      Ellipsis: true,
      sorter: (a, b) => a.erroremails.localeCompare(b.erroremails),
      filters: Array.from(new Set(post.map(item => item.erroremails))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.erroremails.startsWith(value),
      render: (text) => (
        <Tooltip title={text}>
          <span>{text.length > 18 ? `${text.slice(0, 18)}...` : text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Is Active",
      dataIndex: "isactive",
      key: "9",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.isactive - b.isactive,
      filters: Array.from(new Set(post.map(item => item.isactive))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.isactive.startsWith(value),
    },

    ...DynamicColumns(showalertsData),
    // btnValues !==0?null:
    {
      title: "Actions",
      dataIndex: "actions",
      key: "14",
      width: 200,
      Ellipsis: true,
      render: (text, record, index) => (
        <>
          <ConfigProvider>
            <Popover placement="bottomLeft" content={() => content(record)}>
              <EllipsisOutlined style={{ fontSize: "30px" }} />
            </Popover>
          </ConfigProvider>
        </>
      ),
    },
  ];

  let data = [];
  const getData = async () => {
    setIsLoading(true);
    try {

      const body = {
        funcName: "getAlertConfigurationsData",
      };
      const alertsData = await postAlertsApiDataToAws(body);
      const alertList = await getApiDataFromAws("queryType=dropdownSite");
      const AlertConfigurationData = await getConfigDataFromAws("dropdownSite");
      console.log("hiii", AlertConfigurationData)
      setAlertListData(alertList);
      console.log(alertList);
      const resp = await getAlertsList();
      setPost(alertsData);

      setTempData(alertsData);
      setloading(false);
      setIsLoading(false);
    } catch (error) { }
  };

  const showAlert = async (id, buttonValue) => {
    try {
      const body = {
        funcName:
          buttonValue === 1 ? "getSuccessExecutionsForId"
            : buttonValue === 2 ? "getQueuedExecutionsForId"
              : buttonValue === 3 ? "getFailedExecutionsForId"
                : "",
        acId: id,
      }
      const alertsData = await postAlertsApiDataToAws(body);
      setShowAlertsData(alertsData);
      console.log("showing data", alertsData);
    } catch (error) {
      console.log(error);
    }
  }

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
    } catch (error) { }
  };

  const onEdit = async (record) => {
    form.setFieldsValue(record);
    setAlertsId(record.id);
    setOpen(true);
  };

  data = loading ? [] : post;

  const content = (record) => (
    <>
      <a onClick={() => onEdit(record)} style={{ color: "white" }}>EDIT</a>
      <Divider type="horizontal" style={{ margin: "5px" }} />
      <a onClick={() => onDelete(record.id)} style={{ color: "white" }}>DELETE</a>
    </>
  )
  // const filter = (text) => {
  //   const filterData = data.filter((record) => {
  //     record.projectno.toString().includes(text.toString());
  //   });
  //   setTempData(filterData);
  // };

  const filter = (text) => {
    const filterData = data.filter(
      (record) =>
        record.sitename.toLowerCase().includes(text.toLowerCase()) ||
        record.utilitytype.toString().includes(text.toLowerCase()) ||
        record.project.toLowerCase().includes(text.toLowerCase()) ||
        record.reporttype.toLowerCase().includes(text.toLowerCase()) ||
        record.freq.toLowerCase().includes(text.toLowerCase()) ||
        record.tz.toLowerCase().includes(text.toLowerCase()) ||
        record.recipientemails.toString().includes(text.toLowerCase()) ||
        record.erroremails.toLowerCase().includes(text.toLowerCase())

    );
    setPost(filterData);
  };
  const onChangeText = (text) => {
    // console.log(text);
    setSearchText(text);
    filter(text);
    if (text === "" || !text) {
      setPost(tempData);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const showModal = async (btnValue) => {
    showAlert(Id.current, btnValue);
    setbtnValue(btnValue);
    setOpenModal(true);
  }


  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };


  let elementbutton = (
    <>
      <button className="custom-button" type="button" onClick={() => showModal(1)}>
        Show Sent Alert
      </button>
      <button className="custom-button" type="button" onClick={() => showModal(2)}
        style={{ marginLeft: "4px", marginRight: "4px" }}
      >Show Queued Alerts</button>
      <button className="custom-button" type="button" onClick={() => showModal(3)}>
        Show Failed Alerts
      </button>
    </>);


  const clickEventAlert = (RowId) => {
    Id.current = RowId;
    setAlert(elementbutton);
    setActive(RowId)
  }
  return (
    <>
      <Modal title={btnValues === 1 ? "Show Sent Alert" : btnValues === 2 ? "Show Queued Alert" : "Show Failed Alert"}
        width="70%"
        open={openModal} onOk={handleOk}
        onCancel={handleCancel}>
        <Table
          dataSource={showalertsData}
          columns={columns}
          size="large"
          rowKey={"id"}
          scroll={{
            x: 1000,
            y: 300
          }}
        />;
      </Modal>

      {" "}
      <Row>
        <Col span={3}>
          <button className="mb-5 custom-button" type="primary" onClick={() => setOpen(true)}>
            Add New Alert
          </button>
        </Col>
        <Col span={15}>{alert}</Col>
        <Col span={6} style={{ marginBottom: 10 }}>
          <Input
            size="small"
            placeholder="search here ..."
            value={searchText}
            onChange={(e) => onChangeText(e.target.value)}
            className="custom-input"
          />
        </Col>
      </Row>
      <Modal
        style={{ textAlign: "left" }}
        title="Add New Alerts"
        centered
        open={open}
        onCancel={() => onCancelModal()}
        width={700}
        footer={null}
        maskClosable={false}
      >
        <Form
          {...layout}
          name="nest-messages"
          layout="vertical"
          onFinish={setData}
          style={{ maxWidth: 1000 }}
          form={form}
          validateMessages={validateMessages}
        >
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"sitename"}
                label="Select Site Name"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
              // rules={[{ required: "" }]}
              >
                <Select
                  placeholder="Select Site Name"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                >
                  {
                    post.map((item, index) => (
                      <Select.Option key={index} item={item.id}>{item.name}</Select.Option>
                    ))
                  }
                </Select>

              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"utilitytype"}
                label="Select Utility Type"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
              // rules={[{ required: "" }]}
              >
                <Select
                  placeholder="Select Utility Type"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                >
                  {
                    [...new Set(post.map(item => item.utilitytype))].map((item, index) => (
                      <Select.Option key={index} value={item}>{item}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"reporttype"}
                label="Select Report Type"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  placeholder="Select Report Type"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}

                >
                  {
                    [...new Set(post.map(item => item.reporttype))].map((item, index) => (
                      <Select.Option key={index} value={item}>{item}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"tz"}
                label="Select tz"
                // labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
              // rules={[{ required: "" }]}
              >
                <Select
                  placeholder="Select Report Type"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}

                >
                  {[...new Set(post.map(item => item.tz))].map((item, index) => (
                    <Select.Option key={index} value={item}>{item}</Select.Option>
                  ))}
                </Select>

              </Form.Item>
            </Col>

          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"recipientemails"}
                label="Recipients Emails"
                // labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
              // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name={"erroremails"}
                label="Error Emails"
                // labelCol={{ span: 5 }}
                wrapperCol={{ span: 24 }}

              // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"isactive"}
                label="Is Active"
                // labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
              // rules={[{ required: "" }]}
              >
                <Select
                  placeholder="Is Active"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                >
                  {[...new Set(post.map(item => item.isactive))].map((item, index) => (
                    <Select.Option key={index} value={item}>{item ? "true" : "false"}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* 
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
          </Row> */}

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Row>
              <Col className="custom-modal-column" span={24}>
                <button type="primary" htmlType="cancel" className="custom-modal-button">
                  Cancel
                </button>
                <button
                  type=""
                  htmlType="submit"
                  onClick={() => onCancelModal()}
                >
                  Save
                </button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>{" "}
      <Spin spinning={isLoading} size="large" indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}>
        <Table
          onRow={(record) => ({
            onClick: () => clickEventAlert(record.id),
            style: { backgroundColor: record.id === active ? "#0A1016" : '' }

          })}
          columns={columns}
          dataSource={post}
          rowKey={"id"}
          scroll={{
            y: screenHeight,
            x: 1000
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
