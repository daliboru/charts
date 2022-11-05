import { useState } from "react";
import ChartSection from "../components/ChartSection";

export default function Dashboard() {
  const [stockCode, setStockCode] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValue = Object.fromEntries(formData.entries());

    setStockCode(formValue.stockCode as string);
  };

  return (
    <div className="App">
      <h1>Charts App</h1>
      <div className="content">
        <form className="content__row" onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label htmlFor="stockCode">Search for stocks: </label>
            <input id="stockCode" type="text" name="stockCode" />
          </div>
          <button className="searchBtn" type="submit">
            Search
          </button>
        </form>
        {Boolean(stockCode) && <ChartSection stockCode={stockCode} />}
      </div>
    </div>
  );
}
