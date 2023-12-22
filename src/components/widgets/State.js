import React from "react";
import {Table} from "antd";
export default function State() {

    const columns = [
        {
          title: "Achut Gite Title",
          dataIndex: "masterType",
          key: "masterType",
        },
        {
          title: "Energy Type",
          dataIndex: "eneryType",
          key: "eneryType",
        },
        {
          title: "Measurments",
          dataIndex: "measurments",
          key: "measurments",
        },
        {
          title: "Edit",
          dataIndex: "edit",
          key: "edit",
        },
        {
          title: "Delete",
          dataIndex: "delete",
          key: "delete",
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
          masterType: "Electricity",
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
