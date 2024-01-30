import React, { useState, useContext } from "react";
import { Spin, Divider, Select,DatePicker } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal } from "antd";
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
import { AppContext } from "../App";
import { getApiDataFromAws, postMpReadingsDataToAws, isAuthenticated, userInfo } from "../services/apis";
import {
  addSites,
  deleteSites,
  editSites
} from "../services/sitesService";
import { useHistory } from 'react-router-dom';
import spinnerjiff from "../assets/images/loader.gif";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const DATE_FORMAT = 'YYYY-MM-DD';
const screenHeight = window.innerHeight-310;
function Sites() {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedItemUt, setSelectedItemUt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [siteData, setSiteData] = useState({});
  const [loading, setloading] = useState(true);
  const [SitesId, setSitesId] = useState();
  const [site, setSite] = useState([]);
  const [open, setOpen] = useState(false);
  const context = useContext(AppContext);
  const history = useHistory();
  // console.log(open);
  const [form] = Form.useForm();
  const totalRows = site.length;
 
  const onCancelModal = () => {
    setOpen(false);
    setSitesId();
    form.resetFields();
  };


  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "1",
      width:300,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "2",
      width:200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: Array.from(new Set(site.map(item => item.name))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "3",
      width:200,
      sorter: (a, b) => a.area - b.area,
      filters: Array.from(new Set(site.map(item => item.area))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.area.startsWith(value),
    },
    {
      title: "Project ID",
      dataIndex: "projId",
      key: "4",
      width:200,
      sorter: (a, b) => a.projId.localeCompare(b.projId),
      filters: Array.from(new Set(site.map(item => item.projId))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.projId.startsWith(value),
    },
    {
      title: "Site",
      dataIndex: "site",
      key: "5",
      width:200,
      sorter: (a, b) => (a.site === b.site ? 0 : a.site ? -1 : 1),
      render: (text) => (text ? "True" : "False"),
      filters: Array.from(new Set(site.map(item => item.site))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.site.startsWith(value),
    },
    {
      title: "ARMS Project ID",
      dataIndex: "armsProjectId",
      key: "6",
      width:200,
      sorter: (a, b) => a.armsProjectId.localeCompare(b.armsProjectId),
      filters: Array.from(new Set(site.map(item => item.armsProjectId))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.armsProjectId.startsWith(value),
    },
    {
      title: "Tz",
      dataIndex: "tz",
      key: "7",
      width:200,
      sorter: (a, b) => a.tz.localeCompare(b.tz),
      filters: Array.from(new Set(site.map(item => item.tz))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.tz.startsWith(value),
    },
    {
      title: "ARMS Project",
      dataIndex: "armsProj",
      key: "8",
      width:200,
      sorter: (a, b) => a.armsProj.localeCompare(b.armsProj),
      filters: Array.from(new Set(site.map(item => item.armsProj))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.armsProj.startsWith(value),
    },
    {
      title: "Observes Holidays",
      dataIndex: "observesHolidays",
      key: "9",
      width:200,
      sorter: (a, b) => a.observesHolidays.localeCompare(b.observesHolidays),
      render: (text) => (text ? "True" : "False"),
      filters: Array.from(new Set(site.map(item => item.observesHolidays))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.observesHolidays.startsWith(value),
    },
    {
      title: "Geographical Country",
      dataIndex: "geoCountry",
      key: "10",
      width:200,
      sorter: (a, b) => a.geoCountry.localeCompare(b.geoCountry),
      filters: Array.from(new Set(site.map(item => item.geoCountry))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.geoCountry.startsWith(value),
    },
    {
      title: "Geographical Address",
      dataIndex: "geoAddress",
      key: "11",
      width:200,
      sorter: (a, b) => a.geoAddress.localeCompare(b.geoAddress),
      filters: Array.from(new Set(site.map(item => item.geoAddress))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.geoAddress.startsWith(value),
    },
    {
      title: "Longitude",
      dataIndex: "long",
      key: "12",
      width:200,
      sorter: (a, b) => a.long.localeCompare(b.long),
    },
    {
      title: "Latitude",
      dataIndex: "lat",
      key: "13",
      width:200,
      sorter: (a, b) => a.lat.localeCompare(b.lat),
    },
    {
      title: "State",
      dataIndex: "stateRef",
      key: "14",
      width:200,
      sorter: (a, b) => a.stateRef.localeCompare(b.stateRef),
      filters: Array.from(new Set(site.map(item => item.stateRef))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.stateRef.startsWith(value),
    },
    {
      title: "Region",
      dataIndex: "regionRef",
      key: "15",
      width:200,
      sorter: (a, b) => a.regionRef.localeCompare(b.regionRef),
      filters: Array.from(new Set(site.map(item => item.regionRef))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.regionRef.startsWith(value),
    },
    {
      title: "Weather Station",
      dataIndex: "weatherStationRef",
      key: "16",
      width:300,
      sorter: (a, b) => a.weatherStationRef.localeCompare(b.weatherStationRef),
      filters: Array.from(new Set(site.map(item => item.weatherStationRef))).map((name, index) => ({
        text: name,
        value: name,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.weatherStationRef.startsWith(value),
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "17",
      width:200,
      render: (text, record, index) => (
        <>
          <a onClick={() => onEdit(record)}>EDIT</a>
          <Divider type="vertical" />
          <a onClick={() => onDelete(record.id)} style={{display:"none"}}>DELETE</a>
        </>
      ),
    },
  ];

  const getFormatedDate = (startDate) =>{
       
    const year = startDate.toDate().getFullYear();
    const month = (startDate.toDate().getMonth() + 1).toString().padStart(2, '0');
    const day = startDate.toDate().getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    //console.log(formattedDate);
    return formattedDate;

}

  const loadSiteData = async() =>{
    const sitesList = await getApiDataFromAws("queryType=dropdownSite");
    setSiteData(sitesList);
  }

  const getData = async () => {
    setIsLoading(true);
    try {

      const body = {
        siteName:selectedItem,
        utilityType:selectedItemUt,
        startDate:getFormatedDate(startDate),
        endDate:getFormatedDate(endDate)
    }
      const pointsData = await postMpReadingsDataToAws(body)
      //setSite(pointsData);
      setloading(false);
      setIsLoading(false);
    } catch (error) { }
  };

  const setData = async (formData) => {
    try {
      if (SitesId) {
        const resp = await editSites(SitesId, formData);
      } else {
        const resp = await addSites(formData);
      }
      onCancelModal();
      getData();
    } catch (error) {
      console.log(error);
    }
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
    setSearchText(text);
    filter(text);
    if (text === "" || !text) {
      setSite(siteData);
    }
  };

  useEffect(() => {
    if(selectedItem !=null && selectedItemUt !=null && startDate !=null && endDate !=null){
      getData();
    }
  }, [selectedItem, selectedItemUt, startDate, endDate]);


  const handleSelectChange = (value) => {
    setSelectedItem(value);
    //checkSelectedValues(value)
  };

  const handleSelectChangeUt = (value) => {
    setSelectedItemUt(value);
    //checkSelectedValues(value)
  };

  const handleStartDateChange = (date, dateString) => {
    console.log("Selected Start Date:", dateString);
    setStartDate(date);
    //checkSelectedValues(date)
  };

  const handleEndDateChange = (date, dateString) => {
    console.log("Selected Start Date:", dateString);
    setEndDate(date);
    //checkSelectedValues(date)
  };


  const filter = (text) => {
    // debugger
    const filteredData = site.filter(
      (record) =>
        record.name.toLowerCase().includes(text.toLowerCase()) ||
        record.area.toLowerCase().includes(text.toLowerCase()) ||
        record.projId.toString().includes(text.toLowerCase()) ||
        record.stateRef.toLowerCase().includes(searchText.toLowerCase()) ||
        record.regionRef.toLowerCase().includes(searchText.toLowerCase()) ||
        record.weatherStationRef.toLowerCase().includes(searchText.toLowerCase()) ||
        record.armsProj.toLowerCase().includes(searchText.toLowerCase())
    );
    setSite(filteredData);
  };
 useEffect(() => {
    const authenticated = isAuthenticated()
    if(authenticated){
      loadSiteData();
    }else {
      var userData = userInfo(context.token);
      if(userData == null){
        history.push('/');
      }else{
        loadSiteData();
      }
    }
  }, []);

  return (
    <>
      {" "}
      <Row>
        <Col span={17}>
         <Select
            className="mb-4"
            placeholder="Select Utility Type"
            value={selectedItemUt}
            onChange={handleSelectChangeUt}
            size="large"
            style={{ marginRight: '10px',minWidth: '200px' }} 
          >
              <Select.Option key="elect" value="elec">elec</Select.Option>
              <Select.Option key="water" value="water">water</Select.Option>
              <Select.Option key="gas" value="gas">gas</Select.Option>
          </Select>
          <Select
            placeholder="Select Site"
            value={selectedItem}
            onChange={handleSelectChange}
            size="large"
            style={{ marginRight: '10px',minWidth: '200px' }} 
          >
            {siteData.length > 0 &&
                siteData.map((item, index) => (
                  <Select.Option key={index} value={item.name}>{item.name}</Select.Option>
                ))
              }

          </Select>
          <DatePicker
            placeholder="Select Start Date"
            className='form_input dtPickerMPReadings'
            format={DATE_FORMAT}
            style={{ marginRight: '10px' }}
            onChange={handleStartDateChange}
          />
          <DatePicker
            placeholder="Select End Date"
            className='form_input dtPickerMPReadings'
            format={DATE_FORMAT}
            onChange={handleEndDateChange}
          />
        </Col>
        <Col span={7} style={{ marginBottom: 10, textAlign: 'right'  }}>
         {/* <Input
            size="small"
            placeholder="search here ..."
            className="custom-input"
            value={searchText}
            onChange={(e) => onChangeText(e.target.value)}
          />*/}
        </Col>
      </Row>
      <Spin spinning={isLoading} size="large" indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}>
        <Table
          columns={columns}
          dataSource={site}
          rowKey={"id"}
          scroll={{
            x: 1000,
            y:screenHeight
          }}
          pagination={{
            total:totalRows,
            showTotal: (total, range) => (`Total Readings ${total}`)
          }}
        />
      </Spin>
    </>
  );
}

export default Sites;
