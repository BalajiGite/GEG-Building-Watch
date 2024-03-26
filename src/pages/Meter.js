import React, { useState ,useEffect, useContext } from "react";
import { Button, Row, Col, Modal, Popover, ConfigProvider , Card,message,Form, Input,Spin, Divider, Select, Radio} from "antd";
import "reactjs-popup/dist/index.css";
import { EllipsisOutlined, CaretDownOutlined, InfoCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { SelectColumns } from '../components/widgets/SelectedColumns/SelectedColumns';
import { getApiDataFromAws, postApiDataToAws, getConfigDataFromAws } from "../services/apis";
import {
  addMeter,
  deleteMeter,
  editMeter,
  getMeterList,
} from "../services/meterService";
import { Item } from "devextreme-react/accordion";
import spinnerjiff from "../assets/images/loader.gif";
import { isAuthenticated, userInfo } from "../services/apis";
import { useHistory } from 'react-router-dom';
import { AppContext } from "../App";
import { CSVLink } from 'react-csv';
import ResizableTable from "../components/widgets/ResizeTable/ResizableTable";
import vector_ from "../../src/assets/images/vector_.png";
import { FilterColumnsData } from "../components/widgets/SelectedColumns/FilterColumns";
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
  const [isEditables, setIsEditables] = useState({});
  const [newForm, setNewForm] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [visibleCard, setvisibleCard] = useState(false);

  const context = useContext(AppContext);
  const history = useHistory();

  const screenHeight = window.innerHeight - 310;
  const totalRows = meters.length;

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
  const onCancelModal = () => {
    setOpen(false);
    setMeterId();
    setLevelListData({});
    setGateListData({})
    form.resetFields();
  };

  const onOpenModal = () => {
    setOpen(true);
    setNewForm(true);
    form.resetFields();
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
          width: 120,
          ellipsis: true,
          sorter: (a, b) => a.elec.localeCompare(b.elec),
          filter: Array.from(new Set(meters.map(item => item.elec))).map((electricity, index) => ({
            text: electricity,
            value: electricity
          })),
          filterMode: "tree",
          filterSearch: false,
          onFilter: (value, record) => record.elec.startsWith(value),

        })
    }
    if (data.some(item => item.gegNabersExclusionPercent)) {
      dynamicColumns.push(
        {
          title: "Geg Nabers Exclusion Percent",
          dataIndex: "gegNabersExclusionPercent",
          key: "11",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.gegNabersExclusionPercent - b.gegNabersExclusionPercent,
          filters: Array.from(new Set(meters.map(item => item.gegNabersExclusionPercent))).map((name, index) => ({
            text: name,
            value: name
          })),
          filterMode: "tree",
          filterSearch: false,
          onFilter: (value, record) => record.gegNabersExclusionPercent == value,
        },
      )
    }

    return dynamicColumns;
  }
  const columns = [

    {
      title: "Name",
      dataIndex: "name",
      key: "2",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: Array.from(new Set(meters.map(item => item.name))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: "Equip",
      dataIndex: "equip",
      key: "3",
      width: 120,
      ellipsis: true,
      sorter: (a, b) => a.equip.localeCompare(b.equip),
      filters: Array.from(new Set(meters.map(item => item.equip))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.equip.startsWith(value),
    },
    ...DynamicColumns(meters),
    {
      title: "Gate Meter",
      dataIndex: "gateMeter",
      key: "5",
      width: 120,
      ellipsis: true,
      sorter: (a, b) => a.gateMeter.localeCompare(b.gateMeter),
      filters: Array.from(new Set(meters.map(item => item.gateMeter))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.gateMeter == value,
    },
    {
      title: "GEG Equip Type",
      dataIndex: "gegEquipType",
      key: "6",
      width: 140,
      ellipsis: true,
      sorter: (a, b) => a.gegEquipType.localeCompare(b.gegEquipType),
      filters: Array.from(new Set(meters.map(item => item.gegEquipType))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.gegEquipType.startsWith(value),
    },
    {
      title: "GEG Nab Incl Per",
      dataIndex: "gegNabersInclusionPercent",
      key: "7",
      width: 120,
      ellipsis: true,
      sorter: (a, b) => a.gegNabersInclusionPercent - b.gegNabersInclusionPercent,
      filters: Array.from(new Set(meters.map(item => item.gegNabersInclusionPercent))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.gegNabersInclusionPercent == value,
    },

    {
      title: "Level Reference",
      dataIndex: "levelRef",
      key: "8",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.levelRef.localeCompare(b.levelRef),
      filters: Array.from(new Set(meters.map(item => item.levelRef))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.levelRef.startsWith(value),
    },
    {
      title: "Meter",
      dataIndex: "meter",
      key: "9",
      width: 150,
      ellipsis: true,
      sorter: (a, b) => a.meter.localeCompare(b.meter),
      filters: Array.from(new Set(meters.map(item => item.meter))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.meter.startsWith(value),
    },
    {
      title: "Site Reference",
      dataIndex: "siteRef",
      key: "10",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.siteRef.localeCompare(b.siteRef),
      filters: Array.from(new Set(meters.map(item => item.siteRef))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.siteRef.startsWith(value),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "1",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "18",
      width: 200,
      ellipsis: true,
      render: (text, record, index) => (
        isEditables?.isEditable ?
          <>
            <ConfigProvider>
              <Popover overlayStyle={{ width: '100px' }} placement="right" content={() => content(record)}>
                <EllipsisOutlined style={{ fontSize: "30px" }} />
              </Popover>
            </ConfigProvider>
          </>
          : null
      ),
    },
  ];

  const isFieldEditable = (fieldName) => {
    return (
      typeof isEditables.editKeysUneditable === 'object' &&
      isEditables.editKeysUneditable.hasOwnProperty(fieldName)
    );
  };

  const getData = async (changeTableData) => {
    setIsLoading(true);
    try {
      let meterData = [];
      let configData = {};
      const sitesList = await getApiDataFromAws("queryType=dropdownSite")
      if (changeTableData === 1) {
        meterData = await getApiDataFromAws("queryType=elecMeters");
        configData = await getConfigDataFromAws("elecMeters");
        setIsEditables(configData);
      }
      else if (changeTableData === 2) {
        meterData = await getApiDataFromAws("queryType=waterMeters");
        configData = await getConfigDataFromAws("waterMeters");
        setIsEditables(configData);
      }
      else if (changeTableData === 3) {
        meterData = await getApiDataFromAws("queryType=gasMeters");
        configData = await getConfigDataFromAws("gasMeters");
        setIsEditables(configData);

      }
      setSiteListData(sitesList);
      setMeters(meterData);
      setTempData(meterData)
      setloading(false);
      setIsLoading(false);
    } catch (error) { }
  };

  useEffect(() => {
    // This effect will run whenever either tempData or alerts state changes
    if (searchText !== "") {
      onChangeText(searchText);
    }
  }, [tempData]);

  const setData = async () => {
    try {
      var formData = form.getFieldsValue();

      const modifiedFormData = {
        ...formData,
        meterAdditionalName: formData.name,
        siteName: formData.siteRef,
        levelName: formData.levelRef.replace(formData.siteRef, "").trim(),
        gegNabersExclusionPercent: formData.gegNabersExclusionPercent != "" ? Number(formData.gegNabersExclusionPercent) : "",
        gegNabersInclusionPercent: formData.gegNabersInclusionPercent != "" ? Number(formData.gegNabersInclusionPercent) : "",
        isGateMeter: formData.gateMeter,
      };
      const { name, levelRef, gateMeter, siteRef, ...objectWithoutName } = modifiedFormData

      if (MeterId) {
        const objectWithMeterId = {
          ...objectWithoutName,
          meterId: MeterId,
        };
        const body = {
          funcName: 'updateMeterInclusionExclusionVals',
          recList: [objectWithMeterId]
        };
        const updateNewMeter = await postApiDataToAws(body)
        if (updateNewMeter && updateNewMeter.message === "Success") {
          message.success('Meter Updated successfully');
        } else {
          message.error(updateNewMeter[0].row1[0]);
        }
      } else {
        const body = {
          funcName: 'createMeterRecordsFromJson',
          recList: [objectWithoutName]
        };
        const addNewMeter = await postApiDataToAws(body)
        if (addNewMeter && addNewMeter.message === "Success") {
          message.success('Meter added successfully');
        } else {
          message.error(addNewMeter[0].row1[0]);
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
    setNewForm(false);
    setOpen(true);
  };

  const content = (record) => (
    <div style={{ marginLeft: "10px", backgroundColor: "#0A1016", paddingTop: "10px", marginRight: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
      <a onClick={() => onEdit(record)} style={{ color: "white" }}>EDIT</a>
      <Divider type="horizontal" style={{ margin: "5px" }} />
      <a onClick={() => onDelete(record.id)} style={{ color: "white", display: "none" }}>DELETE</a>
    </div>
  )


  const onChangeText = (text) => {
    if (text == "" || !text || text.length < searchText.length) {
      setMeters(tempData);
      setSearchText(text);
      filterData(text, tempData)
    } else {
      setSearchText(text);
      filterData(text, tempData)
    }
  }

  const filterData = (text, data) => {
    const filtersData = data.filter(
      (record) =>
        record.name.toLowerCase().includes(text.toLowerCase()) ||
        record.levelRef.toLowerCase().includes(text.toLowerCase()) ||
        record.siteRef.toLowerCase().includes(text.toLowerCase())

    );
    setMeters(filtersData);
  };
  const exportToCSV = () => {
    const csvData = meters.map(item => ({
      ...item, // Assuming mpReadings is an array of objects
    }));

    return csvData;
  };
  const handleSiteChange = async (siteId) => {

    // Fetch level data based on the selected site
    //const levelData = await getLevelDataForSite(siteId);
    const base64SiteId = btoa(siteId).replace(/=+$/, '');
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
    const authenticated = isAuthenticated()
    if (authenticated) {
      getData(1);
      setActiveButton(1);
    } else {
      var userData = userInfo(context.token);
      if (userData == null) {
        history.push('/');
      } else {
        getData(1);
        setActiveButton(1);
      }
    }
  }, []);

  const handleSelectColumns = (selectedColumns) => {
    setVisibleColumns(selectedColumns);
  };
  const handleChange = (value) => {
    console.log(value);
  };
  

  return (
    <>
      {" "}
      <Row>
        <Col span={12}>
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

          <button className="mb-4 custom-button" onClick={() => onOpenModal()} style={{ marginLeft: "20px" }}>
            {activeButton === 1 ? "Add New Electric" : activeButton === 2 ? "Add New Water" : "Add New Gas"}
          </button>
        </Col>
        <Col span={12} style={{ marginBottom: 10, textAlign: 'right' }}>
          <Input
            size="small"
            placeholder="search here ..."
            value={searchText}
            onChange={(e) => onChangeText(e.target.value)}
            className="custom-input"
          />
          <button className="ant-dropdown-link custom-button" style={{ marginLeft: "5px", paddingLeft: "10px", paddingRight: "10px" }} onClick={()=>setvisibleCard(!visibleCard)} >
          <img src={vector_} alt="vector_png" width={16} height={16}/>
          </button>
          <SelectColumns columns={columns} onSelectColumns={handleSelectColumns}/>
          <CSVLink data={exportToCSV()} filename={"meter.csv"}>
            <button type="button" className="custom-button">Export to CSV</button>
          </CSVLink>
        </Col>
      </Row>
      {visibleCard && <Card className="custom-card1">
        <div style={{ justifyContent: 'end', display: 'flex' }}>
          <CloseOutlined style={{ color: "#FFFFFF", fontSize: "15px", cursor: 'pointer' }} onClick={() => setvisibleCard(!visibleCard)} />
        </div>
        <FilterColumnsData columns={columns} onSelectColumns={handleSelectColumns} />
      </Card>}
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
                tooltip={{ title: 'Provide an additional name or descriptor for the electricity/water/gas meter, if necessary.', icon: <InfoCircleOutlined style={{ color: '#c5c5c5' }} /> }}
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter the Meter Additional Name.',
                  },
                ]}
              >
                <Input className="form_input" readOnly={newForm ? false : true} />
                {/**  isFieldEditable('name') */}
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
                <Input className="form_input" readOnly={true} />
                {/**isFieldEditable('gegEquipType')*/}
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
                  disabled={newForm ? false : true}
                >
                  {siteListData.length > 0 &&
                    siteListData.map((item, index) => (
                      <Select.Option key={index} value={item.name}>{item.name}</Select.Option>
                    ))
                  }
                </Select>
                {/**isFieldEditable('siteRef')*/}
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
                  disabled={newForm ? false : true}
                >
                  {levelListData.length > 0 &&
                    levelListData.map((item, index) => (
                      <Select.Option key={index} value={item.name}>{item.name}</Select.Option>
                    ))
                  }
                </Select>
                {/* isFieldEditable("levelRef") */}
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"gateMeter"}
                label="Select Is Gate Meter"
                wrapperCol={{ span: 24 }}
              >
                <Select
                  placeholder="Select Is Gate Meter"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                  disabled={newForm ? false : true}
                >
                  <Select.Option value={true}>True</Select.Option>
                  <Select.Option value={false}>False</Select.Option>
                </Select>
                {/**isFieldEditable('gateMeter') */}
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"submeterOf"}
                label="Select Sub-meter of"
                initialValue=""
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: form.getFieldValue("gateMeter") === false,
                    message: "Please select Sub-meter of",
                  },
                ]}

              >
                <Select
                  placeholder="Select Sub-meter of"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                  disabled={form.getFieldValue("gateMeter") === true ? true : newForm ? false : isFieldEditable('submeterOf')}
                >
                  {gateListData.length > 0 &&
                    gateListData.map((item, index) => (
                      <Select.Option key={index} value={item.id}>
                        {item.name}
                      </Select.Option>
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
                tooltip={{ title: 'Enter the percentage of water usage to be included in NABERS (National Australian Built Environment Rating System) calculations.', icon: <InfoCircleOutlined style={{ color: '#c5c5c5' }} /> }}
                initialValue=""
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Please enter a valid number for the Percent less than 100.',
                  }, {
                    min: 0,
                    max: 100,
                    message: 'Please enter a number between 0 and 100 for the Inclusion Percent.',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const exclusionPercent = getFieldValue('gegNabersExclusionPercent');
                      if (exclusionPercent && value) {
                        return Promise.reject('Please enter only one of Inclusion Percent or Exclusion Percent.');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input className="form_input" type="number" min={0} max={100} readOnly={newForm ? false : isFieldEditable('gegNabersInclusionPercent')} />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"gegNabersExclusionPercent"}
                label="Geg Nabers Exclusion Percent"
                tooltip={{ title: ' Enter the percentage of gas usage to be excluded from NABERS calculations.', icon: <InfoCircleOutlined style={{ color: '#c5c5c5' }} /> }}
                initialValue=""
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Please enter a valid number for the Percent less than 100.',
                  },
                  {
                    min: 0,
                    max: 100,
                    message: 'Please enter a number between 0 and 100 for the Exclusion Percent.',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const inclusionPercent = getFieldValue('gegNabersInclusionPercent');
                      if (inclusionPercent && value) {
                        return Promise.reject('Please enter only one of Inclusion Percent or Exclusion Percent.');
                      }
                      if (getFieldValue('gateMeter') && value) {
                        return Promise.reject('gegNabersExclusionPercent cannot be a gateMeter.');
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input className="form_input" type="number" min={0} max={100} readOnly={newForm ? false : isFieldEditable('gegNabersExclusionPercent')} />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"help"}
                label="Help"
                tooltip={{ title: 'Access help documentation or support for gas meter configurations and settings.', icon: <InfoCircleOutlined style={{ color: '#c5c5c5' }} /> }}
                initialValue=""
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
        <ResizableTable total={totalRows} name={"Meters"} screenHeight={screenHeight} site={meters} columnsData={visibleColumns.length > 0 ? columns.filter((item) => visibleColumns.includes(item.key)) : columns} />
      </Spin>
    </>
  );
}

export default Meter;
