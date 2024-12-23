import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Spin, Card } from "antd";
import spinnerjiff from "../../../assets/images/loader.gif";

const PortfolioPerformance = ({ data, color }) => {
  const [spin, setSpin] = useState(false);

  if (!data || data.length === 0) {
    // If data is not available or empty, show a placeholder or nothing
    return (
      <Card className="custom-card" style={{ width: "100%" }}>
        <Spin
        spinning={spin}
        size="large"
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}
        >
          <div style={{ fontSize: "18px", color: "#C5C5C5" }}>Loading..</div>
        </Spin>       
      </Card>
    );
  }

  const chartOptions = {
    chart: {
      type: "column",
      height: 280,
      backgroundColor: "transparent",
    },
    title: {
      text: "",
      align: "left",
      style: {
        fontFamily: "Inter, sans-serif",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "21.78px",
        color: "#C5C5C5",
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: data[0]?.labels,
      lineColor: "#8E8E8E",
      labels: {
        style: {
          color: "#C5C5C5",
          fontWeight: "400",
        },
      },
    },
    yAxis: [
      {
        gridLineWidth: 1,
        gridLineColor: "#8E8E8E4D",
        gridLineDashStyle: "Dash",
        title: {
          text: data[0]?.unit,
          style: {
            fontFamily: "Inter, sans-serif",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "12.1px",
            color: "#C5C5C5",
          },
        },
        labels: {
          style: {
            color: "#C5C5C5",
            fontWeight: "400",
          },
        },
      },
    ],
    legend: {
      backgroundColor: "transparent",
      itemStyle: {
        color: "#C5C5C5",
        fontWeight: 400,
        fontSize: "12px",
        fontFamily: "Inter",
      },
      itemHoverStyle: {
        color: "white",
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
      },
      column: {
        borderWidth: 0,
        pointWidth: 15,
        borderRadius: 10,
      },
    },
    series: [
      {
        name: "",
        showInLegend: false,
        data: data[0]?.data,
        color: color === "color-1" ? "#1BC388" : "",
      },
    ],
  };

  return (
    <Card className="custom-card" style={{ width: "100%" }}>
      <Spin
        spinning={spin}
        size="large"
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} alt="Custom Spin GIF" />}
      >
        <big className="brand" style={{ fontSize: "18px", color: "#C5C5C5" }}>
          Portfolio Performance
        </big>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </Spin>
    </Card>
  );
};

export default PortfolioPerformance;
