import type React from "react"

interface ChartWrapperProps {
  content: React.ReactNode
  title: string
  className?: string
}

export function ChartWrapper({ content, title, className }: ChartWrapperProps) {
  return (
    <div className={className}>
      {content}
      <div className="sr-only">{title}</div>
    </div>
  )
}
