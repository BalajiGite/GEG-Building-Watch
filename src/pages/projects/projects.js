import React, { useState } from "react";
import { Spin, Divider, Select } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal } from "antd";
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
import { FcCalendar } from "react-icons/fc";
import { GrTarget } from "react-icons/gr";
import { getApiDataFromAws, postApiDataToAws } from "../../services/apis";
import {
  addBuilding,
  deleteBuilding,
  editBuilding,
  getBuildingList,
} from "../../services/buildingService";
import HolidayConf from "./HolidayConf";
import TargetConf from "./TargetConf";
import NebersRate from "../NebersRate";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

function Building() {
  const [openHoliday, setOpenHoliday] = useState(false);
  const [openTarget, setOpenTarget] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

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

  const onCancelModal = () => {
    setOpen(false);
    setBuildingId();
    form.resetFields();
  };

  const handleHoliday = () => {
    setOpenHoliday(true);
  };
  const handleTarget = () => {
    // console.log('handleTarget')
    setOpenTarget(true);
  };
  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "1",
      sorter: (a, b) => a.projectName - b.projectName,
      filters: [
        {
          text: "Type 1",
          value: "Amour",
        },
        {
          text: "Type 2",
          value: "type 1",
        },
        {
          text: "Type 3",
          value: "type",
        },
      ],
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.projectName.startsWith(value),
    },
    {
      title: "Project Type",
      dataIndex: "projectType",
      key: "2",
      sorter: (a, b) => a.projectType - b.projectType,
      filters: [
        {
          text: "Type 1",
          value: "Amour",
        },
        {
          text: "Type 2",
          value: "type 1",
        },
        {
          text: "Type 3",
          value: "type",
        },
      ],
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.projectType.startsWith(value),
    },
    {
      title: "Project No.",
      dataIndex: "projectNo",
      key: "3",
      sorter: (a, b) => a.projectNo - b.projectNo,
      filters: [
        {
          text: "Type 1",
          value: "Amour",
        },
        {
          text: "Type 2",
          value: "type 1",
        },
        {
          text: "Type 3",
          value: "type",
        },
      ],
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.projectNo.startsWith(value),
    },
    {
      title: "Building Name",
      dataIndex: "buildingName",
      key: "4",
      sorter: (a, b) => a.buildingName - b.buildingName,
      filters: [
        {
          text: "Type 1",
          value: "Amour",
        },
        {
          text: "Type 2",
          value: "type 1",
        },
        {
          text: "Type 3",
          value: "type",
        },
      ],
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.buildingName.startsWith(value),
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "5",
      sorter: (a, b) => a.area - b.area,
      filters: [
        {
          text: "Type 1",
          value: "Amour",
        },
        {
          text: "Type 2",
          value: "type 1",
        },
        {
          text: "Type 3",
          value: "type",
        },
      ],
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.area.startsWith(value),
    },
    {
      title: "Street",
      dataIndex: "street",
      key: "6",
      sorter: (a, b) => a.street - b.street,
      filters: [
        {
          text: "Type 1",
          value: "Amour",
        },
        {
          text: "Type 2",
          value: "type 1",
        },
        {
          text: "Type 3",
          value: "type",
        },
      ],
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.street.startsWith(value),
    },
    {
      title: "PostCode",
      dataIndex: "postcode",
      key: "7",
      sorter: (a, b) => a.postcode - b.postcode,
      filters: [
        {
          text: "Type 1",
          value: "Amour",
        },
        {
          text: "Type 2",
          value: "type 1",
        },
        {
          text: "Type 3",
          value: "type",
        },
      ],
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.postcode.startsWith(value),
    },
    {
      title: "Zone",
      dataIndex: "zone",
      key: "8",
      sorter: (a, b) => a.zone - b.zone,
      filters: [
        {
          text: "Type 1",
          value: "Amour",
        },
        {
          text: "Type 2",
          value: "type 1",
        },
        {
          text: "Type 3",
          value: "type",
        },
      ],
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.zone.startsWith(value),
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "9",
    },
    {
      title: "Holidays",
      dataIndex: "holidays",
      key: "10",
      render: (text, record) => (
        <a onClick={() => handleHoliday()}>
          <FcCalendar />{" "}
        </a>
      ),
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "11",
      render: (text, record) => (
        <a onClick={() => handleTarget()}>
          {" "}
          <GrTarget />{" "}
        </a>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "12",
      render: (text, record) => <NebersRate />,
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: "Type 1",
          value: "Amour",
        },
        {
          text: "Type 2",
          value: "type 1",
        },
        {
          text: "Type 3",
          value: "type",
        },
      ],
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.rating.startsWith(value),
    },
    {
      title: "Alert",
      dataIndex: "alert",
      key: "13",
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "14",
      render: (text, record, index) => (
        <>
          <a
            onClick={() => {
              onEdit(record);
            }}
          >
            EDIT
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              onDelete(record.id);
            }}
          >
            DELETE
          </a>
        </>
      ),
    },
  ];

  const [post, setPost] = useState({});
  const [tempData, setTempData] = useState();
  const [loading, setloading] = useState(true);
  const [buildingId, setBuildingId] = useState();
  const [searchText, setSearchText] = useState();

  let data = [];
  const getData = async () => {
    setIsLoading(true);
    try {
      const resp = await getBuildingList();
      setPost(resp);
      setTempData(resp);
      setloading(false);
      setIsLoading(false);
    } catch (error) {}
  };
  const setData = async (formData) => {
    try {
      if (buildingId) {
        const resp = await editBuilding(buildingId, formData);
      } else {
        const resp = await addBuilding(formData);
      }
      onCancelModal();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    try {
      const resp = await deleteBuilding(id);
      getData();
    } catch (error) {}
  };

  const onEdit = async (record) => {
    form.setFieldsValue(record);
    setBuildingId(record.id);
    setOpen(true);
  };

  const onChangeText = (text) => {
    setSearchText(text);
    filter(text);
    if (text === "" || !text) {
      setPost(post);
    }
  };

  const filter = (text) => {
    const filterData = data.filter(
      (record) =>
        record.projectName.toLowerCase().includes(text.toLowerCase()) ||
        record.projectType.toLowerCase().includes(text.toLowerCase()) ||
        record.projectNo.toString().includes(text.toLowerCase()) ||
        record.buildingName.toLowerCase().includes(text.toLowerCase()) ||
        record.area.toLowerCase().includes(text.toLowerCase()) ||
        record.street.toLowerCase().includes(text.toLowerCase()) ||
        record.postcode.toString().includes(text.toLowerCase()) ||
        record.zone.toLowerCase().includes(text.toLowerCase()) ||
       record.region.toLowerCase().includes(text.toLowerCase()) ||
        record.alert.toLowerCase().includes(text.toLowerCase())
    );
    setTempData(filterData);
  };

  data = loading ? [] : post;

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    
      <Button className="mb-5" type="primary" onClick={() => setOpen(true)}>
        Create New
      </Button>
      <Row>
        <Col span={17}>
          
        </Col>
        
        <Col span={7} style={{ marginBottom: 10}}>
        
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
        title="Create New Buildings"
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
                name={"projectName"}
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
                name={"projectType"}
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
            <Col span={24}>
              <Form.Item
                name={"projectNo"}
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
            <Col span={11}>
              <Form.Item
                name={"buildingName"}
                label="Building Name"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"area"}
                label="Area"
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
                name={"street"}
                label="Street"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"postcode"}
                label="Postcode"
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
                name={"zone"}
                label="Zone"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"region"}
                label="Region"
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
                name={"holidays"}
                label="Holidays"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"target"}
                label="Target"
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
                name={"rating"}
                label="Rating"
                // rules={[{ required: "" }]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"alert"}
                label="Alert"
                // rules={[{ required: "" }]}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
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
                htmlType=""
                onClick={() => onCancelModal()}
              >
                Cancel
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={tempData}
          rowKey={"id"}
          scroll={{
            x: 1000,
          }}
        />
        {/* <TargetConf/> */}
      </Spin>
      <TargetConf setOpenTarget={setOpenTarget} openTarget={openTarget} />
      <HolidayConf setOpenHoliday={setOpenHoliday} openHoliday={openHoliday} />
    </>
  );
}

export default Building;
