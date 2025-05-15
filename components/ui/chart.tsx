"use client"

import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  Legend,
} from "recharts"
import type React from "react"

interface LineChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGridLines?: boolean
  yAxisWidth?: number
  className?: string
  customTooltip?: {
    component: React.FC<any>
  }
}

export function LineChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend,
  showXAxis,
  showYAxis,
  showGridLines,
  yAxisWidth,
  className,
  customTooltip,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray={showGridLines ? "3 3" : "0"} />
        <XAxis dataKey={index} hide={!showXAxis} />
        <YAxis tickFormatter={valueFormatter} width={yAxisWidth} hide={!showYAxis} />
        <Tooltip
          content={customTooltip?.component}
          formatter={(value) => (valueFormatter ? [valueFormatter(value as number)] : [value])}
        />
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

interface BarChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGridLines?: boolean
  yAxisWidth?: number
  className?: string
  customTooltip?: {
    component: React.FC<any>
  }
}

export function BarChart({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend,
  showXAxis,
  showYAxis,
  showGridLines,
  yAxisWidth,
  className,
  customTooltip,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray={showGridLines ? "3 3" : "0"} />
        <XAxis dataKey={index} hide={!showXAxis} />
        <YAxis tickFormatter={valueFormatter} width={yAxisWidth} hide={!showYAxis} />
        <Tooltip
          content={customTooltip?.component}
          formatter={(value) => (valueFormatter ? [valueFormatter(value as number)] : [value])}
        />
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Bar key={category} dataKey={category} fill={colors[i % colors.length]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
