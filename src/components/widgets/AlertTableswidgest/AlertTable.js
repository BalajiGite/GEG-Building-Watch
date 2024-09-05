
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
        sorter: (a, b) => a.startdate.localeCompare(b.startdate),
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
        sorter: (a, b) => a.enddate.localeCompare(b.enddate),
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
        sorter: (a, b) => a.emailsendtime.localeCompare(b.emailsendtime),
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
        sorter: (a, b) => a.rangeconsumption.localeCompare(b.rangeconsumption),

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
        sorter: (a, b) => a.rangetarget.localeCompare(b.rangetarget),
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
        sorter: (a, b) => a.ytdconsumption.localeCompare(b.ytdconsumption),
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
        sorter: (a, b) => a.ytdtarget.localeCompare(b.ytdtarget),
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
        },
        {
          title: "Site Name",
          dataIndex: "sitename",
          key: "2",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.sitename.localeCompare(b.sitename),
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
          sorter: (a, b) => a.project.localeCompare(b.project),
        },
        {
          title: "Report Type",
          dataIndex: "reporttype",
          key: "5",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.reporttype.localeCompare(b.reporttype),
        },
        {
          title: "Start Date",
          dataIndex: "startdate",
          key: "6",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.startdate.localeCompare(b.startdate),
        },
        {
          title: "End Date",
          dataIndex: "enddate",
          key: "7",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.enddate.localeCompare(b.enddate),
        },
        {
          title: "Recipient Emails",
          dataIndex: "recipientemails",
          key: "8",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.recipientemails.localeCompare(b.recipientemails),
        },
        {
          title: "Email Send Time",
          dataIndex: "emailsendtime",
          key: "9",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.emailsendtime.localeCompare(b.emailsendtime),
        },
        {
          title: "Range Consumption",
          dataIndex: "rangeconsumption",
          key: "10",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.rangeconsumption.localeCompare(b.rangeconsumption),
        },
        {
          title: "Range Target",
          dataIndex: "rangetarget",
          key: "11",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.rangetarget.localeCompare(b.rangetarget),
       
        },
        {
          title: "Ytd Consumption",
          dataIndex: "ytdconsumption",
          key: "12",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.ytdconsumption.localeCompare(b.long),
        },
        {
          title: "Ytd Target",
          dataIndex: "ytdtarget",
          key: "13",
          width: 200,
          ellipsis: true,
          sorter: (a, b) => a.ytdtarget.localeCompare(b.ytdtarget),
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
