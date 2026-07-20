import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { WorldBankDataPoint } from '../types'

interface TimeSeriesChartProps {
  data: WorldBankDataPoint[]
  color: string
  formatValue: (value: number) => string
  hasError?: boolean
}

interface ChartPoint {
  year: number
  value: number
}

function getDecadeTicks(chartData: ChartPoint[]): number[] {
  if (chartData.length === 0) return []
  const years = chartData.map((point) => point.year)
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)
  const firstDecade = Math.ceil(minYear / 10) * 10
  const ticks: number[] = []
  for (let year = firstDecade; year <= maxYear; year += 10) {
    ticks.push(year)
  }
  return ticks
}

function TimeSeriesChart({ data, color, formatValue, hasError }: TimeSeriesChartProps) {
  const chartData: ChartPoint[] = data
    .filter((point) => point.value !== null)
    .map((point) => ({ year: Number(point.date), value: point.value as number }))
    .sort((a, b) => a.year - b.year)

  if (chartData.length === 0) {
    return <p>{hasError ? 'Could not load this data — try again soon.' : 'No data available.'}</p>
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" type="number" domain={['dataMin', 'dataMax']} ticks={getDecadeTicks(chartData)} />
        <YAxis tickFormatter={formatValue} width={60} />
        <Tooltip formatter={(value) => formatValue(Number(value))} />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
export default TimeSeriesChart