import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import { Range } from "../../shared/rangeType";
import { IStockData } from "../../shared/types";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

export default function Chart({
  data,
  stockCode,
}: {
  data: IStockData[];
  stockCode: string;
}) {
  const [range, setRange] = useState(Range.WEEK);
  const [chartConfigs, setChartConfigs] = useState({});

  useEffect(() => {
    setChartConfigs({
      type: "area2d",
      width: "700",
      height: "400",
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: `Stock prices of [${stockCode}]`,
          numberPrefix: "$",
          xAxisName: "Time",
          yAxisName: "Price (in USD)",
          theme: "fusion",
        },
        data: getDataInDateRange(range, data),
      },
    });
  }, [range, data, stockCode]);

  return (
    <>
      <div className="content__row-range">
        <button
          className="typeBtn"
          style={{ opacity: range === "week" ? 0.5 : 1 }}
          onClick={() => setRange(Range.WEEK)}
        >
          Week
        </button>
        <button
          className="typeBtn"
          style={{ opacity: range === "month" ? 0.5 : 1 }}
          onClick={() => setRange(Range.MONTH)}
        >
          Month
        </button>
        <button
          className="typeBtn"
          style={{ opacity: range === "year" ? 0.5 : 1 }}
          onClick={() => setRange(Range.YEAR)}
        >
          Year
        </button>
      </div>
      <div className="chart">
        <ReactFC {...chartConfigs} />
      </div>
    </>
  );
}

function getDataInDateRange(
  range: "week" | "month" | "year",
  data: IStockData[]
) {
  return data
    .map((item) => {
      if (isDateInRange(range, item.date))
        return {
          label: new Date(item.date).toLocaleDateString(),
          value: item.close,
        };
      return null;
    })
    .filter((item) => item)
    .reverse();
}

function isDateInRange(
  range: "week" | "month" | "year",
  date: string
): boolean {
  let today = new Date();
  let targetDate = new Date(date);

  switch (range) {
    case "week":
      today.setDate(today.getDate() - 7);
      return targetDate > today;
    case "month":
      today.setMonth(today.getMonth() - 1);
      return targetDate > today;
    case "year":
      today.setFullYear(today.getFullYear() - 1);
      return targetDate > today;
    default:
      return false;
  }
}
