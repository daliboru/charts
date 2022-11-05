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
  const [chartData, setChartData] =
    useState<{ label: string; value: number }[]>();
  const [chartConfigs, setChartConfigs] = useState({});

  useEffect(() => {
    if (data) {
      setChartData(getDataInDateRange(range, data));
    }
  }, [data, range]);

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
        data: chartData,
      },
    });
  }, [chartData, stockCode]);

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

function getDataInDateRange(range: string, data: IStockData[]) {
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
    .reverse() as { label: string; value: number }[];
}

function isDateInRange(range: string, date: string) {
  let endDate = new Date();
  let targetDate = new Date(date);
  if (range === "week") {
    let sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return targetDate > sevenDaysAgo && targetDate < endDate;
  }
  if (range === "month") {
    let aMonthAgo = new Date();
    aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);
    return targetDate > aMonthAgo && targetDate < endDate;
  }
  if (range === "year") {
    let aYearAgo = new Date();
    aYearAgo.setFullYear(aYearAgo.getFullYear() - 1);
    return targetDate > aYearAgo && targetDate < endDate;
  }
}
