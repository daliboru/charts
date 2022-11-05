import { useEffect } from "react";
import Chart from "../Chart/Chart";
import useGetStocks from "./hooks/useGetStocks";

export default function ChartSection({ stockCode }: { stockCode: string }) {
  const { isLoading, isError, data, refetch } = useGetStocks(stockCode);

  useEffect(() => {
    refetch();
  }, [stockCode, refetch]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error...</span>;
  }

  return <>{data && <Chart data={data} stockCode={stockCode} />}</>;
}
