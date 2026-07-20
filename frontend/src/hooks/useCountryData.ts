import { useEffect, useState } from 'react'
import { fetchCountryStats, fetchGdpPerCapitaHistory, fetchPopulationHistory } from '../api/countryService'
import type { CountryStats, WorldBankDataPoint } from '../types'

interface UseCountryDataResult {
  stats: CountryStats | null
  populationHistory: WorldBankDataPoint[]
  gdpHistory: WorldBankDataPoint[]
  error: string | null
}

export function useCountryData(countryCode: string): UseCountryDataResult {
  const [stats, setStats] = useState<CountryStats | null>(null)
  const [populationHistory, setPopulationHistory] = useState<WorldBankDataPoint[]>([])
  const [gdpHistory, setGdpHistory] = useState<WorldBankDataPoint[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setStats(null)
    setPopulationHistory([])
    setGdpHistory([])
    setError(null)

    fetchCountryStats(countryCode)
      .then(setStats)
      .catch((err) => setError(err.message))

    fetchPopulationHistory(countryCode)
      .then(setPopulationHistory)
      .catch(() => setPopulationHistory([]))

    fetchGdpPerCapitaHistory(countryCode)
      .then(setGdpHistory)
      .catch(() => setGdpHistory([]))
  }, [countryCode])

  return { stats, populationHistory, gdpHistory, error }
}