import { useEffect, useState } from 'react'

interface IndicatorValue {
  year: string
  value: number
}

interface CountryStats {
  countryCode: string
  countryName: string
  population: IndicatorValue | null
  gdpPerCapita: IndicatorValue | null
}

const EUROPEAN_COUNTRIES = [
  { code: 'se', name: 'Sweden' },
  { code: 'no', name: 'Norway' },
  { code: 'dk', name: 'Denmark' },
  { code: 'fi', name: 'Finland' },
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'es', name: 'Spain' },
  { code: 'it', name: 'Italy' },
  { code: 'pl', name: 'Poland' },
]

function App() {
  const [countryCode, setCountryCode] = useState('se')
  const [stats, setStats] = useState<CountryStats | null>(null)
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
      .then((data: CountryStats) => setStats(data))
      .catch((err) => setError(err.message))
  }, [countryCode])

  return (
    <div>
      <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
        {EUROPEAN_COUNTRIES.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      {error && <p>Something went wrong: {error}</p>}
      {!error && !stats && <p>Loading...</p>}

      {stats && (
        <div>
          <h1>{stats.countryName}</h1>
          <p>
            Population ({stats.population?.year}): {stats.population?.value.toLocaleString()}
          </p>
          <p>
            GDP per capita ({stats.gdpPerCapita?.year}): ${stats.gdpPerCapita?.value.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  )
}

export default App
