import { useState, useEffect } from 'react'
 
export default function App() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 
  return isClient
}