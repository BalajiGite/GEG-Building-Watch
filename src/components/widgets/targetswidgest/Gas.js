import React from "react";
import {Table} from "antd";
export default function Gas() {

    const columns = [
        {
          title: "Gas",
          dataIndex: "masterType",
          key: "masterType",
        },
        {
          title: "Name",
          dataIndex: "eneryType",
          key: "eneryType",
        },
        {
          title: "Current Rating",
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
  return (
    <>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1000,
        }}
      />
    </>
  );
}
