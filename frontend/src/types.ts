export interface IndicatorValue {
  year: string
  value: number
}

export interface CountryStats {
  countryCode: string
  countryName: string
  population: IndicatorValue | null
  gdpPerCapita: IndicatorValue | null
  lifeExpectancy: IndicatorValue | null
}

export interface WorldBankDataPoint {
  country: {
    id: string
    value: string
  }
  date: string
  value: number | null
}