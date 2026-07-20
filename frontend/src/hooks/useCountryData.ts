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
  populationFailed: boolean
  gdpFailed: boolean
  lifeExpectancyFailed: boolean
  isLoading: boolean
  error: string | null
}

export function useCountryData(countryCode: string): UseCountryDataResult {
  const [populationHistory, setPopulationHistory] = useState<WorldBankDataPoint[]>([])
  const [gdpHistory, setGdpHistory] = useState<WorldBankDataPoint[]>([])
  const [lifeExpectancyHistory, setLifeExpectancyHistory] = useState<WorldBankDataPoint[]>([])
  const [populationFailed, setPopulationFailed] = useState(false)
  const [gdpFailed, setGdpFailed] = useState(false)
  const [lifeExpectancyFailed, setLifeExpectancyFailed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setPopulationHistory([])
    setGdpHistory([])
    setLifeExpectancyHistory([])
    setPopulationFailed(false)
    setGdpFailed(false)
    setLifeExpectancyFailed(false)
    setError(null)
    setIsLoading(true)

    Promise.allSettled([
      fetchPopulationHistory(countryCode),
      fetchGdpPerCapitaHistory(countryCode),
      fetchLifeExpectancyHistory(countryCode),
    ]).then(([population, gdp, lifeExpectancy]) => {
      if (population.status === 'fulfilled') setPopulationHistory(population.value)
      else setPopulationFailed(true)

      if (gdp.status === 'fulfilled') setGdpHistory(gdp.value)
      else setGdpFailed(true)

      if (lifeExpectancy.status === 'fulfilled') setLifeExpectancyHistory(lifeExpectancy.value)
      else setLifeExpectancyFailed(true)

      const allFailed = [population, gdp, lifeExpectancy].every((result) => result.status === 'rejected')
      if (allFailed) {
        setError('Could not fetch data for this country')
      }

      setIsLoading(false)
    })
  }, [countryCode])

  return {
    populationHistory,
    gdpHistory,
    lifeExpectancyHistory,
    populationFailed,
    gdpFailed,
    lifeExpectancyFailed,
    isLoading,
    error,
  }
}