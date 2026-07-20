import CountryStats from './CountryStats'
import TimeSeriesChart from './TimeSeriesChart'
import { formatGdpPerCapita, formatLifeExpectancy, formatPopulation } from '../utils/formatters'
import { getLatestValue } from '../utils/timeSeries'
import type { Country } from '../data/europeanCountries'
import type { WorldBankDataPoint } from '../types'

interface CountryDashboardProps {
  country: Country
  populationHistory: WorldBankDataPoint[]
  gdpHistory: WorldBankDataPoint[]
  lifeExpectancyHistory: WorldBankDataPoint[]
  populationFailed: boolean
  gdpFailed: boolean
  lifeExpectancyFailed: boolean
}

function CountryDashboard({
  country,
  populationHistory,
  gdpHistory,
  lifeExpectancyHistory,
  populationFailed,
  gdpFailed,
  lifeExpectancyFailed,
}: CountryDashboardProps) {
  return (
    <div style={{ flex: '1 1 350px', minWidth: '300px' }}>
      <CountryStats
        countryName={country.name}
        population={getLatestValue(populationHistory)}
        gdpPerCapita={getLatestValue(gdpHistory)}
        lifeExpectancy={getLatestValue(lifeExpectancyHistory)}
      />
      <h2>Population</h2>
      <TimeSeriesChart data={populationHistory} color="#3B82F6" formatValue={formatPopulation} hasError={populationFailed} />
      <h2>GDP per capita</h2>
      <TimeSeriesChart data={gdpHistory} color="#22C55E" formatValue={formatGdpPerCapita} hasError={gdpFailed} />
      <h2>Life expectancy</h2>
      <TimeSeriesChart data={lifeExpectancyHistory} color="#F59E0B" formatValue={formatLifeExpectancy} hasError={lifeExpectancyFailed} />
    </div>
  )
}
export default CountryDashboard