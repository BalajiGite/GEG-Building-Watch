import React from "react";
import { useEffect } from "react";
import Region from "../components/widgets/Region";
import Level from "../components/widgets/Level";
import { getApiDataFromAws, postApiDataToAws } from "../services/apis";
import {
  Select, Divider, Modal, Table, Form, Input, Button, Card, Col, Row, Spin
} from "antd";
import { useState } from "react";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {};

const onFinish = (values) => {
  console.log(values);
};


function Config() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setloading] = useState(true);
  const [locationData, setLocationData] = useState([]);
  const [activeButton, setActiveButton] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [templocationData , setTempLocationData] = useState([])
  const [form] = Form.useForm();

  const screenHeight = window.innerHeight-340;


  const dynamicColumns = (data) => {
    const dynamicColumns = [];

    // Add logic here to extract dynamic column information from the data structure
    // For example, if "stateRef" exists in any of the items, add a column for it
    if (data.some(item => item.stateRef)) {
      dynamicColumns.push({
        title: "State Ref",
        dataIndex: "stateRef",
         key: "stateRef",
        sorter: (a, b) => a.stateRef.localeCompare(b.stateRef),
        filters: Array.from(new Set(data.map(item => item.stateRef))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.stateRef.startsWith(value),
      });
    }
    if (data.some(item => item.region)) {
      dynamicColumns.push({
        title: "Region",
        dataIndex: "region",
        key: "region",
        sorter: (a, b) => a.region.localeCompare(b.region),
        filters: Array.from(new Set(locationData.map(item => item.region))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.region.startsWith(value),
      })
    }

    if (data.some(item => item.state)) {
      dynamicColumns.push({
        title: "State",
        dataIndex: "state",
        key: "state",
        sorter: (a, b) => a.state.localeCompare(b.state),
        filters: Array.from(new Set(locationData.map(item => item.state))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.state.startsWith(value),
      })
    }

    if (data.some(item => item.level)) {
      dynamicColumns.push({
        title: "Level",
        dataIndex: "level",
        key: "level",
        sorter: (a, b) => a.level.localeCompare(b.level),
        filters: Array.from(new Set(locationData.map(item => item.level))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.level.startsWith(value),
      })
    }
    if (data.some(item => item.siteRef)) {
      dynamicColumns.push({
        title: "Site ",
        dataIndex: "siteRef",
        key: "siteRef",
        sorter: (a, b) => a.siteRef.localeCompare(b.siteRef),
        filters: Array.from(new Set(locationData.map(item => item.siteRef))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.siteRef.startsWith(value),
      })
    }
    if (data.some(item => item.projId)) {
      dynamicColumns.push({
        title: "Project ID",
        dataIndex: "projId",
        key: "projId",
        sorter: (a, b) => a.projId.localeCompare(b.projId),
        filters: Array.from(new Set(locationData.map(item => item.projId))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.projId.startsWith(value),
      })
    }
    return dynamicColumns;
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      Ellipsis:true,
      width:300,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width:300,
      Ellipsis:true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: Array.from(new Set(locationData.map(item => item.name))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
    },
    ...dynamicColumns(locationData),
    {
      title: "Actions",
      dataIndex: "delete",
      key: "delete",
      Ellipsis:true,
      
      render: (text, record, index) => (
        <>
          <a
            onClick={() => {
              onEdit(record);
              console.log(record)
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
  const changeWidgets = (widget) => {
    setActiveButton(widget);
    getData(widget);
  }
  const onDelete = async (id) => {
    try {
      const resp = await postApiDataToAws(id);
      getData();
    } catch (error) { }
  };
  const onEdit = async (record) => {
    form.setFieldsValue(record);
    //setSitesId(record.id);
    setOpen(true);
  };
  const getData = async (dataValues) => {
    setIsLoading(true);
    try {

      var locationData = [];
      if (dataValues === 0) {
        locationData = await getApiDataFromAws("queryType=state")
      } else if (dataValues === 1) {
        locationData = await getApiDataFromAws("queryType=region")
      } else if (dataValues === 2) {
        locationData = await getApiDataFromAws("queryType=level")
      }
      setLocationData(locationData);
      setTempLocationData(locationData);
      setloading(false);
      setIsLoading(false);
    } catch (error) { }
  };

  const onChangeSelectedValue = (value) =>{
    setSearchText(value);
    filterData(value);
    if(value==""||!value){
      setLocationData(templocationData);
    }
  }
  const filterData = (value) =>{
    const filtersData =  locationData.filter((record)=>(
      record.name.toLowerCase().includes(value.toLowerCase())||
      record?.stateRef?.toLowerCase().includes(value.toLowerCase())||
      record?.siteRef?.toLowerCase().includes(value.toLowerCase())
    ));
    setLocationData(filtersData)
  }
  useEffect(() => {
    getData(0);
    setActiveButton(0);
  }, []);
  console.log(locationData)

  const activeWidgestInputFields = () => {
    switch (activeButton) {
      case 0:
        return (
          <>
            <Row justify={"center"}>
              <Col span={24}>
                <Form.Item
                  name={"name"}
                  label="State Name"
                  // labelCol={{ span: 4 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input className="form_input" />
                </Form.Item>
              </Col>
            </Row>

          </>
        )
      case 1:
        return (
          <>
            <Row justify={"center"}>
              <Col span={24}>
                <Form.Item
                  name={"name"}
                  label="Region Name"
                  // labelCol={{ span: 4 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input className="form_input" />
                </Form.Item>
              </Col>
            </Row>
          </>
        )
      case 2:
        return (
          <>
            <Row justify={"center"}>
              <Col span={24}>
                <Form.Item
                  name={"level"}
                  label="Level Name"
                  // labelCol={{ span: 4 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input className="form_input" />
                </Form.Item>
              </Col>
            </Row>
            <Row justify={"center"}>
              <Col span={24}>
                <Form.Item
                  name={"name"}
                  label="Select Site Name"
                  // labelCol={{ span: 4 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Select
                    placeholder="Selct Site Name"
                    style={{ width: "100" }}>
                    {locationData.map((item, index) => (
                      <Select.Option key={index} item={item.name}>{item.name}</Select.Option>
                    ))}
                  </Select>
                  {/* <Input className="form_input" /> */}
                </Form.Item>
              </Col>
            </Row>
          </>
        )
    }
  }
  return (
    <>
      <Row>
        <Col span={17} style={{ marginBottom: 20 }}>
          <Button type={activeButton === 0 ? 'primary' : 'button'} onClick={() => changeWidgets(0)}>State</Button>
          <Button type={activeButton === 1 ? 'primary' : 'button'} onClick={() => changeWidgets(1)}>Region</Button>
          <Button type={activeButton === 2 ? 'primary' : 'button'} onClick={() => changeWidgets(2)}>Level</Button>
          <Button className="mb-4 ml-4" type="primary" onClick={() => setOpen(true)}>
            Create New
          </Button>
        </Col>
        <Col span={7} style={{ marginBottom: 20 }}>
          <Form>
            <Input
              size="small"
              placeholder="search here ..."
              value={searchText}
            onChange={(e)=>onChangeSelectedValue(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Modal
        style={{ textAlign: "left" }}
        title={activeButton==0?"Add New State":activeButton==1?"Add New Region":"Add New Level"}
        centered
        open={open}
        // onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={700}
        footer={null}
      >
        <Form
          className="modelForm"
          {...layout}
          name="nest-messages"
          style={{ minWidth: "100%" }}
          layout="vertical"
          onFinish={onFinish}
          validateMessages={validateMessages}
          form={form}
          labelAlign=""
        >
          {activeWidgestInputFields()}
          <Row style={{alignItems:"end",display:"flex"}}>
            <Col span={24}>
          <Form.Item>
            <Button
              style={{ float: "right" }}
              onClick={() => setOpen(false)}
              type=""
              htmlType="cancel"
            >
              Cancel
            </Button>
            <Button
              className=""
              style={{
                float: "right",
                marginRight: 18,
              }}
              onClick={() => setOpen(false)}
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
          </Col>
          </Row>
        </Form>
      </Modal>
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={locationData}
          scroll={{
            x: 1000,
            y:screenHeight
          }}
        />
      </Spin>
    </>
  );
}

export default Config;
