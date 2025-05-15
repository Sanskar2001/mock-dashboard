"use client"

import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartWrapper } from "@/components/chart-wrapper"
import { BarChart, LineChart } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TrendCharts() {
  // Sample data for charts
  const exemptionRequestData = [
    { date: "Jan 1", Visa: 65, Mastercard: 62, Amex: 58 },
    { date: "Jan 8", Visa: 66, Mastercard: 63, Amex: 59 },
    { date: "Jan 15", Visa: 67, Mastercard: 64, Amex: 60 },
    { date: "Jan 22", Visa: 68, Mastercard: 65, Amex: 61 },
    { date: "Jan 29", Visa: 69, Mastercard: 66, Amex: 62 },
    { date: "Feb 5", Visa: 70, Mastercard: 67, Amex: 63 },
    { date: "Feb 12", Visa: 71, Mastercard: 68, Amex: 64 },
  ]

  const exemptionApprovalData = [
    { date: "Jan 1", HSBC: 45, Barclays: 42, Santander: 40, BNP: 38 },
    { date: "Jan 8", HSBC: 46, Barclays: 43, Santander: 41, BNP: 39 },
    { date: "Jan 15", HSBC: 47, Barclays: 44, Santander: 42, BNP: 40 },
    { date: "Jan 22", HSBC: 48, Barclays: 45, Santander: 43, BNP: 41 },
    { date: "Jan 29", HSBC: 49, Barclays: 46, Santander: 44, BNP: 42 },
    { date: "Feb 5", HSBC: 50, Barclays: 47, Santander: 45, BNP: 43 },
    { date: "Feb 12", HSBC: 51, Barclays: 48, Santander: 46, BNP: 44 },
  ]

  const authSuccessData = [
    { date: "Jan 1", Web: 94, iOS: 95, Android: 93 },
    { date: "Jan 8", Web: 94.1, iOS: 95.1, Android: 93.1 },
    { date: "Jan 15", Web: 94.2, iOS: 95.2, Android: 93.2 },
    { date: "Jan 22", Web: 94.3, iOS: 95.3, Android: 93.3 },
    { date: "Jan 29", Web: 94.4, iOS: 95.4, Android: 93.4 },
    { date: "Feb 5", Web: 94.5, iOS: 95.5, Android: 93.5 },
    { date: "Feb 12", Web: 94.6, iOS: 95.6, Android: 93.6 },
  ]

  const dropOffData = [
    { date: "Jan 1", Desktop: 5.5, Mobile: 6.8, Tablet: 6.2 },
    { date: "Jan 8", Desktop: 5.4, Mobile: 6.7, Tablet: 6.1 },
    { date: "Jan 15", Desktop: 5.3, Mobile: 6.6, Tablet: 6.0 },
    { date: "Jan 22", Desktop: 5.2, Mobile: 6.5, Tablet: 5.9 },
    { date: "Jan 29", Desktop: 5.1, Mobile: 6.4, Tablet: 5.8 },
    { date: "Feb 5", Desktop: 5.0, Mobile: 6.3, Tablet: 5.7 },
    { date: "Feb 12", Desktop: 4.9, Mobile: 6.2, Tablet: 5.6 },
  ]

  const amountRangeData = [
    { range: "< 100 €", exemptionRate: 75, approvalRate: 52, authRate: 96 },
    { range: "100-200 €", exemptionRate: 68, approvalRate: 45, authRate: 94 },
    { range: "200-500 €", exemptionRate: 58, approvalRate: 38, authRate: 92 },
    { range: "> 500 €", exemptionRate: 42, approvalRate: 30, authRate: 90 },
  ]

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Exemption Request Rate by Card Network</CardTitle>
            <CardDescription>Percentage of payments with exemption requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartWrapper
              content={
                <LineChart
                  data={exemptionRequestData}
                  index="date"
                  categories={["Visa", "Mastercard", "Amex"]}
                  colors={["#3b82f6", "#ef4444", "#10b981"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={true}
                  showXAxis={true}
                  showYAxis={true}
                  yAxisWidth={40}
                />
              }
              title="Exemption Request Rate by Card Network"
              className="h-[300px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exemption Approval Rate by Issuer</CardTitle>
            <CardDescription>Percentage of exemption requests approved</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartWrapper
              content={
                <LineChart
                  data={exemptionApprovalData}
                  index="date"
                  categories={["HSBC", "Barclays", "Santander", "BNP"]}
                  colors={["#3b82f6", "#ef4444", "#10b981", "#f59e0b"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={true}
                  showXAxis={true}
                  showYAxis={true}
                  yAxisWidth={40}
                />
              }
              title="Exemption Approval Rate by Issuer"
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Success Rate by Platform</CardTitle>
            <CardDescription>Percentage of successful authentications</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartWrapper
              content={
                <LineChart
                  data={authSuccessData}
                  index="date"
                  categories={["Web", "iOS", "Android"]}
                  colors={["#3b82f6", "#10b981", "#f59e0b"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={true}
                  showXAxis={true}
                  showYAxis={true}
                  yAxisWidth={40}
                />
              }
              title="Authentication Success Rate by Platform"
              className="h-[300px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Drop-off Rate by Device Type</CardTitle>
            <CardDescription>Percentage of users who abandoned during checkout</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartWrapper
              content={
                <LineChart
                  data={dropOffData}
                  index="date"
                  categories={["Desktop", "Mobile", "Tablet"]}
                  colors={["#3b82f6", "#ef4444", "#10b981"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={true}
                  showXAxis={true}
                  showYAxis={true}
                  yAxisWidth={40}
                />
              }
              title="User Drop-off Rate by Device Type"
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Metrics by Transaction Amount</CardTitle>
          <CardDescription>How transaction amount affects key metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bar">
            <TabsList className="mb-4">
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="line">Line Chart</TabsTrigger>
            </TabsList>
            <TabsContent value="bar">
              <ChartWrapper
                content={
                  <BarChart
                    data={amountRangeData}
                    index="range"
                    categories={["exemptionRate", "approvalRate", "authRate"]}
                    colors={["#3b82f6", "#10b981", "#f59e0b"]}
                    valueFormatter={(value) => `${value}%`}
                    showLegend={true}
                    showXAxis={true}
                    showYAxis={true}
                    yAxisWidth={40}
                    customTooltip={{
                      component: ({ payload }) => {
                        if (!payload?.length) return null
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="font-medium">{payload[0].payload.range}</div>
                              <div className="font-medium text-right">Value</div>
                              {payload.map((entry) => (
                                <React.Fragment key={entry.dataKey}>
                                  <div className="flex items-center gap-1">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span>
                                      {entry.dataKey === "exemptionRate"
                                        ? "Exemption Request Rate"
                                        : entry.dataKey === "approvalRate"
                                          ? "Exemption Approval Rate"
                                          : "Authentication Success Rate"}
                                    </span>
                                  </div>
                                  <div className="text-right">{entry.value}%</div>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        )
                      },
                    }}
                  />
                }
                title="Metrics by Transaction Amount"
                className="h-[300px]"
              />
            </TabsContent>
            <TabsContent value="line">
              <ChartWrapper
                content={
                  <LineChart
                    data={amountRangeData}
                    index="range"
                    categories={["exemptionRate", "approvalRate", "authRate"]}
                    colors={["#3b82f6", "#10b981", "#f59e0b"]}
                    valueFormatter={(value) => `${value}%`}
                    showLegend={true}
                    showXAxis={true}
                    showYAxis={true}
                    yAxisWidth={40}
                    customTooltip={{
                      component: ({ payload }) => {
                        if (!payload?.length) return null
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="font-medium">{payload[0].payload.range}</div>
                              <div className="font-medium text-right">Value</div>
                              {payload.map((entry) => (
                                <React.Fragment key={entry.dataKey}>
                                  <div className="flex items-center gap-1">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span>
                                      {entry.dataKey === "exemptionRate"
                                        ? "Exemption Request Rate"
                                        : entry.dataKey === "approvalRate"
                                          ? "Exemption Approval Rate"
                                          : "Authentication Success Rate"}
                                    </span>
                                  </div>
                                  <div className="text-right">{entry.value}%</div>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        )
                      },
                    }}
                  />
                }
                title="Metrics by Transaction Amount"
                className="h-[300px]"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
