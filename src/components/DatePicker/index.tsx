'use client';
import { useDate } from "@/app/date-context";
import Datepicker from "react-tailwindcss-datepicker";

const START_FROM = new Date();
START_FROM.setMonth(START_FROM.getMonth() + 1);

const DatePicker = () => {
    const [value, setValue] = useDate()

    return (
        <div
            className="w-full">
            <label htmlFor="" className="px-0.5 py-1.5 font-semibold text-sm">Date Range</label>
            <Datepicker
                inputClassName="p-2 w-full bg-white text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                primaryColor="blue"
                showShortcuts
                value={value}
                onChange={newValue => setValue(newValue || {
                    startDate: null,
                    endDate: null,
                })}
            />
        </div>
    );
};

export default DatePicker;