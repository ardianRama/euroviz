import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { WorldBankDataPoint } from '../types'

interface TimeSeriesChartProps {
  data: WorldBankDataPoint[]
  color: string
  formatValue: (value: number) => string
}

interface ChartPoint {
  year: string
  value: number
}

function TimeSeriesChart({ data, color, formatValue }: TimeSeriesChartProps) {
  const chartData: ChartPoint[] = data
    .filter((point) => point.value !== null)
    .map((point) => ({ year: point.date, value: point.value as number }))
    .sort((a, b) => a.year.localeCompare(b.year))

  if (chartData.length === 0) {
    return <p>No data available.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis tickFormatter={formatValue} width={60} />
        <Tooltip formatter={(value) => formatValue(Number(value))} />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default TimeSeriesChart