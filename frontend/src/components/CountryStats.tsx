import type { LatestValue } from '../utils/timeSeries'

interface CountryStatsProps {
  countryName: string
  population: LatestValue | null
  gdpPerCapita: LatestValue | null
  lifeExpectancy: LatestValue | null
}

function CountryStats({ countryName, population, gdpPerCapita, lifeExpectancy }: CountryStatsProps) {
  return (
    <div>
      <h1>{countryName}</h1>
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