import React, { useState, useContext } from "react";
import { Spin, Divider, Select, DatePicker, message, Rate,Progress,Space } from "antd";
import { Form, Input, Table } from "antd";
import { Button, Row, Col, Modal,Card } from "antd";
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
import { AppContext } from "../App";
import MeterReadings from "../components/chart/apex_charts/MeterReadings"
import CunsumptionChart
from "../components/chart/apex_charts/CunsumptionChart";
import { getApiDataFromAws, postAlertsApiDataToAws, postMpReadingsDataToAws, isAuthenticated, userInfo } from "../services/apis";
import {
  addSites,
  deleteSites,
  editSites
} from "../services/sitesService";
import GaugeChart from "../components/chart/apex_charts/GaugeChart";
import BaseLoadChart from "../components/chart/apex_charts/BaseLoadChart";
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
function Sites() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [selectedItemUt, setSelectedItemUt] = useState(null);
  const [selectedItemFt, setSelectedItemFt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [siteData, setSiteData] = useState({});
  const [loading, setloading] = useState(true);
  const [tracker, setTracker] = useState({});
  const context = useContext(AppContext);
  const history = useHistory();

 
  const getFormatedDate = (startDate) => {

    const year = startDate.toDate().getFullYear();
    const month = (startDate.toDate().getMonth() + 1).toString().padStart(2, '0');
    const day = startDate.toDate().getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    //console.log(formattedDate);
    return formattedDate;

  }

  const loadSiteData = async () => {
    const sitesList = await getApiDataFromAws("queryType=dropdownSite");
    setSiteData(sitesList);
  }

  const getData = async () => {
    setIsLoading(true);
    try {

      const body = {
        funcName:"getPreprocessedReportData",
        sitename: selectedItem,
        utilitytype: selectedItemUt,
        reporttype : selectedItemFt,
        startdate: getFormatedDate(startDate),
      }
      const trackerData = await postAlertsApiDataToAws(body)
      if (Object.keys(trackerData).length === 0) {
        setTracker([])
        setloading(false);
        setIsLoading(false);
        message.error({
          content: trackerData.length === 0 ? "Readings not found for selected site or utility" : trackerData, // Display the error message
          style: {
            marginTop: 'calc(50vh - 30px)', // Center vertically
            marginLeft: 'calc(20vw - 150px)', // Center horizontally
          },
        });
      } else {
        if(trackerData == "Not Found"){
          message.error('No data available for the selected measures.');
        }else{
          setTracker(trackerData);
          setloading(false);
          setIsLoading(false);
        }
      }

    } catch (error) { }
  };


  let ratingPeriodEndDate = new Date(tracker.ratingPeriodEndDate); // yyyy-mm-dd
  let ratingPeriodStartDate = new Date(tracker.ratingPeriodStartDate); // yyyy-mm-dd
  let dayNSd = ratingPeriodStartDate.toLocaleString('default', { day: '2-digit' });
  let monthSd = ratingPeriodStartDate.toLocaleString('default', { month: 'short' });
  let yearSd = ratingPeriodStartDate.toLocaleString('default', { year: 'numeric' });

  let month = ratingPeriodEndDate.toLocaleString('default', { month: 'short' });
  let dayN = ratingPeriodEndDate.toLocaleString('default', { day: '2-digit' });
  let day = ratingPeriodEndDate.toLocaleString('default', { weekday: 'long' });
  let year = ratingPeriodEndDate.toLocaleString('default', { year: 'numeric' });

  useEffect(() => {
    if (selectedItem != null && selectedItemUt != null && startDate != null && selectedItemFt != null) {
      getData();
    }
  }, [selectedItem, selectedItemUt, startDate, selectedItemFt]);


  const handleSelectChange = (value) => {
    setSelectedItem(value);
    //checkSelectedValues(value)
  };

  const handleSelectChangeUt = (value) => {
    setSelectedItemUt(value);
    //checkSelectedValues(value)
  };

  const handleSelectChangeFt = (value) => {
    setSelectedItemFt(value);
    //checkSelectedValues(value)
  };

  const handleStartDateChange = (date, dateString) => {
    console.log("Selected Start Date:", dateString);
    setStartDate(date);
    //checkSelectedValues(date)
  };


  useEffect(() => {
    const authenticated = isAuthenticated()
    if (authenticated) {
      loadSiteData();
    } else {
      var userData = userInfo(context.token);
      if (userData == null) {
        history.push('/');
      } else {
        loadSiteData();
      }
    }
  }, []);

  useEffect(() => {
    // Do something when tracker changes, maybe fetch more data or update some UI
    // For now, let's just log that tracker changed
    //console.log("tracker changed:", tracker);
  }, [tracker]);

  return (
    <>
      {" "}
      <Row>
        <Col span={20}>
          <Select
            placeholder="Select Site"
            value={selectedItem}
            onChange={handleSelectChange}
            size="large"
            style={{ marginRight: '10px', minWidth: '200px' }}
          >
            {siteData?.length > 0 &&
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
            style={{ marginRight: '10px', minWidth: '200px' }}
          >
            <Select.Option key="elec" value="elec">elec</Select.Option>
            <Select.Option key="water" value="water">water</Select.Option>
            <Select.Option key="gas" value="gas">gas</Select.Option>
          </Select>
          <Select
            className="mb-4"
            placeholder="Select Frequency"
            value={selectedItemFt}
            onChange={handleSelectChangeFt}
            size="large"
            style={{ marginRight: '10px', minWidth: '200px' }}
          >
            <Select.Option key="Daily" value="Daily">Daily</Select.Option>
            <Select.Option key="Weekly" value="Weekly">Weekly</Select.Option>
            <Select.Option key="Monthly" value="Monthly">Monthly</Select.Option>
          </Select>
          <DatePicker
            placeholder="Select Start Date"
            className='form_input dtPickerMPReadings'
            format={DATE_FORMAT}
            style={{ marginRight: '10px' }}
            onChange={handleStartDateChange}
          />
        </Col>
        <Col span={4} style={{ marginBottom: 10, textAlign: 'right' }}>
        </Col>
      </Row>
      <Row gutter={[16]} style={{ marginBottom: '20px'}}>
        <Col span={12}>
          {(tracker && Object.keys(tracker).length !== 0) &&
          <Card className="custom-card" style={{height:'100%'}}>
              <div className="semibold" style={{ color: '#C5C5C5', marginBottom: '20px',fontSize:'18px' }}>{tracker.reportName.replace(tracker.reportName.split("-")[0] + "-", "")}</div>
              <div className="semibold" style={{ color: '#C5C5C5' ,fontSize:'18px'}}>{tracker.siteAddress}
              </div>
              <Rate allowHalf style={{ color: '#008DB1' , marginBottom: '20px'}} disabled defaultValue={tracker.currentStarRatingTarget} 
                count={6} 
              />
              <span style={{ color: '#C5C5C5', marginLeft: '4px',fontSize:'12px' }}>current Target</span>
              <p style={{color:'#C5C5C5',marginBottom:'0px'}}>Rating Period (RP)</p>
              <div>
                <Progress percent={tracker.ratingPeriodPassedFactor*100} showInfo={false} strokeWidth={18} trailColor={'#8E8E8E33'} strokeColor={{ '0%': '#4397F6', '100%': '#3069b9' }} />
                <div style={{justifyContent:'space-between',display:'flex'}}>
                  <p style={{color:'#8E8E8E'}}>{dayNSd} {monthSd}  {yearSd}</p>
                  <p style={{color:'#8E8E8E'}}>{dayN} {month}  {year}</p>
                </div>
              </div>
            </Card>}
        </Col>
        <Col span={6} >
          {(tracker && Object.keys(tracker).length !== 0) && <GaugeChart gaugeData={tracker.rangePerformance} repFreq={tracker.reportFrequencyType} title={""} utilityType={tracker.utilityType}/>  }
        </Col>
        <Col span={6}>
          {(tracker && Object.keys(tracker).length !== 0) && <GaugeChart gaugeData={tracker.ytdPerformance} repFreq={tracker.reportFrequencyType} title={"RP START TO DATE"} utilityType={tracker.utilityType}/> }
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px' }}>
       {(tracker && Object.keys(tracker).length !== 0) && <CunsumptionChart seriesData={tracker.consumpionProfile} temp={tracker.temp}/>}
      </Row>
      {(tracker && Object.keys(tracker).length !== 0) && <BaseLoadChart seriesConData={tracker.baseloadPeakConsumptionData} seriesTempData={tracker.baseloadPeakTemp}/>}
    </>
  );
}

export default Sites;
