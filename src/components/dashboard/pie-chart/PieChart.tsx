/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { TopSystemByIncident } from "@/constants/api-interface";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

/**
 * @description Pie chart component
 */
const PieChart = ({ incidents }: { incidents: TopSystemByIncident[] }) => {
  // prepare pie chart data
  const topSystemData = incidents?.map((system, index) => ({
    name: system?.systemName,
    y: system?.incidentCount,
    sliced: index === 0,
    selected: index === 0,
  }));

  // custom colors for pie chart
  const customColors = [
    "var(--chartVioletColor)",
    "var(--chartGreenColor)",
    "var(--chartRedColor)",
    "var(--chartBlueColor)",
    "var(--chartYellowColor)",
  ];

  // chart options
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      backgroundColor: "var(--whiteColor)",
    },
    title: {
      text: "",
      align: "left",
      style: {
        fontSize: "15px",
        color: "var(--textColor)",
      },
    },
    subtitle: {
      text: "",
      align: "left",
      style: {
        fontSize: "13px",
        color: "var(--textColor)",
      },
    },
    tooltip: {
      pointFormat: "{point.name}: <b>{point.y}</b>",
      headerFormat: "",
      footerFormat: "",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        slicedOffset: 10,
        size: "80%",
        innerSize: "70%",
        colors: customColors,
      },
      series: {
        dataLabels: {
          style: {
            fontSize: "13px",
          },
        },
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      itemWidth: 110,
      borderWidth: 0,
      itemStyle: {
        color: "var(--textColor)",
        fontSize: "13px",
      },
      itemHoverStyle: {
        color: "var(--placeHolderColor)",
      },
      symbolWidth: 11,
      symbolHeight: 11,
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{series.name}</span><br/>',
    },
    series: [
      {
        colorByPoint: true,
        data: topSystemData,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
