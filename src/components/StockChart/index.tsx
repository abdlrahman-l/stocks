'use client';
import useIsClient from '@/hooks/useIsClient';
import React from 'react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Legend, Line } from 'recharts';
import useStockChart from '@/hooks/useStockChart';

const StockChart = () => {
  const isClient = useIsClient();

  const { chartData, stockData } = useStockChart()
  
  if (!isClient) return null

  return (

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {stockData?.map?.(stock => {
              if (!stock) return null
              return (
                <Line
                  key={stock.ticker}
                  type="monotone"
                  dataKey={`${stock.ticker}-close`}
                  name={stock.ticker}
                  stroke={"#" + Math.floor(Math.random() * 16777215).toString(16)}
                />
              )
            })}
          </LineChart>
        </ResponsiveContainer>
  )
}

export default StockChart