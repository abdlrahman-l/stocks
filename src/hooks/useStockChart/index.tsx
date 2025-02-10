import { useDate } from "@/app/date-context";
import useTickers from "../useTickers";
import { useQueries } from "@tanstack/react-query";
import { StockPriceResponse } from "@/utils/interface/stock";
import { get } from "@/utils/fetcher";

type StockData = {
    date: string;
    [key: string]: number | string;
};

const processData = (stockResponse: StockPriceResponse[]): StockData[] => {
    const stockMap: { [key: string]: StockData } = {};

    stockResponse.forEach(stock => {
        if (stock) {
            stock?.results?.forEach(result => {
                const date = new Date(result.t).toISOString().split("T")[0];
                if (!stockMap[date]) {
                    stockMap[date] = { date };
                }
                stockMap[date][`${stock.ticker}-close`] = result.c;
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

    const { pending, data: stockData } = useQueries({
        queries: tickers.map(ticker => {
            return {
                queryKey: ["stock", ticker.value, startTs, endTs],
                queryFn: () => get(`/api/stock/${ticker.value}`, {
                    params: {
                        startTs,
                        endTs,
                    }
                }),
                onError: (e) => {
                    console.log({e})
                },
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
                pending: results.some((result) => result.isPending),
            }
        }
    })

    return {
        isPending: pending,
        chartData: !!stockData ? processData(stockData) : null,
        stockData: stockData,
    }
}

export default useStockChart