// export default  function AlertTabeWidget(props){
//   const [data , setData] = useState([]);
//   setData(props.data)
//     console.log(data)
//     return(
//       <>
    
//       </>
//     )
// }

const DynamicColumns = (data) => {
  let dynamicColumns = [];
  if (data.some(item => item.alertconfigurationid)) {
    dynamicColumns.push(
      {
        title: "Alert Configuration Id",
        dataIndex: "alertconfigurationid",
        key: "1",
        width: 300,
        ellipsis: true,
        sorter: (a, b) => a.id.localeCompare(b.id),

      })
  }

  if (data.some(item => item.startdate)) {
    dynamicColumns.push(
      {
        title: "Start Date",
        dataIndex: "startdate",
        key: "6",
        width: 200,
        ellipsis: true,
        sorter: (a, b) => a.armsProjectId.localeCompare(b.armsProjectId),
      }
    )
  }

  if (data.some(item => item.enddata)) {
    dynamicColumns.push(
      {
        title: "End Date",
        dataIndex: "enddate",
        key: "7",
        width: 200,
        ellipsis: true,
        sorter: (a, b) => a.tz.localeCompare(b.tz),
      }
    )
  }

  if (data.some(item => item.emailsendtime)) {
    dynamicColumns.push(
      {
        title: "Email Send Time",
        dataIndex: "emailsendtime",
        key: "9",
        width: 200,
        ellipsis: true,
        sorter: (a, b) => a.observesHolidays.localeCompare(b.observesHolidays),
      }
    )
  }
  if (data.some(item => item.rangeconsumption)) {
    dynamicColumns.push(
      {
        title: "Range Consumption",
        dataIndex: "rangeconsumption",
        key: "10",
        width: 200,
        ellipsis: true,
        sorter: (a, b) => a.geoCountry.localeCompare(b.geoCountry),

      }
    )
  }
  if (data.some(item => item.rangetarget)) {
    dynamicColumns.push(
      {
        title: "Range Target",
        dataIndex: "rangetarget",
        key: "11",
        width: 200,
        ellipsis: true,
        sorter: (a, b) => a.geoAddress.localeCompare(b.geoAddress),
      }
    )
  }
  if (data.some(item => item.ytdconsumption)) {
    dynamicColumns.push(
      {
        title: "Ytd Consumption",
        dataIndex: "ytdconsumption",
        key: "12",
        width: 200,
        ellipsis: true,
        sorter: (a, b) => a.long.localeCompare(b.long),
      },
    )
  }
  if (data.some(item => item.ytdtarget)) {
    dynamicColumns.push(
      {
        title: "Ytd Target",
        dataIndex: "ytdtarget",
        key: "13",
        width: 200,
        ellipsis: true,
        sorter: (a, b) => a.lat.localeCompare(b.lat),
      },
    )
  }
  return dynamicColumns;
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
        },
        {
          title: "Utiliy Type",
          dataIndex: "utilitytype",
          key: "3",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.area - b.area,
        },
        {
          title: "Project",
          dataIndex: "project",
          key: "4",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.projId.localeCompare(b.projId),
        },
        {
          title: "Report Type",
          dataIndex: "reporttype",
          key: "5",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => (a.site === b.site ? 0 : a.site ? -1 : 1),
          render: (text) => (text ? "True" : "False"),
        },
        {
          title: "Start Date",
          dataIndex: "startdate",
          key: "6",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.armsProjectId.localeCompare(b.armsProjectId),
        },
        {
          title: "End Date",
          dataIndex: "enddate",
          key: "7",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.tz.localeCompare(b.tz),
        },
        {
          title: "Recipient Emails",
          dataIndex: "recipientemails",
          key: "8",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.armsProj.localeCompare(b.armsProj),
        },
        {
          title: "Email Send Time",
          dataIndex: "emailsendtime",
          key: "9",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.observesHolidays.localeCompare(b.observesHolidays),
        },
        {
          title: "Range Consumption",
          dataIndex: "rangeconsumption",
          key: "10",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.geoCountry.localeCompare(b.geoCountry),
        },
        {
          title: "Range Target",
          dataIndex: "rangetarget",
          key: "11",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.geoAddress.localeCompare(b.geoAddress),
       
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
      ].filter(item => !item.hidden);
      
          {/* <button className="custom-button" type="button" onClick={() => showModal(1)}>
            Show Sent Alert
          </button>
          <button className="custom-button" type="button" onClick={() => showModal(2)}
            style={{ marginLeft: "4px", marginRight: "4px" }}
          >Show Queued Alerts</button>
          <button className="custom-button" type="button" onClick={() => showModal(3)}>
            Show Failed Alerts
          </button>
        </>;
    
      return(
        <>
         <Modal title={btnValues === 1 ? "Show Sent Alert" : btnValues === 2 ? "Show Queued Alert" : "Show Failed Alert"}
        width="70%"
        open={openModal} onOk={handleOk}
        onCancel={handleCancel}>
        <Table
          dataSource={props.showalertsData}
          columns={showalertscolumns}
          size="large"
          rowKey={"id"}
          scroll={{
            x: 1000,
            y: 300
          }}
        />;
      </Modal>
      )
  };
 */}
