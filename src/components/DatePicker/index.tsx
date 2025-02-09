'use client';
import { useState } from "react";
import Datepicker, { DateType } from "react-tailwindcss-datepicker";

const App = () => {
    const [value, setValue] = useState<
        {
            startDate: null | DateType,
            endDate: null | DateType
        }>({
            startDate: null,
            endDate: null
        });

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

export default App;