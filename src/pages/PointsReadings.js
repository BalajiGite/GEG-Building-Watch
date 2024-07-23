import React, { useState, useContext } from "react";
import { Spin, Divider, Select,DatePicker, message } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal } from "antd";
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
import { AppContext } from "../App";
import MeterReadings  from   "../components/chart/apex_charts/MeterReadings"
import { getApiDataFromAws, postMpReadingsDataToAws, isAuthenticated, userInfo } from "../services/apis";
import {
  addSites,
  deleteSites,
  editSites
} from "../services/sitesService";
import { useHistory } from 'react-router-dom';
import spinnerjiff from "../assets/images/loader.gif";
import { CSVLink } from 'react-csv';
import ResizableTable from "../components/widgets/ResizeTable/ResizableTable";

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
  const [projectData, setProjectData] = useState({});
  const [selectedItemProj, setSelectedItemProj] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedItemUt, setSelectedItemUt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [siteData, setSiteData] = useState({});
  const [loading, setloading] = useState(true);
  const [SitesId, setSitesId] = useState();
  const [mpReadings, setMpReadings] = useState([]);
  const [open, setOpen] = useState(false);
  const context = useContext(AppContext);
  const history = useHistory();
  // console.log(open);
  const [form] = Form.useForm();
  const totalRows = mpReadings.length;
 
  const onCancelModal = () => {
    setOpen(false);
    setSitesId();
    form.resetFields();
  };

  const keys = [...new Set(mpReadings.flatMap(item => Object.keys(item)))];
  const tsFilter = Array.from(new Set(mpReadings.map(item => item.ts))).map((name, index) => ({
    text: name,
    value: name,
  }));

  const columns = keys.map((key, index) => {
    if (key === "ts") {
        return {
            title: "TimeStamp",
            dataIndex: "ts",
            key: `${index + 1}`,
            width: 200,
            sorter: (a, b) => a.ts.localeCompare(b.ts),
            filters: tsFilter,
            filterMode: "tree",
            filterSearch: false,
            onFilter: (value, record) => record.ts.startsWith(value),
        };
    } else {
        return {
            title: key,
            dataIndex: key,
            key: `${index + 1}`,
            width: 200,
            sorter: (a, b) => {
                if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                    return a[key].localeCompare(b[key]);
                }
                return a[key] - b[key];
            }
        };
    }
  });

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

    const projectList = await getApiDataFromAws("queryType=userProjList");
    const allProj = { "id": "allProjects", "name": "All Projects" }
    const projs = [...projectList, allProj]
    setProjectData(projs);

  }
  
  const getData = async () => {
    setIsLoading(true);
    setMpReadings([{ ts: "" }]);
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Please select a shorter date range.")), 15000) // 10 seconds timeout
    );
  
    try {
      const body = {
        siteName: selectedItem,
        utilityType: selectedItemUt,
        startDate: getFormatedDate(startDate),
        endDate: getFormatedDate(endDate)
      };
  
      // Race the pointsData promise against the timeoutPromise
      const pointsData = await Promise.race([postMpReadingsDataToAws(body), timeoutPromise]);
  
      if (!Array.isArray(pointsData) || pointsData.length === 0) {
        setMpReadings([]);
        setloading(false);
        setIsLoading(false);
        message.error({
          content: pointsData.length === 0 ? "Readings not found for selected site or utility" : pointsData, // Display the error message
          style: {
            marginTop: 'calc(50vh - 30px)', // Center vertically
            marginLeft: 'calc(20vw - 150px)', // Center horizontally
          },
        });
      } else {
        setMpReadings(pointsData);
        setloading(false);
        setIsLoading(false);
      }
  
    } catch (error) {
      setloading(false);
      setIsLoading(false);
      message.error({
        content: error.message,
        style: {
          marginTop: 'calc(50vh - 30px)', // Center vertically
          marginLeft: 'calc(20vw - 150px)', // Center horizontally
        },
      });
    }
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
      setMpReadings(siteData);
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

  const handleSelectChangeProj = async (value) => {
    setSelectedItemProj(value);
    if(value ==="allProjects"){
      const sitesList = await getApiDataFromAws("queryType=dropdownSite");
      setSiteData(sitesList);
      setSelectedItem(sitesList[0].name);
    }else{
      const sitesList = await getApiDataFromAws("queryType=dropdownSite&dropdownProjFilter="+value);
      setSiteData(sitesList);
      setSelectedItem(sitesList[0].name);
    }
  };


  const exportToCSV = () => {
    const csvData = mpReadings.map(item => ({
      ...item, // Assuming mpReadings is an array of objects
    }));

    return csvData;
  };


  const filter = (text) => {
    // debugger
    const filteredData = mpReadings.filter(
      (record) =>
        record.name.toLowerCase().includes(text.toLowerCase()) ||
        record.area.toLowerCase().includes(text.toLowerCase()) ||
        record.projId.toString().includes(text.toLowerCase()) ||
        record.stateRef.toLowerCase().includes(searchText.toLowerCase()) ||
        record.regionRef.toLowerCase().includes(searchText.toLowerCase()) ||
        record.weatherStationRef.toLowerCase().includes(searchText.toLowerCase()) ||
        record.armsProj.toLowerCase().includes(searchText.toLowerCase())
    );
    setMpReadings(filteredData);
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

  useEffect(() => {
    // Do something when mpReadings changes, maybe fetch more data or update some UI
    // For now, let's just log that mpReadings changed
    //console.log("mpReadings changed:", mpReadings);
  }, [mpReadings]);

  return (
    <>
      {" "}
      <Row>
        <Col span={20}>
          <Select
            placeholder="Select Project"
            value={selectedItemProj}
            onChange={handleSelectChangeProj}
            size="large"
            style={{ marginRight: '10px', minWidth: '200px' }}
          >
            {projectData?.length > 0 &&
              projectData.map((item, index) => (
                <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
              ))
            }

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
        <Col span={4} style={{ marginBottom: 10, textAlign: 'right'  }}>
          <CSVLink data={exportToCSV()} filename={"meterReadings.csv"}>
          <button  className="custom-button">Export to CSV</button>
              </CSVLink>      
          </Col>
      </Row>
      {mpReadings.length > 0 && (
        <Row style={{ marginBottom: '20px' }}>
            <MeterReadings data={mpReadings} isLoading={isLoading} unit={selectedItemUt=="elec"?"kWh":selectedItemUt=="water"?"kL":"cf"}/>
        </Row>
      )}
      {mpReadings.length > 0 && (
        <Spin spinning={isLoading} size="large" indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}>
            <ResizableTable total={totalRows} name={"Readings"} screenHeight = {screenHeight} site={mpReadings} columnsData = { columns} />
        </Spin>
      )}
      
    </>
  );
}

export default Sites;
