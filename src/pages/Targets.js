import React from 'react';
import { Button, Row, Col, Modal, Select, Popover, ConfigProvider, DatePicker } from "antd";
import { Form, Input, Table, Divider, Spin, Radio, message } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { getApiDataFromAws, getConfigDataFromAws, postApiDataToAws } from "../services/apis";
import { targetEdit, addTarget } from '../services/targetService';
import spinnerjiff from "../assets/images/loader.gif";
import { SelectColumns } from '../components/widgets/SelectedColumns/SelectedColumns';

function Targets() {
  const [activeButton, setActiveButton] = useState(1);
  const [targets, setTargets] = useState([])
  const [siteListData, setSiteListData] = useState([]);
  const [targetTempData, setTargetTempData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState();
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState();
  const [isEditables, setIsEditables] = useState({});
  const [newForm, setNewForm] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState([]);
  // const isEditable = useRef({});
  const [form] = Form.useForm();
  const DATE_FORMAT = 'YYYY-MM-DD';

  const screenHeight = window.innerHeight - 310;
  const totalRows = targets.length;
// let edit = [];
//  edit = Array.isArray(isEditable.current.editKeysUneditable)

const isFieldEditable = (fieldName) => {
  return (
    typeof isEditables.editKeysUneditable === 'object' &&
    isEditables.editKeysUneditable.hasOwnProperty(fieldName)
  );
};

  const onOpenModal = () => {
    setOpen(true);
    setNewForm(true)
    form.resetFields();
  };

  const onCancelModal = () => {
    setOpen(false);
    form.resetFields();
  }

  const validateMessages = {
    require: "${label} is required!",
    type: {
      email: "${lebel} is not a valid email !",
      number: "${lebel} is not a valid number",
    },
    number: {
      range: "${lebel} must be between ${min} and ${max}",
    },
  };

  const dynamicColumns = (data) => {
    const dynamicColumns = [];

    // Add logic here to extract dynamic column information from the data structure
    // For example, if "stateRef" exists in any of the items, add a column for it
    if (data.some(item => item.elecTargetProfile)) {
      dynamicColumns.push({
        title: "Electricity Target Profile",
        dataIndex: "elecTargetProfile",
        key: "elecTargetProfile",
        width: 300,
        Ellipsis: true,
        sorter: (a, b) => a.elecTargetProfile.localeCompare(b.elecTargetProfile),
        filters: Array.from(new Set(targets.map(item => item.elecTargetProfile))).map((profile, index) => ({
          text: profile,
          value: profile,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.elecTargetProfile.startsWith(value),
      });
    }
    if (data.some(item => item.targetKwh0)) {
      dynamicColumns.push({
        title: "Target kWh 0",
        dataIndex: "targetKwh0",
        key: "targetKwh0",
        width: 200,
        Ellipsis: true,
        sorter: (a, b) => parseFloat(a.targetKwh0) - parseFloat(b.targetKwh0),
        filters: Array.from(new Set(targets.map(item => item.targetKwh0))).map((kwh, index) => ({
          text: kwh,
          value: kwh,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.targetKwh0.startsWith(value),
      })
    }

    if (data.some(item => item.targetKwh1)) {
      dynamicColumns.push({
        title: "Target kWh 1",
        dataIndex: "targetKwh1",
        key: "targetKwh1",
        width: 200,
        Ellipsis: true,
        sorter: (a, b) => parseFloat(a.targetKwh1) - parseFloat(b.targetKwh1),
        filters: Array.from(new Set(targets.map(item => item.targetKwh1))).map((kwh, index) => ({
          text: kwh,
          value: kwh,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.targetKwh1.startsWith(value),
      })
    }

    if (data.some(item => item.targetKwh2)) {
      dynamicColumns.push({
        title: "Target kWh 2",
        dataIndex: "targetKwh2",
        key: "targetKwh2",
        width: 200,
        Ellipsis: true,
        sorter: (a, b) => parseFloat(a.targetKwh2) - parseFloat(b.targetKwh2),
        filters: Array.from(new Set(targets.map(item => item.targetKwh2))).map((kwh, index) => ({
          text: kwh,
          value: kwh,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.targetKwh2.startsWith(value),
      })
    }
    if (data.some(item => item.waterTargetProfile)) {
      dynamicColumns.push({
        title: "Water Target Profile",
        dataIndex: "waterTargetProfile",
        key: "waterTargetProfile",
        width: 350,
        Ellipsis: true,
        sorter: (a, b) => a.waterTargetProfile.localeCompare(b.waterTargetProfile),
        filters: Array.from(new Set(targets.map(item => item.waterTargetProfile))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.waterTargetProfile.startsWith(value),
      })
    }
    if (data.some(item => item.targetKl0)) {
      dynamicColumns.push({
        title: "Target Kl0",
        dataIndex: "targetKl0",
        key: "targetKl0",
        width: 200,
        Ellipsis: true,
        sorter: (a, b) => a.targetKl0.localeCompare(b.targetKl0),
        filters: Array.from(new Set(targets.map(item => item.targetKl0))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.targetKl0.startsWith(value),
      })
    }

    if (data.some(item => item.targetKl1)) {
      dynamicColumns.push({
        title: "Target Kl1",
        dataIndex: "targetKl1",
        key: "targetKl1",
        width: 200,
        Ellipsis: true,
        sorter: (a, b) => a.targetKl1.localeCompare(b.targetKl1),
        filters: Array.from(new Set(targets.map(item => item.targetKl1))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.targetKl1.startsWith(value),
      })
    }
    if (data.some(item => item.targetKl2)) {
      dynamicColumns.push({
        title: "Target Kl2",
        dataIndex: "targetKl2",
        key: "targetKl2",
        width: 200,
        Ellipsis: true,
        sorter: (a, b) => a.targetKl2.localeCompare(b.targetKl2),
        filters: Array.from(new Set(targets.map(item => item.targetKl2))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.targetKl2.startsWith(value),
      })
    }
    if (data.some(item => item.gasTargetProfile)) {
      dynamicColumns.push({
        title: "Gas Target Profile",
        dataIndex: "gasTargetProfile",
        key: "gasTargetProfile",
        width: 300,
        Ellipsis: true,
        sorter: (a, b) => a.gasTargetProfile.localeCompare(b.gasTargetProfile),
        filters: Array.from(new Set(targets.map(item => item.gasTargetProfile))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.gasTargetProfile.startsWith(value),
      })
    }
    if (data.some(item => item.targetCum0)) {
      dynamicColumns.push({
        title: "Target Cum0",
        dataIndex: "targetCum0",
        key: "targetCum0",
        width: 200,
        Ellipsis: true,
        sorter: (a, b) => a.targetCum0.localeCompare(b.targetCum0),
        filters: Array.from(new Set(targets.map(item => item.targetCum0))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.targetCum0.startsWith(value),
      })
    }
    if (data.some(item => item.targetCum1)) {
      dynamicColumns.push({
        title: "Target Cum1",
        dataIndex: "targetCum1",
        key: "targetCum1",
        width: 200,
        Ellipsis: true,
        sorter: (a, b) => a.targetCum1.localeCompare(b.targetCum1),
        filters: Array.from(new Set(targets.map(item => item.targetCum1))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.targetCum1.startsWith(value),
      })
    }
    return dynamicColumns;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 300,
      Ellipsis: true,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 400,
      Ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: Array.from(new Set(targets.map(item => item.name))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.unit.localeCompare(b.unit),
      filters: Array.from(new Set(targets.map(item => item.unit))).map((unit, index) => ({
        text: unit,
        value: unit,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.unit.startsWith(value),
    },
    {
      title: "Target Rating",
      dataIndex: "targetRating",
      key: "targetRating",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => parseFloat(a.targetRating) - parseFloat(b.targetRating),
      filters: Array.from(new Set(targets.map(item => item.targetRating))).map((rating, index) => ({
        text: rating,
        value: rating,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.targetRating.startsWith(value),
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.point.localeCompare(b.point),
      filters: Array.from(new Set(targets.map(item => item.point))).map((point, index) => ({
        text: point,
        value: point,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.point.startsWith(value),
    },
    {
      title: "Rating Period Start",
      dataIndex: "ratingPeriodStart",
      key: "ratingPeriodStart",
      width: 300,
      Ellipsis: true,
      sorter: (a, b) => a.ratingPeriodStart.localeCompare(b.ratingPeriodStart),
      filters: Array.from(new Set(targets.map(item => item.ratingPeriodStart))).map((start, index) => ({
        text: start,
        value: start,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.ratingPeriodStart.startsWith(value),
    },
    {
      title: "Rating Period End",
      dataIndex: "ratingPeriodEnd",
      key: "ratingPeriodEnd",
      width: 300,
      Ellipsis: true,
      sorter: (a, b) => a.ratingPeriodEnd.localeCompare(b.ratingPeriodEnd),
      filters: Array.from(new Set(targets.map(item => item.ratingPeriodEnd))).map((end, index) => ({
        text: end,
        value: end,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.ratingPeriodEnd.startsWith(value),
    },
    {
      title: "Site Reference",
      dataIndex: "siteRef",
      key: "siteRef",
      width: 200,
      Ellipsis: true,
      sorter: (a, b) => a.siteRef.localeCompare(b.siteRef),
      filters: Array.from(new Set(targets.map(item => item.siteRef))).map((siteRef, index) => ({
        text: siteRef,
        value: siteRef,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.siteRef.startsWith(value),
    },
    ...dynamicColumns(targets),
    {
      title: "Actions",
      dataIndex: "delete",
      key: "delete",
      width: 200,
      Ellipsis: true,
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
  const targetWidgets = (widget) => {
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
    setTargetId(record.id);
    const startDate = moment(record.ratingPeriodStart); // You can set any date you want here
    const endDate = moment(record.ratingPeriodEnd); // You can set any date you want here
    
    form.setFieldsValue({
      ratingPeriodEnd: endDate,
    });
    form.setFieldsValue({
      ratingPeriodStart: startDate,
    });
    setOpen(true);
    setNewForm(false);
  };

  const content = (record) => (
    <div style={{marginLeft:"10px", backgroundColor:"#0A1016",paddingTop:"10px", marginRight:"10px",paddingLeft:"10px", paddingRight:"10px"}}>
      <a onClick={() => onEdit(record)} style={{ color: "white" }}>EDIT</a>
      <Divider type="horizontal" style={{ margin: "5px" }} />
      <a onClick={() => onDelete(record.id)} style={{ color: "white",display:"none  " }}>DELETE</a>
    </div>
  )

  let targetConfigData = []
  const getData = async (dataValues) => {
    setIsLoading(true);

    try {

      var targetsData = {};
      if (dataValues === 1) {
        targetsData = await getApiDataFromAws("queryType=elecTargetProfile")
        targetConfigData = await getConfigDataFromAws("elecTargetProfile")
      } else if (dataValues === 2) {
        targetsData = await getApiDataFromAws("queryType=waterTargetProfile")
        targetConfigData = await getConfigDataFromAws("waterTargetProfile")
        // setIsEditable(targetConfigData);
      } else if (dataValues === 3) {
        targetsData = await getApiDataFromAws("queryType=gasTargetProfile")
        targetConfigData = await getConfigDataFromAws("gasTargetProfile")
      }

      const sitesList = await getApiDataFromAws("queryType=dropdownSite");
      setSiteListData(sitesList);

      setTargets(targetsData);
      setTargetTempData(targetsData);
      setIsEditables(targetConfigData)
      setloading(false);
      setIsLoading(false);
    } catch (error) { }
  };

  const setData = async () => {
    try {
      var formData = form.getFieldsValue();

      var objecttoPass = null;

      var functionName = "";
      var typeName = ""
      if(activeButton == 1){
        functionName = 'createElecTargetProfileRecordsFromJson';
        const modifiedFormData = {
          ...formData, 
          siteName: formData.name,
          ratingPeriodStart: formData.ratingPeriodStart.toDate().toISOString().split("T")[0],
          ratingPeriodEnd: formData.ratingPeriodEnd.toDate().toISOString().split("T")[0],
          pointId: formData.point,
          targetKwh0:Number(formData.targetKwh0),
          targetKwh1:formData.targetKwh1==""?0:Number(formData.targetKwh1),
          targetKwh2:formData.targetKwh2==""?0:Number(formData.targetKwh2),
          currentRating:Number(formData.currentRating),
          targetRating:Number(formData.targetRating)

        };
        const { name, point, ...objectWithoutName } = modifiedFormData;
        objecttoPass = objectWithoutName;
        typeName = "Electric"
      }else if(activeButton == 2){
        functionName = 'createWaterTargetProfileRecordsFromJson';
        const modifiedFormData = {
          ...formData, 
          siteName: formData.name,
          ratingPeriodStart: formData.ratingPeriodStart.toDate().toISOString().split("T")[0],
          ratingPeriodEnd: formData.ratingPeriodEnd.toDate().toISOString().split("T")[0],
          pointId: formData.point,
          targetKl0:Number(formData.targetKl0),
          targetKl1:formData.targetKl1==""?0:Number(formData.targetKl1),
          targetKl2:formData.targetKl2==""?0:Number(formData.targetKl2),
          currentRating:Number(formData.currentRating),
          targetRating:Number(formData.targetRating)

        };
        const { name, point, ...objectWithoutName } = modifiedFormData;
        objecttoPass = objectWithoutName;
        typeName = "Water"
      }else if(activeButton == 3){
        functionName = 'createGasTargetProfileRecordsFromJson';
        const modifiedFormData = {
          ...formData, 
          siteName: formData.name,
          ratingPeriodStart: formData.ratingPeriodStart.toDate().toISOString().split("T")[0],
          ratingPeriodEnd: formData.ratingPeriodEnd.toDate().toISOString().split("T")[0],
          pointId: formData.point,
          targetCum0:Number(formData.targetCum0),
          targetCum1:formData.targetCum1==""?0:Number(formData.targetCum1),
          targetCum2:formData.targetCum2==""?0:Number(formData.targetCum2),
          currentRating:Number(formData.currentRating),
          targetRating:Number(formData.targetRating)

        };
        const { name, point, ...objectWithoutName } = modifiedFormData;
        objecttoPass = objectWithoutName;
        typeName = "Gas"
      }

      if (targetId) {
        const res = await targetEdit(targetId, formData)
      }
      else {
        const body = {
          funcName: functionName,
          recList: [objecttoPass]
        };
        const addNewTarget = await postApiDataToAws(body)
        if (addNewTarget && addNewTarget.message ==="Success") {
          // console.log(typeName +' target added successfully:', addNewTarget);
          message.success(typeName + ' target added successfully');
        } else {
          // console.log('Failed to add target for ' + typeName, addNewTarget);
          message.error('Failed to add target for ' + typeName);
        }
      }
      getData(activeButton);
      onCancelModal();
    }
    catch(error){
      console.log(error)
    }
  }
  const onChangeText = (text) => {
    setSearchText(text);
    searchFilter(text);
    if (text === "" || !text) {
      setTargets(targetTempData)
    }
  }
  const searchFilter = (text) => {
    const filterData = targets.filter((record) => (
      record.name.toLowerCase().includes(text.toLowerCase())
    ))
    setTargets(filterData)
  }

  const getDefaultUnit = (activeButton) => {

    switch (activeButton) {
      case 1:
        return "kwh";
      case 2:
        return "kl";
      case 3:
        return "cubic_meters_natural_gas";
      default:
        return "";
    }
  };

  useEffect(() => {
    form.setFieldsValue({ unit: getDefaultUnit(activeButton) });
  }, [activeButton, onCancelModal]);

  useEffect(() => {
    getData(1);
    setActiveButton(1);
  }, []);
    const handleSelectColumns = (selectedCoumns) => {
          setVisibleColumns(selectedCoumns)
    }

  return (
    <div className="App">
      <Row>
        <Col span={15}>
          <Radio.Group>
            <Radio.Button className="ant-radio-button-css" style={{
              fontWeight: activeButton === 1 ? 'bold' : 'normal',
              color: activeButton === 1 ? '#FFFFFF' : '#8E8E8E',
            }} onClick={() => targetWidgets(1)} >Electric</Radio.Button>
            <Radio.Button className="ant-radio-button-css"
              style={{
                fontWeight: activeButton === 2 ? 'bold' : 'normal',
                color: activeButton === 2 ? '#FFFFFF' : '#8E8E8E',
              }}
              onClick={() => targetWidgets(2)} >Water</Radio.Button>
            <Radio.Button className="ant-radio-button-css"
              style={{
                fontWeight: activeButton === 3 ? 'bold' : 'normal',
                color: activeButton === 3 ? '#FFFFFF' : '#8E8E8E',
              }}
              onClick={() => targetWidgets(3)} >Gas</Radio.Button>
          </Radio.Group>
          <button
            className="mb-4 ml-4 custom-button"
            type="primary"
            onClick={onOpenModal}
          >
            {activeButton === 2 ? "Add New Water"
              : activeButton === 3 ? "Add New Gas" :
                "Add New Electric"}
          </button>
        </Col>
        <Col span={9} style={{ marginBottom: 10, textAlign: 'right' }}>
          <Form>
            <Input
              size="small"
              placeholder="search here ..."
              value={searchText}
              onChange={(e) => onChangeText(e.target.value)}
              className='custom-input'
            />
            <SelectColumns columns={columns} onSelectColumns={handleSelectColumns}/>
          </Form>
        </Col>
      </Row>
      <Modal
        style={{ textAlign: "left" }}
        title={activeButton === 2 ? "Add New Water Target Profile" :
          activeButton === 3 ? "Add New Gas Target Profile" : "Add New Electric Target Profile"}
        centered
        open={open}
        onCancel={() => onCancelModal()}
        width={700}
        footer={null}
        maskClosable={false}
      >
        <Form
          // {...layout}
          name="nest-messages"
          layout="vertical"
          onFinish={setData}
          style={{ maxWidth: 1000 }}
          form={form}
          validateMessages={validateMessages}
         
        >
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                label="Select Site"
                wrapperCol={24}
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: 'Please Select Site.',
                  },
                ]}
              >
                <Select
                  placeholder="Select Site"
                  value={selectedItem}
                  onClick={setSelectedItem}
                  size='large'
                  style={{ width: "100%" }}
                  disabled = {newForm?false:isFieldEditable("siteName")}
                  
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
                name={"currentRating"}
                label="Current Rating"
                wrapperCol={24}
                rules={[
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Please enter a valid number for the Current Rating.',
                  },
                  {
                    min: 0,
                    max: 6,
                    message: 'Please enter a number between 0 and 6 for the Current Rating.',
                  },
                  {
                    required: true,
                    message: 'Please enter the Current Rating.',
                  },
                ]}>
                <Input className='form_input' type="number" min={0} max={6}/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"targetRating"}
                label="Target Rating"
                wrapperCol={24}
                rules={[
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Please enter a valid number for the Target Rating.',
                  },
                  {
                    min: 0,
                    max: 6,
                    message: 'Please enter a number between 0 and 6 for the Target Rating.',
                  },
                  {
                    validator: (_, value) => {
                      const currentRating = form.getFieldValue('currentRating');
                      if (value && currentRating && value <= currentRating) {
                        return Promise.reject('Target Rating should be greater than Current Rating.');
                      }
                      return Promise.resolve();
                    },
                  },
                  {
                    required: true,
                    message: 'Please enter the Target Rating.',
                  },
                ]}>
                <Input className='form_input' type="number" min={0} max={6}/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"ratingPeriodStart"}
                label="Rating Period Start"
                wrapperCol={24}
                rules={[
                  {
                    required: true,
                    message: 'Please Select Rating Period Start.',
                  },
                ]}>
                  <DatePicker
                    className='form_input dtPicker'
                    format={DATE_FORMAT}
                    readOnly={newForm ? false : !isFieldEditable('ratingPeriodStart')}
                  />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"ratingPeriodEnd"}
                label="Rating Period End"
                wrapperCol={24}
                rules={[
                  {
                    required: true,
                    message: 'Please Select Rating Period End.',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const startDate = getFieldValue('ratingPeriodStart');
                      if (!startDate || !value) {
                        return Promise.resolve();
                      }
          
                      const diffInDays = value.diff(startDate, 'days');
                      const isValid = diffInDays >= 363 && diffInDays <= 365;
          
                      return isValid
                        ? Promise.resolve()
                        : Promise.reject('The difference in days should be between 363 and 365.');
                    },
                  }),
                ]}>
                  <DatePicker
                    className='form_input dtPicker'
                    format={DATE_FORMAT}
                    readOnly={newForm ? false : !isFieldEditable('ratingPeriodEnd')}
                  />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={activeButton === 2 ? "targetKl0" : activeButton === 3 ? "targetCum0" : "targetKwh0"}
                label={activeButton === 2 ? "Target Kl0" : activeButton === 3 ? "Target Cum0" : "Target kwh0"}
                wrapperCol={24}
                rules={[
                  {
                    required: true,
                    message: 'Please enter Target value.',
                  },
                ]}>
                <Input className='form_input' type="number" readOnly={newForm?false:activeButton===2?isFieldEditable('targetKl0'):activeButton===3?isFieldEditable("targetCum0"):
              isFieldEditable('targetKwh0')}/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={activeButton === 2 ? "targetKl1" : activeButton === 3 ? "targetCum1" : "targetKwh1"}
                label={activeButton === 2 ? "Target Kl1" : activeButton === 3 ? "Target Cum1" : "Target kwh1"}
                wrapperCol={24}
                initialValue="">
                <Input className='form_input' type="number" readOnly={newForm?false:activeButton===2?isFieldEditable('targetKl1'):activeButton===3?isFieldEditable('targetCum1'):isFieldEditable('targetKwh1')}/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={activeButton === 2 ? "targetKl2" :activeButton === 3 ? "targetCum2": "targetKwh2"}
                label={activeButton === 2 ? "Target kl2" :activeButton === 3 ? "Target Cum2": "Target Kwh2"}
                wrapperCol={24}
                initialValue="">
                <Input className='form_input' type='number' readOnly={newForm?false:activeButton===2?isFieldEditable('targetKl2'):isFieldEditable('targetKwh2')}/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"unit"}
                label="Unit"
                wrapperCol={24}>
                <Input
                  className='form_input'
                  readOnly={newForm?true:isFieldEditable("unit")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"point"}
                label="Point ID"
                initialValue=""
                wrapperCol={24}>
                <Input className='form_input' readOnly/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[30, 30]}>
            <Col span={24} className='custom-modal-column'>
              <button className='custom-modal-button' type='' htmlType='' onClick={() => onCancelModal()}>Cancel</button>
              <button type='primary' htmlType="submit" >Save</button>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Spin spinning={isLoading} size="large" indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}>
        <Table
          columns={visibleColumns.length>0? columns.filter((item) => visibleColumns.includes(item.key)):columns}
          dataSource={targets}
          scroll={{
            x: 1000,
            y: screenHeight
          }}
          pagination={{
            total:totalRows,
            showTotal:(total, range) => (`Total Targets ${total}`)
          }}
        />
      </Spin>
    </div>
  );
}

export default Targets;