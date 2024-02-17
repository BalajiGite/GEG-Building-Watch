
import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Col, Row } from 'antd';
import Vector from '../../../assets/images/Vector.png'

const GaugeChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = chartRef.current.chart;
        const updateChart = () => {
            if (chart && !chart.renderer.forExport) {
                const point = chart.series[0].points[0];
                const inc = Math.round((Math.random() - 0.5) * 20);
                let newVal = point.y + inc;
                if (newVal < 0 || newVal > 200) {
                    newVal = point.y - inc;
                }
                point.update(newVal);
            }
        };

        const interval = setInterval(updateChart, 3000);

        return () => clearInterval(interval);
    }, []);

    const options = {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '70%',
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
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ['50%', '71%'],
            size: '125%',
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
            name: 'Speed',
            data: [80],
            tooltip: {
                valueSuffix: '%'
            },
            dataLabels: {
                enabled: true,
                format: '123%',
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
            <big className="brand" style={{ fontSize: "18px", color: "#F46649", justifyContent: 'center', display: 'flex' }}>Red Week</big>
            <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />;
            <p style={{ textAlign: 'center', color: '#C5C5C5', fontSize: '14px', marginTop: '-35px' }}>Weekly Cunsumption</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', color: '#C5C5C5', alignItems: 'center' }}>
                    <img src={Vector}
                        alt='vector png' width={15} height={25} />
                    <div className='semibold' style={{ marginLeft: '8px' }}>Consumption <br /><span className='medium'>1,344 kWh</span></div>
                </div>

                <div style={{ display: 'flex', color: '#C5C5C5', alignItems: 'center' }}>
                    <img src={Vector}
                        alt='vector png' width={15} height={25} />
                    <div className='semibold' style={{ marginLeft: '8px' }}>Target<br /><span className='medium'>1,097 kWh</span></div>
                </div>
            </div>
        </Card>
    )
};

export default GaugeChart;

