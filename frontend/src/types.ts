export interface IndicatorValue {
  year: string
  value: number
}

export interface CountryStats {
  countryCode: string
  countryName: string
  population: IndicatorValue | null
  gdpPerCapita: IndicatorValue | null
}