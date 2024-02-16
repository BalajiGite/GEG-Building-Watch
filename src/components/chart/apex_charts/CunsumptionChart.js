import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Spin, Card } from "antd";
import spinnerjiff from "../../../assets/images/loader.gif";

function CunsumptionChart() {
  const [spin, setSpin] = useState(false);

  const options = {
    series: [{
      name: '1.5*',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
      name: '2.0*',
      type: 'line',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
      name: '3.0*',
      type: 'line',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }],
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: -25,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true,
          customIcons: []
        },
      }
    },
    stroke: {
      width: [1],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '12%',
        borderRadius: 4
      }
    },
    fill: {
      opacity: [1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
      '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
    ],
    markers: {
      size: 1
    },
    grid: {
      show: true,
      borderColor: '#8E8E8E4D',
      strokeDashArray: 3,
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false
        }
      },
    },
    xaxis: {
      type: 'datetime',
      style: {
        color: '#C5C5C5',
        fontSize: '12px',
        fontFamily: 'Inter',
        fontWeight: 400,
        lineHeight: '12px',
        letterSpacing: '0em',
        textAlign: 'left'
      },
      labels: {
        style: {
          colors: '#C5C5C5',
          fontSize: '10px',
          fontFamily: 'Inter',
          fontWeight: 400,
          lineHeight: '12px',
          letterSpacing: '0em',
          textAlign: 'left'
        }
      },
    },
    yaxis: [
      {
        title: {
          text: 'Electricity (KWh)',
          style: {
            color: '#C5C5C5',
            fontSize: '12px',
            fontFamily: 'Inter',
            fontWeight: 400,
            lineHeight: '12px',
            letterSpacing: '0em',
            textAlign: 'left'
          }
        },
        labels: {
          style: {
            colors: '#C5C5C5',
            fontSize: '10px',
            fontFamily: 'Inter',
            fontWeight: 400,
            lineHeight: '12px',
            letterSpacing: '0em',
            textAlign: 'left'
          }
        },
      },
     
      {
        opposite: true,
        title: {
          text: 'Temperature (C)',
          style: {
            color: '#C5C5C5',
            fontSize: '12px',
            fontFamily: 'Inter',
            fontWeight: 400,
            lineHeight: '12px',
            letterSpacing: '0em',
            textAlign: 'left'
          }
        },
        labels: {
          style: {
            colors: '#C5C5C5',
            fontSize: '10px',
            fontFamily: 'Inter',
            fontWeight: 400,
            lineHeight: '12px',
            letterSpacing: '0em',
            textAlign: 'left'
          }
        },
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        }
      }
    },
    legend: {
      labels: {
        colors: '#C5C5C5',
        fontSize: '10px',
        fontFamily: 'Inter',
        fontWeight: 400,
        lineHeight: '12px',
        letterSpacing: '0em',
        textAlign: 'left'
      }
    }
  };

  return (
    <Card className="custom-card" style={{ width: "100%" }}>
      <Spin spinning={spin} size="large" style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}>
        <big className="brand" style={{ fontSize: "18px", color: "#C5C5C5" }}>Consumption Profile</big>
        <ReactApexChart options={options} series={options.series} type="line" height={250} />
      </Spin>
    </Card>
  );
}

export default CunsumptionChart;
