import React, { useState } from "react";
import { Spin, Card } from "antd";
import ReactApexChart from "react-apexcharts";

function BaseLoadChart({ seriesConData,seriesTempData }){

    const categories = seriesConData.map(item => item.ts);
    const baseLoadData = seriesConData.map(item => item.baseload);
    const peakLoadData = seriesConData.map(item => item.peak);
    const tempData = seriesTempData.map(item=>item.oat)
        
    const options = {
        series: [{
            name: 'Base Load',
            type: 'column',
            group: 'actual',
            data: baseLoadData
        }, {
            name: 'Peak Load',
            type: 'column',
            group: 'actual',
            data: peakLoadData
        }, {
            name: 'Temperature',
            type: 'line',
            group: 'budget',
            data: tempData
        }],
        chart: {
            height: 350,
            type: 'bar',
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
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '18%',
                borderRadius: 4,
                border: {
                    color: 'transparent'
                }
            }
        },
        fill: {
            opacity: [1,1,1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        title: {
            text: '',
            align: 'left',
            offsetX: 110
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
        colors: ['#9243F6', '#C31BA8', '#0360A2'],
        xaxis: {
            categories: categories,
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
                    text: "Electricity (KWh)",
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
                tooltip: {
                    enabled: false
                }
            },
            {
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
                title: {
                    text: 'Max Temperature (°C)',
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
        ],
        tooltip: {
            shared: true,
        },
        legend: {
            horizontalAlign: 'center',
            offsetX: 40,
            labels: {
                colors: '#C5C5C5',
                useSeriesColors: false
            },
        }
    }
    

    return (
        <Card className="custom-card" style={{ width: "100%" }}>
            <big className="brand" style={{ fontSize: "18px", color: "#C5C5C5" }}>Base load / Peak load</big>
            <ReactApexChart options={options} series={options.series} type="line" height={250} />
        </Card>
    );
    
}
export default BaseLoadChart;
//   const domContainer = document.querySelector('#app');
//   ReactDOM.render(React.createElement(ApexChart), domContainer);
// indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}