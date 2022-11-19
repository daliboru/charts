import { useState } from "react";
import ChartSection from "../components/ChartSection";

export default function Dashboard() {
  const [stockCode, setStockCode] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const formValue = Object.fromEntries(form.entries()) as {
      stockCode: string;
    };

    setStockCode(formValue.stockCode);
  };

  return (
    <div className="App">
      <h1>Charts App</h1>
      <div className="content">
        <form noValidate className="content__row" onSubmit={handleSubmit}>
          <div className="inputContainer">
            <input name="stockCode" />
          </div>
          <button className="searchBtn">Search</button>
        </form>
        {Boolean(stockCode) && <ChartSection stockCode={stockCode} />}
      </div>
    </div>
  );
}
