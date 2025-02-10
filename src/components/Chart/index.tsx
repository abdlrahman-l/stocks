import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

type StockData = {
  date: string;
  [key: string]: number | string;
};

type ApiResponse = {
  data: {
    ticker: string;
    results: {
      t: number;
      o: number;
      h: number;
      l: number;
      c: number;
    }[];
  }[];
};

const processData = (apiResponse: ApiResponse): StockData[] => {
  const stockMap: { [key: string]: StockData } = {};
  
  apiResponse.data.forEach(stock => {
    stock.results.forEach(result => {
      const date = new Date(result.t).toISOString().split("T")[0];
      if (!stockMap[date]) {
        stockMap[date] = { date };
      }
      stockMap[date][`${stock.ticker}-close`] = result.c;
    });
  });

  console.log(stockMap)
  
  return Object.values(stockMap);
};

const StockChart: React.FC<{ apiResponse: ApiResponse }> = ({ apiResponse }) => {
  const chartData = processData(apiResponse);

  console.log({
    chartData
  })

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {apiResponse.data.map(stock => (
          <Line
            key={stock.ticker}
            type="monotone"
            dataKey={`${stock.ticker}-close`}
            name={stock.ticker}
            stroke={"#" + Math.floor(Math.random() * 16777215).toString(16)}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;