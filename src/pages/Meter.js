import React, { useState } from "react";
import { Spin, Divider, Select, Radio } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal, Popover, ConfigProvider } from "antd";
import { message } from 'antd';
import "reactjs-popup/dist/index.css";
import { EllipsisOutlined } from "@ant-design/icons";
import { useEffect } from "react";

import { getApiDataFromAws, postApiDataToAws, getConfigDataFromAws } from "../services/apis";
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

function Meter() {
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [siteListData, setSiteListData] = useState({});
  const [levelListData, setLevelListData] = useState({});
  const [gateListData, setGateListData] = useState({});
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
    setLevelListData({});
    setGateListData({})
    form.resetFields();
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const onOpenModalCheck = () => {
    return open
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
    },
    {
      title: "GEG Nabers Exclusion Percent",
      dataIndex: "gegNabersExclusionPercent",
      key: "7",
      width: 300,
      Ellipsis: true,
      sorter: (a, b) => a.gegNabersExclusionPercent - b.gegNabersExclusionPercent,
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
      let configData = {};
      const sitesList = await getApiDataFromAws("queryType=dropdownSite")
      if (changeTableData === 1) {
        meterData = await getApiDataFromAws("queryType=elecMeters");
        configData = await getConfigDataFromAws("elecMeters");
      }
      else if (changeTableData === 2) {
        meterData = await getApiDataFromAws("queryType=waterMeters");
        configData = await getConfigDataFromAws("waterMeters");
      }
      else if (changeTableData === 3) {
        meterData = await getApiDataFromAws("queryType=gasMeters");
        configData = await getConfigDataFromAws("gasMeters");
      }

      setSiteListData(sitesList);
      setMeters(meterData);
      setTempData(meterData)
      setloading(false);
      setIsLoading(false);
    } catch (error) { }
  };

  const setData = async () => {
    try {
      var formData = form.getFieldsValue();

      const modifiedFormData = {
        ...formData, 
        meterAdditionalName: formData.name, 
        siteName: formData.siteRef, 
        levelName: formData.levelRef.replace(formData.siteRef, "").trim(), 
        gegNabersExclusionPercent: formData.gegNabersExclusionPercent !=""?Number(formData.gegNabersExclusionPercent):"", 
        gegNabersInclusionPercent: formData.gegNabersInclusionPercent !=""?Number(formData.gegNabersInclusionPercent):"",  
        isGateMeter: formData.gateMeter,
        submeterOf: formData.meter,
      };



      const { name,levelRef,gateMeter, meter,siteRef, ...objectWithoutName } = modifiedFormData

      if (MeterId) {
        const resp = await editMeter(MeterId, formData);
      } else {
        const body = {
          funcName: 'createMeterRecordsFromJson',
          recList: [objectWithoutName]
        };
        console.log(objectWithoutName);
        const addNewMeter = await postApiDataToAws(body)
        if (addNewMeter && addNewMeter.message ==="Success") {
          console.log('Site added successfully:', addNewMeter);
          message.success('Site added successfully');
        } else {
          console.log('Failed to add site:', addNewMeter);
          message.error('Failed to add site');
        }
      }
      onCancelModal();
      getData(activeButton);
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

  const handleSiteChange = async (siteId) => {
    
    // Fetch level data based on the selected site
    //const levelData = await getLevelDataForSite(siteId);
    const base64SiteId = btoa(siteId).replace(/=+$/, '');
    console.log(base64SiteId)
    const levelData = await getApiDataFromAws("queryType=dropdownLevel&dropdownSiteFilter=" + base64SiteId)
    const gateMeterData = await getApiDataFromAws("queryType=dropdownElecGateMeters&dropdownSiteFilter=" + base64SiteId)
    setLevelListData(levelData);
    setGateListData(gateMeterData);
  };

  const getDefaultGegEquipType = (activeButton) => {
    switch (activeButton) {
      case 1:
        return "pm";
      case 2:
        return "wm";
      case 3:
        return "gm";
      default:
        return "";
    }
  };
  
  useEffect(() => {
    form.setFieldsValue({ gegEquipType: getDefaultGegEquipType(activeButton) });
  }, [activeButton, onCancelModal]);

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


          <button className="mb-5 custom-button" onClick={() => onOpenModal()} style={{ marginLeft: "20px" }}>
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
        open={onOpenModalCheck()}
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
                rules={[
                  {
                    required: true,
                    message: 'Please enter the Meter Additional Name.',
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
                name={"gegEquipType"}
                label="Geg Equip Type"
                wrapperCol={{ span: 24 }}
              // rules={[{ required: "" }]}
              >
                <Input className="form_input" readOnly/>
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
                rules={[
                  {
                    required: true,
                    message: 'Please Select Site.',
                  },
                ]}
              >
                <Select
                  placeholder="Select Site"
                  value={selectedItems}
                  onChange={handleSiteChange}
                  size="large"
                  style={{ width: "100%" }}
                >
                  {siteListData.length > 0 &&
                    siteListData.map((item, index) => (
                      <Select.Option key={index} value={item.name}>{item.name}</Select.Option>
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
                rules={[
                  {
                    required: true,
                    message: 'Please Select Level.',
                  },
                ]}
              >
                <Select
                  placeholder="Select Level"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}

                >
                  {levelListData.length > 0 &&
                    levelListData.map((item, index) => (
                      <Select.Option key={index} value={item.name}>{item.name}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"gegNabersInclusionPercent"}
                label="Geg Nabers Inclusion Percent"
                initialValue=""
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Please enter a valid number for the Percent less than 100.',
                  }                 
                ]}
              >
                <Input className="form_input" type="number"/>
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
                name={"gegNabersExclusionPercent"}
                label="Geg Nabers Exclusion Percent"
                initialValue=""
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Please enter a valid number for the Percent less than 100.',
                  }                 
                ]}
              >
                <Input className="form_input" type="number"/>
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
                  {gateListData.length > 0 &&
                    gateListData.map((item, index) => (
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
                   <Select.Option value={true}>True</Select.Option>
                   <Select.Option value={false}>False</Select.Option>
                </Select>
                {/* <Input className="form_input" /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"help"}
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
