import React from 'react'
import { Card, } from 'antd';
import Highcharts, { color } from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import styles from '../dashboard/styles.css'

function BaseLoadPeakLoad() {

  let energyHCOption = {
    chart: {
      zoomType: 'xy',
      marginBottom: 80
    },
    title: {
      text: '',
      align: 'left'

    },
    credits: {
      enabled: false
    },
    xAxis: [{
      categories: ['27 Dec', '28 Dec', '29 Dec', '30 Dec', '31 Dec', '01 Jan', '02 Jan', '01 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan'],
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
      name: 'Base Load',
      type: 'column',
      yAxis: 1,
      data: [50, 100, 140, 180, 210, 270, 250, 180, 130, 100, 60, 135, 205, 225, 135, 95],
      tooltip: {
        valueSuffix: ' Kwh'
      },
      color: "#ce6927"
    },

    {
      name: 'Peak Load',
      type: 'column',
      yAxis: 1,
      data: [100, 140, 180, 220, 260, 300, 290, 230, 160, 120, 90, 170, 240, 270, 180, 120],
      tooltip: {
        valueSuffix: ' Kwh'
      },
      color: "maroon"
    },

    {
      name: 'Temperature',
      type: 'line',
      data: [250, 190, 150, 150, 260, 200, 290, 230, 30, 20, 10, 100, 70, 200, 170, 120,],
      tooltip: {
      },
      color: "green"
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

    <Card style={{ marginTop: 20 }}>
      <h2 className={styles.title1} style={{ textAlign: 'center' }}>{"Consumption Profile"}</h2>
      <div style={{ width: "100%", marginBottom: 10, textAlign: 'center' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={energyHCOption}
        />
      </div>
    </Card>
  )
}

export default BaseLoadPeakLoad;