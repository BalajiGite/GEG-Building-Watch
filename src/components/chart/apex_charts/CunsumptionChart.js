import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Spin, Card } from "antd";
import spinnerjiff from "../../../assets/images/loader.gif";

function CunsumptionChart({ seriesData, temp,utilityType, unit }) {
  const [spin, setSpin] = useState(false);

  const categories = seriesData.map(item => item.ts);
  const consumptionData = seriesData.map(item => item.consumption);
  const tempData = temp.map(item=>item.oat)
  const otherSeries = Object.keys(seriesData[0]).filter(key => key !== 'ts' && key !== 'consumption').map(key => ({
    name: key,
    type: 'line',
    yAxisIndex: 0,
    data: seriesData.map(item => item[key])
  }));

  const otherSeriesDataOnly = Object.keys(seriesData[0]).filter(key => key !== 'ts' && key !== 'consumption').reduce((combinedArray, key) => {
    const series = seriesData.map(item => item[key]);
    return [...combinedArray, ...series];
  }, []);
  const combinedArray = consumptionData.concat(otherSeriesDataOnly);
  const maxNumber = Math.max(...combinedArray);

  const options = {
    series: [{
      name: (utilityType == "gas"? "Gas ": utilityType == "water"?"Water ":"Electricity "),
      type: 'column',
      yAxisIndex: 0,
      data: consumptionData
    }, {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 1,
      data: tempData,
    }, ...otherSeries],
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
      width: [1,1.2,1.2,1.2,1.2],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '25%',
        borderRadius: 4,
        border: {
          color: 'transparent'
      },
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
    
    markers: {
      size: 0
    },
    grid: {
      show: true,
      borderColor: '#8E8E8E4D',
      strokeDashArray: 3,
      row: {
        colors: ['transparent', 'transparent', 'transparent','transparent', 'transparent'],
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false
        }
      },
    },
    xaxis: {
      //type: 'datetime',
      categories: categories,
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
          text: (utilityType == "gas"? "Gas ": utilityType == "water"?"Water ":"Electricity ") + "(" + unit + ")",
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
          text: 'Temperature (°C)',
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
        min: 20,
        tickAmount: 5, // This will show 5 labels on the y-axis
      }, {
        opposite: false,
        axisTicks: {
          show: false,
        },
      
        labels: {
            show: false,
            style: {
                colors: '#C5C5C5',
            }
        },
        title: {
            show: false,
            text: "",
        },
        tooltip: {
            enabled: false
        }
      },
      {
        opposite: true,
        axisTicks: {
          show: false,
        },
      
        labels: {
            show: false,
            style: {
                colors: '#C5C5C5',
            }
        },
        title: {
            show: false,
            text: "",
        },
        tooltip: {
            enabled: false
        }
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + "";
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
