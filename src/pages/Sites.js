import React, { useState } from "react";
import { Spin, Divider, Select } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal } from "antd";
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
import { getApiDataFromAws, postApiDataToAws } from "../services/apis";
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
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

function Sites() {
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({});
  const [loading, setloading] = useState(true);
  const [SitesId, setSitesId] = useState();
  const [temp, setTemp] = useState();
  const [open, setOpen] = useState(false);
  // console.log(open);

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

  const onCancelModal = () => {
    setOpen(false);
    setSitesId();
    form.resetFields();
  };
  const columns = [
    {
      title: "Project No",
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
      title: "Client Name",
      dataIndex: "clientname",
      key: "4",
      sorter: (a, b) => a.clientname - b.clientname,
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
      onFilter: (value, record) => record.clientname.startsWith(value),
      // width: "30%",
    },
    {
      title: "Client Agent Name",
      dataIndex: "clientagentname",
      key: "5",
      sorter: (a, b) => a.clientagentname - b.clientagentname,
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
      onFilter: (value, record) => record.clientagentname.startsWith(value),
      // width: "30%",
    },

    {
      title: "PTL",
      dataIndex: "ptl",
      key: "6",
      sorter: (a, b) => a.ptl - b.ptl,
    },
    {
      title: "Project Group",
      dataIndex: "projectgroup",
      key: "7",
      sorter: (a, b) => a.projectgroup - b.projectgroup,
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
      onFilter: (value, record) => record.projectgroup.startsWith(value),
      // width: "30%",
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "8",
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
      const resp = await getSitesList();
      const states = await getApiDataFromAws("queryType=state")
      const body = {
        funcName: 'createStateRecordsFromJson',
        recList: [{ stateName: 'TestState123FromGEMS' }]
    };
      const postStates = await postApiDataToAws(body)
      console.log(states);
      console.log(resp);
      setPost(resp);
      setTemp(resp);
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
      const resp = await deleteSites(id);
      getData();
    } catch (error) {}
  };

  const onEdit = async (record) => {
    form.setFieldsValue(record);
    setSitesId(record.id);
    setOpen(true);
  };

  const onChangeText = (text) => {
    setSearchText(text);
    filter(text);
    if (text === "" || !text) {
      setPost(post);
    }
  };

  data = loading ? [] : post;

  const filter = (text) => {
    // debugger
    const filteredData = data.filter(
      (record) =>
        record.projectname.toLowerCase().includes(text.toLowerCase()) ||
        record.projecttype.toLowerCase().includes(text.toLowerCase()) ||
        record.projectno.toString().includes(text.toLowerCase()) ||
        record.clientname.toLowerCase().includes(searchText.toLowerCase()) ||
        record.clientagentname
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        record.ptl.toLowerCase().includes(searchText.toLowerCase()) ||
        record.projectgroup.toLowerCase().includes(searchText.toLowerCase())
    );
    setTemp(filteredData);
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
        title="Create New Sites"
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
                name={"projectnumber"}
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
            <Col span={24}>
              <Form.Item
                name={"clientname"}
                label="Client Name"
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
                name={"clientagentname"}
                label="Client Agent Name"
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
                name={"ptl"}
                label="PTL"
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
                name={"projectgroup"}
                label="Project Group"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
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
          dataSource={temp}
          rowKey={"id"}
          scroll={{
            x: 1000,
          }}
        />
      </Spin>
    </>
  );
}

export default Sites;
