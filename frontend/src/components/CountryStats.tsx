import type { LatestValue } from '../utils/timeSeries'

interface CountryStatsProps {
  countryName: string
  population: LatestValue | null
  gdpPerCapita: LatestValue | null
  lifeExpectancy: LatestValue | null
}

function CountryStats({ countryName, population, gdpPerCapita, lifeExpectancy }: CountryStatsProps) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h1 style={{ lineHeight: 1.2, marginBottom: '0.5rem' }}>{countryName}</h1>
      <p>
        Population ({population?.year}): {population?.value.toLocaleString()}
      </p>
      <p>
        GDP per capita ({gdpPerCapita?.year}): ${gdpPerCapita?.value.toFixed(2)}
      </p>
      <p>
        Life expectancy ({lifeExpectancy?.year}): {lifeExpectancy?.value.toFixed(1)} years
      </p>
    </div>
  )
}

export default CountryStats