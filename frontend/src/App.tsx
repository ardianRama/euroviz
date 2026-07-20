import { useEffect, useState } from 'react'
import CountrySelector from './components/CountrySelector'
import CountryStats from './components/CountryStats'
import { EUROPEAN_COUNTRIES } from './data/europeanCountries'
import type { CountryStats as CountryStatsType } from './types'

function App() {
  const [countryCode, setCountryCode] = useState('se')
  const [stats, setStats] = useState<CountryStatsType | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setStats(null)
    setError(null)

    fetch(`http://localhost:8080/api/countries/${countryCode}/stats`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }
        return res.json()
      })
      .then((data: CountryStatsType) => setStats(data))
      .catch((err) => setError(err.message))
  }, [countryCode])

  return (
    <div>
      <CountrySelector countries={EUROPEAN_COUNTRIES} value={countryCode} onChange={setCountryCode} />

      {error && <p>Something went wrong: {error}</p>}
      {!error && !stats && <p>Loading...</p>}
      {stats && <CountryStats stats={stats} />}
    </div>
  )
}

export default App
