import React, { useState, useContext } from "react";
import { Spin, Select, DatePicker, message, Rate,Progress,Tooltip  } from "antd";
import moment from 'moment';
import { Row, Col, Card } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import "reactjs-popup/dist/index.css";
import { useEffect } from "react";
import { AppContext } from "../App";
import  ConsumptionChart  from "../components/chart/apex_charts/ConsumptionChart";
import ResizableTable from "../components/widgets/ResizeTable/ResizableTable";
import PortfolioPerformanceChart from "../components/chart/dashboard/PortfolioPerformanceChart";
import PortfolioPerformance from "../components/chart/dashboard/PortfolioPerformance";
import { getApiDataFromAws, postAlertsApiDataToAws, isAuthenticated, userInfo } from "../services/apis";
import GaugeChart from "../components/chart/apex_charts/GaugeChart";
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

const selectedDateSpan  = {start:"2024-10-31", end: "2024-11-29"}
const DATE_FORMAT = 'YYYY-MM-DD';
function Portfolio() {

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemProj, setSelectedItemProj] = useState(null);
  const [currentStarRatingTarget, setCurrentStarRatingTarget] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [selectedItemUt, setSelectedItemUt] = useState(null);
  const [selectedItemFt, setSelectedItemFt] = useState(null);
  const [clientName, setClientName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [siteData, setSiteData] = useState({});
  const [projectData, setProjectData] = useState({});
  const [loading, setloading] = useState(true);
  const [tracker, setTracker] = useState({});
  const [portfolioData, setPortfolioData] = useState({});
  const context = useContext(AppContext);
  const history = useHistory();

  const columnsData = [
    {
      title: "Certification",
      dataIndex: "certification",
      key: "certification",
      width: 200,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Star Score",
      dataIndex: "starScore",
      key: "starScore",
      width: 100,
    },
    {
      title: "Rating Type",
      dataIndex: "ratingType",
      key: "ratingType",
      width: 150,
    },
    {
      title: "Valid Date",
      dataIndex: "validDate",
      key: "validDate",
      width: 150,
    },
  ];

  const ratingData = [
    { id: 1, certification: "Industrial - 1", name: "NABERS", starScore: "6/6", ratingType: "Energy", validDate: "2024-04-29" },
    { id: 2, certification: "Industrial - 2", name: "NABERS", starScore: "6/6", ratingType: "Energy", validDate: "2024-04-29" },
    { id: 3, certification: "Industrial - 4", name: "NABERS", starScore: "6/6", ratingType: "Energy", validDate: "2024-04-29" },
    { id: 4, certification: "Offices - 6", name: "NABERS", starScore: "6/6", ratingType: "Energy", validDate: "2023-11-30" },
    { id: 5, certification: "Retail - 8", name: "NABERS", starScore: "6/6", ratingType: "Energy", validDate: "2024-04-29" },
    { id: 6, certification: "Industrial - 7", name: "NABERS", starScore: "6/6", ratingType: "Energy", validDate: "2024-04-29" },
    { id: 7, certification: "Offices - 5", name: "NABERS", starScore: "6/6", ratingType: "Energy", validDate: "2023-11-02" },
    { id: 8, certification: "Industrial - 6", name: "NABERS", starScore: "6/6", ratingType: "Energy", validDate: "2024-04-29" },
    { id: 9, certification: "Industrial - 12", name: "NABERS", starScore: "6/6", ratingType: "Energy", validDate: "2024-04-29" },
    { id: 10, certification: "Industrial - 3", name: "NABERS", starScore: "6/6", ratingType: "Energy", validDate: "2024-04-29" },
  ];

  // Screen height for scrolling
  const screenHeight = 400;

  // Total rows and name for pagination
  const totalRows = ratingData.length;
 
  const getFormatedDate = (startDate) => {
    try{
      console.log(startDate)
      const year = startDate.toDate().getFullYear();
      const month = (startDate.toDate().getMonth() + 1).toString().padStart(2, '0');
      const day = startDate.toDate().getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      //console.log(formattedDate);
      return formattedDate;
    }catch(e){
      return startDate
    }
  }

  const loadSiteData = async () => {
    setIsLoading(true);
    const sitesList = await getApiDataFromAws("queryType=dropdownSite&dropdownProjFilter=grosvenor");
    setSiteData(sitesList);

    const projectList = await getApiDataFromAws("queryType=userProjList");
    //const allProj = { "id": "allProjects", "name": "All Projects" }
    const projs = [...projectList]
    setProjectData(projs);

    const isMoorebankOfficePresent = sitesList.some(item => item.name === "Moorebank Office");
    setSelectedItemProj("grosvenor")
    setSelectedItem(isMoorebankOfficePresent?"Moorebank Office":sitesList[0].name); // Set first site as default
    setSelectedItemUt('elec'); // Set utility type as 'elec' by default
    setSelectedItemFt('Monthly'); // Set frequency as 'Daily' by default
    const lastMonthFirstDay = moment().subtract(1, 'month').startOf('month').format(DATE_FORMAT);
    setStartDate(lastMonthFirstDay);
    const body = {
      funcName:"getPreprocessedReportData",
      sitename: isMoorebankOfficePresent?"Moorebank Office":sitesList[0].name,
      utilitytype: 'elec',
      reporttype : 'Monthly',
      startdate: lastMonthFirstDay,
    }

    const clientBody = {
      funcName:"getProjectBySitename",
      sitename: isMoorebankOfficePresent?"Moorebank Office":sitesList[0].name,
    }
    getClienDetail(clientBody)
    getData(body)
    getConsumptionDataAllSite(sitesList, lastMonthFirstDay)
  }

  const getConsumptionDataAllSite = async (sitesList, startDate) => {
    if (!sitesList || sitesList.length === 0) {
      console.error("Invalid site list");
      return;
    }
  
    try {
      const promises = sitesList.map(async site => {
        const body = {
          funcName: "getPreprocessedReportData",
          sitename: site.name,
          utilitytype: "elec",
          reporttype: "Monthly",
          startdate: startDate,
        };
        const data = await postAlertsApiDataToAws(body);
        return ({
          site: site.name,
          data: !data || data === "Not Found" || data?.reporthaserror ? null : data.rangePerformance,
        });
      });
  
      const allSitesData = await Promise.all(promises);
      setPortfolioData(allSitesData); // Store aggregated data
    } catch (error) {
      console.error("Error fetching data for sites:", error);
      setPortfolioData([]);
    } finally {
      setloading(false);
      setIsLoading(false);
    }
  };
  

  const getClienDetail = async (clientBody)=>{
    const clientName = await postAlertsApiDataToAws(clientBody)
    setClientName(clientName.project)
  }

  const getData = async (body) => {
    
    try {

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
          setTracker({})
        }else{
          if (trackerData?.reporthaserror == true) {
            message.error('No report available for the selected measures.');
            setTracker({})
          }else{
            setTracker(trackerData);
            setCurrentStarRatingTarget(trackerData.currentStarRatingTarget)
          }
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
      const body = {
        funcName:"getPreprocessedReportData",
        sitename: selectedItem,
        utilitytype: selectedItemUt,
        reporttype : selectedItemFt,
        startdate: getFormatedDate(startDate),
      }
      getData(body);
      getConsumptionDataAllSite(siteData, getFormatedDate(startDate))
    }
  }, [selectedItem, selectedItemUt, startDate, selectedItemFt]);

  const handleSelectChangeProj = async (value) => {
    setSelectedItemProj(value);
    if(value ==="allProjects"){
      const sitesList = await getApiDataFromAws("queryType=dropdownSite");
      setSiteData(sitesList);
      setSelectedItem(sitesList[0].name);
      const clientBody = {
        funcName:"getProjectBySitename",
        sitename: sitesList[0].name,
      }
      getClienDetail(clientBody)
    }else{
      const sitesList = await getApiDataFromAws("queryType=dropdownSite&dropdownProjFilter="+value);
      setSiteData(sitesList);
      setSelectedItem(sitesList[0].name);
      const clientBody = {
        funcName:"getProjectBySitename",
        sitename: sitesList[0].name,
      }
      getClienDetail(clientBody)
    }
  };

  const handleSelectChange = (value) => {
    setSelectedItem(value);
    const clientBody = {
      funcName:"getProjectBySitename",
      sitename: value,
    }
    getClienDetail(clientBody)
  };

  const handleSelectChangeUt = (value) => {
    setSelectedItemUt(value);
    //checkSelectedValues(value)
  };

  const handleSelectChangeFt = (value) => {
    setSelectedItemFt(value);
    if(value == "Daily"){
      const yesterday = moment(moment().subtract(1, 'day').format(DATE_FORMAT), DATE_FORMAT);
      setStartDate(yesterday);
      
    }else if(value == "Monthly"){
      const firstDayOfPreviousMonth = moment().subtract(1, 'month').startOf('month').format(DATE_FORMAT);
      setStartDate(firstDayOfPreviousMonth);
    }else if(value == "Weekly"){
      const today = moment();
      const previousMonday = today.clone().startOf('isoWeek').subtract(1, 'week').format(DATE_FORMAT);
      setStartDate(previousMonday);
      console.log(previousMonday)
    }
    //checkSelectedValues(value)
  };

  const handleStartDateChange = (date, dateString) => {
    console.log("Selected Start Date:", dateString);
    setStartDate(date);
    //checkSelectedValues(date)
  };

  const disabledDate = (current, picker) => {
    if (picker === 'Weekly') {
      return current && current.day() !== 1; // Disable all days except Monday for weekly selection
    } else if (picker === 'Monthly') {
      return current && current.date() !== 1; // Disable all days except the first day of the month for monthly selection
    }
    // For daily selection, no dates are disabled
    return false;
  };


  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        loadSiteData();
      } else {
        var userData = userInfo(context.token);
        if (userData == null) {
          console.log("its coming here userData == null");
          history.push('/');    
        } else {
          console.log("its coming here");
          loadSiteData();
        }
      }
    };

    checkAuthentication();
  }, [context.token]);

  useEffect(() => {
    // Do something when tracker changes, maybe fetch more data or update some UI
    // For now, let's just log that tracker changed
    //console.log("tracker changed:", tracker);
  }, [tracker]);

  return (
    <>
      {" "}
      <Row>
        <Col span={22}>
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
            placeholder="Select Date"
            className='form_input dtPickerMPReadings'
            disabledDate={(current) => disabledDate(current, selectedItemFt)} // Initial disabled dates based on week picker
            format={DATE_FORMAT}
            defaultValue={moment(moment().subtract(1, 'day').format(DATE_FORMAT), DATE_FORMAT)}
            value={startDate ? moment(startDate, DATE_FORMAT) : null}
            style={{ marginRight: '10px' }}
            onChange={handleStartDateChange}
          />
        </Col>
        <Col span={2} style={{ marginBottom: 10, textAlign: 'right' }}>
          <Tooltip placement="leftBottom" title={
             <div>
             <p style={{ fontSize: '16px', color:'#c5c5c5', fontWeight: 'bold', marginBottom: '8px' }}>Disclaimer:</p>
             <p style={{ fontSize: '14px', marginBottom: '0', color:'#c5c5c5'}}>
               The NABERS tracking is determined from assumptions relating to historical gas, afterhours and exclusions.
               The NABERs tracking is an indication of NABERS performance but does not constitute an official NABERS rating,
               the results of an official NABERS rating may differ.
             </p>
           </div>
          }
          overlayStyle={{  backgroundColor: '#0A1016', width: '500px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
          >
            <InfoCircleOutlined style={{ fontSize: '24px', color: '#c5c5c5' }} />
          </Tooltip>
        </Col>
      </Row>
      {/** 
      <Row gutter={[16]} style={{ marginBottom: '20px'}}>
        <Col span={12}>
          {(tracker && Object.keys(tracker).length !== 0) &&
          <Card className="custom-card" style={{height:'100%'}}>
              <div className="semibold" style={{ color: '#C5C5C5', marginBottom: '20px',fontSize:'18px' }}>{clientName}</div>
              <div className="semibold" style={{ color: '#C5C5C5', marginBottom: '20px',fontSize:'18px' }}>{tracker.reportName?.replace(tracker.reportName?.split("-")[0] + "-", "")}</div>
              <div className="semibold" style={{ color: '#C5C5C5' ,fontSize:'18px'}}>{tracker.siteAddress}
              </div>
              <Rate allowHalf style={{ color: '#008DB1' , marginBottom: '20px'}} disabled value={tracker.currentStarRatingTarget}
                count={6} 
              />
              <span style={{ color: '#C5C5C5', marginLeft: '4px',fontSize:'12px' }}>Target Star Rating</span>
              <p style={{color:'#C5C5C5',marginBottom:'0px'}}>Rating Period (RP)</p>
              <div>
                <Progress percent={tracker.ratingPeriodPassedFactor*100} showInfo={false} strokeWidth={18} trailColor={'#8E8E8E33'} strokeColor={{ '0%': '#4397F6', '100%': '#3069b9' }} />
                <div style={{justifyContent:'space-between',display:'flex'}}>
                  <p style={{color:'#C5C5C5'}}>{dayNSd} {monthSd}  {yearSd}</p>
                  <p style={{color:'#C5C5C5'}}>{dayN} {month}  {year}</p>
                </div>
              </div>
            </Card>}
        </Col>
        <Col span={6} >
          {(tracker &&  Object.keys(tracker).length !== 0 && tracker.rangePerformance ) && <GaugeChart gaugeData={tracker.rangePerformance} repFreq={tracker.reportFrequencyType} title={""} utilityType={tracker.utilityType}/>  }
        </Col>
        <Col span={6}>
          {(tracker && Object.keys(tracker).length !== 0 &&  tracker.ytdPerformance ) && <GaugeChart gaugeData={tracker.ytdPerformance} repFreq={tracker.reportFrequencyType} title={"RP START TO DATE"} utilityType={tracker.utilityType}/> }
        </Col>
      </Row>*/}
      <Spin spinning={isLoading} size="large" indicator={<img src={spinnerjiff} style={{ fontSize: 50}} alt="Custom Spin GIF" />}>
        <Row style={{ marginBottom: '20px' }}>
            {(tracker && Object.keys(tracker).length !== 0 && tracker.consumpionProfile) && <ConsumptionChart resData={tracker} />}
        </Row>
        <Row style={{ marginBottom: '20px' }}>
        {(Object.keys(portfolioData).length !== 0) &&
            <PortfolioPerformance
            jsonData={portfolioData}
            />
        }
        </Row>
        <Row style={{ marginBottom: '35px' }}>
          <ResizableTable total={totalRows} name={"Ratings"} screenHeight = {screenHeight} site={ratingData} columnsData = { columnsData} />
        </Row>
      </Spin>
    </>
  );
}

export default Portfolio;
