import React, { useState } from "react";
import Highcharts, { color } from 'highcharts' //core
import HighchartsReact from 'highcharts-react-official';
import { Spin, Card } from "antd";
import spinnerjiff from "../../../assets/images/loader.gif";

function ConsumptionChart({ resData }) {
    const [spin, setSpin] = useState(false);
   
    let categories = [];
    let elecData = [];
    let zero = [];
    let zeroFive = [];
    let one = [];
    let oneFive = [];
    let two = [];
    let twoFive = [];
    let three = [];
    let threeFive = [];
    let four = [];
    let fourandHalf = [];
    let five = [];
    let fiveAndHalf = [];
    let six = [];
    let elecTemp = [];
    let series = [];
    let countRating = [];

    resData.consumpionProfile.map((item, key) => {
        categories.push(item.ts);
        if (item.consumption != undefined) {
            elecData.push(item.consumption);
        }
        if (item["0.0*"] != undefined) {
            zero.push(item["0.0*"])
        }
        if (item["0.5*"] != undefined) {
            //console.log("i am here: " + item["0.5*"])
            zeroFive.push(item["0.5*"])
        }

        if (item["1.0*"] != undefined) {
            one.push(item["1.0*"])
        }
        if (item["1.5*"] != undefined) {
            oneFive.push(item["1.5*"])
        }

        if (item["2.0*"] != undefined) {
            two.push(item["2.0*"])
        }

        if (item["2.5*"] != undefined) {
            twoFive.push(item["2.5*"])
        }

        if (item["3.0*"] != undefined) {
            three.push(item["3.0*"])
        }

        if (item["3.5*"] != undefined) {
            threeFive.push(item["3.5*"])
        }

        if (item["4.0*"] != undefined) {
            four.push(item["4.0*"])
        }

        if (item["4.5*"] != undefined) {
            fourandHalf.push(item["4.5*"])
        }
        if (item["5.0*"] != undefined) {
            five.push(item["5.0*"]);
        }
        if (item["5.5*"] != undefined) {
            fiveAndHalf.push(item["5.5*"]);
        }
        if (item["6.0*"] != undefined) {
            six.push(item["6.0*"])
        }
    })

    resData.temp.map((item, key) => {
        elecTemp.push(item.oat)
    })

    if (elecData.length > 0) {
        let elecObject = {
            name: (resData.utilityType == "gas" ? "Gas" : resData.utilityType == "water" ? "Water" : "Electricity"),
            type: 'column',
            yAxis: 1,
            data: elecData,
            tooltip: {
                valueSuffix: resData.uom
            },
            color: "#4397F6"
        }
        series.push(elecObject)
    }

    if (zero.length > 0) {
        countRating.push(zero);
        addRatingData(zero, "0.0*")
    }

    if (zeroFive.length > 0) {
        countRating.push(zeroFive);
        addRatingData(zeroFive, "0.5*")
    }

    if (one.length > 0) {
        countRating.push(one);
        addRatingData(one, "1.0*")
    }

    if (oneFive.length > 0) {
        countRating.push(oneFive);
        addRatingData(oneFive, "1.5*")
    }

    if (two.length > 0) {
        countRating.push(two);
        addRatingData(two, "2.0*")
    }

    if (twoFive.length > 0) {
        countRating.push(twoFive);
        addRatingData(twoFive, "2.5*")
    }

    if (three.length > 0) {
        countRating.push(three);
        addRatingData(three, "3.0*")
    }

    if (threeFive.length > 0) {
        countRating.push(threeFive);
        addRatingData(threeFive, "3.5*")
    }

    if (four.length > 0) {
        countRating.push(four);
        addRatingData(four, "4.0*")
    }

    if (fourandHalf.length > 0) {
        countRating.push(fourandHalf);
        addRatingData(fourandHalf, "4.5*")
    }

    if (five.length > 0) {
        countRating.push(five);
        addRatingData(five, "5.0*")
    }

    if (fiveAndHalf.length > 0) {
        countRating.push(fiveAndHalf);
        addRatingData(fiveAndHalf, "5.5*")
    }

    if (six.length > 0) {
        countRating.push(six);
        addRatingData(six, "6.0*")
    }

    if (elecTemp.length > 0) {
        let TempObj = {
            name: 'Temperature',
            type: 'spline',
            data: elecTemp,
            lineWidth: 1,
            color: "#0060A2",
            tooltip: {
                valueSuffix: ' °C'
            },
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            },

        }
        series.push(TempObj);
    }

    function addRatingData(data, seriesName) {

        let rateObj = {
            name: seriesName,
            type: 'spline',
            yAxis: 1,
            data: data,
            lineWidth: 1,
            color: countRating.length == 1 ? "#F4664A" : countRating.length == 2 ? "#FAAD14" : countRating.length == 3 ? "#30BF78" : "",
            //dashStyle: 'shortdash',
            tooltip: {
                valueSuffix: ' ' + resData.uom
            },
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            },

        }
        series.push(rateObj)
    }


    let energyHCOption = {
        chart: {
            zoomType: 'x',
            marginBottom: 80,
            marginTop: 25,
            height: 280,
            backgroundColor: 'transparent',
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
            categories: categories,// categories,
            crosshair: true,
            lineWidth: 1,
            labels: {
                style: {
                    color: '#C5C5C5' // Set the color of the x-axis labels to red
                }
            }

        }],
        yAxis: [{
            // Primary yAxis
            labels: {
                format: '{value} °C',
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
            title: {
                text: 'Temperature (°C)',
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
                //format: '{value:,.0f} ' + resData.uom,
                formatter: function () {
                    return Highcharts.numberFormat(this.value, -1, undefined, ',') + " " + resData.uom;
                },
                style: {
                    color: '#C5C5C5',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '12px',
                    letterSpacing: '0em',
                },
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
            itemStyle: {
                color: '#C5C5C5',
                fontWeight: 400,
                fontSize: "12px",
                fontfamily: 'Inter'         // Set legend text color to red
            },
            itemHoverStyle: {
                color: 'white' // Set legend text color to white on hover
            },
            labels: {
                colors: '#C5C5C5',
                fontSize: '10px',
                // fontFamily: 'Inter',
                fontWeight: 400,
                lineHeight: '12px',
                letterSpacing: '0em',
                // textAlign: 'left',

            },

            // Highcharts.defaultOptions.legend.backgroundColor || // theme

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
        series: series,
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
                    },
                    ]
                }
            }]
        }
    }
    return (<>
        <Card className="custom-card" style={{ width: "100%" }}>
            <Spin spinning={spin} size="large" style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}>
                <big className="brand" style={{ fontSize: "18px", color: "#C5C5C5" }}>Consumption Profile</big>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={energyHCOption}
                />
            </Spin>
        </Card>
    </>)
};
export default ConsumptionChart;