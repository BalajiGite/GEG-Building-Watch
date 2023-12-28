import React from 'react';
import { Button, Row, Col, Modal } from "antd";
import { Form, Input, Table, Divider, Spin } from "antd";
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


  const dynamicColumns = (data) => {
    const dynamicColumns = [];

    // Add logic here to extract dynamic column information from the data structure
    // For example, if "stateRef" exists in any of the items, add a column for it
    if (data.some(item => item.elecTargetProfile)) {
      dynamicColumns.push({
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
      });
    }
    if (data.some(item => item.targetKwh0)) {
      dynamicColumns.push({
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
      })
    }

    if (data.some(item => item.targetKwh1)) {
      dynamicColumns.push({
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
      })
    }

    if (data.some(item => item.targetKwh2)) {
      dynamicColumns.push({
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
      })
    }
    if (data.some(item => item.waterTargetProfile)) {
      dynamicColumns.push({
        title: "Water Target Profile",
        dataIndex: "waterTargetProfile",
        key: "waterTargetProfile",
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
    ...dynamicColumns(targets),
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
      <Spin spinning={isLoading}>
        <Table
          bordered
          columns={columns}
          dataSource={targets}
          scroll={{
            x: 1000,
          }}
        />
      </Spin>
    </div>
  );
}

export default Targets;