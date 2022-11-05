import { useQuery } from "@tanstack/react-query";
import StockService from "../../../services/StockService";
import { IStockData } from "../../../shared/types";

export default function useGetStocks(stockCode: string) {
  const { isLoading, isError, data, refetch, isSuccess } = useQuery<
    IStockData[]
  >(
    ["stocks"],
    async () => {
      return await StockService.getStock(stockCode);
    },
    { enabled: Boolean(stockCode), staleTime: Infinity }
  );

  return {
    isLoading,
    isError,
    data,
    refetch,
    isSuccess,
  };
}
