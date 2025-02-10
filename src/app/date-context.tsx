'use client';

import React from 'react';

type DateState = {
  startDate: null | Date,
  endDate: null | Date
}

const DateContext = React.createContext<
  [DateState, React.Dispatch<React.SetStateAction<DateState>>] | undefined
>(undefined);

const defaulStartDate = new Date()
defaulStartDate.setDate(defaulStartDate.getDate() - 1)
const defaulEndDate = new Date()

export function DateProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = React.useState<
        {
            startDate: null | Date,
            endDate: null | Date
        }>({
            startDate:defaulStartDate,
            endDate: defaulEndDate
        });

  return (
    <DateContext.Provider value={[value, setValue]}>
      {children}
    </DateContext.Provider>
  );
}

export function useDate() {
  const context = React.useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
}
