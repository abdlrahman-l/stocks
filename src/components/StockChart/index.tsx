'use client';
import { useDate } from '@/app/date-context';
import useIsClient from '@/hooks/useIsClient';
import useTickers from '@/hooks/useTickers';
import { get } from '@/utils/fetcher';
import { StockPriceResponse } from '@/utils/interface/stock';
import { tickersOptions } from '@/utils/mock/tickers';
import { useQueries } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]
const StockChart = () => {
  const isClient = useIsClient();

  const [value] = useDate();
  const startTs = value.startDate?.getTime();
  const endTs = value.endDate?.getTime();

  const tickers = useTickers();

  const results = useQueries({
    queries: tickers.map(ticker => {
      return {
        queryKey: ["stock", ticker.value, startTs, endTs],
        queryFn: () => get<StockPriceResponse>(`/api/stock/${ticker.value}`, {
          params: {
            startTs,
            endTs,
          }
        }),
        keepPreviousData: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        cacheTime: 1000 * 60 * 10, // 10 minutes
        staleTime: Infinity, // 5 minutes
        // enabled: !!value.startDate && !!value.startDate,
        enabled: false,
        retry: false,
      };
    }),
  })

  console.log({
    results,
  })

  if (!isClient) return null

  return (
    <AreaChart width={730} height={250} data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
  )
}

export default StockChart