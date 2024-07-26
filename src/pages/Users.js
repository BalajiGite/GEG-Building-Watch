import React, { useContext, useRef, useState } from "react";
import { Button, Row, Col, Modal, Popover, ConfigProvider, Card ,Form, Input, Spin, Divider, Select} from "antd";
import { EllipsisOutlined, CaretDownOutlined, InfoCircleOutlined, CloseOutlined } from "@ant-design/icons";
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
import { AppContext } from "../App";
import { message ,Checkbox ,Table} from 'antd';
import { Radio } from 'antd';
import { getApiDataFromAws, postApiDataToAws, getConfigDataFromAws , getUserProfiles} from "../services/apis";
import { SelectColumns } from "../components/widgets/SelectedColumns/SelectedColumns";
import { isAuthenticated, userInfo } from "../services/apis";
import { useHistory } from 'react-router-dom';
import {
  deleteSites,
  editSites,
} from "../services/sitesService";
import { FilterColumnsData } from "../components/widgets/SelectedColumns/FilterColumns";
import vector_ from "../../src/assets/images/vector_.png";
import spinnerjiff from "../assets/images/loader.gif";
import { CSVLink } from 'react-csv';
import { useReducer } from "react";
import ResizableTable from "../components/widgets/ResizeTable/ResizableTable";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function Users() {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeButton, setActiveButton] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [userListsData, setUserListsData] = useState({});
  const [loading, setloading] = useState(true);
  const [SitesId, setSitesId] = useState();
  const [userLists, setUserLists] = useState([]);
  const [open, setOpen] = useState(false);
  const [regionListData, setRegionListData] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [visibleCard, setvisibleCard] = useState(false);

  const siteConfigData = useRef();
  const context = useContext(AppContext);
  const history = useHistory();

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

  const onCancelModal = () => {
    setOpen(false);
    setSitesId();
    form.resetFields();
  };

  const totalRows = userLists.length;

  const columns = [
    {
      title: "Policy ID",
      dataIndex: "policyId",
      key: "2",
      width: 100,
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      hidden: true,
      filters: Array.from(new Set(userLists.map(item => item.name))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: "Initials",
      dataIndex: "entityId",
      key: "3",
      width: 80,
      ellipsis: true,
      sorter: (a, b) => a.area - b.area,
      filters: Array.from(new Set(userLists.map(item => item.area))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.area.startsWith(value),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "4",
      width: 120,
      ellipsis: true,
      sorter: (a, b) => a.projId.localeCompare(b.projId),
      filters: Array.from(new Set(userLists.map(item => item.projId))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.projId.startsWith(value),
    },
    {
      title: "Proj Access",
      dataIndex: "projAccessFilter",
      key: "11",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.geoAddress.localeCompare(b.geoAddress),
      filters: Array.from(new Set(userLists.map(item => item.geoAddress))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.geoAddress.startsWith(value),
    },
    {
      title: "Site Access",
      dataIndex: "siteAccessFilter",
      key: "12",
      width: 140,
      ellipsis: true,
      sorter: (a, b) => a.long.localeCompare(b.long),
    },
    {
      title: "Permissions",
      dataIndex: "widgetAccessFilter",
      key: "13",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.long.localeCompare(b.long),
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "18",
      width: 80,
      ellipsis: true,
      render: (text, record, index) => (
          <>
            <ConfigProvider>
              <Popover overlayStyle={{ width: '100px' }} placement="right" content={() => content(record)} >
                <EllipsisOutlined style={{ fontSize: "30px", }} />
              </Popover>
            </ConfigProvider>
          </>
      ),
    },
  ]

  const changeWidgets = (widget) => {
    if (widget === 4) {
      setActiveButton(widget);
    } else {
      localStorage.setItem('activeButton', widget);
      history.push('/GeoConfigs');
      setActiveButton(widget);
    }
  }

  const getData = async () => {
    setIsLoading(true);
    try {

      const userListData = await getUserProfiles()
      const transformedPolicies = userListData.map(policy => ({
        ...policy,
        entityId: policy.principal.entityId,
        fullName: policy.definition.static.description,
        projAccessFilter: ((policy.content.resources.projAccessFilter)?.split("[")[1].split("]")[0])?.replace(/'/g, ''),
        siteAccessFilter:policy.content.resources.siteAccessFilter,
        widgetAccessFilter:policy.content.resources.widgetAccessFilter,
      }));
      const sitesConfigData = await getConfigDataFromAws("site");
      siteConfigData.current = sitesConfigData.isEditable;
      setUserListsData(transformedPolicies);
      setUserLists(transformedPolicies);
      setloading(false);
      setIsLoading(false);
      if (searchText != "") {
        filter(searchText)
      }
    } catch (error) { }
  };
  // console.log(site);
  const setData = async () => {
    /**
     * 
     
    try {

      var formData = form.getFieldsValue();

      const modifiedFormData = {
        ...formData,
        siteName: formData.name,
        siteId: "",
        area: Number(formData.area),
        armsProjectId: Number(formData.armsProjectId),
        regionRecId: formData.regionRef,
      };

      const { name, regionRef, site, ...objectWithoutName } = modifiedFormData
      // console.log(objectWithoutName); // Log the form data to check its structure
      if (SitesId) {
        const resp = await editSites(SitesId, formData);
      } else {
        //const resp = await addSites(formData);
        const body = {
          funcName: 'createSiteRecordsFromJson',
          recList: [objectWithoutName]
        };
        const addSites = await postApiDataToAws(body)
        // Check if the addSites operation was successful
        if (addSites && addSites.message === "Success") {
          console.log('Site added successfully:', addSites);
          // Display a success message using Ant Design message component
          message.success('Site added successfully');
        } else {
          // console.log('Failed to add site:', addSites);
          // Display an error message using Ant Design message component
          message.error('Failed to add site');
        }
      }
      onCancelModal();
      getData();
    } catch (error) {
      console.log(error);
    } */
  };

  const onDelete = async (id) => {
    try {
      const resp = await deleteSites(id);
      getData();
    } catch (error) { }
  };

  const onEdit = async (record) => {
    form.setFieldsValue(record);
    setSitesId(record.id);
    setOpen(true);
  };

  const onChangeText = (text) => {

    if (text == "" || !text || text.length < searchText.length) {
      setUserLists(userListsData);
      setSearchText(text);
      filter(text, userListsData);
    } else {
      setSearchText(text);
      filter(text, userLists);
    }
  };

  const advancedFilterData = (value) =>{
    if(value === "Reset"){
      setUserLists(userListsData);
    }else{
      console.log(value);
      let fillColumns = value[0];
      let fillCondition = value[2];
      let fillValue = value[1]; 
      let fillAndOr = value[3];
      
      const filtersData = userLists.filter((record) => {
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
      setUserLists(filtersData);
    }
  }

  const onOpenModal = () => {
    setOpen(true);
    form.resetFields();
  };

  const filter = (text, data) => {
    const filteredData = data.filter(
      (record) =>
        record.name?.toLowerCase().includes(text.toLowerCase()) ||
        record.area?.toLowerCase().includes(text.toLowerCase()) ||
        record.projId?.toLowerCase().includes(text.toLowerCase()) ||
        record.stateRef?.toLowerCase().includes(text.toLowerCase()) ||
        record.regionRef?.toLowerCase().includes(text.toLowerCase()) ||
        record.weatherStationRef?.toLowerCase().includes(text.toLowerCase()) ||
        record.armsProjId?.toLowerCase().includes(text.toLowerCase())
    );
    setUserLists(filteredData);
  };
  const exportToCSV = () => {
    const csvData = userLists.map(item => ({
      ...item, // Assuming mpReadings is an array of objects
    }));

    return csvData;
  };
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

  // let ObjectKeys = [...new Set(site.map(Obj => Object.keys(Obj)))];
  // console.log(ObjectKeys);

  const content = (record) => (
    <div style={{ marginLeft: "10px", backgroundColor: "#0A1016", paddingTop: "10px", marginRight: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
      <a onClick={() => onEdit(record)} style={{ color: "white" }}>EDIT</a>
      <Divider type="horizontal" style={{ margin: "5px" }} />
      <a onClick={() => onDelete(record.id)} style={{ color: "white", display: "none" }}>DELETE</a>
    </div>
  );

  const handleSelectColumns = (SelectColumns) => {
    setVisibleColumns(SelectColumns);
  }
  const handleChange = (value) => {
    console.log(value);
  };

  const handleSelectedColumns = (selectedColumns) => {
    setVisibleColumns(selectedColumns)
  }

  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Read',
      dataIndex: 'read',
      key: 'read',
    },
    {
      title: 'Update',
      dataIndex: 'update',
      key: 'update',
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
    },
  ];
  
  const initialData = [
    {
      key: 1,
      name: 'Sites',
      read: 'Read',
      update: 'Update',
      delete: 'Delete',
      readChecked: false,
      updateChecked: false,
      deleteChecked: false,
    },
    {
      key: 2,
      name: 'Meters',
      read: 'Read',
      update: 'Update',
      delete: 'Delete',
      readChecked: false,
      updateChecked: false,
      deleteChecked: false,
    },
    {
      key: 3,
      name: 'Points',
      read: 'Read',
      update: 'Update',
      delete: 'Delete',
      readChecked: false,
      updateChecked: false,
      deleteChecked: false,
    },
    {
      key: 4,
      name: 'Geo Locations',
      read: 'Read',
      update: 'Update',
      delete: 'Delete',
      readChecked: false,
      updateChecked: false,
      deleteChecked: false,
    },
    {
      key: 5,
      name: 'Alerts',
      read: 'Read',
      update: 'Update',
      delete: 'Delete',
      readChecked: false,
      updateChecked: false,
      deleteChecked: false,
    },
    {
      key: 6,
      name: 'Targets',
      read: 'Read',
      update: 'Update',
      delete: 'Delete',
      readChecked: false,
      updateChecked: false,
      deleteChecked: false,
    },
    {
      key: 7,
      name: 'MP Readings',
      read: 'Read',
      update: 'Update',
      delete: 'Delete',
      readChecked: false,
      updateChecked: false,
      deleteChecked: false,
    },
  ];
  
const [data, setDatas] = useState(initialData);

const handleCheckboxChange = (record, field) => {
  const newData = data.map((item) => {
    if (item.key === record.key) {
      return { ...item, [field]: !item[field] };
    }
    return item;
  });
  setDatas(newData);
};
  const columnsWithCheckbox = column.map((col) => {
    if (col.dataIndex !== 'name') {
      return {
        ...col,
        render: (text, record) => (
          <Checkbox
          className="custom-checkbox"
            checked={record[`${col.dataIndex}Checked`]}
            onChange={() => handleCheckboxChange(record, `${col.dataIndex}Checked`)}
          >
            <span className="checkbox-text">{text}</span>
            </Checkbox>
        ),
      };
    }
    return col;
  });

  return (
    <>
      <Row>
        <Col span={12}>
          <button onClick={() => onOpenModal()} className="mb-4 custom-button">Create User Policy</button>
        </Col>
        <Col span={12} style={{ marginBottom: 10, textAlign: 'right' }}>
          <Input
            size="small"
            placeholder="search here ..."
            value={searchText}
            onChange={(e) => onChangeText(e.target.value)}
            className="custom-input"
          />
          <button className="ant-dropdown-link custom-button" style={{ marginLeft: "5px", paddingLeft: "10px", paddingRight: "10px" }} onClick={() => setvisibleCard(!visibleCard)} >
            <img src={vector_} alt="vector_png" width={16} height={16} />
          </button>
          <SelectColumns columns={columns} onSelectColumns={handleSelectedColumns}/>
          <CSVLink data={exportToCSV()} filename={"sites.csv"}>
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
        // className="custom-modale"
        title="Create Policy"
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
          onFinish={setData}
          layout="vertical"
          style={{ maxWidth: 1000 }}
          form={form}
          validateMessages={validateMessages}
        >
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item name=""
                label="Full Name"
                // tooltip={{ title: 'Provide the name of the specific site or location being monitored or assessed.', icon: <InfoCircleOutlined style={{ color: '#c5c5c5' }} /> }}
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please Enter Principal Name.',
                //   },
                // ]}
              >
                <Input className="form_input" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name=""
                label="Select Action"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please Select Action.',
                //   },
                // ]}
              >
                <Select
                  placeholder=""
                  value={selectedItems}
                  onChange={setSelectedItems}
                  size="large"
                  style={{ width: "100%" }}
                >
                  {/*[...new Set(userListsData.map(item => item.projId))].map((item, index) => (
                    <Select.Option key={index} value={item} >
                      {item}
                    </Select.Option>
                  ))*/}
                </Select>
                {/* <Input className="form_input" /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row justify={"center"} gutter={[30, 30]}>
            <Col span={24}>
              <Form.Item
                name=""
                label="Select Project Access Filters"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please Select Project Access Filters.',
                //   },
                // ]}
              >
                <Select
                  placeholder=""
                  style={{ width: "100%" }}
                  value={selectedItems}
                  size="large"
                  onChange={setSelectedItems}
                >
                  {
                    [...new Set(userLists.map(item => item.tz))].map((item, index) => (
                      <Select.Option key={index} value={item}>{item}</Select.Option>
                    ))
                  }
                </Select>

                {/* <Input className="form_input" /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}  style={{marginBottom:'15px'}}>
            <span style={{color:'#C5C5C5', fontWeight:600, fontSize:'14px'}}>Give Permission’s for </span>
          <Table
          showHeader={false}
         columns={columnsWithCheckbox}
         dataSource={data}
         pagination={false}/>
      </Col>
      </Row>
      <Form.Item
            wrapperCol={{span: 24 }}>
      <Row>
      <Col span={24} className="custom-modal-column"  >
       <button onClick={() => onCancelModal()} type="" htmlType="" className="custom-modal-button">
                  Cancel
                </button>
                <button htmlType="submit">
                  Create Policy
                </button>
              </Col>
              </Row>
          </Form.Item>
        </Form>
      </Modal>
      <Spin spinning={isLoading} indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} />}>
        <ResizableTable total={totalRows} name={"Users"} screenHeight={screenHeight} site={userLists} columnsData={visibleColumns.length > 0 ? columns.filter((item) => visibleColumns.includes(item.key)) : columns} />
      </Spin>
    </>
  );
}

export default Users;
