import React, { useState, useEffect, useRef } from "react";
import PortfolioPerformance from "./PortfolioPerformance";
import {
  Card
  } from "antd";
import { getApiDataFromAws, getDates } from "../../../services/dashboardDataService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PortfolioPerformanceChart = (props) => {
  const [energyUsageBySite, setEnergyUsageBySite] = useState([]);

  const fetchData = async (buildingType, dateSpan, dataSet) => {
    if (buildingType != null && dateSpan != null) {
      //alert("called from Portfolio Performance:" + buildingType + " " + dateSpan + " " + dataSet);
      const dates = getDates(dateSpan);
      const resp = await getApiDataFromAws(
        "startDateString=" +
        dates.start +
        "&endDateString=" +
        dates.end +
        "&buildingType=" + buildingType + "&dataSet=Electrical&functionName=verdeosDemoPortfolioPerformance"
      );
      setEnergyUsageBySite(resp);

    }
  };

  useEffect(() => {
    fetchData(props.buildingType, props.dateSpan, props.dataSet);
  }, [props.buildingType, props.dateSpan, props.dataSet]);
  
  return (
    <>
      <PortfolioPerformance data={energyUsageBySite} />
    </>
  );
};

export default PortfolioPerformanceChart;
