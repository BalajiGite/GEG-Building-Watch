import React, { useContext, useRef, useState } from "react";
import { Spin, Divider, Select } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal, Popover, ConfigProvider } from "antd";
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
import { AppContext } from "../App";
import { message } from 'antd';
import { EllipsisOutlined } from "@ant-design/icons";
import { Radio } from 'antd';
import { getApiDataFromAws, postApiDataToAws, getConfigDataFromAws } from "../services/apis";
import {
  deleteSites,
  editSites,
} from "../services/sitesService";
import spinnerjiff from "../assets/images/loader.gif";
import { useReducer } from "react";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};


function Sites() {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [siteData, setSiteData] = useState({});
  const [loading, setloading] = useState(true);
  const [SitesId, setSitesId] = useState();
  const [site, setSite] = useState([]);
  const [open, setOpen] = useState(false);
  const [regionListData, setRegionListData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const siteConfigData = useRef();
  const context = useContext(AppContext);
  
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
      width: 300,
      ellipsis: true,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "2",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      hidden: false,
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
      width: 200,
      ellipsis: true,
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
      width: 200,
      ellipsis: true,
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
      width: 200,
      ellipsis: true,
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
      width: 200,
      ellipsis: true,
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
      width: 200,
      ellipsis: true,
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
      width: 200,
      ellipsis: true,
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
      width: 200,
      ellipsis: true,
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
      width: 200,
      ellipsis: true,
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
      width: 200,
      ellipsis: true,
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
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.long.localeCompare(b.long),
    },
    {
      title: "Latitude",
      dataIndex: "lat",
      key: "13",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.lat.localeCompare(b.lat),
    },
    {
      title: "State",
      dataIndex: "stateRef",
      key: "14",
      width: 200,
      ellipsis: true,
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
      width: 200,
      ellipsis: true,
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
      width: 200,
      ellipsis: true,
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
      title: "Help",
      dataIndex: "help",
      key: "17",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.help.localeCompare(b.help),
      filters: Array.from(new Set(site.map(item => item.help))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.help.startsWith(value),
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "17",
      width: 200,
      ellipsis: true,
      render: (text, record, index) => (
        siteConfigData.current?
        <>
          <ConfigProvider>
            <Popover placement="bottomLeft" content={() => content(record)} >
              <EllipsisOutlined style={{ fontSize: "30px", }} />
            </Popover>
          </ConfigProvider>
        </>
        :null
      ),
    },
  ]
 
  const getData = async () => {
    setIsLoading(true);
    try {

      const sites = await getApiDataFromAws("queryType=site")
      const sitesConfigData = await getConfigDataFromAws("site");
      siteConfigData.current = sitesConfigData.isEditable;
      const regionList = await getApiDataFromAws("queryType=dropdownRegion");
      setRegionListData(regionList);
      setSiteData(sites);
      setSite(sites);
      setloading(false);
      setIsLoading(false);
    } catch (error) { }
  };
  console.log(site);
  const setData = async () => {
    try {

      var formData = form.getFieldsValue();

      const modifiedFormData = {
        ...formData, 
        siteName: formData.name, 
        siteId: "", 
        area: Number(formData.area), 
        armsProjectId: Number(formData.armsProjectId), 
        regionRecId: formData.regionRef,
      };

      const { name, regionRef,site, ...objectWithoutName } = modifiedFormData
      console.log(objectWithoutName); // Log the form data to check its structure
      if (SitesId) {
        const resp = await editSites(SitesId, formData);
      } else {
        //const resp = await addSites(formData);
        const body = {
          funcName: 'createSiteRecordsFromJson',
          recList: [objectWithoutName]
        };
        const addSites = await postApiDataToAws(body)
        // Check if the addSites operation was successful
        if (addSites && addSites.message ==="Success") {
          console.log('Site added successfully:', addSites);
          // Display a success message using Ant Design message component
          message.success('Site added successfully');
        } else {
          console.log('Failed to add site:', addSites);
          // Display an error message using Ant Design message component
          message.error('Failed to add site');
        }
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
    } catch (error) { }
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
        record.regionRef.toLowerCase().includes(searchText.toLowerCase()) ||
        record.weatherStationRef.toLowerCase().includes(searchText.toLowerCase()) ||
        record.armsProj.toLowerCase().includes(searchText.toLowerCase())
    );
    setSite(filteredData);
  };
  useEffect(() => {
    getData();
  }, []);

  // let ObjectKeys = [...new Set(site.map(Obj => Object.keys(Obj)))];
  // console.log(ObjectKeys);

  const content = (record) => (
    <>
      <a onClick={() => onEdit(record)} style={{color:"white"}}>EDIT</a>
      <Divider type="horizontal" style={{ margin: "5px" }} />
      <a onClick={() => onDelete(record.id)} style={{color:"white"}}>DELETE</a>
    </>
  )

  
  return (
    <>
      <Row>
        <Col span={12}>
          <button onClick={() => setOpen(true)} className="mb-5 custom-button">ADD New Site</button>
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
        <Col span={6}>
        <Select
          placeholder="Select Column Name"
          mode="multiple"
          style={{ width: "100%", padding: "5px", maxHeight: "45px", overflow: "auto" }}
          onChange={(selectedItems) => setSelectedColumns(selectedItems)}
        >
          {columns.map((item, index) => (
            <Select.Option key={index} value={item.key}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
        </Col>
      </Row>
      <Modal
        // className="custom-modale"
        title="Add New Sites"
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
          onFinish={setData}
          layout="vertical"
          style={{ maxWidth: 1000 }}
          form={form}
          validateMessages={validateMessages}

        >
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item name="name"
                label="Site Name"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter the Site Name.',
                  },
                ]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>

          

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name="area"
                label="Area"
                rules={[
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Please enter a valid number for the area.',
                  },
                  {
                    required: true,
                    message: 'Please enter the area.',
                  },
                ]}
                wrapperCol={{ span: 24 }}
              >
                <Input className="form_input" type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name="armsProj"
                label="Arms Prj"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter the Arms Project.',
                  },
                ]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name="armsProjectId"
                label="Arms Proj ID"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Please enter a valid number for the Arms Proj ID.',
                  },
                  {
                    required: true,
                    message: 'Please enter the Arms Proj ID.',
                  },
                ]}
              >
                <Input className="form_input" type="number"/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name="projId"
                label="Select Proj ID"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please Select Proj ID.',
                  },
                ]}
              >
                <Select
                  placeholder="Select Project"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                >
                  {[...new Set(site.map(item => item.projId))].map((item, index) => (
                    <Select.Option key={index} value={item} >
                      {item}
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
                name="tz"
                label="Select TZ"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please Select Select TZ.',
                  },
                ]}
              >
                <Select
                  placeholder="Select TZ"
                  style={{ width: "100%" }}
                  value={selectedItems}
                  onChange={setSelectedItems}
                >
                  {
                    [...new Set(site.map(item => item.tz))].map((item, index) => (
                      <Select.Option key={index} value={item}>{item}</Select.Option>
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
                name="observesHolidays"
                label="Select Observe Holidays"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please Select Observe Holidays.',
                  },
                ]}
              >
                <Select
                  placeholder="Select Observe Holidays"
                  size="large"
                  style={{ width: "100%" }}
                  value={selectedItems}
                  onChange={setSelectedItems}
                >
                  {
                    [...new Set(site.map(item => item.observesHolidays))].map((item, index) => (
                      <Select.Option key={index} value={item}>{item}</Select.Option>
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
                name="regionRef"
                label="Select Region ID"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please Select Region.',
                  },
                ]}
              >
                <Select
                  placeholder="Select Region ID"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  style={{ width: "100%" }}
                >
                  {regionListData.length > 0 &&
                    regionListData.map((item, index) => (
                      <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
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
                name="geoCountry"
                label="Select Geo Country"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please Select Geo Country.',
                  },
                ]}
              >
                <Select
                  placeholder="Select Geo Country"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  style={{ width: "100%" }}
                >
                  {
                    [...new Set(site.map(item => item.geoCountry))].map((item, index) => (
                      <Select.Option key={index} value={item}>{item}</Select.Option>
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
                name="geoAddress"
                label="Geo Address"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter the Geo Address.',
                  },
                ]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name="help"
                label="Help"
                initialValue=""
                wrapperCol={{ span: 24 }}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name="site"
                label="Site ID"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
              // rules={[{ required: "" }]}
              >
                <Input className="form_input" readOnly/>
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
              <Col span={20} className="custom-modal-column"  >
                <button  onClick={() => onCancelModal()} type="" htmlType=" " className="custom-modal-button">
                  Cancel
                </button>
                <button htmlType="submit">
                  Save
                </button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
      <Spin spinning={isLoading} indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} />}>
        <Table
          columns={selectedColumns.length > 0 ? columns.filter((item) => selectedColumns.includes(item.key)) : columns}
          dataSource={site}
          rowKey={"id"}
          scroll={{
            y: screenHeight,
            x: 1000,
          }}
          
        // pagination={{
        //   className: "custom-pagination",

        // }}

        />
      </Spin>
    </>
  );
}

export default Sites;
