"use client"

import { useState } from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function DateRangePicker() {
  const [date, setDate] = useState({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 7),
  })

  const [preset, setPreset] = useState("last7Days")

  const handlePresetChange = (value: string) => {
    setPreset(value)

    const today = new Date()

    switch (value) {
      case "last3Days":
        setDate({
          from: addDays(today, -3),
          to: today,
        })
        break
      case "last7Days":
        setDate({
          from: addDays(today, -7),
          to: today,
        })
        break
      case "last30Days":
        setDate({
          from: addDays(today, -30),
          to: today,
        })
        break
      case "last90Days":
        setDate({
          from: addDays(today, -90),
          to: today,
        })
        break
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={preset} onValueChange={handlePresetChange}>
        <SelectTrigger className="h-8 w-[130px]">
          <SelectValue placeholder="Select range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="last3Days">Last 3 days</SelectItem>
          <SelectItem value="last7Days">Last 7 days</SelectItem>
          <SelectItem value="last30Days">Last 30 days</SelectItem>
          <SelectItem value="last90Days">Last 90 days</SelectItem>
          <SelectItem value="custom">Custom range</SelectItem>
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("h-8 justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate || { from: new Date(), to: addDays(new Date(), 7) })
              setPreset("custom")
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
