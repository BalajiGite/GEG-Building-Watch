import React from "react";
import { Button, Modal, Table } from "antd";
import { useState } from "react";

function HolidayConf(props) {
  const { openHoliday, setOpenHoliday } = props;

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.date.indexOf(value) === 0,
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ["descend"],
    },
    {
      title: "Day",
      dataIndex: "day",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Holiday",
      dataIndex: "holiday",
      width: "40%",
      //   filters: [
      //     {
      //       text: "Day",
      //       value: "Day",
      //     },
      // {
      //   text: "New York",
      //   value: "New York",
      // },
      //   ],
      // onFilter: (value, record) => record.day.indexOf(value) === 0,
    },
  ];
  const data = [
    {
      key: "1",
      date: "1 Jan",
      day: "Sunday",
      holiday: "New Year Day",
    },
    {
      key: "2",
      date: "2 Jan",
      day: "Monday",
      holiday: "New Year Holiday",
    },
    {
      key: "3",
      date: "26 Jan",
      day: "Thurday",
      holiday: "Astrelia Day",
    },
    {
      key: "4",
      date: "7 Apr",
      day: "Friday",
      holiday: "Good Friday",
    },
    {
      key: "5",
      date: "8 Apr",
      day: "Saturday",
      holiday: "Day Following Good Friday",
    },
    {
      key: "6",
      date: "9 Apr",
      day: "Sunday",
      holiday: "Easter Sunday",
    },
    {
      key: "7",
      date: "10 Apr",
      day: "Monday",
      holiday: "Easter Monday",
    },
    {
      key: "8",
      date: "25 Apr",
      day: "Tuesday",
      holiday: "Anzac Day",
    },

  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setOpen(true)}>
          Open Modal
        </Button> */}
      <Modal
        title="Holidays"
        centered
        open={openHoliday}
        onOk={() => setOpenHoliday(false)}
        onCancel={() => setOpenHoliday(false)}
        width={900}
        footer={null}
      >
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Modal>
    </>
  );
}

export default HolidayConf;
