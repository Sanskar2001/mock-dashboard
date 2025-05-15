"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FilterBar } from "@/components/filter-bar"
import { MetricsCards } from "@/components/metrics-cards"
import { SankeyChart } from "@/components/sankey-chart"
import { TrendCharts } from "@/components/trend-charts"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">SCA Exemption Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Know more about how your SCA exemptions strategy works on live payments
            </p>
          </div>

          <FilterBar />

          <MetricsCards />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">SCA exemptions analytics</CardTitle>
              <CardDescription>Breakdown of ThreeDS 2.0 Journey</CardDescription>
            </CardHeader>
            <CardContent>
              <SankeyChart />
            </CardContent>
          </Card>

          <TrendCharts />
        </div>
      </div>
    </div>
  )
}
