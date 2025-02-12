import DatePicker from "@/components/DatePicker";
import SelectStocks from "@/components/SelectStocks";
import StockChart from "@/components/StockChart";
import { Suspense } from "react";
export default async function Home() {

  return (
    <div className="flex flex-col ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DatePicker />
          <Suspense>
            <SelectStocks />
          </Suspense>
      </div>
      <Suspense>
        <StockChart />
      </Suspense>
    </div>
  );
}