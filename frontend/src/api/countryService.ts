import axios from 'axios'
import type { CountryStats } from '../types'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
})

export async function fetchCountryStats(countryCode: string): Promise<CountryStats> {
  const response = await apiClient.get<CountryStats>(`/countries/${countryCode}/stats`)
  return response.data
}