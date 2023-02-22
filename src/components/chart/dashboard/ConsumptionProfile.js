import React from 'react'
import {Card, } from 'antd';
import Highcharts, { color } from 'highcharts' 
import HighchartsReact from 'highcharts-react-official';
import styles from '../dashboard/styles.css'

function ConsumptionProfile() {

  let energyHCOption = {
    chart: {
      zoomType: 'xy',
      marginBottom:80
  },
    title: {
        text: '',
        align: 'left'

    },
    credits: {
      enabled: false
    },
    xAxis: [{
        categories: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
        crosshair: true 
    }],
    yAxis: [{
        labels: {
            format: '{value}°C',
            style: {
                
            }
        },
        title: {
            text: 'Temperature(°C)',
            style: {
               
            }
        },
        opposite: true

    }, { 
        gridLineWidth: 0,
        title: {
            text: 'Electricity(Kwh)',
            style: {
                
            }
        },
        labels: {
            format: '{value} Kwh',
            style: {
                
            }
        },
        

    }],
    tooltip: {
        shared: true
    },
    legend: {
        
        align: 'center',
        x: 0,
        verticalAlign: 'bottom',
        y: 0,
        floating: true,
        backgroundColor:
          
            'rgba(255,255,255,0.25)'
    },
    plotOptions: {
      series: {
          lineWidth: 2
      }
    },
    series: [{
        name: 'Electricity',
        type: 'column',
        yAxis: 1,
        data: [50,60,70,80,90,100,110,150,170,190,210,230,250,270,250,230,200,180,150,120,90,60,40,30],
        tooltip: {
            valueSuffix: ' Kwh'
        },
        color:"#ce6927"
      },
      {
        name: '5.0*',
        type:'line',
        dashStyle: 'shortdot',
        yAxis: 1,
        data: [55,65,75,85,95,105,115,155,175,195,215,235,255,275,255,235,205,185,155,125,95,65,45,35],
        marker: {
          enabled: false
        },
    },
      {
        name: '6.0*',
        type:'line',
        dashStyle: 'shortdot',
        yAxis: 1,
        data: [30,50,40,20,60,90,50,70,30,60,120,130,70,190,90,170,60,170,30,90,60,30,20,10],
      
      },
      
      {

        name: 'Temperature',
        type:'spline',
        color:"#f25852",
        data: [25,55,69,88,55,55,96,98,96,67,25,55,70,88,10,55,96,98,96,97,20,10,22,15
           ],
           marker: {
            enabled: false
      }
      
    },
    ],

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
                    y: 0
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
    }
  }


  return (
   
         <Card style={{  marginTop:20 }}>
    <h2 className={styles.title1} style={{textAlign:'center'}}>{"Consumption Profile"}</h2>
    <div style={{width:"100%", marginBottom:10, textAlign: 'center'}}>
        <HighchartsReact
          highcharts={Highcharts}
          options={energyHCOption}
        />
       
    </div>
    </Card>
  )
}

export default ConsumptionProfile