"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

// Add back the props interface
interface FilterBarProps {
  selectedPlatforms: string[];
  onPlatformChange: (platforms: string[]) => void;
  selectedDeviceTypes: string[];
  onDeviceTypeChange: (deviceTypes: string[]) => void;
}

export function FilterBar({
  selectedPlatforms,
  onPlatformChange,
  selectedDeviceTypes,
  onDeviceTypeChange,
}: FilterBarProps) {
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date());
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([
    { name: "Last 7 days", value: "7d", category: "Time" },
    { name: "All Networks", value: "all", category: "Network" },
  ]);

  // Function to handle filter changes and update activeFilters
  const handleFilterChange = (
    value: string,
    filter: { id: string; name: string },
    category: string
  ) => {
    // Special handling for device_type filter
    if (filter.id === "device_type") {
      // Similar logic to device_platform filter
      if (value === `all_${filter.id}`) {
        onDeviceTypeChange(["Desktop", "Mobile", "Tablet"]);
        setActiveFilters((prev) =>
          prev.filter(
            (f) => f.category !== "Device" || !f.name.includes("Device Type")
          )
        );
        return;
      }

      // Toggle the device type
      const newSelectedDeviceTypes = selectedDeviceTypes.includes(value)
        ? selectedDeviceTypes.filter((p) => p !== value)
        : [...selectedDeviceTypes, value];

      onDeviceTypeChange(newSelectedDeviceTypes);

      // Update active filters
      const existingFilterIndex = activeFilters.findIndex(
        (f) => f.category === "Device" && f.name.includes("Device Type")
      );

      // Handle filter display logic (similar to platform filter)
      if (
        newSelectedDeviceTypes.length === 0 ||
        newSelectedDeviceTypes.length === 3
      ) {
        if (existingFilterIndex >= 0) {
          const newFilters = [...activeFilters];
          newFilters.splice(existingFilterIndex, 1);
          setActiveFilters(newFilters);
        }
      } else {
        const deviceTypeText = `Device Type: ${newSelectedDeviceTypes.join(
          ", "
        )}`;

        if (existingFilterIndex >= 0) {
          const newFilters = [...activeFilters];
          newFilters[existingFilterIndex] = {
            name: deviceTypeText,
            value: newSelectedDeviceTypes.join(","),
            category: "Device",
          };
          setActiveFilters(newFilters);
        } else {
          setActiveFilters([
            ...activeFilters,
            {
              name: deviceTypeText,
              value: newSelectedDeviceTypes.join(","),
              category: "Device",
            },
          ]);
        }
      }

      return;
    }

    // Special handling for platform filter
    if (filter.id === "device_platform") {
      // If "All" is selected, reset to show all platforms
      if (value === `all_${filter.id}`) {
        onPlatformChange(["Web", "iOS", "Android"]);
        // Remove any existing platform filters
        setActiveFilters((prev) =>
          prev.filter(
            (f) => f.category !== "Device" || !f.name.includes("Platform")
          )
        );
        return;
      }

      // Toggle this platform in the selected platforms array
      const newSelectedPlatforms = selectedPlatforms.includes(value)
        ? selectedPlatforms.filter((p) => p !== value)
        : [...selectedPlatforms, value];

      onPlatformChange(newSelectedPlatforms);

      // Update active filters - we'll show a combined filter for all selected platforms
      const existingFilterIndex = activeFilters.findIndex(
        (f) => f.category === "Device" && f.name.includes("Platform")
      );

      if (newSelectedPlatforms.length === 0) {
        // If no platforms selected, remove the filter
        if (existingFilterIndex >= 0) {
          const newFilters = [...activeFilters];
          newFilters.splice(existingFilterIndex, 1);
          setActiveFilters(newFilters);
        }
      } else if (newSelectedPlatforms.length === 3) {
        // If all platforms selected, remove the filter (showing everything)
        if (existingFilterIndex >= 0) {
          const newFilters = [...activeFilters];
          newFilters.splice(existingFilterIndex, 1);
          setActiveFilters(newFilters);
        }
      } else {
        // Show selected platforms in the filter
        const platformText = `Platform: ${newSelectedPlatforms.join(", ")}`;

        if (existingFilterIndex >= 0) {
          // Update existing filter
          const newFilters = [...activeFilters];
          newFilters[existingFilterIndex] = {
            name: platformText,
            value: newSelectedPlatforms.join(","),
            category: "Device",
          };
          setActiveFilters(newFilters);
        } else {
          // Add new filter
          setActiveFilters([
            ...activeFilters,
            {
              name: platformText,
              value: newSelectedPlatforms.join(","),
              category: "Device",
            },
          ]);
        }
      }

      return;
    }

    // Regular handling for other filters
    // Skip if the user selected "All" option
    if (value === `all_${filter.id}`) {
      // Remove this filter if it exists in activeFilters
      setActiveFilters((prev) =>
        prev.filter(
          (f) => !(f.category === category && f.name.includes(filter.name))
        )
      );
      return;
    }

    // Check if a filter with this category and name already exists
    const existingFilterIndex = activeFilters.findIndex(
      (f) => f.category === category && f.name.includes(filter.name)
    );

    if (existingFilterIndex >= 0) {
      // Replace the existing filter
      const newFilters = [...activeFilters];
      newFilters[existingFilterIndex] = {
        name: `${filter.name}: ${value}`,
        value,
        category,
      };
      setActiveFilters(newFilters);
    } else {
      // Add a new filter
      setActiveFilters([
        ...activeFilters,
        {
          name: `${filter.name}: ${value}`,
          value,
          category,
        },
      ]);
    }
  };

  const removeFilter = (index: number) => {
    setActiveFilters(activeFilters.filter((_, i) => i !== index));
  };

  // Filter categories
  const filterCategories = [
    {
      name: "Payment",
      filters: [
        { id: "mcc", name: "MCC", options: ["1234", "4789", "5411", "5812"] },
        {
          id: "amount",
          name: "Amount",
          options: ["< €25", "€25-€100", "€100-€500", "> €500"],
        },
        {
          id: "currency",
          name: "Currency",
          options: ["EUR", "USD", "GBP", "JPY"],
        },
      ],
    },
    {
      name: "Acquirer",
      filters: [
        {
          id: "acquirer_id",
          name: "Acquirer ID",
          options: ["ACQ001", "ACQ002", "ACQ003"],
        },
        {
          id: "acquirer_bin",
          name: "Acquirer BIN",
          options: ["123456", "234567", "345678"],
        },
        {
          id: "acquirer_country_code",
          name: "Acquirer Country Code",
          options: ["FR", "DE", "UK", "ES"],
        },
      ],
    },
    {
      name: "Location",
      filters: [
        {
          id: "merchant_country",
          name: "Merchant Country",
          options: ["France", "Germany", "UK", "Spain"],
        },
        {
          id: "billing_country",
          name: "Billing Country",
          options: ["France", "Germany", "UK", "Spain"],
        },
        {
          id: "shipping_country",
          name: "Shipping Country",
          options: ["France", "Germany", "UK", "Spain"],
        },
        {
          id: "issuer_country",
          name: "Issuer Country",
          options: ["France", "Germany", "UK", "Spain"],
        },
      ],
    },
    {
      name: "3DS",
      filters: [
        {
          id: "earliest_3ds",
          name: "Earliest 3DS Version",
          options: ["1.0.0", "2.1.0", "2.2.0"],
        },
        {
          id: "latest_3ds",
          name: "Latest 3DS Version",
          options: ["2.1.0", "2.2.0", "2.3.0"],
        },
        {
          id: "challenge_type",
          name: "Challenge Type",
          options: ["OOB", "BIO", "OTP", "KBA"],
        },
        {
          id: "whitelist_decision",
          name: "Whitelist Decision",
          options: ["Yes", "No", "N/A"],
        },
      ],
    },
    {
      name: "Device",
      filters: [
        {
          id: "device_manufacturer",
          name: "Device Manufacturer",
          options: ["Apple", "Samsung", "Google"],
        },
        {
          id: "device_platform",
          name: "Platform",
          options: ["Web", "iOS", "Android"],
          isMultiSelect: true,
        },
        {
          id: "device_type",
          name: "Device Type",
          options: ["Desktop", "Mobile", "Tablet"],
          isMultiSelect: true,
        },
        {
          id: "device_brand",
          name: "Device Brand",
          options: ["iPhone", "Galaxy", "Pixel"],
        },
        {
          id: "device_os",
          name: "Device OS",
          options: ["iOS 16", "Android 13", "Android 14"],
        },
        {
          id: "device_display",
          name: "Device Display",
          options: ["Small", "Medium", "Large"],
        },
      ],
    },
    {
      name: "Browser",
      filters: [
        {
          id: "browser_name",
          name: "Browser Name",
          options: ["Chrome", "Safari", "Firefox", "Edge"],
        },
        {
          id: "browser_version",
          name: "Browser Version",
          options: ["115+", "110-114", "100-109"],
        },
      ],
    },
    {
      name: "Issuer",
      filters: [
        {
          id: "issuer_id",
          name: "Issuer ID",
          options: ["Wells Fargo", "HDFC", "JPMorgan Chase", "Bank of America"],
        },
        {
          id: "scheme_name",
          name: "Scheme Name",
          options: ["Visa", "Mastercard", "Amex"],
        },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex flex-wrap gap-2 items-center mb-2">
        {/* Active filters display */}
        {activeFilters.map((filter, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
          >
            <span className="text-blue-400 text-xs">{filter.category}:</span>
            {filter.name}
            <button
              onClick={() => removeFilter(index)}
              className="ml-1 text-blue-500 hover:text-blue-700"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {/* Date range picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Last 7 days
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateRange}
              onSelect={setDateRange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {/* Quick access filters */}
        <Select
          defaultValue="all"
          onValueChange={(value) =>
            handleFilterChange(
              value,
              { id: "network", name: "Network" },
              "Network"
            )
          }
        >
          <SelectTrigger className="h-8 w-[140px] text-xs">
            <SelectValue placeholder="Network" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Networks</SelectItem>
            <SelectItem value="visa">Visa</SelectItem>
            <SelectItem value="mastercard">Mastercard</SelectItem>
            <SelectItem value="amex">American Express</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-[140px] text-xs">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Amounts</SelectItem>
            <SelectItem value="low">Under €25</SelectItem>
            <SelectItem value="medium">€25 - €100</SelectItem>
            <SelectItem value="high">Over €100</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAllFilters(!showAllFilters)}
          className="ml-auto text-xs"
        >
          {showAllFilters ? (
            <>
              <ChevronUp className="mr-1 h-3 w-3" />
              Hide Filters
            </>
          ) : (
            <>
              <ChevronDown className="mr-1 h-3 w-3" />
              Show All Filters
            </>
          )}
        </Button>
      </div>

      {/* Expandable advanced filters */}
      <Collapsible open={showAllFilters} onOpenChange={setShowAllFilters}>
        <CollapsibleContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
            {filterCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {category.filters.map((filter) =>
                    filter.id === "device_platform" && filter.isMultiSelect ? (
                      <div key={filter.id}>
                        <Select
                          value={
                            selectedPlatforms.length === 3
                              ? `all_${filter.id}`
                              : selectedPlatforms.join(",")
                          }
                          onValueChange={(value) => {
                            // Handle the "All" option
                            if (value === `all_${filter.id}`) {
                              handleFilterChange(value, filter, category.name);
                              return;
                            }

                            // This is just a trigger to open the dropdown, not an actual selection
                            // The actual selection happens in the checkboxes inside PopoverContent
                          }}
                        >
                          <SelectTrigger className="h-8 w-full text-xs">
                            <SelectValue placeholder={filter.name}>
                              {selectedPlatforms.length === 3
                                ? "All Platforms"
                                : selectedPlatforms.length === 0
                                ? "No Platform"
                                : `Platforms: ${selectedPlatforms.join(", ")}`}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <div className="py-2">
                              <div className="mb-2 px-2 pb-2 border-b">
                                <div className="flex items-center">
                                  <Checkbox
                                    id="select-all-platforms"
                                    checked={selectedPlatforms.length === 3}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        onPlatformChange([
                                          "Web",
                                          "iOS",
                                          "Android",
                                        ]);
                                      } else {
                                        onPlatformChange([]);
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor="select-all-platforms"
                                    className="ml-2 text-sm font-medium"
                                  >
                                    All Platforms
                                  </label>
                                </div>
                              </div>
                              {filter.options.map((platform) => (
                                <div key={platform} className="px-2 py-1">
                                  <div className="flex items-center">
                                    <Checkbox
                                      id={`platform-${platform}`}
                                      checked={selectedPlatforms.includes(
                                        platform
                                      )}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          onPlatformChange([
                                            ...selectedPlatforms,
                                            platform,
                                          ]);
                                        } else {
                                          onPlatformChange(
                                            selectedPlatforms.filter(
                                              (p) => p !== platform
                                            )
                                          );
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={`platform-${platform}`}
                                      className="ml-2 text-sm font-medium"
                                    >
                                      {platform}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : filter.id === "device_type" && filter.isMultiSelect ? (
                      <div key={filter.id}>
                        <Select
                          value={
                            selectedDeviceTypes.length === 3
                              ? `all_${filter.id}`
                              : selectedDeviceTypes.join(",")
                          }
                          onValueChange={(value) => {
                            // Handle the "All" option
                            if (value === `all_${filter.id}`) {
                              handleFilterChange(value, filter, category.name);
                              return;
                            }
                            // This is just a trigger to open the dropdown
                          }}
                        >
                          <SelectTrigger className="h-8 w-full text-xs">
                            <SelectValue placeholder={filter.name}>
                              {selectedDeviceTypes.length === 3
                                ? "All Device Types"
                                : selectedDeviceTypes.length === 0
                                ? "No Device Types"
                                : `Device Types: ${selectedDeviceTypes.join(
                                    ", "
                                  )}`}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <div className="py-2">
                              <div className="mb-2 px-2 pb-2 border-b">
                                <div className="flex items-center">
                                  <Checkbox
                                    id="select-all-device-types"
                                    checked={selectedDeviceTypes.length === 3}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        onDeviceTypeChange([
                                          "Desktop",
                                          "Mobile",
                                          "Tablet",
                                        ]);
                                      } else {
                                        onDeviceTypeChange([]);
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor="select-all-device-types"
                                    className="ml-2 text-sm font-medium"
                                  >
                                    All Device Types
                                  </label>
                                </div>
                              </div>
                              {filter.options.map((deviceType) => (
                                <div key={deviceType} className="px-2 py-1">
                                  <div className="flex items-center">
                                    <Checkbox
                                      id={`device-type-${deviceType}`}
                                      checked={selectedDeviceTypes.includes(
                                        deviceType
                                      )}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          onDeviceTypeChange([
                                            ...selectedDeviceTypes,
                                            deviceType,
                                          ]);
                                        } else {
                                          onDeviceTypeChange(
                                            selectedDeviceTypes.filter(
                                              (p) => p !== deviceType
                                            )
                                          );
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={`device-type-${deviceType}`}
                                      className="ml-2 text-sm font-medium"
                                    >
                                      {deviceType}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <Select
                        key={filter.id}
                        defaultValue={`all_${filter.id}`}
                        onValueChange={(value) =>
                          handleFilterChange(value, filter, category.name)
                        }
                      >
                        <SelectTrigger className="h-8 w-full text-xs">
                          <SelectValue placeholder={filter.name} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={`all_${filter.id}`}>
                            All {filter.name}
                          </SelectItem>
                          {filter.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
