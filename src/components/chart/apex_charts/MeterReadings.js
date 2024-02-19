import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { Spin, Card, Col, Row } from "antd";
import spinnerjiff from "../../../assets/images/loader.gif";
import { Background } from "devextreme-react/range-selector";

class MeterReadings extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    const { data,isLoading, unit  } = this.props;
    const categories = data.map(item => item.ts);
    const series = Object.keys(data[0]) // Get all keys except 'ts'
                  .filter(key => key !== 'ts')
                  .map(key => ({
                    name: key,
                    data: data.map(item => item[key])
                  }));
    this.state = {
      series: series,
      options: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: true,
            offsetX: 0, // Adjust the horizontal offset as needed
            offsetY:-25, // Adjust the vertical offset as needed
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: true ,
              customIcons: []
            },
            export: {
              csv: {
                filename:"Meter Readings",
                headerCategory: 'DateTime',
                headerValue: 'value',
                dateFormatter: function(timestamp) {
                  return timestamp;
                },
              }
            }
          }
        },
        colors: ['#0360A2', '#FAAD14', '#44C380', '#F46649', '#4CAF50', '#FF5722', '#2196F3', '#FFC107', '#9C27B0', '#E91E63'],
        dataLabels: {
          enabled: false,
          style: {
            colors: ['#C5C5C5'], // Set the color of data labels
            fontSize: '10px', // Set font size
            fontFamily: 'Inter', // Set font family
            fontWeight: 400, // Set font weight
            lineHeight: '12px', // Set line height
            letterSpacing: '0em', // Set letter spacing
            textAlign: 'left' // Set text alignment
          }
        },
        stroke: {
          curve: 'smooth',
          width: 1,
        },
        title: {
          text: '',
          align: 'left'
        },
        grid: {
          show: true, // Hides all grid lines
          borderColor: '#8E8E8E4D',
          strokeDashArray: 3,
          row: {
            colors: ['transparent', 'transparent'],
            opacity: 0.5,
            
          },
                   
          xaxis: {
             lines: {
               show: false // Hides only vertical grid lines
             }
          },
          yaxis: {
            lines: {
              show: true, // Shows only horizontal grid lines
            },
          }
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: categories,
          type: 'datetime',
          tickAmount: '10',
          title: {
            text: '',
            style: {
              color: '#C5C5C5', // Set the color of x-axis title
              fontSize: '10px', // Set font size
              fontFamily: 'Inter', // Set font family
              fontWeight: 400, // Set font weight
              lineHeight: '12px', // Set line height
              letterSpacing: '0em', // Set letter spacing
              textAlign: 'left' // Set text alignment
            }
          },
          labels: {
            formatter: function(val) {
              // Format the date here (assuming val is a timestamp string)
              // Example format using JavaScript's Date object:
              const date = new Date(val);
              return date.toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
            },
            style: {
              colors: '#C5C5C5', // Set the color of x-axis labels
              fontSize: '12px', // Set font size
              fontFamily: 'Inter', // Set font family
              fontWeight: 400, // Set font weight
              lineHeight: '12px', // Set line height
              letterSpacing: '0em', // Set letter spacing
              textAlign: 'left' // Set text alignment
            }
          }
        },
        yaxis: {
          title: {
            text: 'Consumption ('+unit+')',
            style: {
              color: '#C5C5C5', // Set the color of y-axis title
              fontSize: '12px', // Set font size
              fontFamily: 'Inter', // Set font family
              fontWeight: 400, // Set font weight
              lineHeight: '12px', // Set line height
              letterSpacing: '0em', // Set letter spacing
              textAlign: 'left' // Set text alignment
            }
          },
          labels: {
            formatter: function (val) {
              // Round the value to two decimal places
              return val.toFixed(2);
            },
            style: {
              colors: '#C5C5C5', // Set the color of y-axis labels
              fontSize: '10px', // Set font size
              fontFamily: 'Inter', // Set font family
              fontWeight: 400, // Set font weight
              lineHeight: '12px', // Set line height
              letterSpacing: '0em', // Set letter spacing
              textAlign: 'left' // Set text alignment
            }
          },
          //min: 10,
          //max: 40,
          tickAmount:5 
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 3
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          //offsetY: 20,
          //offsetX: -5,
          labels: {
            colors: '#C5C5C5',
            fontSize: '10px', // Set font size
            fontFamily: 'Inter', // Set font family
            fontWeight: 400, // Set font weight
            lineHeight: '12px', // Set line height
            letterSpacing: '0em', // Set letter spacing
            textAlign: 'left' // Set text alignment // Set the color of legend labels
          }
        }
      }
    };
    return (
      <Card className="custom-card" style={{ width: "100%" }}>
        <Spin spinning={isLoading} size="large" style={{backgroundColor:"rgba(0, 0, 0, 0)"}} indicator={<img src={spinnerjiff} style={{ fontSize: 50}} alt="Custom Spin GIF" />}>
          <big className="brand" style={{ fontSize: "18px", color: "#C5C5C5" }}>Meter Readings Data</big>
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={250} />
        </Spin>
      </Card>
    );
  }
}

export default MeterReadings;
