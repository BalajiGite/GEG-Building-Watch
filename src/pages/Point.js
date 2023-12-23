import "reactjs-popup/dist/index.css";
import React, { useState } from "react";
import { Spin, Divider, Select } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal } from "antd";
import { useEffect } from "react";
import { getApiDataFromAws } from "../services/apis";
import {
  addSites,
  deleteSites,
  editSites,
  getSitesList,
} from "../services/sitesService";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function Point() {
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pointData, setPointData] = useState({});
  const [loading, setloading] = useState(true);
  const [SitesId, setSitesId] = useState();
  const [point, setPoint] = useState([]);
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();
  // const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const validateMessages = {
    required: "${label} is required",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onCancelModal = () => {
    setOpen(false);
    setSitesId();
    form.resetFields();
  };

  
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "1",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "2",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Geg Point Type",
      dataIndex: "gegPointType",
      key: "3",
      sorter: (a, b) => a.gegPointType.localeCompare(b.gegPointType),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "4",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
    },
    {
      title: "Import",
      dataIndex: "import",
      key: "5",
      sorter: (a, b) => a.import.localeCompare(b.import),
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "6",
      sorter: (a, b) => a.active.localeCompare(b.active),
    },
    {
      title: "Elec",
      dataIndex: "elec",
      key: "7",
      sorter: (a, b) => a.elec.localeCompare(b.elec),
    },
    {
      title: "Sensor",
      dataIndex: "sensor",
      key: "8",
      sorter: (a, b) => a.sensor.localeCompare(b.sensor),
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "9",
      sorter: (a, b) => a.point.localeCompare(b.point),
    },
    {
      title: "Energy",
      dataIndex: "energy",
      key: "10",
      sorter: (a, b) => a.energy.localeCompare(b.energy),
    },
    {
      title: "Nem12Id",
      dataIndex: "nem12Id",
      key: "11",
      sorter: (a, b) => a.nem12Id.localeCompare(b.nem12Id),
    },
    {
      title: "EquipRef",
      dataIndex: "equipRef",
      key: "12",
      sorter: (a, b) => a.equipRef.localeCompare(b.equipRef),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "13",
      render: (text, record, index) => (
        <>
          <a onClick={() => onEdit(record)}>EDIT</a>
          <Divider type="vertical" />
          <a onClick={() => onDelete(record.id)}>DELETE</a>
        </>
      ),
    },
    // Add more columns as needed
  ];
  
  // Use the 'columns' array in your component
  console.log(columns);
  

  const getData = async () => {
    setIsLoading(true);
    try {
      
      const points = await getApiDataFromAws("queryType=elecPoints");
      setPointData(points);
      setPoint(points);
      setloading(false);
      setIsLoading(false);
    } catch (error) {}
  };
  const setData = async (formData) => {
    try {
      if (SitesId) {
        const resp = await editSites(SitesId, formData);
      } else {
        const resp = await addSites(formData);
      }
      onCancelModal();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    try {
      const res = await deleteSites(id);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = async (record) => {
    form.setFieldValue(record);
    setSitesId(record.id);
    setOpen(true);
  };

  const onChangeText = async (text) => {
    setSearchText(text);
    filter(text);
    if (text === "" || !text) {
      setPointData(pointData);
    }
  };

  const filter = (text) => {
    const filteredData = point.filter(
      (record) =>
        record.name.toLowerCase().includes(text.toLowerCase()) ||
        record.area.toLowerCase().includes(text.toLowerCase()) ||
        record.projId.toString().includes(text.toLowerCase()) ||
        record.stateRef.toLowerCase().includes(searchText.toLowerCase()) ||
        record.regionRef.toLowerCase().includes(searchText.toLowerCase()) ||
        record.weatherStationRef
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        record.armsProj.toLowerCase().includes(searchText.toLowerCase())
    );
    setPoint(filteredData);
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
        style={{ textAlign: "left", backgroundColor: "#001629" }}
        title="Add New Sites"
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
                name={"name"}
                label="Site Name"
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
                name={"site"}
                label="Site ID"
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
                name={"area"}
                label="Area"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"armsProj"}
                label="Arms Prj"
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
                name={"armsProjectId"}
                label="Arms Proj ID"
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
                name={"projId"}
                label="Select Proj ID"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                // rules={[{ required: "" }]}
              >
                <Select
                  placeholder="Select Project"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                >
                  {point.map((item, index) => (
                    <Select.Option key={index} value={item.projId}>
                      {item.projId}
                    </Select.Option>
                  ))}
                </Select>
                {/* <Input className="form_input" /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"tz"}
                label="Select TZ"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                // rules={[{ required: "" }]}
              >
                <Select
                  placeholder="Select TZ"
                  style={{ width: "100%" }}
                  value={selectedItems}
                  onChange={setSelectedItems}
                >
                  {point.map((item, index) => (
                    <Select.Option key={index} item={item.tz}>
                      {item.tz}
                    </Select.Option>
                  ))}
                </Select>

                {/* <Input className="form_input" /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"observesHolidays"}
                label="Select Observe Holidays"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                // rules={[{required:""}]}
              >
                <Select
                  placeholder="Select Observe Holidays"
                  size="large"
                  style={{ width: "100%" }}
                  value={selectedItems}
                  onChange={setSelectedItems}
                >
                  {point.map((item, index) => (
                    <Select.Option key={index} item={item.observesHolidays}>
                      {item.observesHolidays}
                    </Select.Option>
                  ))}
                </Select>
                {/* <Input className="form_input" /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"regionRef"}
                label="Select Region ID"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                // rules={[{required:""}]}
              >
                <Select
                  placeholder="Select Region ID"
                  value={selectedItems}
                  onChange={setSearchText}
                  style={{ width: "100%" }}
                >
                  {point.map((item, index) => (
                    <Select.Option key={index} item={item.regionRef}>
                      {item.regionRef}
                    </Select.Option>
                  ))}
                </Select>
                {/* <Input className="form_input" /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"geoCountry"}
                label="Select Geo Country"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                // rules={[{required:""}]}
              >
                <Select
                  placeholder="Select Geo Country"
                  value={selectedItems}
                  onChange={setSearchText}
                  style={{ width: "100%" }}
                >
                  {point.map((item, index) => (
                    <Select.Option key={index} item={item.geoCountry}>
                      {item.geoCountry}
                    </Select.Option>
                  ))}
                </Select>
                {/* <Input className="form_input" /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"geoAddress"}
                label="Geo Address"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                // rules={[{required:""}]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={""}
                label="Help"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                // rules={[{required:""}]}
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
              <Col span={20} style={{ display: "flex", justifyContent: "end" }}>
                <Button type="" htmlType="" onClick={() => onCancelModal()}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  style={{ marginLeft: 10 }}
                  htmlType="submit"
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={point}
          rowKey={"id"}
          scroll={{
            x: 1000,
          }}
        />
      </Spin>
    </>
  );
}
