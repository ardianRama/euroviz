import { useState } from 'react'
import CountrySelector from './components/CountrySelector'
import CountryDashboard from './components/CountryDashboard'
import EuropeMap from './components/EuropeMap'
import { EUROPEAN_COUNTRIES } from './data/europeanCountries'
import { useCountryData } from './hooks/useCountryData'

function App() {
  const [countryCode, setCountryCode] = useState('se')
  const { stats, populationHistory, gdpHistory, error } = useCountryData(countryCode)

  return (
    <div style={{ padding: '1rem' }}>
      <CountrySelector countries={EUROPEAN_COUNTRIES} value={countryCode} onChange={setCountryCode} />

      {error && <p>Something went wrong: {error}</p>}
      {!error && !stats && <p>Loading...</p>}

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem', alignItems: 'center' }}>
        <CountryDashboard stats={stats} populationHistory={populationHistory} gdpHistory={gdpHistory} />

        <div style={{ flex: '3 1 600px', minWidth: '500px' }}>
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
