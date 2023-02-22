import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ReportChart = (props) => {
  const { series } = props;
  const [chartType, setChartType] = useState("column");
  // const [updatedChart, setUpdatedChart] = useState({});

  const changeChartType = (type) => {
    setChartType(type);
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: chartType,
          },
          credits: {
            enabled: false,
          },
          title: "Report Chart",
          series: series,
        }}
      />
      <Row>
        <Col span={6}>
          <Button
            style={{ width: 260 }}
            onClick={() => changeChartType("line")}
          >
            Line
          </Button>
        </Col>
        <Col span={6}>
          <Button
            style={{ width: 260 }}
            onClick={() => changeChartType("column")}
          >
            Column
          </Button>
        </Col>
        <Col span={6}>
          {" "}
          <Button
            style={{ width: 260 }}
            onClick={() => changeChartType("area")}
          >
            Area
          </Button>
        </Col>
        <Col span={6}>
          {" "}
          <Button style={{ width: 260 }} onClick={() => changeChartType("bar")}>
            Bar{" "}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ReportChart;
