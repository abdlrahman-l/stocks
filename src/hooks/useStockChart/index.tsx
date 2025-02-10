import { useDate } from "@/app/date-context";
import useTickers from "../useTickers";
import { useQueries } from "@tanstack/react-query";
import { StockPriceResponse } from "@/utils/interface/stock";
import { get } from "@/utils/fetcher";
import { useState } from "react";

type StockData = {
    date: string;
    [key: string]: number | string;
};

type PriceType = 'c' | 'o' | 'h' | 'l'

const processData = (stockResponse: StockPriceResponse[], priceType: PriceType): StockData[] => {
    const stockMap: { [key: string]: StockData } = {};

    stockResponse.forEach(stock => {
        if (stock) {
            stock?.results?.forEach(result => {
                const date = new Date(result.t).toISOString().split("T")[0];
                if (!stockMap[date]) {
                    stockMap[date] = { date };
                }
                stockMap[date][`${stock.ticker}-${priceType}`] = result[priceType];
            });
        }
    });

    return Object.values(stockMap);
};

const useStockChart = () => {

    const [value] = useDate();
    const startTs = value.startDate?.getTime();
    const endTs = value.endDate?.getTime();

    const tickers = useTickers();

    const [priceType, setPriceType] = useState<'c' | 'o' | 'h' | 'l'>('c')

    const { data: stockData, tickerErrors } = useQueries({
        queries: tickers.map(ticker => {
            return {
                queryKey: ["stock", ticker.value, startTs, endTs],
                queryFn: () => get<{
                    success: boolean,
                    data?: StockPriceResponse,
                    message: string,
                  }>(`/api/stock/${ticker.value}`, {
                    params: {
                        startTs,
                        endTs,
                    }
                }),
                keepPreviousData: true,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                cacheTime: 1000 * 60 * 15, // 15 minutes
                staleTime: Infinity,
                enabled: !!value.startDate && !!value.startDate,
                retry: false,
            };
        }),
        combine: (results) => {
            return {
                data: results.map(result => {
                    return result.data?.data as StockPriceResponse
                }),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                tickerErrors: results.reduce((acc, curr, i) => curr.isError ? [
                    ...acc,
                    tickers[i].value
                ] : acc, []) as string[]
            }
        }
    })

    return {
        chartData: !!stockData ? processData(stockData, priceType) : undefined,
        stockData: stockData,
        setPriceType,
        priceType,
        tickerErrors
    }
}

export default useStockChart