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
  const [siteData, setSiteData] = useState({});
  const [loading, setloading] = useState(true);
  const [SitesId, setSitesId] = useState();
  const [site, setSite] = useState([]);
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
      filters: Array.from(new Set(site.map(item => item.name))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "3",
      sorter: (a, b) => a.area - b.area,
      filters: Array.from(new Set(site.map(item => item.area))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.area.startsWith(value),
    },
    {
      title: "Project ID",
      dataIndex: "projId",
      key: "4",
      sorter: (a, b) => a.projId.localeCompare(b.projId),
      filters: Array.from(new Set(site.map(item => item.projId))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.projId.startsWith(value),
    },
    {
      title: "Site",
      dataIndex: "site",
      key: "5",
      sorter: (a, b) => (a.site === b.site ? 0 : a.site ? -1 : 1),
      render: (text) => (text ? "True" : "False"),
      filters: Array.from(new Set(site.map(item => item.site))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.site.startsWith(value),
    },
    {
      title: "ARMS Project ID",
      dataIndex: "armsProjectId",
      key: "6",
      sorter: (a, b) => a.armsProjectId.localeCompare(b.armsProjectId),
      filters: Array.from(new Set(site.map(item => item.armsProjectId))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.armsProjectId.startsWith(value),
    },
    {
      title: "Tz",
      dataIndex: "tz",
      key: "7",
      sorter: (a, b) => a.tz.localeCompare(b.tz),
      filters: Array.from(new Set(site.map(item => item.tz))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.tz.startsWith(value),
    },
    {
      title: "ARMS Project",
      dataIndex: "armsProj",
      key: "8",
      sorter: (a, b) => a.armsProj.localeCompare(b.armsProj),
      filters: Array.from(new Set(site.map(item => item.armsProj))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.armsProj.startsWith(value),
    },
    {
      title: "Observes Holidays",
      dataIndex: "observesHolidays",
      key: "9",
      sorter: (a, b) => a.observesHolidays.localeCompare(b.observesHolidays),
      render: (text) => (text ? "True" : "False"),
      filters: Array.from(new Set(site.map(item => item.observesHolidays))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.observesHolidays.startsWith(value),
    },
    {
      title: "Geographical Country",
      dataIndex: "geoCountry",
      key: "10",
      sorter: (a, b) => a.geoCountry.localeCompare(b.geoCountry),
      filters: Array.from(new Set(site.map(item => item.geoCountry))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.geoCountry.startsWith(value),
    },
    {
      title: "Geographical Address",
      dataIndex: "geoAddress",
      key: "11",
      sorter: (a, b) => a.geoAddress.localeCompare(b.geoAddress),
      filters: Array.from(new Set(site.map(item => item.geoAddress))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.geoAddress.startsWith(value),
    },
    {
      title: "Longitude",
      dataIndex: "long",
      key: "12",
      sorter: (a, b) => a.long.localeCompare(b.long),
    },
    {
      title: "Latitude",
      dataIndex: "lat",
      key: "13",
      sorter: (a, b) => a.lat.localeCompare(b.lat),
    },
    {
      title: "State",
      dataIndex: "stateRef",
      key: "14",
      sorter: (a, b) => a.stateRef.localeCompare(b.stateRef),
      filters: Array.from(new Set(site.map(item => item.stateRef))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.stateRef.startsWith(value),
    },
    {
      title: "Region",
      dataIndex: "regionRef",
      key: "15",
      sorter: (a, b) => a.regionRef.localeCompare(b.regionRef),
      filters: Array.from(new Set(site.map(item => item.regionRef))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.regionRef.startsWith(value),
    },
    {
      title: "Weather Station",
      dataIndex: "weatherStationRef",
      key: "16",
      sorter: (a, b) => a.weatherStationRef.localeCompare(b.weatherStationRef),
      filters: Array.from(new Set(site.map(item => item.weatherStationRef))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.weatherStationRef.startsWith(value),
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "17",
      render: (text, record, index) => (
        <>
          <a onClick={() => onEdit(record)}>EDIT</a>
          <Divider type="vertical" />
          <a onClick={() => onDelete(record.id)}>DELETE</a>
        </>
      ),
    },
  ];
  
  
  let data = [];
  const getData = async () => {
    setIsLoading(true);
    try {
      const resp = await getSitesList();
      const sites = await getApiDataFromAws("queryType=site")
      const body = {
        funcName: 'createStateRecordsFromJson',
        recList: [{ stateName: 'TestState123FromGEMS' }]
    };
      //const addSites = await postApiDataToAws(body)
      setSiteData(sites);
      setSite(sites);
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
      setSite(siteData);
    }
  };

  const filter = (text) => {
    // debugger
    const filteredData = site.filter(
      (record) =>
        record.name.toLowerCase().includes(text.toLowerCase()) ||
        record.area.toLowerCase().includes(text.toLowerCase()) ||
        record.projId.toString().includes(text.toLowerCase()) ||
        record.stateRef.toLowerCase().includes(searchText.toLowerCase()) ||
        record.regionRef
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        record.weatherStationRef.toLowerCase().includes(searchText.toLowerCase()) ||
        record.armsProj.toLowerCase().includes(searchText.toLowerCase())
    );
    setSite(filteredData);
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
          dataSource={site}
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
