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
        <>
            <Datepicker value={value} onChange={newValue => setValue(newValue || {
                startDate: null,
                endDate: null,
            })} />
        </>
    );
};

export default App;