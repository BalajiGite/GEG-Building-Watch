import React, { useState } from "react";
import { Spin, Card } from "antd";
import ReactApexChart from "react-apexcharts";
class BaseLoadChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: 'Base Load',
                type: 'column',
                group: 'actual',
                data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 11, 4.6]
            }, {
                name: 'Peak Load',
                type: 'column',
                group: 'actual',
                data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
            }, {
                name: 'Temperature in celcius ',
                type: 'line',
                group: 'budget',
                data: [20, 29, 37, 36, 44, 45, 50, 58]
            }],
            options: {
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
                        columnWidth: '12%',
                        borderRadius: 4,

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
                xaxis: {
                    categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
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
                        axisBorder: {
                            show: false,
                            color: '#008FFB'
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
            },

        };
    }

    render() {
        return (
            <Card className="custom-card" style={{ width: "100%" }}>
                <big className="brand" style={{ fontSize: "18px", color: "#C5C5C5" }}>Base load / Peak load</big>
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
                {/* <ReactApexChart options={options} series={options.series} type="line" height={250} /> */}
            </Card>
        );
    }
}
export default BaseLoadChart;
//   const domContainer = document.querySelector('#app');
//   ReactDOM.render(React.createElement(ApexChart), domContainer);
// indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}