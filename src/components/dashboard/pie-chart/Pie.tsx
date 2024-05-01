/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

/**
 * @description Pie chart component
 */
const PieChartCard = ({
  seriesData,
  colors = ["var(--chartVioletColor)", "var(--chartYellowColor)"],
}) => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      backgroundColor: "var(--whiteColor)",
    },
    title: {
      text: ``,
      align: "left",
      style: {
        fontSize: "15px",
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
        innerSize: "70%",
        size: "80%",
        colors: colors,
      },
      series: {
        dataLabels: {
          style: {
            fontSize: "15px",
          },
        },
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      itemWidth: 150,
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
    },

    series: [
      {
        name: "",
        colorByPoint: true,
        data: seriesData,
      },
    ],
  };

  return (
    <div style={{ flex: "1" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChartCard;
