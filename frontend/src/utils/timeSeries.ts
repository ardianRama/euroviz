import type { WorldBankDataPoint } from '../types'

export interface LatestValue {
  year: string
  value: number
}

export function getLatestValue(dataPoints: WorldBankDataPoint[]): LatestValue | null {
  const validPoints = dataPoints.filter(
    (point): point is WorldBankDataPoint & { value: number } => point.value !== null
  )

  if (validPoints.length === 0) {
    return null
  }

  const latest = validPoints.reduce((latestSoFar, point) =>
    point.date > latestSoFar.date ? point : latestSoFar
  )

  return { year: latest.date, value: latest.value }
}