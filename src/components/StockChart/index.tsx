'use client';
import useIsClient from '@/hooks/useIsClient';
import React from 'react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Legend, Line } from 'recharts';
import useStockChart from '@/hooks/useStockChart';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import useBreakpoint from '@/hooks/useBreakpoint';

const lineColor = [
  '#FF004D',
  '#20716A',
  '#85586F',
]

const StockChart = () => {
  const isClient = useIsClient();

  const { chartData, stockData, setPriceType, priceType, tickerErrors } = useStockChart()

  const { xs } = useBreakpoint()

  if (!isClient) return null

  return (
    <>
      <div className='flex justify-between items-center my-5'>
        {
          stockData && stockData.length > 0 && chartData && chartData?.length > 0 && (
            <ToggleGroup
              value={priceType}
              type="single"
              size={xs ? "xs" : "sm"}
              variant={"outline"}
              onValueChange={(v: typeof priceType) => {
                setPriceType(prev => !v ? prev : v)
              }}>
              <ToggleGroupItem value="c" aria-label="Toggle bold">
                Close
              </ToggleGroupItem>
              <ToggleGroupItem value="o" aria-label="Toggle bold">
                Open
              </ToggleGroupItem>
              <ToggleGroupItem value="h" aria-label="Toggle bold">
                High
              </ToggleGroupItem>
              <ToggleGroupItem value="l" aria-label="Toggle bold">
                Low
              </ToggleGroupItem>
            </ToggleGroup>
          )
        }
        {
          tickerErrors && tickerErrors.length > 0 && (
            <h4 className='text-red-500 text-xs md:text-md'>{`Failed getting ${tickerErrors.join(',')} data. Please wait a minute`}</h4>
          )
        }
      </div>
      <ResponsiveContainer width="100%" height={xs ? 200 : 400 } className='text-xs md:text-sm' >
        <LineChart data={chartData} margin={{ left: -20, right: 10, }}>
          <XAxis dataKey="date"/>
          <YAxis />
          <Tooltip />
          <Legend />
          {stockData?.map?.((stock, i) => {
            if (!stock) return null
            return (
              <Line
                key={stock.ticker}
                type="monotone"
                dataKey={`${stock.ticker}-${priceType}`}
                name={stock.ticker}
                stroke={lineColor[i]}
              />
            )
          })}
        </LineChart>
      </ResponsiveContainer>

    </>
  )
}

export default StockChart