import axios from "axios";
import { IStockData } from "../shared/types";

const aYearAgo = new Date();
aYearAgo.setFullYear(aYearAgo.getFullYear() - 1);

const apiClient = axios.create({
  baseURL: "http://api.marketstack.com/v1",
  params: {
    access_key: process.env.REACT_APP_API_KEY,
    date_from: aYearAgo.toISOString().split("T")[0],
    limit: 365,
  },
});

const getStock = async (stockCode: string) => {
  const { data } = await apiClient.get<{ pagination: any; data: IStockData[] }>(
    "/eod",
    {
      params: {
        symbols: stockCode,
      },
    }
  );
  return data.data;
};

const StockService = {
  getStock,
};

export default StockService;
