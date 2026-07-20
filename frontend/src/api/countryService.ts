import axios from 'axios'
import type { CountryStats, WorldBankDataPoint } from '../types'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
})

export async function fetchCountryStats(countryCode: string): Promise<CountryStats> {
  const response = await apiClient.get<CountryStats>(`/countries/${countryCode}/stats`)
  return response.data
}

export async function fetchPopulationHistory(countryCode: string): Promise<WorldBankDataPoint[]> {
  const response = await apiClient.get<WorldBankDataPoint[]>(`/countries/${countryCode}/population`)
  return response.data
}

export async function fetchGdpPerCapitaHistory(countryCode: string): Promise<WorldBankDataPoint[]> {
  const response = await apiClient.get<WorldBankDataPoint[]>(`/countries/${countryCode}/gdp-per-capita`)
  return response.data
}

export async function fetchLifeExpectancyHistory(countryCode: string): Promise<WorldBankDataPoint[]> {
  const response = await apiClient.get<WorldBankDataPoint[]>(`/countries/${countryCode}/life-expectancy`)
  return response.data
}