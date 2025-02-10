'use client';
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ComboboxMultiple } from '../ui/ComboboxMultiple';
import { tickersOptions } from '@/utils/mock/tickers';


const SelectStocks = () => {

  const router = useRouter();

  const searchParams = useSearchParams()
  const pathname = usePathname();
  const stockParams = searchParams.getAll('ticker')

  const onValueChange = (value: string[]) => {
    const params = new URLSearchParams()
    value.forEach(v => {
        params.append('ticker', v)
    })

    router.push(pathname + '?' + params.toString())
  }

  return (
   <ComboboxMultiple 
    options={tickersOptions}
    onValueChange={onValueChange}
    value={stockParams}
    label='Tickers'
    emptyMessage='Tickers not found.'
    disabled={stockParams.length >= 3}
   />
  )
}

export default SelectStocks