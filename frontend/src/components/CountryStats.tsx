import type { CountryStats as CountryStatsType } from '../types'

interface CountryStatsProps {
  stats: CountryStatsType
}

function CountryStats({ stats }: CountryStatsProps) {
  return (
    <div>
      <h1>{stats.countryName}</h1>
      <p>
        Population ({stats.population?.year}): {stats.population?.value.toLocaleString()}
      </p>
      <p>
        GDP per capita ({stats.gdpPerCapita?.year}): ${stats.gdpPerCapita?.value.toFixed(2)}
      </p>
    </div>
  )
}

export default CountryStats