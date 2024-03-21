import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Spin, Card } from "antd";
import spinnerjiff from "../../../assets/images/loader.gif";

function BaseLoadPeakLoad({ resData }) {

    const [spin, setSpin] = useState(false);

    let tsXaxis = [];
    let seriesBaseLoadPeakLoad = [];
    let baseLoad = [];
    let peakLoad = [];
    let bsTemp = [];
    resData.baseloadPeakConsumptionData.map((item, key) => {
        tsXaxis.push(item.ts);
        baseLoad.push(item.baseload);
        peakLoad.push(item.peak);
    })

    resData.baseloadPeakTemp.map((item, key) => {
        let tmp = item.oat;
        if (tmp == null) {
            tmp = 0;
        }
        bsTemp.push(tmp);
    })

    let baseLoadData = {
        name: 'Base Load',
        type: 'column',
        yAxis: 1,
        data: baseLoad,
        tooltip: {
            valueSuffix: ' ' + resData.uom
        },
        color: "#9243F6"
    }
    seriesBaseLoadPeakLoad.push(baseLoadData)
    let peakLoadData = {
        name: 'Peak Load',
        type: 'column',
        yAxis: 1,
        data: peakLoad,
        tooltip: {
            valueSuffix: ' ' + resData.uom
        },
        color: "#C31BA8"

    }
    seriesBaseLoadPeakLoad.push(peakLoadData)
    let maxTempData = {
        name: 'Max Temperature',
        type: 'spline',
        data: bsTemp,
        lineWidth: 1,
        color: "#0060A2",
        marker: {
            enabled: false,
            states: {
                hover: {
                    enabled: true
                }
            }
        },
        tooltip: {
            valueSuffix: ' °C'
        },
    }
    seriesBaseLoadPeakLoad.push(maxTempData)
    let loadHCOption = {                  // baseLoad beakload chart
        chart: {
            zoomType: 'x',
            marginBottom: 80,
            marginTop: 25,
            height: 280,
            backgroundColor: 'transparent'
        },
        title: {
            text: '',
            align: 'left'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        xAxis: [{
            categories: tsXaxis,
            crosshair: true,
            lineWidth: 1,
            labels: {
                style: {
                    color: '#C5C5C5', // Set the color of the x-axis labels to red
                }
            },
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value} °C',
                style: {
                    color: '#C5C5C5',
                    fontfamily: "Inter",
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '12px',
                    letterSpacing: '0em',
                },
            },
            tickAmount: 6,
            gridLineDashStyle: 'longdash',
            allowDecimals: false,
            title: {
                text: 'Max Temperature (°C)',
                style: {
                    color: '#C5C5C5',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '12px',
                    letterSpacing: '0em',
                    //color: Highcharts.getOptions().colors[2]
                },
            },
            opposite: true,
            gridLineWidth: 0.5,
            gridLineColor: '#8E8E8E4D'

        }, { // Secondary yAxis
            title: {
                text: (resData.utilityType == "gas" ? "Gas " : resData.utilityType == "water" ? "Water " : "Electricity ") + "(" + resData.uom + ")",
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
            allowDecimals: false,
            labels: {
                //format: '{value} ' + resData.uom,
                formatter: function () {
                    return Highcharts.numberFormat(this.value, -1, undefined, ',') + " " + resData.uom;
                },
                style: {
                    // Primary yAxis
                    format: '{value} °C',
                    color: '#C5C5C5',
                    fontSize: '12px',
                    fontfamily: 'Inter',
                    fontWeight: 400,
                    lineHeight: '12px',
                    letterSpacing: '0em',
                }
            },
            //opposite: true
            gridLineWidth: 0.5,
            gridLineColor: '#8E8E8E4D'
        }],
        tooltip: {
            shared: true
        },
        legend: {
            //layout: 'horizontal',
            align: 'center',
            x: 0,
            verticalAlign: 'bottom',
            y: 0,
            floating: true,
            backgroundColor: 'transparent',
            // Highcharts.defaultOptions.legend.backgroundColor || // theme
            itemStyle: {
                color: '#C5C5C5',
                fontWeight: 400,
                fontSize: "12px",
                fontfamily: 'Inter'         // Set legend text color to red
            },
            itemHoverStyle: {
                color: 'white' // Set legend text color to white on hover
            },
        },
        plotOptions: {
            series: {
                lineWidth: 1,
            },
            column: {
                borderRadius: 5,// Adjust this value as needed
                borderWidth: 0,
                pointWidth: 10,
            }
        },
        series: seriesBaseLoadPeakLoad,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        floating: false,
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        x: 0,
                        y: 0,

                    },
                    yAxis: [{
                        labels: {
                            align: 'right',
                            x: 0,
                            y: -6
                        },
                        showLastLabel: false
                    }, {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -6
                        },
                        showLastLabel: false
                    }, {
                        visible: true
                    }]
                }
            }]
        },

    }
    return (<>
        <Card className="custom-card" style={{ width: "100%" }}>
            <Spin spinning={spin} size="large" style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}>
                <big className="brand" style={{ fontSize: "18px", color: "#C5C5C5" }}>Base Load, Peak Load</big>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={loadHCOption}
                />
            </Spin>
        </Card>
    </>)
};
export default BaseLoadPeakLoad;