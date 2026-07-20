import { useEffect, useState } from 'react'
import CountrySelector from './components/CountrySelector'
import CountryStats from './components/CountryStats'
import EuropeMap from './components/EuropeMap'
import TimeSeriesChart from './components/TimeSeriesChart'
import { EUROPEAN_COUNTRIES } from './data/europeanCountries'
import { fetchCountryStats, fetchGdpPerCapitaHistory, fetchPopulationHistory } from './api/countryService'
import type { CountryStats as CountryStatsType, WorldBankDataPoint } from './types'

function formatPopulation(value: number): string {
  return `${(value / 1_000_000).toFixed(1)}M`
}

function formatGdpPerCapita(value: number): string {
  return `$${(value / 1_000).toFixed(1)}k`
}

function App() {
  const [countryCode, setCountryCode] = useState('se')
  const [stats, setStats] = useState<CountryStatsType | null>(null)
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

  return (
    <div style={{ padding: '1rem' }}>
      <CountrySelector countries={EUROPEAN_COUNTRIES} value={countryCode} onChange={setCountryCode} />

      {error && <p>Something went wrong: {error}</p>}
      {!error && !stats && <p>Loading...</p>}

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 350px', minWidth: '300px' }}>
          {stats && <CountryStats stats={stats} />}

          <h2>Population</h2>
          <TimeSeriesChart data={populationHistory} color="#3B82F6" formatValue={formatPopulation} />

          <h2>GDP per capita</h2>
          <TimeSeriesChart data={gdpHistory} color="#22C55E" formatValue={formatGdpPerCapita} />
        </div>

        <div style={{ flex: '2 1 500px', minWidth: '400px' }}>
          <EuropeMap
            countries={EUROPEAN_COUNTRIES}
            selectedCountryCode={countryCode}
            onCountryClick={setCountryCode}
          />
        </div>
      </div>
    </div>
  )
}

export default App
