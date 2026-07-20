import { useEffect, useState } from 'react'
import {
  fetchGdpPerCapitaHistory,
  fetchLifeExpectancyHistory,
  fetchPopulationHistory,
} from '../api/countryService'
import type { WorldBankDataPoint } from '../types'

interface UseCountryDataResult {
  populationHistory: WorldBankDataPoint[]
  gdpHistory: WorldBankDataPoint[]
  lifeExpectancyHistory: WorldBankDataPoint[]
  isLoading: boolean
  error: string | null
}

export function useCountryData(countryCode: string): UseCountryDataResult {
  const [populationHistory, setPopulationHistory] = useState<WorldBankDataPoint[]>([])
  const [gdpHistory, setGdpHistory] = useState<WorldBankDataPoint[]>([])
  const [lifeExpectancyHistory, setLifeExpectancyHistory] = useState<WorldBankDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setPopulationHistory([])
    setGdpHistory([])
    setLifeExpectancyHistory([])
    setError(null)
    setIsLoading(true)

    Promise.all([
      fetchPopulationHistory(countryCode),
      fetchGdpPerCapitaHistory(countryCode),
      fetchLifeExpectancyHistory(countryCode),
    ])
      .then(([population, gdp]) => {
        setPopulationHistory(population)
        setGdpHistory(gdp)
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [countryCode])

  return { populationHistory, gdpHistory, lifeExpectancyHistory, isLoading, error }
}