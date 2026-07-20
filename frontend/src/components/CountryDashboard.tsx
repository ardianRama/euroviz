import CountryStats from './CountryStats'
import TimeSeriesChart from './TimeSeriesChart'
import { formatGdpPerCapita, formatPopulation } from '../utils/formatters'
import type { CountryStats as CountryStatsType, WorldBankDataPoint } from '../types'

interface CountryDashboardProps {
  stats: CountryStatsType | null
  populationHistory: WorldBankDataPoint[]
  gdpHistory: WorldBankDataPoint[]
}

function CountryDashboard({ stats, populationHistory, gdpHistory }: CountryDashboardProps) {
  return (
    <div style={{ flex: '1 1 350px', minWidth: '300px' }}>
      {stats && <CountryStats stats={stats} />}

      <h2>Population</h2>
      <TimeSeriesChart data={populationHistory} color="#3B82F6" formatValue={formatPopulation} />

      <h2>GDP per capita</h2>
      <TimeSeriesChart data={gdpHistory} color="#22C55E" formatValue={formatGdpPerCapita} />
    </div>
  )
}

export default CountryDashboard