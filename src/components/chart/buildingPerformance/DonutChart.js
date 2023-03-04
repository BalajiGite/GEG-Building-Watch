import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Card, Col, Row } from "antd";

class Donut extends Component {
  constructor(props) {
    super(props);

    

      this.state = {
        options: {
          stroke: {
            width: 0,
          },
          labels: ["Rainwater"],
        },
        series: [100],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };

    this.state1 = {
      options1: {
        stroke: {
          width: 0,
        },
        labels: ["Rainwater", "Potable"],
      },
      series1: [70.1, 29.9],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
    this.state2 = {
      options2: {
        stroke: {
          width: 0,
        },
        labels: ["Office", "Unmetered", "Dock"],
      },
      series2: [42.2, 32.1, 25.7],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }

  render() {
    return (
      <Row gutter={[24, 0]}>

        <Col xs={24} sm={24} md={8} lg={8} xl={8} className="mb-24">
          <Card style={{ width: "100%" }}>
            <small>Portfollo Source Water Type Consumption Split</small>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="donut"
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={8} lg={8} xl={8} className="mb-24">
          <Card style={{ width: "100%" }}>
            <small>Portfollo Source Water Type Consumption Split</small>
            <Chart
              options={this.state1.options1}
              series={this.state1.series1}
              type="donut"
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={8} lg={8} xl={8} className="mb-24">
          <Card style={{ width: "100%" }}>
            <small>Portfollo Downstream Water Type Consumption Split</small>
            <Chart
              options={this.state2.options2}
              series={this.state2.series2}
              type="donut"
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Donut;
