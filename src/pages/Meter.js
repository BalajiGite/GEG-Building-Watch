import React, { useState } from "react";
import { Spin, Divider, Select, Radio } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal, Popover, ConfigProvider } from "antd";
import "reactjs-popup/dist/index.css";
import { EllipsisOutlined } from "@ant-design/icons";
import { useEffect } from "react";

import { getApiDataFromAws, postApiDataToAws } from "../services/apis";
import {
  addMeter,
  deleteMeter,
  editMeter,
  getMeterList,
} from "../services/meterService";
import { Item } from "devextreme-react/accordion";
import spinnerjiff from "../assets/images/loader.gif";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

function Meter() {
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meters, setMeters] = useState([]);
  const [loading, setloading] = useState(true);
  const [MeterId, setMeterId] = useState();
  const [tempData, setTempData] = useState({})
  const [form] = Form.useForm();
  const [activeButton, setActiveButton] = useState(1)
  const screenHeight = window.innerHeight - 340;

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
    setMeterId();
    form.resetFields();
  };

  const MeterChangeData = (changeTableData) => {
    setActiveButton(changeTableData)
    getData(changeTableData);
  }
  const DynamicColumns = (data) => {
    let dynamicColumns = [];
    if (data.some(item => item.elec)) {
      dynamicColumns.push(
        {
          title: "Electricity",
          dataIndex: "elec",
          key: "electricity",
          width: 200,
          Ellipsis: true,
          sorter: (a, b) => a.elec.localeCompare(b.elec),
          filter: Array.from(new Set(meters.map(item => item.elec))).map((electricity, index) => ({
            text: electricity,
            value: electricity
          })),
          filterMode: "tree",
          filterSearch: true,
          onFilter: (value, record) => record.elec.startsWith(value),

        })
    }

    return dynamicColumns;
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "1",
      width: 300,
      Ellipsis: true,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "2",
      width: 250,
      Ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: Array.from(new Set(meters.map(item => item.name))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: "Equip",
      dataIndex: "equip",
      key: "3",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.equip.localeCompare(b.equip),
      filters: Array.from(new Set(meters.map(item => item.equip))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.equip.startsWith(value),
    },
    ...DynamicColumns(meters),
    {
      title: "Gate Meter",
      dataIndex: "gateMeter",
      key: "5",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.gateMeter.localeCompare(b.gateMeter),
      filters: Array.from(new Set(meters.map(item => item.gateMeter))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.gateMeter.startsWith(value),
    },
    {
      title: "GEG Equipment Type",
      dataIndex: "gegEquipType",
      key: "6",
      width: 250,
      Ellipsis: true,
      sorter: (a, b) => a.gegEquipType.localeCompare(b.gegEquipType),
      filters: Array.from(new Set(meters.map(item => item.gegEquipType))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.gegEquipType.startsWith(value),
    },
    {
      title: "GEG Nabers Inclusion Percent",
      dataIndex: "gegNabersInclusionPercent",
      key: "7",
      width: 300,
      Ellipsis: true,
      sorter: (a, b) => a.gegNabersInclusionPercent - b.gegNabersInclusionPercent,
      filters: Array.from(new Set(meters.map(item => item.gegNabersInclusionPercent))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.gegNabersInclusionPercent.startsWith(value),
    },
    {
      title: "Level Reference",
      dataIndex: "levelRef",
      key: "8",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.levelRef.localeCompare(b.levelRef),
      filters: Array.from(new Set(meters.map(item => item.levelRef))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.levelRef.startsWith(value),
    },
    {
      title: "Meter",
      dataIndex: "meter",
      key: "9",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.meter.localeCompare(b.meter),
      filters: Array.from(new Set(meters.map(item => item.meter))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.meter.startsWith(value),
    },
    {
      title: "Site Reference",
      dataIndex: "siteRef",
      key: "10",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.siteRef.localeCompare(b.siteRef),
      filters: Array.from(new Set(meters.map(item => item.siteRef))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.siteRef.startsWith(value),
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "18",
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
  const getData = async (changeTableData) => {
    setIsLoading(true);
    // debugger
    try {
      const resp = await getMeterList();
      let meterData = [];
      if (changeTableData === 1) {
        meterData = await getApiDataFromAws("queryType=elecMeters");
      }
      else if (changeTableData === 2) {
        meterData = await getApiDataFromAws("queryType=waterMeters");
      }
      else if (changeTableData === 3) {
        meterData = await getApiDataFromAws("queryType=gasMeters");
      }
      setMeters(meterData);
      setTempData(meterData)
      setloading(false);
      setIsLoading(false);
    } catch (error) { }
  };

  const setData = async (formData) => {
    try {
      if (MeterId) {
        const resp = await editMeter(MeterId, formData);
      } else {
        const resp = await addMeter(formData);
      }
      onCancelModal();
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    try {
      const resp = await deleteMeter(id);
      getData();
    } catch (error) { }
  };

  const onEdit = async (record) => {
    form.setFieldsValue(record);
    setMeterId(record.id);
    setOpen(true);
  };

  const content = (record) => (
    <>
      <a onClick={() => onEdit(record)} style={{color:"white"}}>EDIT</a>
      <Divider type="horizontal" style={{ margin: "5px" }} />
      <a onClick={() => onDelete(record.id)} style={{color:"white"}}>DELETE</a>
    </>
  )

  data = loading ? [] : meters;

  const onChangeText = (text) => {
    setSearchText(text);
    filterData(text)
    if (text == "" || !text) {
      setMeters(tempData);
    }
  }

  const filterData = (text) => {
    const filtersData = meters.filter(
      (record) =>
        // debugger
        record.name.toLowerCase().includes(text.toLowerCase()) ||
        record.levelRef.toString().includes(text.toLowerCase()) ||
        record.siteRef.toLowerCase().includes(text.toLowerCase())

    );
    setMeters(filtersData);
  };

  useEffect(() => {
    getData(1);
    setActiveButton(1);
  }, []);

  return (
    <>
      {" "}
      <Row>
        <Col span={18}>
          <Radio.Group>
            <Radio.Button className="ant-radio-button-css" style={{
              fontWeight: activeButton === 1 ? 'bold' : 'normal',
              color: activeButton === 1 ? '#FFFFFF' : '#8E8E8E',
            }} onClick={() => MeterChangeData(1)} >Electric</Radio.Button>
            <Radio.Button className="ant-radio-button-css"
              style={{
                fontWeight: activeButton === 2 ? 'bold' : 'normal',
                color: activeButton === 2 ? '#FFFFFF' : '#8E8E8E',
              }}
              onClick={() => MeterChangeData(2)} >Water</Radio.Button>
            <Radio.Button className="ant-radio-button-css"
              style={{
                fontWeight: activeButton === 3 ? 'bold' : 'normal',
                color: activeButton === 3 ? '#FFFFFF' : '#8E8E8E'
              }}
              onClick={() => MeterChangeData(3)} >Gas</Radio.Button>

          </Radio.Group>


          <button className="mb-5 custom-button" onClick={() => setOpen(true)} style={{ marginLeft: "20px" }}>
          {activeButton===1?"Add New Electric":activeButton===2?"Add New Water":"Add New Gas"}
          </button>
        </Col>
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
        title="Create New Meter"
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
          <Row justify={"center"} gutter={[30, 30]} >
            <Col span={24}>
              <Form.Item
                name={"name"}
                label="Meter Additional Name"
                // labelCol={{ span: 4 }}
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
                name={"gegEquipType"}
                label="Geg Equip Type"
                // labelCol={{ span: 4 }}
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
                name={"siteRef"}
                label="Select Site"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  placeholder="Select Site"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                >
                  {
                    [...new Set(meters.map(item => item.siteRef))].map((item, index) => (
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
                name={"levelRef"}
                label="Select Level"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
              // rules={[{ required: "" }]}
              >
                <Select
                  placeholder="Select Level"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}

                >
                  {[...new Set(meters.map(item => item.levelRef))].map((item, index) => (
                    <Select.Option key={index} value={item}>{item}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"gegNabersInclusionPercent"}
                label="Geg Nabers Inclusion Percent"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
              // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                name={"mpid"}
                label="MPID"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}

                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col> */}
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"cumulative"}
                label="Geg Nabers Exclusion Percent"
                // labelCol={{ span: 4 }}
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
                name={"meter"}
                label="Select Sub-meter of "
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
              // rules={[{ required: "" }]}
              >
                <Select
                  placeholder="Select Sub-meter of"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                >
                  {[...new Set(meters.map(item => item.meter))].map((item, index) => (
                    <Select.Option key={index} value={item}>{item}</Select.Option>

                  ))}
                </Select>
                {/* <Input className="form_input" /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"gateMeter"}
                label="Select Is Gate Meter"
                // rules={[{ required: "" }]}
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  placeholder="Select Is Gate Meter"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                >
                  {
                    [...new Set(meters.map(item => item.gateMeter))].map((Item, index) => (
                      <Select.Option key={index} value={Item}>{Item}</Select.Option>
                    ))
                  }
                </Select>
                {/* <Input className="form_input" /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"db"}
                label="Help"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
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
            <Row >
              <Col span={20} className="custom-modal-column">
                <button
                  type=""
                  className="custom-modal-button"
                  htmlType=""
                  onClick={() => onCancelModal()}
                >
                  Cancel
                </button>
                <button type="" htmlType="submit" >
                  Save
                </button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal >
      <Spin spinning={isLoading} size="large" indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}>
        <Table
          columns={columns}
          dataSource={meters}
          rowKey={"id"}
          scroll={{
            x: 1000,
            y: screenHeight
          }}
        />
      </Spin>
    </>
  );
}

export default Meter;
