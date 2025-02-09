import DatePicker from "@/components/DatePicker";
import SelectStocks from "@/components/SelectStocks";
import Test from "@/components/test";
import { Suspense } from "react";
export default async function Home() {

  return (
    <div className="flex flex-col ">
      <div className="flex h-full gap-x-3 min-h-28">
        <DatePicker />
        <Suspense>
          <SelectStocks />
        </Suspense>
      </div>
      <Test />
    </div>
  );
}
