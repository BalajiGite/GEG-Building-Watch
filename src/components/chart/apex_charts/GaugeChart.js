
import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Col, Row } from 'antd';
import Vector from '../../../assets/images/elec.svg'
import gas from '../../../assets/images/gas.svg'
import water from '../../../assets/images/water.svg'

const GaugeChart = ({gaugeData, repFreq, title, utilityType}) => {

    let perValue = parseFloat(gaugeData.conTarPer.replace(",", ""));
    let dataValue = perValue;
    if(perValue < 75){
        dataValue = 75;
    }else if(perValue > 125){
        dataValue = 125
    }

    const options = {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '75%',
            backgroundColor: null,

        },
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false // Disable the context button
                }
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: '',
            color: "#F46649"
        },

        pane: {
            startAngle: -120,
            endAngle: 120,
            background: null,
            center: ['50%', '65%'],
            size: '110%',
            backgroundColor: 'transparent',
        },

        // the value axis
        yAxis: {
            min: 75,
            max: 125,
            tickPixelInterval: 40,
            tickPositions: [75, 90, 105, 125],
            tickColor: '#FFFFFF',
            lineWidth: 0,
            //  lineColor:'#8E8E8E',
            // minorTickWidth: 0,   
            tickLength: 35,
            tickWidth: 0,
            minorTickInterval: null,
            labels: {
                step: 1,
                distance: 14,
                style: {
                    fontSize: '13px',
                    fontWeight: 600,
                    color: "#FFFFFF",
                }
            },

            plotBands: [{
                from: 75,
                to: 90,
                color: '#30BF78', // green
                thickness: 30,
            }, {
                from: 90,
                to: 105,
                color: '#FAAD14', // orange
                thickness: 30
            }, {
                from: 105,
                to: 125,
                color: '#F4664A', // red
                thickness: 30
            }]
        },

        series: [{
            name: 'Consumption',
            data: [dataValue],
            tooltip: {
                valueSuffix: '%'
            },
            dataLabels: {
                enabled: true,
                format: gaugeData.conTarPer,//'115%',
                borderWidth: 0,
                color: '#C5C5C5',
                font: 'inter',
                style: {
                    fontSize: '15px',
                }
            },
            dial: {
                radius: '94%',
                backgroundColor: '#C5C5C5',
                baseWidth: 12,
                baseLength: '0%',
                rearLength: '0%'
            },
            pivot: {
                backgroundColor: "#C5C5C5",
                radius: 8
            }

        }]
    };

    return (
        <Card className="custom-card" style={{ width: "100%" }}>
            <big className="brand" style={{ fontSize: "18px", color:gaugeData.conTarPerColor, justifyContent: 'center', display: 'flex' }}>
                {title===""?gaugeData.conTarPerColorName.toUpperCase():""}{title!==""?title:repFreq=="Daily"?" DAY":repFreq=="Weekly"?" WEEK": repFreq=="Monthly"?" MONTH": " YEAR"}
            </big>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <p style={{ textAlign: 'center', color: '#C5C5C5', fontSize: '14px', marginTop: '-20px' }}>{repFreq} Cunsumption</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', color: '#C5C5C5', alignItems: 'center' }}>
                    <img src={utilityType == "gas" ? gas : utilityType == "water" ? water : Vector} alt='' width={25} height={25} />
                    <div className='semibold' style={{ marginLeft: '8px' }}>Consumption <br /><span style={{fontSize:"13px"}}>{gaugeData.consumption}</span></div>
                </div>

                <div style={{ display: 'flex', color: '#C5C5C5', alignItems: 'center' }}>
                    <img src={utilityType == "gas" ? gas : utilityType == "water" ? water : Vector} alt='' width={25} height={25} />
                    <div className='semibold' style={{ marginLeft: '8px' }}>Target<br /><span style={{fontSize:"13px"}}>{gaugeData.target}</span></div>
                </div>
            </div>
        </Card>
    )
};

export default GaugeChart;

