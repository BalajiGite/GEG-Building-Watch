import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Card, Col, Row } from "antd";

class DonutS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        stroke: {
          width: 0,
        },
        labels: ["Rainwater", "Potable"],
      },
      series: [95, 5],
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
      <Row>
        {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="donut">
            <small>Portfollo Comfort Summary</small>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="donut"
              // width="515"
            />
          </div>
        </Col> */}
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb a24">
            <small>Portfollo Source Water Type Consumption Split</small>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="donut"
               width="360"
            />
         
        </Col>
      </Row>
    );
  }
}

export default DonutS;
