import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Spin, Card } from "antd";
import spinnerjiff from "../../../assets/images/loader.gif";

const PortfolioPerformance = ({ jsonData, color }) => {
  const [spin, setSpin] = useState(false);

  if (!jsonData || jsonData.length === 0) {
    return (
      <Card className="custom-card" style={{ width: "100%" }}>
        <Spin
          spinning={spin}
          size="large"
          style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}
        >
          <div style={{ fontSize: "18px", color: "#C5C5C5" }}>Loading..</div>
        </Spin>
      </Card>
    );
  }

  // Transform JSON data
  const sites = [];
  const consumptionData = [];
  const targetData = [];
  let unit = ""; // Default unit

  // Create a combined array for sorting
  const combinedData = jsonData.map((item) => {
    if (item.data) {
      const { site, data } = item;
      const consumptionValue = parseFloat(data.consumption.replace(/,/g, ""));
      const targetValue = parseFloat(data.target.replace(/,/g, ""));
      unit = data.consumption.replace(/[\d,]/g, "").trim();
      return { site, consumptionValue, targetValue };
    } else {
      const { site } = item;
      return { site, consumptionValue: 0, targetValue: 0 };
    }
  });

  // Sort the combined array based on `consumptionValue` in descending order
  combinedData.sort((a, b) => b.consumptionValue - a.consumptionValue);

  // Populate the arrays based on the sorted data
  combinedData.forEach((item) => {
    sites.push(item.site);
    consumptionData.push(item.consumptionValue);
    targetData.push(item.targetValue);
  });

  // Configure Highcharts
  const chartOptions = {
    chart: {
      marginBottom: sites.length>12? 110:80,
      marginTop: 25,
      height: 280,
      backgroundColor: "transparent",
    },
    title: {
      text: "",
      align: "left",
      style: {
        fontFamily: "Inter, sans-serif",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "21.78px",
        color: "#C5C5C5",
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: sites,
      crosshair: true,
      lineWidth: 1,
      labels: {
          style: {
              color: '#C5C5C5' // Set the color of the x-axis labels to red
          }
      }
    },
    yAxis: [
      {
        labels: {
            format: `{value} ${unit}`,
            formatter: function () {
              return Highcharts.numberFormat(this.value, -1, undefined, ',') + " " + `${unit}`;
            },
            style: {
                color: '#C5C5C5',
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: '12px',
                letterSpacing: '0em',
            },
        },
        tickAmount: 6,
        gridLineDashStyle: 'longdash',
        allowDecimals: true,
        title: {
            text: `Consumption (${unit})`,
            style: {
              fontFamily: "Inter, sans-serif",
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "12.1px",
              color: "#C5C5C5",
            },
        },
        //opposite: true,
        gridLineWidth: 0.5,
        gridLineColor: '#8E8E8E4D'      
      },
      {
        title: {
          text: `Target (${unit})`,
          style: {
            fontFamily: "Inter, sans-serif",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "12.1px",
            color: "#C5C5C5",
          },
        },
        tickAmount: 6,
        gridLineDashStyle: 'longdash',
        allowDecimals: true,
        labels: {
          format: `{value} ${unit}`,
          formatter: function () {
              return Highcharts.numberFormat(this.value, -1, undefined, ',') + " " + `${unit}`;
          },
          style: {
              color: '#C5C5C5',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: '12px',
              letterSpacing: '0em',
          },
        },
        opposite: true,
        gridLineWidth: 0.5,
        gridLineColor: '#8E8E8E4D'
      },
    ],
    tooltip: {
      shared: true,
      useHTML: true, // Allows more control over tooltip rendering
      formatter: function () {
        let tooltip = `<b>${this.x}</b><br/>`; // Display the x-axis category
        const unit = this.points?.[0]?.series?.userOptions?.tooltip?.valueSuffix || ""; // Default to an empty string if no unit
        this.points.forEach(function (point) {
          tooltip += `
            <span style="color:${point.color}">\u25CF</span> 
            ${point.series.name}: <b>${Highcharts.numberFormat(point.y, 0,'.', ',')} ${unit}</b><br/>
          `;
        });
        return tooltip;
      },
    },    
    legend: {
      align: 'center',
      x: 0,
      verticalAlign: 'bottom',
      y: 0,
      floating: true,
      backgroundColor: "transparent",
      itemStyle: {
        color: "#C5C5C5",
        fontWeight: 400,
        fontSize: "12px",
        fontFamily: "Inter",
      },
      itemHoverStyle: {
        color: "white",
      },
    },
    plotOptions: {
      series: {
          lineWidth: 1,
          dashStyle: 'Solid'
      },
      column: {
          borderRadius: 5,// Adjust this value as needed
          color: '#4397F6',
          borderWidth: 0,
          pointWidth: 10
      }
    },
    series: [
      {
        name: "Consumption",
        data: consumptionData,
        type: 'column',
        color: color === "color-1" ? "#1BC388" : "#0073E6",
        tooltip: {
          valueSuffix: unit, // Add the unit dynamically
        },
      },
      {
        name: "Target",
        data: targetData,
        type: 'spline',
        lineWidth: 0,
        yAxis: 1,
        color: "#FFA726",
        tooltip: {
          valueSuffix: unit, // Add the unit dynamically
        },
        states: {
          hover: {
              lineWidthPlus: 0
          }
        }
      },
    ],
  };

  return (
    <Card className="custom-card" style={{ width: "100%" }}>
      <Spin
        spinning={spin}
        size="large"
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}
      >
        <big className="brand" style={{ fontSize: "18px", color: "#C5C5C5" }}>
          Portfolio Performance
        </big>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </Spin>
    </Card>
  );
};

export default PortfolioPerformance;
