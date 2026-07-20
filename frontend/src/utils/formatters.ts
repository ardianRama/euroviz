export function formatPopulation(value: number): string {
  return `${(value / 1_000_000).toFixed(1)}M`
}

export function formatGdpPerCapita(value: number): string {
  return `$${(value / 1_000).toFixed(1)}k`
}

export function formatLifeExpectancy(value: number): string {
  return `${value.toFixed(1)} yrs`
}