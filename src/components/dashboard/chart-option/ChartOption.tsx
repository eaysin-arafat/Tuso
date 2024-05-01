/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// chart option components
const ChartOption = ({ chartData }) => {
  const customColors = [
    "var(--chartVioletColor)",
    "var(--chartGreenColor)",
    "var(--chartRedColor)",
    "var(--chartBlueColor)",
    "var(--chartYellowColor)",
  ];

  // chart options
  const chartOptions = {
    // chart design
    chart: {
      type: "column",
      backgroundColor: "var(--whiteColor)",
      borderRadius: 10, //
      spacing: [5, 5, 5, 5],
    },

    // colors
    colors: customColors,

    // chart title
    title: {
      text: ``,
      align: "left",
      style: {
        color: "var(--textColor)",
        fontSize: "15px",
        fontWeight: 600,
      },
    },

    // chart x-axis
    xAxis: {
      categories: [""],
      crosshair: true,
      accessibility: {
        description: "Statistics",
      },
      labels: {
        style: {
          color: "var(--textColor)",
        },
      },
      lineColor: "var(--textColor)",
    },

    // chart y-axis
    yAxis: {
      title: {
        text: "",
        style: {
          color: "var(--textColor)",
        },
      },
      labels: {
        style: {
          color: "var(--textColor)",
        },
      },
    },

    // chart tooltip
    tooltip: {
      backgroundColor: "var(--whiteColor)",
      style: {
        color: "var(--textColor)",
      },

      // tooltip format
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',

      // tooltip point format
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span><b>{point.y:.2f}%</b> of total<br/>',
    },

    // chart legend
    legend: {
      itemStyle: {
        color: "var(--textColor)",
      },
    },

    // chart credits
    credits: {
      enabled: false,
    },

    // chart plot options
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          color: "var(--textColor)",
          style: {
            textOutline: "none",
          },
          formatter: function () {
            return this.y;
          },
        },
      },
    },

    // chart series
    series: chartData,
  };

  return (
    <div className="">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default ChartOption;
