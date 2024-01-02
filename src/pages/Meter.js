import React, { useState } from "react";
import { Spin, Divider, Select } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal } from "antd";
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
import { getApiDataFromAws, postApiDataToAws } from "../services/apis";
import {
  addMeter,
  deleteMeter,
  editMeter,
  getMeterList,
} from "../services/meterService";
import { Item } from "devextreme-react/accordion";

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
    setMeterId();
    form.resetFields();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "1",
      width:300,
      Ellipsis:true,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "2",
      width:250,
      Ellipsis:true,
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
      width:200,
      Ellipsis:true,
      sorter: (a, b) => a.equip.localeCompare(b.equip),
      filters: Array.from(new Set(meters.map(item => item.equip))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.equip.startsWith(value),
    },
    {
      title: "Electricity",
      dataIndex: "elec",
      key: "4",
      width:200,
      Ellipsis:true,
      sorter: (a, b) => a.elec.localeCompare(b.elec),
      filters: Array.from(new Set(meters.map(item => item.elec))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.elec.startsWith(value),
    },
    {
      title: "Gate Meter",
      dataIndex: "gateMeter",
      key: "5",
      width:200,
      Ellipsis:true,
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
      width:250,
      Ellipsis:true,
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
      width:300,
      Ellipsis:true,
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
      width:200,
      Ellipsis:true,
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
      width:200,
      Ellipsis:true,
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
      width:200,
      Ellipsis:true,
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
      width:200,
      Ellipsis:true,
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


  let data = [];
  const getData = async () => {
    setIsLoading(true);
    try {
      const resp = await getMeterList();
      const meterData = await getApiDataFromAws("queryType=elecMeters")
      // console.log(resp)
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
        record.levelRef.toLowerCase().includes(text.toLowerCase()) ||
        record.siteRef.toLowerCase().includes(text.toLowerCase())

    );
    setMeters(filtersData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {" "}
      <Row>
        <Col span={12}>
      <Button className="mb-5" type="primary" onClick={() => setOpen(true)}>
        Create New
      </Button>
        </Col>
        <Col span={12} style={{ marginBottom: 10 }}>
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
              <Col span={20} style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  type=""

                  htmlType=""
                  onClick={() => onCancelModal()}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
                  Save
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal >
      <Spin spinning={isLoading}>
        <Table
        bordered
          columns={columns}
          dataSource={meters}
          rowKey={"id"}
          scroll={{
            x: 1000,
            y:300
          }}
        />
      </Spin>
    </>
  );
}

export default Meter;
