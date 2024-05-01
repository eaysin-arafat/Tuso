/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { IncidentInfoPerDay } from "@/constants/api-interface";
import { DateFunc } from "@/utilities/date";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef } from "react";

/**
 * @description Line chart component
 */
const LineChart = ({ incidents }: { incidents: IncidentInfoPerDay[] }) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  // handle side effect
  useEffect(() => {
    const chart = chartRef.current?.chart;

    if (chart) {
      const containerWidth = chart.renderTo.offsetWidth;
      const totalPoints = daysOfWeek.length;
      const pointWidth = containerWidth / totalPoints;
      const visiblePoints = Math.floor(containerWidth / pointWidth);
      const scrollPositionX = Math.max(totalPoints - visiblePoints, 0);

      chart.update({
        chart: {
          scrollablePlotArea: {
            scrollPositionX: scrollPositionX,
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incidents]);

  // prepare chart data
  const data = incidents?.map((incident) => ({
    y: incident?.totalOpenIncident,
    currentDate: DateFunc?.formatDate(String(incident?.incidentDate)),
    open: incident?.totalOpenIncident,
    closed: incident?.totalClosedIncident,
  }));

  // chart options
  const options: Highcharts.Options = {
    chart: {
      type: "spline",
      height: 300,
      scrollablePlotArea: {
        minWidth: 500,
        scrollPositionX: 0,
      },
      marginLeft: 0,
      marginRight: 0,
      width: null,
      backgroundColor: "var(--whiteColor)",
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "category",
      categories: daysOfWeek,
      labels: {
        overflow: "justify",
        style: {
          color: "var(--textColor)",
          fontSize: "10px",
        },
      },
      lineWidth: 0,
      tickWidth: 0,
      minorTickLength: 0,
      minPadding: 0,
      maxPadding: 0,
    },
    yAxis: {
      visible: false,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: false,
      valueSuffix: "m/s",
      useHTML: true,
      backgroundColor: "var(--bgColor)",
      borderColor: "var(--borderColor)",
      borderWidth: 1,
      borderRadius: 5,
      shadow: false,
      style: {
        color: "var(--textColor)",
        fontSize: "14px",
      },
      headerFormat: "",
      pointFormat:
        '<span style="font-size:11px; font-weight: 600">{point.currentDate}</span><br>' +
        '<span style="font-size:11px; font-weight: 600">Open: {point.open}</span><br>' +
        '<span style="font-size:11px; font-weight: 600">Closed: {point.closed}</span><br>',
    },
    plotOptions: {
      series: {
        lineWidth: 8,
        color: "var(--violetColor)",
        states: {
          hover: {
            lineWidthPlus: 0,
          },
        },
        marker: {
          symbol: "circle",
          radius: 3,
          states: {
            hover: {
              radius: 6,
              lineColor: "var(--bgColor)",
              lineWidth: 2,
            },
          },
        },
        shadow: {
          color: "rgba(0, 0, 0, 0.3)",
          offsetX: 2,
          offsetY: 2,
          opacity: 0.5,
          width: 5,
        },
      },
    },
    series: [
      {
        type: "spline", // or "line"
        name: "Wind Speed",
        data: data,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineChart;
