import React from "react";
import { useEffect, useContext } from "react";
import Region from "../components/widgets/Region";
import Level from "../components/widgets/Level";
import { getApiDataFromAws, getConfigDataFromAws, postApiDataToAws } from "../services/apis";
import { SelectColumns } from "../components/widgets/SelectedColumns/SelectedColumns";
import {
  Select, Divider, Modal, Table, Form,
  Input, Button, Card, Col, Row, Spin,
  Popover, ConfigProvider, Radio,message,Tooltip
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import spinnerjiff from "../assets/images/loader.gif";
import { isAuthenticated, userInfo } from "../services/apis";
import { useHistory } from 'react-router-dom';
import { AppContext } from "../App";
import { CSVLink } from 'react-csv';
import ResizableTable from "../components/widgets/ResizeTable/ResizableTable";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {};


function Config() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setloading] = useState(true);
  const [locationData, setLocationData] = useState([]);
  const [siteListData, setSiteListData] = useState([]);
  const [stateListData, setStateListData] = useState([]);
  const [projectListData, setProjectListData] = useState([]);
  const [recordId, setRecordId] = useState();
  const [activeButton, setActiveButton] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [templocationData, setTempLocationData] = useState([])
  const [isEditable , setIsEditable] = useState();
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [form] = Form.useForm();
  const context = useContext(AppContext);
  const history = useHistory();

  const screenHeight = window.innerHeight - 310;
  const totalRows = locationData.length;

  const dynamicColumns = (data) => {
    const dynamicColumns = [];

    // Add logic here to extract dynamic column information from the data structure
    // For example, if "stateRef" exists in any of the items, add a column for it
    if (data.some(item => item.stateRef)) {
      dynamicColumns.push({
        title: "State Ref",
        dataIndex: "stateRef",
        key: "stateRef",
        ellipsis: true,
        width: 160,
        sorter: (a, b) => a.stateRef.localeCompare(b.stateRef),
        filters: Array.from(new Set(data.map(item => item.stateRef))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: false,
        onFilter: (value, record) => record.stateRef.startsWith(value),
      });
    }
    if (data.some(item => item.region)) {
      dynamicColumns.push({
        title: "Region",
        dataIndex: "region",
        key: "region",
        ellipsis: true,
        width: 160,
        sorter: (a, b) => a.region.localeCompare(b.region),
        filters: Array.from(new Set(locationData.map(item => item.region))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: false,
        onFilter: (value, record) => record.region.startsWith(value),
      })
    }

    if (data.some(item => item.state)) {
      dynamicColumns.push({
        title: "State",
        dataIndex: "state",
        key: "state",
        ellipsis:true,
        width:150,
        sorter: (a, b) => a.state.localeCompare(b.state),
        filters: Array.from(new Set(locationData.map(item => item.state))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: false,
        onFilter: (value, record) => record.state.startsWith(value),
      })
    }

    if (data.some(item => item.level)) {
      dynamicColumns.push({
        title: "Level",
        dataIndex: "level",
        key: "level",
        ellipsis:true,
        width:150,
        sorter: (a, b) => a.level.localeCompare(b.level),
        filters: Array.from(new Set(locationData.map(item => item.level))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: false,
        onFilter: (value, record) => record.level.startsWith(value),
      })
    }
    if (data.some(item => item.siteRef)) {
      dynamicColumns.push({
        title: "Site",
        dataIndex: "siteRef",
        key: "siteRef",
        ellipsis:true,
        width:150,
        sorter: (a, b) => a.siteRef.localeCompare(b.siteRef),
        filters: Array.from(new Set(locationData.map(item => item.siteRef))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: false,
        onFilter: (value, record) => record.siteRef.startsWith(value),
      })
    }
    if (data.some(item => item.projId)) {
      dynamicColumns.push({
        title: "Project ID",
        dataIndex: "projId",
        key: "projId",
        ellipsis: true,
        width: 200,
        sorter: (a, b) => a.projId.localeCompare(b.projId),
        filters: Array.from(new Set(locationData.map(item => item.projId))).map((name, index) => ({
          text: name,
          value: name,
        })),
        filterMode: "tree",
        filterSearch: false,
        onFilter: (value, record) => record.projId.startsWith(value),
      })
    }
    return dynamicColumns;
  };
  const columns = [
    
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: Array.from(new Set(locationData.map(item => item.name))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.name.startsWith(value)
    },
    ...dynamicColumns(locationData),
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      width: 200,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "delete",
      ellipsis: true,
      width:150,
      render: (text, record, index) => (
        isEditable?
        <>
          <ConfigProvider>
            <Popover overlayStyle={{ width: '100px' }} placement="right" content={() => content(record)}>
              <EllipsisOutlined style={{ fontSize: "30px" }} />
            </Popover>
          </ConfigProvider>
        </>
        :null
      ),
    },
  ];

  const onOpenModal = () => {
    setOpen(true);
    form.resetFields();
  };

  const onCancelModal = () => {
    setOpen(false);
    //SetPointsId();
    form.resetFields();
  };

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
      let locationConfigData;
      var locationData = [];
      if (dataValues === 1) {
        locationData = await getApiDataFromAws("queryType=state")
        locationConfigData = await getConfigDataFromAws("state")
        setIsEditable(locationConfigData.isEditable)
      } else if (dataValues === 2) {
        locationData = await getApiDataFromAws("queryType=region")
        locationConfigData = await getConfigDataFromAws("region")
        setIsEditable(locationConfigData.isEditable)  

      } else if (dataValues === 3) {
        locationData = await getApiDataFromAws("queryType=level")
        locationConfigData = await getConfigDataFromAws("level")
        setIsEditable(locationConfigData.isEditable)  
      }

      const sitesList = await getApiDataFromAws("queryType=dropdownSite");
      setSiteListData(sitesList);

      const stateList = await getApiDataFromAws("queryType=dropdownState");
      setStateListData(stateList);

      const projectList = await getApiDataFromAws("queryType=dropdownProjId");
      setProjectListData(projectList);

      setLocationData(locationData);
      setTempLocationData(locationData);
      setloading(false);
      setIsLoading(false);
      if(searchText !=""){
        filterData(searchText, locationData)
      }
    } catch (error) { }
  };

  const onChangeSelectedValue = (value) => {
    
    if (value == "" || !value || value.length < searchText.length) {
      setLocationData(templocationData);
      setSearchText(value);
      filterData(value, templocationData);
    }else{
      setSearchText(value);
      filterData(value, locationData);
    }
  }

  const filterData = (value, data) => {
    const filtersData = data.filter((record) => (
      record.name.toLowerCase().includes(value.toLowerCase()) ||
      record?.stateRef?.toLowerCase().includes(value.toLowerCase()) ||
      record?.siteRef?.toLowerCase().includes(value.toLowerCase())
    ));
    setLocationData(filtersData)
  }
  const exportToCSV = () => {
    const csvData = locationData.map(item => ({
      ...item, // Assuming mpReadings is an array of objects
    }));

    return csvData;
  };
  const setData = async () => {
    try {

      var formData = form.getFieldsValue();

      var objecttoPass = null;

      var functionName = "";
      var typeName = ""
      if(activeButton == 1){
        functionName = 'createStateRecordsFromJson';
        const modifiedFormData = {
          ...formData, 
          stateName: formData.name,
        };
        const { name, ...objectWithoutName } = modifiedFormData;
        objecttoPass = objectWithoutName;
        typeName = "State"
      }else if(activeButton == 2){
        functionName = 'createRegionRecordsFromJson';
        const modifiedFormData = {
          ...formData, 
          regionName: formData.name,
          stateName:formData.stateRef
        };
        const { name,stateRef, ...objectWithoutName } = modifiedFormData;
        objecttoPass = objectWithoutName;
        typeName = "Region"
      }else if(activeButton == 3){
        functionName = 'createLevelRecordsFromJson';
        const modifiedFormData = {
          ...formData, 
          levelName: formData.name,
          siteName:formData.siteRef
        };
        const { level,siteRef, ...objectWithoutName } = modifiedFormData
        objecttoPass = objectWithoutName;
        typeName = "Level"
      }

      if (recordId) {
        //const resp = await editSites(recordId, formData);
      } else {
        const body = {
          funcName: functionName,
          recList: [objecttoPass]
        };
        const addNewLoc = await postApiDataToAws(body)
        if (addNewLoc && addNewLoc.message ==="Success") {
          // console.log(typeName +' added successfully:', addNewLoc);
          message.success(typeName + ' added successfully');
        } else {
          // console.log('Failed to add ' + typeName, addNewLoc);
          message.error('Failed to add ' + typeName);
        }
      }
      onCancelModal();
      getData(activeButton);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const authenticated = isAuthenticated()
    if(authenticated){
      getData(1);
      setActiveButton(1);
    }else {
      var userData = userInfo(context.token);
      if(userData == null){
        history.push('/');
      }else{
        getData(1);
        setActiveButton(1);
      }
    }
  }, []);

  const content = (record) => (
    <div style={{marginLeft:"10px", backgroundColor:"#0A1016",paddingTop:"10px", marginRight:"10px",paddingLeft:"10px", paddingRight:"10px"}}>
      <a onClick={() => onEdit(record)} style={{color:"white"}}>EDIT</a>
      <Divider type="horizontal" style={{ margin: "5px" }} />
      <a onClick={() => onDelete(record.id)} style={{color:"white",display:"none"}}>DELETE</a>
    </div>
  )
      const handleSelectColumns = (SelectColumns) => {
        setVisibleColumns(SelectColumns);
      }

  const activeWidgestInputFields = () => {
    switch (activeButton) {
      case 1:
        return (
          <>
            <Row justify={"center"}>
              <Col span={24}>
                <Form.Item
                  name={"name"}
                  label="State Name"
                  // labelCol={{ span: 4 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter State Name.',
                    },
                  ]}
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
                  name={"name"}
                  label="Region Name"
                  // labelCol={{ span: 4 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Region Name.',
                    },
                  ]}
                >
                  <Input className="form_input" />
                </Form.Item>
              </Col>
            </Row>
            <Row justify={"center"}>
              <Col span={24}>
                <Form.Item
                  name={"stateRef"}
                  label="Select State"
                  // labelCol={{ span: 4 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please Select State.',
                    },
                  ]}
                >
                  <Select
                    placeholder="Selct State"
                    style={{ width: "100" }}>
                    {stateListData.length > 0 &&
                      stateListData.map((item, index) => (
                        <Select.Option key={index} value={item.name}>{item.name}</Select.Option>
                      ))
                    }
                  </Select>
                  {/* <Input className="form_input" /> */}
                </Form.Item>
              </Col>
            </Row>
            <Row justify={"center"}>
              <Col span={24}>
                <Form.Item
                  name={"projId"}
                  label="Select Project"
                  // labelCol={{ span: 4 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please Select Project.',
                    },
                  ]}
                >
                  <Select
                    placeholder="Selct Project"
                    style={{ width: "100" }}>
                    {projectListData.length > 0 &&
                      projectListData.map((item, index) => (
                        <Select.Option key={index} value={item.projId}>{item.projName}</Select.Option>
                      ))
                    }
                  </Select>
                  {/* <Input className="form_input" /> */}
                </Form.Item>
              </Col>
            </Row>
          </>
        )
      case 3:
        return (
          <>
            <Row justify={"center"}>
              <Col span={24}>
                <Form.Item
                  name={"name"}
                  label="Level Name"
                  // labelCol={{ span: 4 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Level Name.',
                    },
                  ]}
                >
                  <Input className="form_input" />
                </Form.Item>
              </Col>
            </Row>
            <Row justify={"center"}>
              <Col span={24}>
                <Form.Item
                  name={"siteRef"}
                  label="Select Site Name"
                  // labelCol={{ span: 4 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please Select Site Name.',
                    },
                  ]}
                >
                  <Select
                    placeholder="Selct Site Name"
                    style={{ width: "100" }}>
                    {siteListData.length > 0 &&
                      siteListData.map((item, index) => (
                        <Select.Option key={index} value={item.name}>{item.name}</Select.Option>
                      ))
                    }
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
        <Col span={12}>
          <Radio.Group>
            <Radio.Button className="ant-radio-button-css" style={{
              fontWeight: activeButton === 1 ? 'bold' : 'normal',
              color: activeButton === 1 ? '#FFFFFF' : '#8E8E8E',
            }} onClick={() => changeWidgets(1)} >State</Radio.Button>
            <Radio.Button className="ant-radio-button-css"
              style={{
                fontWeight: activeButton === 2 ? 'bold' : 'normal',
                color: activeButton === 2 ? '#FFFFFF' : '#8E8E8E',
              }}
              onClick={() => changeWidgets(2)} >Region</Radio.Button>
            <Radio.Button className="ant-radio-button-css"
              style={{
                fontWeight: activeButton === 3 ? 'bold' : 'normal',
                color: activeButton === 3 ? '#FFFFFF' : '#8E8E8E',
              }}
              onClick={() => changeWidgets(3)} >Level</Radio.Button>
          </Radio.Group>
          <button className="mb-4 ml-4 custom-button" type="primary" onClick={() => onOpenModal()} >
            {activeButton === 1 ? "Add New State" : activeButton === 2 ? "Add New Region" : "Add New Level"}
          </button>
        </Col>
        <Col span={12} style={{ marginBottom: 10, textAlign: 'right' }}>
            <Input
              size="small"
              placeholder="search here ..."
              value={searchText}
              onChange={(e) => onChangeSelectedValue(e.target.value)}
              className="custom-input"
            />
            <SelectColumns columns={columns} onSelectColumns={handleSelectColumns}/>
            <CSVLink data={exportToCSV()} filename={"location.csv"}>
          <button type="button" className="custom-button">Export to CSV</button>
              </CSVLink>   
        </Col>
        {/* <Col span={3} style={{ marginBottom: 10, textAlign: 'right' }}>
           
        </Col> */}
      </Row>
      <Modal
        style={{ textAlign: "left" }}
        title={activeButton == 1 ? "Add New State" : activeButton == 2 ? "Add New Region" : "Add New Level"}
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
          style={{ minWidth: "100%" }}
          layout="vertical"
          onFinish={setData}
          form={form}
          labelAlign=""
        >
          {activeWidgestInputFields()}
          <Form.Item  wrapperCol={{
              offset: 11,
              span: 16,
            }}>
            <Row>
              <Col span={20}  className="custom-modal-column">
                <button
                 className="custom-modal-button"
                  type=""
                  htmlType="button"
                  onClick={() => onCancelModal()}
                >
                  Cancel
                </button>
                <button
                  type="primary"
                  htmlType="submit"
                  //onClick={()=>setData()}
                >
                  Save
                </button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
      <Spin spinning={isLoading} size="large" indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}>
        <ResizableTable total={totalRows} name={"Locations"} screenHeight = {screenHeight} site={locationData} columnsData = {visibleColumns.length > 0 ? columns.filter((item) => visibleColumns.includes(item.key)) : columns} />
      </Spin>
    </>
  );
}

export default Config;
