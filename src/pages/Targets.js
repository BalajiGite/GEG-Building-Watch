import React from 'react';
import { Button, Row, Col, Modal } from "antd";
import { Form, Input, Table } from "antd";
import Electric from '../components/widgets/targetswidgest/Electric';
import Water from '../components/widgets/targetswidgest/Water';
import Gas from '../components/widgets/targetswidgest/Gas';
import { useState } from 'react';


function Targets() {
  const [targetWidget, setTargetWidget] = useState(1);
  const [activeButton, setActiveButton] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setloading] = useState(true);
  const [open, setOpen] = useState(false);


  const columns = [
    {
      title: "Electric",
      dataIndex: "masterType",
      key: "masterType",
    },
    {
      title: "Name Id",
      dataIndex: "eneryType",
      key: "eneryType",
    },
    {
      title: "Current RatingIng",
      dataIndex: "measurments",
      key: "measurments",
    },
    {
      title: "Projet ID",
      dataIndex: "edit",
      key: "edit",
    },
    {
      title: "Unit",
      dataIndex: "delete",
      key: "delete",
    },
    {
        title:"Elect Target Profile",
        dataIndex: "electTarget",
        key:"electtarget"
    },
  ];

  const data = [
    {
      key: "1",
      masterType: "Water",
      eneryType: "CT Water",
      measurments: "1.Kilo Liters-kL",
      edit: "",
      delete: "",
    },
    {
      key: "2",
      masterType: "Water",
      eneryType: "Electricity kVAh",
      measurments: "1.kWh-kWh",
      edit: "",
      delete: "",
    },
    {
      key: "3",
      masterType: "Electricity",
      eneryType: "Electricity-Kitchen",
      measurments: "1.Kilo Liters-kL",
      edit: "",
      delete: "",
    },
    {
      key: "4",
      masterType: "Electricity",
      eneryType: "CT Water",
      measurments: "1.Electricity-MCC1",
      edit: "",
      delete: "",
    },
  ];
  
  const targetWidgets = (widget) => {
      setActiveButton(widget);
      setTargetWidget(widget);
  }


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
        dataSource={data}
        scroll={{
          x: 1000,
        }}
      />
    </div>
  );
}

export default Targets;