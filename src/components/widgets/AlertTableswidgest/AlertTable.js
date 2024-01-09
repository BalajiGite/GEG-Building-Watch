
 export const AlertTabeWidget  = ({alertTableData}) =>{
      console.log(alertTableData);
  }

export const showalertscolumns = [
    {
      title: "Alert Configuration Id",
      dataIndex: "alertconfigurationid",
      key: "1",
      width: 300,
      ellipsis: true,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Site Name",
      dataIndex: "sitename",
      key: "2",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    //   filters: Array.from(new Set(site.map(item => item.name))).map((name, index) => ({
    //     text: name,
    //     value: name,
    //   })),
    //   filterMode: "tree",
    //   filterSearch: true,
    //   onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: "Utiliy Type",
      dataIndex: "utilitytype",
      key: "3",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.area - b.area,
    //   filters: Array.from(new Set(site.map(item => item.area))).map((name, index) => ({
    //     text: name,
    //     value: name,
    //   })),
    //   filterMode: "tree",
    //   filterSearch: true,
    //   onFilter: (value, record) => record.area.startsWith(value),
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "4",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.projId.localeCompare(b.projId),
    //   filters: Array.from(new Set(site.map(item => item.projId))).map((name, index) => ({
    //     text: name,
    //     value: name,
    //   })),
    //   filterMode: "tree",
    //   filterSearch: true,
    //   onFilter: (value, record) => record.projId.startsWith(value),
    },
    {
      title: "Report Type",
      dataIndex: "reporttype",
      key: "5",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => (a.site === b.site ? 0 : a.site ? -1 : 1),
      render: (text) => (text ? "True" : "False"),
    //   filters: Array.from(new Set(site.map(item => item.site))).map((name, index) => ({
    //     text: name,
    //     value: name,
    //   })),
    //   filterMode: "tree",
    //   filterSearch: true,
    //   onFilter: (value, record) => record.site.startsWith(value),
    },
    {
      title: "Start Date",
      dataIndex: "startdate",
      key: "6",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.armsProjectId.localeCompare(b.armsProjectId),
    //   filters: Array.from(new Set(site.map(item => item.armsProjectId))).map((name, index) => ({
    //     text: name,
    //     value: name,
    //   })),
    //   filterMode: "tree",
    //   filterSearch: true,
    //   onFilter: (value, record) => record.armsProjectId.startsWith(value),
    },
    {
      title: "End Date",
      dataIndex: "enddate",
      key: "7",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.tz.localeCompare(b.tz),
    //   filters: Array.from(new Set(site.map(item => item.tz))).map((name, index) => ({
    //     text: name,
    //     value: name,
    //   })),
    //   filterMode: "tree",
    //   filterSearch: true,
    //   onFilter: (value, record) => record.tz.startsWith(value),
    },
    {
      title: "Recipient Emails",
      dataIndex: "recipientemails",
      key: "8",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.armsProj.localeCompare(b.armsProj),
    //   filters: Array.from(new Set(site.map(item => item.armsProj))).map((name, index) => ({
    //     text: name,
    //     value: name,
    //   })),
    //   filterMode: "tree",
    //   filterSearch: true,
    //   onFilter: (value, record) => record.armsProj.startsWith(value),
    },
    {
      title: "Email Send Time",
      dataIndex: "emailsendtime",
      key: "9",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.observesHolidays.localeCompare(b.observesHolidays),
    //   render: (text) => (text ? "True" : "False"),
    //   filters: Array.from(new Set(site.map(item => item.observesHolidays))).map((name, index) => ({
    //     text: name,
    //     value: name,
    //   })),
    //   filterMode: "tree",
    //   filterSearch: true,
    //   onFilter: (value, record) => record.observesHolidays.startsWith(value),
    },
    {
      title: "Range Consumption",
      dataIndex: "rangeconsumption",
      key: "10",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.geoCountry.localeCompare(b.geoCountry),
    //   filters: Array.from(new Set(site.map(item => item.geoCountry))).map((name, index) => ({
    //     text: name,
    //     value: name,
    //   })),
    //   filterMode: "tree",
    //   filterSearch: true,
    //   onFilter: (value, record) => record.geoCountry.startsWith(value),
    },
    {
      title: "Range Target",
      dataIndex: "rangetarget",
      key: "11",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.geoAddress.localeCompare(b.geoAddress),
    //   filters: Array.from(new Set(site.map(item => item.geoAddress))).map((name, index) => ({
    //     text: name,
    //     value: name,
    //   })),
    //   filterMode: "tree",
    //   filterSearch: true,
    //   onFilter: (value, record) => record.geoAddress.startsWith(value),
    },
    {
      title: "Ytd Consumption",
      dataIndex: "ytdconsumption",
      key: "12",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.long.localeCompare(b.long),
    },
    {
      title: "Ytd Target",
      dataIndex: "ytdtarget",
      key: "13",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.lat.localeCompare(b.lat),
    },
    // {
    //   title: "Actions",
    //   dataIndex: "delete",
    //   key: "17",
    //   width: 200,
    //   ellipsis: true,
    //   render: (text, record, index) => (
    //     <>
    //       <ConfigProvider>
    //         <Popover placement="bottomLeft" content={() => content(record)} >
    //           <EllipsisOutlined style={{ fontSize: "30px", }} />
    //         </Popover>
    //       </ConfigProvider>
    //     </>
    //   ),
    // },
  ].filter(item => !item.hidden);