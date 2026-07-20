import { useState } from 'react'
import CountrySelector from './components/CountrySelector'
import CountryDashboard from './components/CountryDashboard'
import EuropeMap from './components/EuropeMap'
import { EUROPEAN_COUNTRIES } from './data/europeanCountries'
import { useCountryData } from './hooks/useCountryData'

function App() {
  const [countryCode, setCountryCode] = useState('se')
  const { populationHistory, gdpHistory, lifeExpectancyHistory, isLoading, error } = useCountryData(countryCode)

  const selectedCountry = EUROPEAN_COUNTRIES.find((country) => country.code === countryCode)

  return (
    <div style={{ padding: '1rem' }}>
      <CountrySelector countries={EUROPEAN_COUNTRIES} value={countryCode} onChange={setCountryCode} />

      {error && <p>Something went wrong: {error}</p>}
      {!error && isLoading && <p>Loading...</p>}

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem', alignItems: 'center' }}>
        {selectedCountry && !isLoading && (
          <CountryDashboard
            country={selectedCountry}
            populationHistory={populationHistory}
            gdpHistory={gdpHistory}
            lifeExpectancyHistory={lifeExpectancyHistory}
          />
        )}

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
