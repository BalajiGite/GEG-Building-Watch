import React, { useState, useRef,useEffect, useContext} from "react";
import { Form, Input, Table, Checkbox,Spin, Divider, Select, Tooltip, 
Space,Button, Row, Col, Modal, Popover, ConfigProvider, message, DatePicker, Card } from "antd";
import { EllipsisOutlined ,MailOutlined, InfoCircleOutlined, PlusOutlined, CloseOutlined} from "@ant-design/icons";
import "reactjs-popup/dist/index.css";
import { getAlertConfList } from "../services/alertConfService";
import { getApiDataFromAws, postAlertsApiDataToAws, getConfigDataFromAws } from "../services/apis";
import { showalertscolumns } from "../components/widgets/AlertTableswidgest/AlertTable";
import { SelectColumns } from "../components/widgets/SelectedColumns/SelectedColumns";
import { FilterColumnsData } from "../components/widgets/SelectedColumns/FilterColumns";
import {
  deleteAlerts,
  editAlerts,
  getAlertsList,
} from "../services/alertsService";
import { RiDeleteBin6Line } from "react-icons/ri";
import AlertModel from "./AlertConfiguration";
import spinnerjiff from "../assets/images/loader.gif";
// import { showalertscolumns } from "../components/widgets/AlertTableswidgest/AlertTable"
import { buildQueries } from "@testing-library/react";
import { isAuthenticated, userInfo } from "../services/apis";
import { useHistory } from 'react-router-dom';
import { AppContext } from "../App";
import { CSVLink } from 'react-csv';
import ResizableTable from "../components/widgets/ResizeTable/ResizableTable";
import vector_ from "../../src/assets/images/vector_.png";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function Alerts() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [confModal, setConfModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confList, setConfList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState();
  const [searchText, setSearchText] = useState('');
  const [siteListData, setSiteListData] = useState([]);
  const [prjNameData, setPrjNameData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setloading] = useState(true);
  const [AlertsId, setAlertsId] = useState();
  const [active, setActive] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState();
  const [showalertsData, setShowAlertsData] = useState([]);
  const [btnValues, setbtnValue] = useState(0);
  const [isEditable, setEditable] = useState({});
  const [addNewform, setAddNewForm] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSendAlert, setOpenSendAlert] = useState(false);
  const [selectedRepFreq, setSelectedRepFreq] = useState("");
  const [visibleCard, setvisibleCard] = useState(false);

  const [form] = Form.useForm();
  const Id = useRef(1);
  const context = useContext(AppContext);
  const history = useHistory();

  const DATE_FORMAT = 'YYYY-MM-DD';
  const isEditableFormField = (fieldName) => {
    return (
      typeof isEditable.editKeysUneditable === "object" &&
      isEditable.editKeysUneditable.hasOwnProperty(fieldName)
    )

  };

  const screenHeight = window.innerHeight - 310;

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  let resp = [];
  const onAlertClick = async (record) => {

    try {
      resp = await getAlertConfList();
    } catch (error) { }

    populateConfList(record, resp);
    setSelectedRecord(record);
    onOpenConf();
  };


  const onOpenModal = () => {
    setAddNewForm(true);
    setOpen(true);
    form.resetFields();
  };

  const populateConfList = (record, data) => {
    let alertConfigurations = [];
    alertConfigurations = data?.filter((item) => item.alertId === record.id);
    setConfList(alertConfigurations);
  };

  const onOpenConf = () => {
    setConfModal(true);
  };

  const onCloseConf = () => {
    setConfModal(false);
  };

  const onCancelModal = () => {
    setOpen(false);
    setAlertsId();
    form.resetFields();
  };

  const onEmailAlertCancelModal = () => {
    setOpenSendAlert(false);
    setAlertsId();
    setSelectedRepFreq();
    form.resetFields();
  };


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "0",
      width: 100,
      ellipsis: true,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Site Name",
      dataIndex: "sitename",
      key: "1",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.sitename.localeCompare(b.sitename),
      filters: Array.from(new Set(alerts.map(item => item.sitename))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.sitename.startsWith(value),
    },
    {
      title: "Utility Type",
      dataIndex: "utilitytype",
      key: "2",
      width: 160,
      ellipsis: true,
      sorter: (a, b) => a.utilitytype.localeCompare(b.utilitytype),
      filters: Array.from(new Set(alerts.map(item => item.utilitytype))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.utilitytype.startsWith(value),
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "3",
      width: 160,
      ellipsis: true,
      sorter: (a, b) => a.project.localeCompare(b.project),
      filters: Array.from(new Set(alerts.map(item => item.project))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.project.startsWith(value),
    },
    {
      title: "Report Frequency",
      dataIndex: "reporttype",
      key: "4",
      width: 160,
      ellipsis: true,
      sorter: (a, b) => a.reporttype.localeCompare(b.reporttype),
      filters: Array.from(new Set(alerts.map(item => item.reporttype))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.reporttype.startsWith(value),
    },
    {
      title: "Frequency",
      dataIndex: "freq",
      key: "5",
      width: 160,
      ellipsis: true,
      sorter: (a, b) => a.freq.localeCompare(b.freq),
      filters: Array.from(new Set(alerts.map(item => item.freq))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.freq.startsWith(value),
    },
    {
      title: "Timezone",
      dataIndex: "tz",
      key: "6",
      width: 160,
      ellipsis: true,
      sorter: (a, b) => a.tz.localeCompare(b.tz),
      filters: Array.from(new Set(alerts.map(item => item.tz))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.tz.startsWith(value),
    },
    {
      title: "Recipient Emails",
      dataIndex: "recipientemails",
      key: "7",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.recipientemails.localeCompare(b.recipientemails),
      filters: Array.from(new Set(alerts.map(item => item.recipientemails))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.recipientemails.startsWith(value),
      render: (text) => (
        <Tooltip title={text}>
          <span>{text.length > 18 ? `${text.slice(0, 18)}...` : text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Error Emails",
      dataIndex: "erroremails",
      key: "8",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.erroremails.localeCompare(b.erroremails),
      filters: Array.from(new Set(alerts.map(item => item.erroremails))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.erroremails.startsWith(value),
      render: (text) => (
        <Tooltip title={text}>
          <span>{text.length > 18 ? `${text.slice(0, 18)}...` : text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Is Active",
      dataIndex: "isactive",
      key: "9",
      width: 120,
      render: (text, record) => (
        <Checkbox
          checked={record.isactive}
          disabled
        />
      ),
      sorter: (a, b) => (a.isactive ? 1 : -1) - (b.isactive ? 1 : -1),
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
      onFilter: (value, record) => record.isactive === value,
    },
    {
      title: "Ad-Hoc Alerts",
      dataIndex: "adhoc",
      key: "15",
      width: 145,
      ellipsis: true,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => (
        <Space>
          <MailOutlined onClick={() => onSendEmail(record)} />
          {text}
        </Space>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "14",
      width: 160,
      ellipsis: true,
      render: (text, record, index) => (
        isEditable?.isEditable ?
          <>
            <ConfigProvider>
              <Popover overlayStyle={{ width: '100px' }} placement="right" content={() => content(record)}>
                <EllipsisOutlined style={{ fontSize: "30px" }} />
              </Popover>
            </ConfigProvider>
          </> : null
      ),
    }
  ];

  const getData = async () => {
    setIsLoading(true);
    try {
      const body = {
        funcName: "getAlertConfigurationsData",
      };
      const alertsData = await postAlertsApiDataToAws(body);
      const alertList = await getApiDataFromAws("queryType=dropdownSite");

      const AlertConfigurationData = await getConfigDataFromAws("alertConfiguration");
      setEditable(AlertConfigurationData);
      setSiteListData(alertList);
      setAlerts(alertsData);
      setTempData(alertsData);
      setloading(false);
      setIsLoading(false);
    } catch (error) { }
  };

  useEffect(() => {
    // This effect will run whenever either tempData or alerts state changes
    if (searchText !== "") {
      onChangeText(searchText);
    }
  }, [tempData]);

  const showAlert = async (id, buttonValue) => {
    try {
      const body = {
        funcName:
          buttonValue === 1 ? "getSuccessExecutionsForId"
            : buttonValue === 2 ? "getQueuedExecutionsForId"
              : buttonValue === 3 ? "getFailedExecutionsForId"
                : "",
        acId: id,
      }
      const alertsData = await postAlertsApiDataToAws(body);
      setShowAlertsData(alertsData);

    } catch (error) {
      console.log(error);
    }
  }

  const getProjectName = async (siteName) => {

    console.log('Selected Value:', siteName);

    const selectedSite = siteListData.find(site => site.name === siteName);
    const prjId = selectedSite.id.split(':')[1];

    const prjList = await getApiDataFromAws("queryType=dropdownProjId")
    const project = prjList.find(proj => proj.projId === prjId);
    setPrjNameData(project.projName);
    return project.projName;

  }


  const getFormatedDate = (startDate) => {

    const year = startDate.toDate().getFullYear();
    const month = (startDate.toDate().getMonth() + 1).toString().padStart(2, '0');
    const day = startDate.toDate().getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    //console.log(formattedDate);
    return formattedDate;

  }

  const sendAlerts = async () => {
    try {

      var formData = form.getFieldsValue();
      const modifiedFormData = {
        startDate: getFormatedDate(formData.dates),
        recipientEmails: formData.recipientemails,
        errorEmails: formData.erroremails,
        funcName: 'insertAdhocAlert',
        alertconfigurationid: AlertsId
      };
      const sentAlert = await postAlertsApiDataToAws(modifiedFormData)
      if (sentAlert) {
        console.log('Email sent successfully:', sentAlert);
        message.success(sentAlert.message);
      } else {
        console.log(sentAlert.message);
        message.info(sentAlert.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const setData = async () => {
    try {

      var formData = form.getFieldsValue();

      if (AlertsId) {
        const prjName = await getProjectName(formData.sitename)
        const modifiedFormData = {
          ...formData,
          project: prjName,
          freq: formData.reporttype == "Daily" ? "H" : "D",
          funcName: 'updateAlertConfiguration',
          id: AlertsId
        };
        const updateAlert = await postAlertsApiDataToAws(modifiedFormData)
        if (updateAlert && updateAlert.message === "Success") {
          console.log('Alert updated successfully:', updateAlert);
          message.success('Alert updated successfully');
        } else {
          console.log(updateAlert.message);
          message.info(updateAlert.message);
        }
      } else {
        const modifiedFormData = {
          ...formData,
          project: prjNameData,
          freq: formData.reporttype == "Daily" ? "H" : "D",
          funcName: 'insertAlertConfiguration'
        };
        const addNewAlert = await postAlertsApiDataToAws(modifiedFormData)
        if (addNewAlert && addNewAlert.message === "Success") {
          console.log('Alert added successfully:', addNewAlert);
          message.success('Alert added successfully');
        } else {
          console.log(addNewAlert.message);
          message.info(addNewAlert.message);
        }

      }
      getData();
      onCancelModal();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id) => {
    try {
      const resp = await deleteAlerts(id);
      getData();
    } catch (error) { }
  };

  const onEdit = async (record) => {
    form.setFieldsValue(record);
    setAlertsId(record.id);
    setAddNewForm(false);
    setOpen(true);
  };

  const onSendEmail = async (record) => {
    form.setFieldsValue(record);
    setAlertsId(record.id);
    const freq = record.reporttype == "Daily" ? "date" : record.reporttype == "Weekly" ? "week" : "month";
    setSelectedRepFreq(freq)
    setOpenSendAlert(true);
  };


  const content = (record) => (
    <div style={{ marginLeft: "10px", backgroundColor: "#0A1016", paddingTop: "10px", marginRight: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
      <a onClick={() => onEdit(record)} style={{ color: "white" }}>EDIT</a>
      <Divider type="horizontal" style={{ margin: "5px" }} />
      <a onClick={() => onDelete(record.id)} style={{ color: "white", display: "none" }}>DELETE</a>
    </div>
  )
  // const filter = (text) => {
  //   const filterData = data.filter((record) => {
  //     record.projectno.toString().includes(text.toString());
  //   });
  //   setTempData(filterData);
  // };

  const filter = (text, data) => {
    const filterData = data.filter(
      (record) =>
        record.sitename.toLowerCase().includes(text.toLowerCase()) ||
        record.utilitytype.toString().includes(text.toLowerCase()) ||
        record.project.toLowerCase().includes(text.toLowerCase()) ||
        record.reporttype.toLowerCase().includes(text.toLowerCase()) ||
        record.freq.toLowerCase().includes(text.toLowerCase()) ||
        record.tz.toLowerCase().includes(text.toLowerCase()) ||
        record.recipientemails.toLowerCase().includes(text.toLowerCase()) ||
        record.erroremails.toLowerCase().includes(text.toLowerCase())

    );
    setAlerts(filterData);
  };
  const exportToCSV = () => {
    const csvData = alerts.map(item => ({
      ...item, // Assuming mpReadings is an array of objects
    }));

    return csvData;
  };
  const onChangeText = (text) => {
    if (text == "" || !text || text.length < searchText.length) {
      setAlerts(tempData);
      setSearchText(text);
      filter(text, tempData);
    } else {
      setSearchText(text);
      filter(text, alerts);
    }
  };

  const advancedFilterData = (value) =>{
    if(value === "Reset"){
      setAlerts(tempData);
    }else{
      console.log(value);
      let fillColumns = value[0];
      let fillCondition = value[2];
      let fillValue = value[1]; 
      let fillAndOr = value[3];
      
      const filtersData = alerts.filter((record) => {
        //record["name"].toLowerCase() === "nsw"
        let query = '';
        for (let i = 0; i < fillColumns.length; i++) {
          let column = fillColumns[i];
          let condition = fillCondition[i]
          let value = fillValue[i]
          let andor = i===0?'':fillAndOr[i-1]
          if(condition === "equalTo"){
            if(andor === "and"){
              query == ''? query = record[column] === value:
              query = query && record[column] === value 
            }else{
              query == ''? query = record[column] === value:
              query = query || record[column] === value 
            }
          }else if(condition === "notEqualTo"){
            if(andor === "and"){
              query == ''? query = record[column] !== value:
              query = query && record[column] !== value 
            }else{
              query == ''? query = record[column] !== value:
              query = query || record[column] !== value 
            }
          }else if(condition === "includes"){
            if(andor === "and"){
              query == ''? query = record[column].toLowerCase().includes(value.toLowerCase()):
              query = query && record[column].toLowerCase().includes(value.toLowerCase()) 
            }else{
              query == ''? query = record[column].toLowerCase().includes(value.toLowerCase()):
              query = query || record[column].toLowerCase().includes(value.toLowerCase()) 
            }
          }
          else if (condition === "greaterThan") {
            if (andor === "and") {
                query === '' ? query = Number(record[column]) > (value) :
                    query = query && Number(record[column]) > (value)
            } else {
                query === '' ? query = Number(record[column]) > (value) :
                    query = query || Number(record[column]) > (value)
            }
          } else if (condition === "lessThan") {
            if (andor === "and") {
                query === '' ? query = Number(record[column]) < (value) :
                    query = query && Number(record[column]) < (value)
            } else {
                query === '' ? query = Number(record[column]) < (value) :
                    query = query || Number(record[column]) < (value)
            }
          }
        }
        return query
        
      });
      setAlerts(filtersData);
    }
  }

  useEffect(() => {
    const authenticated = isAuthenticated()
    if (authenticated) {
      getData();
    } else {
      var userData = userInfo(context.token);
      if (userData == null) {
        history.push('/');
      } else {
        getData();
      }
    }
  }, []);

  const showModal = async (btnValue) => {
    showAlert(Id.current, btnValue);
    setbtnValue(btnValue);
    setOpenModal(true);
  }


  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };


  const handleSelectChange = async (selectedValue) => {
    console.log('Selected Value:', selectedValue);
    getProjectName(selectedValue)
  };

  let elementbutton = (
    <>
      <button className="custom-button" type="button" onClick={() => showModal(1)}>
        Show Sent Alert
      </button>
      <button className="custom-button" type="button" onClick={() => showModal(2)}
        style={{ marginLeft: "4px", marginRight: "4px" }}
      >Show Queued Alerts</button>
      <button className="custom-button" type="button" onClick={() => showModal(3)}>
        Show Failed Alerts
      </button>
    </>);

  const validateEmails = (value) => {
    const emailArray = value.split(',').map(email => email.trim());

    for (const email of emailArray) {
      // Use a regular expression for basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return Promise.reject('Please enter valid email addresses separated by commas.');
      }
    }
    return Promise.resolve();
  };

  const clickEventAlert = (RowId) => {
    Id.current = RowId;
    setAlert(elementbutton);
    setActive(RowId)
  }

  const handleSelectColumns = (selectedColumns) => {
    setVisibleColumns(selectedColumns);
  }

  const disabledDate = (current, picker) => {
    if (picker === 'week') {
      return current && current.day() !== 1; // Disable all days except Monday for weekly selection
    } else if (picker === 'month') {
      return current && current.date() !== 1; // Disable all days except the first day of the month for monthly selection
    }
    // For daily selection, no dates are disabled
    return false;
  };

  const totalRows = alerts.length;
  const handleChange = (value) => {
    console.log(value);
  };
  return (
    <>
      <Modal title={btnValues === 1 ? "Show Sent Alert" : btnValues === 2 ? "Show Queued Alert" : "Show Failed Alert"}
        width="70%"
        open={openModal} onOk={handleOk}
        onCancel={handleCancel}>
        <Table
          dataSource={showalertsData}
          columns={showalertscolumns}
          size="large"
          rowKey={"id"}
          scroll={{
            x: 1000,
            y: 300
          }}
          pagination={{
            showTotal: (total, range) => `Total ${total} rows`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />;
      </Modal>
      {" "}
      <Row>

        <Col span={3}>
          <button className="mb-4 custom-button" type="primary" onClick={() => onOpenModal()}>
            Add New Alert
          </button>
        </Col>
        <Col span={9}>{alert}</Col>
        <Col span={12} style={{ marginBottom: 10, textAlign: 'right' }}>
          <Input
            size="small"
            placeholder="search here ..."
            value={searchText}
            onChange={(e) => onChangeText(e.target.value)}
            className="custom-input"
          />
          <button className="ant-dropdown-link custom-button" style={{ marginLeft: "5px", paddingLeft: "10px", paddingRight: "10px" }} onClick={()=>setvisibleCard(!visibleCard)}>
          <img src={vector_} alt="vector_png" width={16} height={16}/>
          </button>
          <SelectColumns columns={columns} onSelectColumns={handleSelectColumns}/>
          <CSVLink data={exportToCSV()} filename={"mpReadings.csv"}>
            <button type="button" className="custom-button">Export to CSV</button>
          </CSVLink>
        </Col>
      </Row>
      {visibleCard && <Card className="custom-card1">
        <div style={{ justifyContent: 'end', display: 'flex' }}>
          <CloseOutlined style={{ color: "#FFFFFF", fontSize: "15px", cursor: 'pointer' }} onClick={() => setvisibleCard(!visibleCard)} />
        </div>
        <FilterColumnsData columns={columns} onSelectColumns={handleSelectColumns} onSearch = {advancedFilterData}/>
      </Card>}
      <Modal
        style={{ textAlign: "left" }}
        title="Send Ad-Hoc Alerts"
        centered
        visible={openSendAlert}
        onCancel={onEmailAlertCancelModal}
        width={700}
        footer={null}
        maskClosable={false}
      >
        <Form
          {...layout}
          name="nest-messages"
          layout="vertical"
          onFinish={sendAlerts}
          style={{ maxWidth: 1000 }}
          form={form}
        >
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"dates"}
                label="Select Date"
                wrapperCol={24}
                rules={[
                  {
                    required: true,
                    message: 'Please Select Date.',
                  },
                ]}>
                <DatePicker
                  className='form_input dtPicker'
                  picker="date"
                  disabledDate={(current) => disabledDate(current, selectedRepFreq)} // Initial disabled dates based on week picker
                  format={DATE_FORMAT}
                  inputReadOnly={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"recipientemails"}
                label="Recipients Emails"
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter the Recipients Emails.',
                  }, {
                    validator: (_, value) => validateEmails(value),
                  },
                ]}
              >
                <Input.TextArea
                  className="form_input"
                  placeholder="Enter emails separated by commas"
                  readOnly={addNewform ? false : isEditableFormField('recipientemails')}
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"erroremails"}
                label="Error Emails"
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter the Error Emails.',
                  }, {
                    validator: (_, value) => validateEmails(value),
                  },
                ]}
              >
                <Input.TextArea
                  className="form_input"
                  placeholder="Enter emails separated by commas"
                  readOnly={addNewform ? false : isEditableFormField('erroremails')}
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Row>
              <Col className="custom-modal-column" span={24}>
                <Button type="default" onClick={onEmailAlertCancelModal} className="custom-modal-button">Cancel</Button>
                <Button type="primary" htmlType="submit">Send</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>{" "}

      <Modal
        style={{ textAlign: "left" }}
        title="Add New Alerts"
        centered
        open={open}
        onCancel={() => onCancelModal()}
        width={700}
        footer={null}
        maskClosable={false}
      >
        <Form
          {...layout}
          name="nest-messages"
          layout="vertical"
          onFinish={setData}
          style={{ maxWidth: 1000 }}
          form={form}
          validateMessages={validateMessages}
        >
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"sitename"}
                label="Select Site Name"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please Select Site Name.',
                  },
                ]}
              >
                <Select
                  placeholder="Select Site Name"
                  value={selectedItems}
                  onChange={(value) => {
                    setSelectedItems(value); // Update the state if needed
                    handleSelectChange(value); // Your custom function to handle the change
                  }}
                  size="large"
                  style={{ width: "100%" }}
                  disabled={addNewform ? false : isEditableFormField('sitename')}
                >
                  {siteListData.length > 0 &&
                    siteListData.map((item, index) => (
                      <Select.Option key={index} value={item.name}>{item.name}</Select.Option>
                    ))
                  }
                </Select>

              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"utilitytype"}
                label="Select Utility Type"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Select Utility Type.',
                  },
                ]}
              >
                <Select
                  placeholder="Select Utility Type"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                  disabled={addNewform ? false : isEditableFormField('utilitytype')}
                >
                  {
                    [...new Set(alerts.map(item => item.utilitytype))].map((item, index) => (
                      <Select.Option key={index} value={item}>{item}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"reporttype"}
                label="Select Report Type"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please Select Report Type.',
                  },
                ]}
              >
                <Select
                  placeholder="Select Report Type"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                  disabled={addNewform ? false : isEditableFormField('reporttype')}

                >
                  {
                    [...new Set(alerts.map(item => item.reporttype))].map((item, index) => (
                      <Select.Option key={index} value={item}>{item}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"tz"}
                label="Select tz"
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please Select tz.',
                  },
                ]}
              >
                <Select
                  placeholder="Select tz"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                  disabled={addNewform ? false : isEditableFormField('tz')}
                >
                  {[...new Set(alerts.map(item => item.tz))].map((item, index) => (
                    <Select.Option key={index} value={item}>{item}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"recipientemails"}
                label="Recipients Emails"
                tooltip={{ title: 'List the email addresses of individuals who should receive alerts related to this category.', icon: <InfoCircleOutlined style={{ color: '#c5c5c5' }} /> }}
                // labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter the Recipients Emails.',
                  }, {
                    validator: (_, value) => validateEmails(value),
                  },
                ]}
              >
                <Input.TextArea
                  className="form_input"
                  placeholder="Enter emails separated by commas"
                  readOnly={addNewform ? false : isEditableFormField('recipientemails')}
                  autoSize={{ minRows: 2, maxRows: 6 }} // You can adjust the number of rows as needed
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name={"erroremails"}
                label="Error Emails"
                tooltip={{ title: 'Specify the email addresses to be notified in case of errors or issues.', icon: <InfoCircleOutlined style={{ color: '#c5c5c5' }} /> }}
                // labelCol={{ span: 5 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter the Error Emails.',
                  }, {
                    validator: (_, value) => validateEmails(value),
                  },
                ]}

              >
                <Input.TextArea
                  className="form_input"
                  placeholder="Enter emails separated by commas"
                  readOnly={addNewform ? false : isEditableFormField('erroremails')}
                  autoSize={{ minRows: 2, maxRows: 6 }} // You can adjust the number of rows as needed
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name={"isactive"}
                label="Is Active"
                tooltip={{ title: 'Indicate whether the alert system is active or inactive for this parameter.', icon: <InfoCircleOutlined style={{ color: '#c5c5c5' }} /> }}
                // labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Please Select the Is Active.',
                  },
                ]}
              >
                <Select
                  placeholder="Is Active"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                  disabled={addNewform ? false : isEditableFormField('isactive')}
                >
                  {[...new Set(alerts.map(item => item.isactive))].map((item, index) => (
                    <Select.Option key={index} value={item}>{item ? "true" : "false"}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Row>
              <Col className="custom-modal-column" span={24}>
                <button type='' htmlType='button' onClick={() => onCancelModal()} className="custom-modal-button">Cancel</button>
                <button type="" htmlType="submit">
                  Save
                </button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>{" "}

      <Spin spinning={isLoading} size="large" indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}>

        <ResizableTable total={totalRows}
          name={"Alerts"}
          screenHeight={screenHeight}
          site={alerts}
          onRow={(record) => ({
            onClick: () => clickEventAlert(record.id),
            style: { backgroundColor: record.id === active ? "#0A1016" : '' }

          })}
          columnsData={visibleColumns.length > 0 ? columns.filter((item) => visibleColumns.includes(item.key)) : columns}
        />
      </Spin>
      <AlertModel
        onOpenConf={onOpenConf}
        onCloseConf={onCloseConf}
        confModal={confModal}
        // confForm={confForm}
        confList={confList}
        setSelectedRecord={setSelectedRecord}
        selectedRecord={selectedRecord}
        setConfList={setConfList}
        populateConfList={populateConfList}
      />
    </>
  );
}

export default Alerts;
