import React, { useState } from "react";
import { Spin, Divider, Select } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal } from "antd";
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
import {
  addMeter,
  deleteMeter,
  editMeter,
  getMeterList,
} from "../services/meterService";

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
    setMeterId();
    form.resetFields();
  };

  const columns = [
    {
      title: "Project No.",
      dataIndex: "projectno",
      key: "1",
      sorter: (a, b) => a.projectno - b.projectno,
    },
    {
      title: "Project Name",
      dataIndex: "projectname",
      key: "2",
      sorter: (a, b) => a.projectname - b.projectname,
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
      filterSearch: true,
      onFilter: (value, record) => record.projectname.startsWith(value),
      // width: "30%",
    },
    {
      title: "Project Type",
      dataIndex: "projecttype",
      key: "3",
      sorter: (a, b) => a.projecttype - b.projecttype,
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
      filterSearch: true,
      onFilter: (value, record) => record.projecttype.startsWith(value),
      // width: "30%",
    },
    {
      title: "Building",
      dataIndex: "building",
      key: "4",
      sorter: (a, b) => a.building - b.building,
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
      filterSearch: true,
      onFilter: (value, record) => record.building.startsWith(value),
      // width: "30%",
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "5",
      sorter: (a, b) => a.asset - b.asset,
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
      filterSearch: true,
      onFilter: (value, record) => record.asset.startsWith(value),
      // width: "30%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "6",
      sorter: (a, b) => a.name - b.name,
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
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      // width: "30%",
    },
    {
      title: "MPID",
      dataIndex: "mpid",
      key: "7",
      sorter: (a, b) => a.mpid - b.mpid,
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
      filterSearch: true,
      onFilter: (value, record) => record.mpid.startsWith(value),
      // width: "30%",
    },
    {
      title: "Cumulative",
      dataIndex: "cumulative",
      key: "8",
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
      filterSearch: true,
      onFilter: (value, record) => record.cumulative.startsWith(value),
      // width: "30%",
    },
    {
      title: "Energy Type",
      dataIndex: "energyType",
      key: "9",
      sorter: (a, b) => a.energyType - b.energyType,
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
      filterSearch: true,
      onFilter: (value, record) => record.energyType.startsWith(value),
      // width: "30%",
    },
    {
      title: "Energy Profile",
      dataIndex: "energyProfile",
      key: "10",
      sorter: (a, b) => a.energyProfile - b.energyProfile,
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
      filterSearch: true,
      onFilter: (value, record) => record.energyProfile.startsWith(value),
      // width: "30%",
    },
    {
      title: "Monitor Interval Name",
      dataIndex: "monitorIntervalName",
      key: "11",
      sorter: (a, b) => a.monitorIntervalName - b.monitorIntervalName,
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
      filterSearch: true,
      onFilter: (value, record) => record.monitorIntervalName.startsWith(value),
      // width: "30%",
    },
    {
      title: "Asset Served",
      dataIndex: "assetServed",
      key: "12",
      sorter: (a, b) => a.assetServed - b.assetServed,
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
      filterSearch: true,
      onFilter: (value, record) => record.assetServed.startsWith(value),
      // width: "30%",
    },
    {
      title: "Components",
      dataIndex: "components",
      key: "13",
      sorter: (a, b) => a.components - b.components,
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
      filterSearch: true,
      onFilter: (value, record) => record.components.startsWith(value),
      // width: "30%",
    },
    {
      title: "Db",
      dataIndex: "db",
      key: "14",
      sorter: (a, b) => a.db - b.db,
    },
    {
      title: "Holidays",
      dataIndex: "holidays",
      key: "15",
      sorter: (a, b) => a.holidays - b.holidays,
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "16",
      sorter: (a, b) => a.target - b.target,
    },
    {
      title: "Alert",
      dataIndex: "alert",
      key: "17",
      sorter: (a, b) => a.alert - b.alert,
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "18",
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
  const [loading, setloading] = useState(true);
  const [MeterId, setMeterId] = useState();
  const [searchText,setSearchText] = useState()
  const [tempData,setTempData] = useState()

  let data = [];
  const getData = async () => {
    setIsLoading(true);
    try {
      const resp = await getMeterList();
      // console.log(resp)
      setPost(resp);
      setTempData(resp)
      setloading(false);
      setIsLoading(false);
    } catch (error) {}
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
    } catch (error) {}
  };

  const onEdit = async (record) => {
    form.setFieldsValue(record);
    setMeterId(record.id);
    setOpen(true);
  };

  data = loading ? [] : post;



  const filter = (text) => {
    // debugger
    const filterData = data.filter(
      (record) =>
      record.projectno.toLowerCase().includes(text.toLowerCase()) ||
        record.projectname.toLowerCase().includes(text.toLowerCase()) ||
        record.projecttype.toLowerCase().includes(text.toLowerCase()) ||
        record.building.toLowerCase().includes(text.toLowerCase()) ||
        record.asset.toLowerCase().includes(text.toLowerCase()) || 
        record.name.toLowerCase().includes(text.toLowerCase()) ||
        record.mpid.toString().includes(text.toLowerCase()) ||
      // record.zone.cumulative().includes(text.toLowerCase()) 
      record.energyType.toLowerCase().includes(text.toLowerCase()) ||
      record.energyProfile.toLowerCase().includes(text.toLowerCase()) ||
      record.monitorIntervalName.toLowerCase().includes(text.toLowerCase())  ||
      record.assetServed.toLowerCase().includes(text.toLowerCase()) || 
      record.components.toLowerCase().includes(text.toLowerCase())     

    );
    setTempData(filterData);
  };
  const onChangeText =  (text) =>{
    filter(text)
    if(!searchText | searchText == ""){
       setPost(post)
    }

  }
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
        title="Create New Meter"
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
                name={"name"}
                label="Name"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"mpid"}
                label="MPID"
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
                name={"cumulative"}
                label="Cumulative"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"energyType"}
                label="Energy Type"
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
                name={"energyProfile"}
                label="Energy Profile"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"monitorIntervalName"}
                label="Interval Name"
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
                name={"assetServed"}
                label="Asset Served"
                // rules={[{ required: "" }]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"components"}
                label="Components"
                // rules={[{ required: "" }]}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={11}>
              <Form.Item
                name={"db"}
                label="Db"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // rules={[{ required: "" }]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"holidays"}
                label="Holidays"
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
                name={"target"}
                label="Target"
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
      </Spin>
    </>
  );
}

export default Meter;
