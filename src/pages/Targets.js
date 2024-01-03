import React from 'react';
import { Button, Row, Col, Modal, Select } from "antd";
import { Form, Input, Table, Divider, Spin } from "antd";
import { useState, useEffect } from 'react';
import { getApiDataFromAws, postApiDataToAws } from "../services/apis";
import { targetEdit,addTarget } from '../services/targetService';
import spinnerjiff from "../assets/images/loader.gif";

function Targets() {
  const [targetWidget, setTargetWidget] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const [targets, setTargets] = useState([])
  const [targetTempData, setTargetTempData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState();
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState();
  const [form] = Form.useForm();

  const screenHeight = window.innerHeight-340;


  const onCancelModal = () => {
    setOpen(false);
    form.resetFields();
  }

  const validateMessages = {
    require: "${label} is required!",
    type:{
      email:"${lebel} is not a valid email !",
      number:"${lebel} is not a valid number",
    },
    number:{
      range:"${lebel} must be between ${min} and ${max}",
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
        width:300,
        Ellipsis:true,
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
        width:200,
        Ellipsis:true,
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
        width:200,
        Ellipsis:true,
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
        width:200,
        Ellipsis:true,
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
        width:350,
        Ellipsis:true,
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
        width:200,
        Ellipsis:true,
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
        width:200,
        Ellipsis:true,
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
        width:200,
        Ellipsis:true,
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
        width:300,
        Ellipsis:true,
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
        width:200,
        Ellipsis:true,
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
        width:200,
        Ellipsis:true,
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
      width:300,
      Ellipsis:true,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",  
      dataIndex: "name",
      key: "name",
      width:400,
      Ellipsis:true,
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
      width:200,
      Ellipsis:true,
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
      width:200,
      Ellipsis:true,
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
      width:200,
      Ellipsis:true,
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
      width:300,
      Ellipsis:true,
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
      width:300,
      Ellipsis:true,
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
      width:200,
      Ellipsis:true,
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
      width:200,
      Ellipsis:true,
      render: (text, record, index) => (
        <>
          <a
            onClick={() => {
              onEdit(record);
              console.log(record);
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
    setOpen(true);
  };

  const getData = async (dataValues) => {
    setIsLoading(true);
    try {

      var targetsData = [];
      if (dataValues === 1) {
        targetsData = await getApiDataFromAws("queryType=elecTargetProfile")
      } else if (dataValues === 2) {
        targetsData = await getApiDataFromAws("queryType=waterTargetProfile")
      } else if (dataValues === 3) {
        targetsData = await getApiDataFromAws("queryType=gasTargetProfile")
      }
      setTargets(targetsData);
      setTargetTempData(targetsData);
      setloading(false);
      setIsLoading(false);
    } catch (error) { }
  };
  const setData =  async(storeFormData) =>{

    if(targetId){
      const res = await targetEdit(targetId ,storeFormData )
    }
    else{
      const res = await addTarget(storeFormData);
    }
    onCancelModal();
  
  }
    const onChangeText = (text) =>{
      setSearchText(text);
        searchFilter(text);
        if(text===""||!text){
          setTargets(targetTempData)
        }
    }
    const searchFilter = (text) =>{
          const filterData = targets.filter((record) => (
            record.name.toLowerCase().includes(text.toLowerCase())
          ))
          setTargets(filterData)
    }

  useEffect(() => {
    getData(1);
    setActiveButton(1);
  }, []);

  return (
    <div className="App">
      <Row>
        <Col span={18} style={{ marginBottom: 20 }}>
        <Button type={activeButton === 1 ? 'primary' : 'button'} onClick = {()=>targetWidgets(1)}>Electric</Button>
      <Button type={activeButton === 2 ? 'primary' : 'button'} onClick = {()=> targetWidgets(2)}>Water</Button>
      <Button type={activeButton === 3 ? 'primary' : 'button'} onClick = {()=> targetWidgets(3)}>Gas</Button>
      <Button
        className="mb-4 ml-4"
        type="primary"
      onClick={() => setOpen(true)}
      >
       {activeButton===2?"Add New Water Target Profile"
       :activeButton===3?"Add New Gas Target Profile":
       "Add New Electric Target Profile"} 
      </Button>
        </Col>
        <Col span={6} style={{ marginBottom: 20 }}>
          <Form>
            <Input
              size="small"
              placeholder="search here ..."
              value={searchText}
            onChange={(e) => onChangeText(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Modal
        style={{ textAlign: "left" }}
        title={activeButton === 2 ? "Add New Water Target Profile" :
        activeButton === 3 ? "Add New Gas Target Profile":"Add New Electric Target Profile"}
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
          <Row justify={"center"} gutter={[30,30]}>
            <Col span={24}>
            <Form.Item 
            label = "Select Site"
            wrapperCol={24}
            name={"name"}
            >
              <Select
              placeholder ="Select Site"
              value={selectedItem}
              onClick={setSelectedItem}
              size='large'
              style={{width:"100%"}}
              >
                {[...new Set(targets.map(item => item.name))].map((item , index)=> (
                  <Select.Option key={index} value={item}>{item}</Select.Option>
                ))}

              </Select>
            </Form.Item>
            </Col>
          </Row>
          
          <Row justify={"center"} gutter={[30,30]}>
            <Col span={24}>
              <Form.Item 
              name={""}
              label="Current Rating"
              wrapperCol={24}>
                <Input className='form_input'/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30,30]}>
            <Col span={24}>
              <Form.Item 
              name={"targetRating"}
              label="Target Rating"
              wrapperCol={24}>
                <Input className='form_input'/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30,30]}>
            <Col span={24}>
              <Form.Item 
              name={"ratingPeriodStart"}
              label="Rating Period Start"
              wrapperCol={24}>
                <Input className='form_input'/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30,30]}>
            <Col span={24}>
              <Form.Item 
              name={"ratingPeriodEnd"}
              label="Rating Period End"
              wrapperCol={24}>
                <Input className='form_input'/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30,30]}>
            <Col span={24}>
              <Form.Item 
              name={activeButton===2?"targetKl0":activeButton===3?"targetCum0":"targetKwh0"}
              label={activeButton===2?"Target K10": activeButton===3?"Target Cum0":"Target kwh0"}
              wrapperCol={24}>
                <Input className='form_input'/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30,30]}>
            <Col span={24}>
              <Form.Item 
              name={activeButton===2?"targetKl1":activeButton===3?"targetCum1":"targetKwh1"}
              label={activeButton===2?"Target kl1":activeButton===3?"Target Cum1":"Target kwh1"}
              wrapperCol={24}>
                <Input className='form_input'/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30,30]}>
            <Col span={24}>
              <Form.Item 
              name={activeButton===2?"targetKl2":"targetKwh2"}
              label={activeButton===2?"Target kl2":"Target Kwh2"}
              wrapperCol={24}>
                <Input className='form_input'/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30,30]}>
            <Col span={24}>
              <Form.Item 
              name={"unit"}
              label="Unit"
              wrapperCol={24}>
                <Input className='form_input'/>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30,30]}>
            <Col span={24}>
              <Form.Item 
              name={"point"}
              label="Point ID"
              wrapperCol={24}>
                <Input className='form_input'/>
              </Form.Item>
            </Col>
          </Row>
                <Row justify={"end"} gutter={[30,30]}>
                  <Col span={7}>
                    <Button type='' htmlType='' onClick={()=>onCancelModal()}>Cancel</Button>
                    <Button type='primary' htmlType="submit" style={{marginLeft:"10px"}}>Save</Button>
                  </Col>
                </Row>
        </Form>
        </Modal>
      <Spin spinning={isLoading} size="large" indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}>
        <Table
          columns={columns}
          dataSource={targets}
          scroll={{
            x: 1000,
            y:screenHeight
          }}
        />
      </Spin>
    </div>
  );
}

export default Targets;