"use client"

import { useState } from "react"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FilterBar() {
  const [activeFilters, setActiveFilters] = useState({
    period: "Last 7 Days",
    network: "Visa",
    issuer: "Wells Fargo",
    country: "UK",
    amountRange: "100 - 300",
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <span className="mr-3 text-sm font-medium text-gray-700">Filter by:</span>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="h-9 bg-white border-gray-200 text-gray-700 font-normal">
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            {activeFilters.period}
            <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500" />
          </Button>

          <Button variant="outline" size="sm" className="h-9 bg-white border-gray-200 text-gray-700 font-normal">
            <span className="mr-2 text-gray-500">Network =</span>
            {activeFilters.network}
            <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500" />
          </Button>

          <Button variant="outline" size="sm" className="h-9 bg-white border-gray-200 text-gray-700 font-normal">
            <span className="mr-2 text-gray-500">Issuer =</span>
            {activeFilters.issuer}
            <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500" />
          </Button>

          <Button variant="outline" size="sm" className="h-9 bg-white border-gray-200 text-gray-700 font-normal">
            <span className="mr-2 text-gray-500">Country =</span>
            {activeFilters.country}
            <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500" />
          </Button>

          <Button variant="outline" size="sm" className="h-9 bg-white border-gray-200 text-gray-700 font-normal">
            <span className="mr-2 text-gray-500">Amount Range =</span>
            {activeFilters.amountRange}
            <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>
    </div>
  )
}
