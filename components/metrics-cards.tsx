"use client"

import { InfoIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="text-4xl font-bold text-gray-900">34%</div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <span>SCA Exemption request rate</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="ml-1 h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total # of Exemptions requested by the merchant / Total # of Payments initiated</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="text-4xl font-bold text-gray-900">85%</div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <span>SCA Exemption approval rate</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="ml-1 h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total # of Exemptions approved by the issuer / Total # of Exemptions requested by the merchant</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="text-4xl font-bold text-gray-900">1</div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <span>Chargebacks on Exempted transactions</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="ml-1 h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of chargebacks received for transactions with exemptions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="text-4xl font-bold text-gray-900">17%</div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <span>Authorization decline rate on exempted transactions</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="ml-1 h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Percentage of exempted transactions that were declined during authorization</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mt-1 text-xs text-gray-500">2/29 = 0.06%</div>
        </CardContent>
      </Card>
    </div>
  )
}
