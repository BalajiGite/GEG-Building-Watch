import React from 'react';
import { Button, Row, Col, Modal } from "antd";
import { Form, Input, Table, Divider } from "antd";
import { useState, useEffect } from 'react';
import { getApiDataFromAws, postApiDataToAws } from "../services/apis";


function Targets() {
  const [targetWidget, setTargetWidget] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const [targets, setTargets] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();



  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Electricity Target Profile",
      dataIndex: "elecTargetProfile",
      key: "elecTargetProfile",
      sorter: (a, b) => a.elecTargetProfile.localeCompare(b.elecTargetProfile),
      filters: Array.from(new Set(targets.map(item => item.elecTargetProfile))).map((profile, index) => ({
        text: profile,
        value: profile,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.elecTargetProfile.startsWith(value),
    },
    {
      title: "Target kWh 0",
      dataIndex: "targetKwh0",
      key: "targetKwh0",
      sorter: (a, b) => parseFloat(a.targetKwh0) - parseFloat(b.targetKwh0),
      filters: Array.from(new Set(targets.map(item => item.targetKwh0))).map((kwh, index) => ({
        text: kwh,
        value: kwh,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.targetKwh0.startsWith(value),
    },
    {
      title: "Target Rating",
      dataIndex: "targetRating",
      key: "targetRating",
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
      title: "Target kWh 2",
      dataIndex: "targetKwh2",
      key: "targetKwh2",
      sorter: (a, b) => parseFloat(a.targetKwh2) - parseFloat(b.targetKwh2),
      filters: Array.from(new Set(targets.map(item => item.targetKwh2))).map((kwh, index) => ({
        text: kwh,
        value: kwh,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.targetKwh2.startsWith(value),
    },
    {
      title: "Target kWh 1",
      dataIndex: "targetKwh1",
      key: "targetKwh1",
      sorter: (a, b) => parseFloat(a.targetKwh1) - parseFloat(b.targetKwh1),
      filters: Array.from(new Set(targets.map(item => item.targetKwh1))).map((kwh, index) => ({
        text: kwh,
        value: kwh,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.targetKwh1.startsWith(value),
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
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
      sorter: (a, b) => a.siteRef.localeCompare(b.siteRef),
      filters: Array.from(new Set(targets.map(item => item.siteRef))).map((siteRef, index) => ({
        text: siteRef,
        value: siteRef,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.siteRef.startsWith(value),
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "delete",
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
      setTargetWidget(widget);
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

      var targetsData = [];
      if (dataValues === 1) {
        targetsData = await getApiDataFromAws("queryType=elecTargetProfile")
      } else if (dataValues === 2) {
        targetsData = await getApiDataFromAws("queryType=waterTargetProfile")
      } else if (dataValues === 3) {
        targetsData = await getApiDataFromAws("queryType=gasTargetProfile")
      }
      setTargets(targetsData);
      setloading(false);
      setIsLoading(false);
    } catch (error) { }
  };

  useEffect(() => {
    getData(1);
    setActiveButton(1);
  }, []);

  return (
    <div className="App">
      <Row>
        <Col span={17} style={{ marginBottom: 20 }}></Col>
        <Col span={7} style={{ marginBottom: 20 }}>
          <Form>
            <Input
              size="small"
              placeholder="search here ..."
              value={""}
            // onChange={(e) => onChangeText(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Button type={activeButton === 1 ? 'primary' : 'button'} onClick = {()=>targetWidgets(1)}>Electric</Button>
      <Button type={activeButton === 2 ? 'primary' : 'button'} onClick = {()=> targetWidgets(2)}>Water</Button>
      <Button type={activeButton === 3 ? 'primary' : 'button'} onClick = {()=> targetWidgets(3)}>Gas</Button>
      <Button
        className="mb-4 ml-4"
        type="primary"
      // onClick={() => setOpen(true)}
      >
        Add Targets
      </Button>
      <Table
        bordered
        columns={columns}
        dataSource={targets}
        scroll={{
          x: 1000,
        }}
      />
    </div>
  );
}

export default Targets;