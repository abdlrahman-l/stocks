import { tickersOptions } from '@/utils/mock/tickers'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

const useTickers = () => {

  const searchParams = useSearchParams()
  const tickerParams = searchParams.getAll('ticker')
  const tickerStringParams = tickerParams.toString()

  const tickers = useMemo(() => 
    tickersOptions.filter(t => tickerParams.includes(t.value)), 
    [tickerStringParams])

  return tickers
}

export default useTickers