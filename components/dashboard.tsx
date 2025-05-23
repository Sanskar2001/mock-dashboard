"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FilterBar } from "@/components/filter-bar";
import { MetricsCards } from "@/components/metrics-cards";
import { SankeyChart } from "@/components/sankey-chart";
import { TrendCharts } from "@/components/trend-charts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { CheckboxGroup, Checkbox } from "@/components/ui/checkbox";
import { AuthSummaryTable } from "@/components/auth-summary-table";

// Add interface for bot responses
interface MetricBotResponse {
  question: string;
  answer: string;
  metrics?: {
    label: string;
    value: string | number;
  }[];
}

// Add this helper function for date formatting
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.toLocaleString("default", {
    month: "short",
  })} ${date.getDate()}, ${date.getHours()}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
};

interface ChartData {
  timestamp: string;
  value: number;
}

// Simple platform data interface
interface PlatformData {
  date: string;
  NA?: number;
  Cybersource?: number;
  Stripe?: number;
  Trustpay?: number;
  Cryptopay?: number;
}

// Simplified date formatter for X-axis
const formatDateAxis = (dateStr: string) => {
  return dateStr;
};

// Move the sample data outside of SuccessRateChart to make it available to all components
const chartData: PlatformData[] = [
  {
    date: "7. May",
    NA: 0,
    Cybersource: 0,
    Stripe: 0,
    Trustpay: 0,
    Cryptopay: 0,
  },
  {
    date: "8. May",
    NA: 0,
    Cybersource: 20,
    Stripe: 0,
    Trustpay: 0,
    Cryptopay: 0,
  },
  {
    date: "9. May",
    NA: 0,
    Cybersource: 40,
    Stripe: 100,
    Trustpay: 0,
    Cryptopay: 0,
  },
  {
    date: "10. May",
    NA: 0,
    Cybersource: 60,
    Stripe: 100,
    Trustpay: 0,
    Cryptopay: 0,
  },
  {
    date: "11. May",
    NA: 0,
    Cybersource: 80,
    Stripe: 100,
    Trustpay: 0,
    Cryptopay: 0,
  },
  {
    date: "12. May",
    NA: 0,
    Cybersource: 100,
    Stripe: 100,
    Trustpay: 0,
    Cryptopay: 0,
  },
  {
    date: "13. May",
    NA: 0,
    Cybersource: 100,
    Stripe: 60,
    Trustpay: 0,
    Cryptopay: 0,
  },
  {
    date: "14. May",
    NA: 0,
    Cybersource: 100,
    Stripe: 0,
    Trustpay: 100,
    Cryptopay: 0,
  },
  {
    date: "15. May",
    NA: 0,
    Cybersource: 0,
    Stripe: 100,
    Trustpay: 0,
    Cryptopay: 0,
  },
];

// Different data for each chart to make them visually distinct
const authSuccessData = [
  { date: "7. May", Web: 92, iOS: 96, Android: 88 },
  { date: "8. May", Web: 93, iOS: 96, Android: 89 },
  { date: "9. May", Web: 94, iOS: 97, Android: 91 },
  { date: "10. May", Web: 93, iOS: 97, Android: 92 },
  { date: "11. May", Web: 95, iOS: 98, Android: 93 },
  { date: "12. May", Web: 96, iOS: 98, Android: 94 },
  { date: "13. May", Web: 97, iOS: 97, Android: 95 },
  { date: "14. May", Web: 96, iOS: 97, Android: 94 },
  { date: "15. May", Web: 97, iOS: 98, Android: 95 },
];

const dropOffData = [
  { date: "Jan 1", Desktop: 2.3, Mobile: 5.4, Tablet: 3.7 },
  { date: "Jan 2", Desktop: 2.1, Mobile: 5.2, Tablet: 3.5 },
  { date: "Jan 3", Desktop: 2.5, Mobile: 5.7, Tablet: 4.1 },
  { date: "7. May", Desktop: 5.2, Mobile: 8.5, Tablet: 7.1 },
  { date: "8. May", Desktop: 5.0, Mobile: 8.2, Tablet: 6.9 },
  { date: "9. May", Desktop: 4.8, Mobile: 7.9, Tablet: 6.7 },
  { date: "10. May", Desktop: 4.6, Mobile: 7.6, Tablet: 6.4 },
  { date: "11. May", Desktop: 4.5, Mobile: 7.4, Tablet: 6.2 },
  { date: "12. May", Desktop: 4.3, Mobile: 7.2, Tablet: 6.0 },
  { date: "13. May", Desktop: 4.2, Mobile: 7.0, Tablet: 5.9 },
  { date: "14. May", Desktop: 4.0, Mobile: 6.8, Tablet: 5.7 },
  { date: "15. May", Desktop: 3.9, Mobile: 6.5, Tablet: 5.5 },
];

const approvalData = [
  {
    date: "7. May",
    "Wells Fargo": 72,
    HDFC: 68,
    "JPMorgan Chase": 62,
    "Bank of America": 58,
  },
  {
    date: "8. May",
    "Wells Fargo": 73,
    HDFC: 69,
    "JPMorgan Chase": 63,
    "Bank of America": 59,
  },
  {
    date: "9. May",
    "Wells Fargo": 74,
    HDFC: 70,
    "JPMorgan Chase": 64,
    "Bank of America": 60,
  },
  {
    date: "10. May",
    "Wells Fargo": 76,
    HDFC: 72,
    "JPMorgan Chase": 66,
    "Bank of America": 62,
  },
  {
    date: "11. May",
    "Wells Fargo": 77,
    HDFC: 73,
    "JPMorgan Chase": 67,
    "Bank of America": 63,
  },
  {
    date: "12. May",
    "Wells Fargo": 78,
    HDFC: 74,
    "JPMorgan Chase": 68,
    "Bank of America": 64,
  },
  {
    date: "13. May",
    "Wells Fargo": 79,
    HDFC: 75,
    "JPMorgan Chase": 69,
    "Bank of America": 65,
  },
  {
    date: "14. May",
    "Wells Fargo": 80,
    HDFC: 76,
    "JPMorgan Chase": 70,
    "Bank of America": 66,
  },
  {
    date: "15. May",
    "Wells Fargo": 81,
    HDFC: 77,
    "JPMorgan Chase": 71,
    "Bank of America": 67,
  },
];

const exemptionData = [
  { date: "7. May", LowValue: 82, Merchant: 42, TRA: 62 },
  { date: "8. May", LowValue: 83, Merchant: 43, TRA: 63 },
  { date: "9. May", LowValue: 84, Merchant: 44, TRA: 64 },
  { date: "10. May", LowValue: 85, Merchant: 45, TRA: 65 },
  { date: "11. May", LowValue: 86, Merchant: 46, TRA: 66 },
  { date: "12. May", LowValue: 87, Merchant: 47, TRA: 67 },
  { date: "13. May", LowValue: 86, Merchant: 48, TRA: 68 },
  { date: "14. May", LowValue: 85, Merchant: 49, TRA: 69 },
  { date: "15. May", LowValue: 84, Merchant: 50, TRA: 70 },
];

// Update the SuccessRateChart component to use the shared data source
const SuccessRateChart = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-1">Success Rate</h2>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient id="colorNA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64B5F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#64B5F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCybersource" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#81C784" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#81C784" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorStripe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFB74D" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#FFB74D" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTrustpay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7986CB" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#7986CB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCryptopay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E57373" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#E57373" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray=""
              stroke="#E5E7EB"
              opacity={0.2}
              strokeWidth={0.3}
            />

            <XAxis
              dataKey="date"
              tickFormatter={formatDateAxis}
              tick={{ fontSize: 12 }}
              stroke="#64748B"
            />

            <YAxis
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tick={{ fontSize: 12 }}
              stroke="#64748B"
            />

            <Tooltip
              formatter={(value) => [`${value}%`, ""]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "4px",
                padding: "8px",
              }}
            />

            <Area
              type="monotone"
              dataKey="NA"
              stroke="#64B5F6"
              fillOpacity={1}
              fill="url(#colorNA)"
              strokeWidth={1.5}
              dot={{ r: 3, strokeWidth: 1 }}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />

            <Area
              type="monotone"
              dataKey="Cybersource"
              stroke="#81C784"
              fillOpacity={1}
              fill="url(#colorCybersource)"
              strokeWidth={1.5}
              dot={{ r: 3, strokeWidth: 1 }}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />

            <Area
              type="monotone"
              dataKey="Stripe"
              stroke="#FFB74D"
              fillOpacity={1}
              fill="url(#colorStripe)"
              strokeWidth={1.5}
              dot={{ r: 3, strokeWidth: 1 }}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />

            <Area
              type="monotone"
              dataKey="Trustpay"
              stroke="#7986CB"
              fillOpacity={1}
              fill="url(#colorTrustpay)"
              strokeWidth={1.5}
              dot={{ r: 3, strokeWidth: 1 }}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />

            <Area
              type="monotone"
              dataKey="Cryptopay"
              stroke="#E57373"
              fillOpacity={1}
              fill="url(#colorCryptopay)"
              strokeWidth={1.5}
              dot={{ r: 3, strokeWidth: 1 }}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: "20px" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Updated chart component with area styling but using your original data format
const CustomAreaChart = ({ data }: { data: ChartData[] }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-1">Payments Processed</h2>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray=""
              stroke="#E5E7EB"
              opacity={0.2}
              strokeWidth={0.3}
            />

            <XAxis
              dataKey="timestamp"
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
              stroke="#64748B"
            />

            <YAxis tick={{ fontSize: 12 }} stroke="#64748B" />

            <Tooltip
              labelFormatter={formatDate}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "4px",
                padding: "8px",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={1.5}
              dot={{ r: 3, strokeWidth: 1 }}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Create a reusable chart component to replace your TrendCharts
const ReusableChart = ({
  title,
  subtitle,
  data,
  dataKeys,
  colors,
  valueFormatter = (value) => `${value}`,
  yAxisDomain = [0, "auto"],
  yAxisTicks = undefined,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold mb-1">{title}</h2>
      {subtitle && <p className="text-gray-500 mb-4">{subtitle}</p>}

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
          >
            <defs>
              {dataKeys.map((key, index) => (
                <linearGradient
                  key={key}
                  id={`color-${index}-${key
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={colors[index]}
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors[index]}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid
              strokeDasharray=""
              stroke="#E5E7EB"
              opacity={0.2}
              strokeWidth={0.3}
            />

            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#64748B" />

            <YAxis
              tickFormatter={valueFormatter}
              domain={yAxisDomain}
              ticks={yAxisTicks}
              tick={{ fontSize: 12 }}
              stroke="#64748B"
            />

            <Tooltip
              formatter={(value) => [valueFormatter(value), ""]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "4px",
                padding: "8px",
              }}
            />

            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                name={key}
                stroke={colors[index]}
                fillOpacity={1}
                fill={`url(#color-${index}-${key
                  .replace(/\s+/g, "-")
                  .toLowerCase()})`}
                strokeWidth={1.5}
                dot={{ r: 3, strokeWidth: 1 }}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ))}

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: "20px" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<MetricBotResponse | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "Web",
    "iOS",
    "Android",
  ]);

  // Add state for device types
  const [selectedDeviceTypes, setSelectedDeviceTypes] = useState<string[]>([
    "Desktop",
    "Mobile",
    "Tablet",
  ]);

  // Update the filterDataByPlatform function to correctly handle device types
  const filterDataByPlatform = (data: any[], platformKeys: string[]) => {
    // Check if these are device type keys (Desktop, Mobile, Tablet)
    const isDeviceTypeData = platformKeys.some((key) =>
      ["Desktop", "Mobile", "Tablet"].includes(key)
    );

    // Check if these are platform keys (Web, iOS, Android)
    const isPlatformData = platformKeys.some((key) =>
      ["Web", "iOS", "Android"].includes(key)
    );

    // Apply the appropriate filter based on data type
    const filteredKeys = platformKeys.filter((key) => {
      if (isPlatformData && ["Web", "iOS", "Android"].includes(key)) {
        return selectedPlatforms.includes(key);
      }
      if (isDeviceTypeData && ["Desktop", "Mobile", "Tablet"].includes(key)) {
        return selectedDeviceTypes.includes(key);
      }
      return true;
    });

    console.log("Filtering", {
      isDeviceTypeData,
      isPlatformData,
      platformKeys,
      filteredKeys,
      selectedDeviceTypes,
      selectedPlatforms,
    });

    // Create a new colors array with proper mapping
    const getFilteredColors = (originalColors: string[]) => {
      if (isPlatformData || isDeviceTypeData) {
        // For platform-specific or device-type charts, map colors to selected items
        return filteredKeys.map((key) => {
          const originalIndex = platformKeys.findIndex((k) => k === key);
          return originalIndex >= 0 ? originalColors[originalIndex] : "#000000";
        });
      }
      // For non-platform/device charts, use original colors
      return originalColors;
    };

    // Return structured data for rendering
    return {
      data: data,
      dataKeys: filteredKeys,
      colors: (originalColors: string[]) => getFilteredColors(originalColors),
    };
  };

  // Function to handle platform selection changes
  const handlePlatformChange = (platforms: string[]) => {
    setSelectedPlatforms(
      platforms.length ? platforms : ["Web", "iOS", "Android"]
    );
  };

  // Add handler for device type changes
  const handleDeviceTypeChange = (deviceTypes: string[]) => {
    setSelectedDeviceTypes(
      deviceTypes.length ? deviceTypes : ["Desktop", "Mobile", "Tablet"]
    );
  };

  // Add function to handle quick action clicks
  const handleQuickAction = (query: string) => {
    setQuestion(query);
    // Optionally auto-submit the form
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Hardcoded responses for demo
    const questionLower = question.toLowerCase();
    if (questionLower.includes("revenue")) {
      setResponse({
        question,
        answer: "Here's our revenue breakdown for the last quarter:",
        metrics: [
          { label: "Total Revenue", value: "$1.2M" },
          { label: "MRR", value: "$400K" },
          { label: "YoY Growth", value: "23%" },
        ],
      });
    } else if (questionLower.includes("users")) {
      setResponse({
        question,
        answer: "Here are our current user statistics:",
        metrics: [
          { label: "Total Users", value: "50,000" },
          { label: "Active Users", value: "32,000" },
          { label: "New Users (This Month)", value: "2,300" },
        ],
      });
    } else {
      setResponse({
        question,
        answer:
          "I'm not sure about that metric. Try asking about revenue or users!",
        metrics: [],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              SCA Exemption Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Know more about how your SCA exemptions strategy works on live
              payments
            </p>
          </div>

          <FilterBar
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={handlePlatformChange}
            selectedDeviceTypes={selectedDeviceTypes}
            onDeviceTypeChange={handleDeviceTypeChange}
          />

          <MetricsCards />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                SCA exemptions analytics
              </CardTitle>
              <CardDescription>
                Breakdown of ThreeDS 2.0 Journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SankeyChart />
            </CardContent>
          </Card>

          {/* Grid layout for side-by-side charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReusableChart
              title="Authentication Success"
              subtitle="Breakdown of authentication success rates by platform"
              data={
                filterDataByPlatform(authSuccessData, ["Web", "iOS", "Android"])
                  .data
              }
              dataKeys={
                filterDataByPlatform(authSuccessData, ["Web", "iOS", "Android"])
                  .dataKeys
              }
              colors={filterDataByPlatform(authSuccessData, [
                "Web",
                "iOS",
                "Android",
              ]).colors(["#4299E1", "#10B981", "#F59E0B"])}
              valueFormatter={(value) => `${value}%`}
              yAxisDomain={[80, 100]}
              yAxisTicks={[80, 85, 90, 95, 100]}
            />
            <ReusableChart
              title="User Drop-off Rate"
              subtitle="Breakdown of user drop-off rates by device type"
              data={
                filterDataByPlatform(dropOffData, [
                  "Desktop",
                  "Mobile",
                  "Tablet",
                ]).data
              }
              dataKeys={
                filterDataByPlatform(dropOffData, [
                  "Desktop",
                  "Mobile",
                  "Tablet",
                ]).dataKeys
              }
              colors={filterDataByPlatform(dropOffData, [
                "Desktop",
                "Mobile",
                "Tablet",
              ]).colors(["#8B5CF6", "#EC4899", "#F97316"])}
              valueFormatter={(value) => `${value}%`}
              yAxisDomain={[0, 10]}
              yAxisTicks={[0, 2, 4, 6, 8, 10]}
            />
            <ReusableChart
              title="Exemption Approval Rate by Issuer"
              subtitle="Breakdown of exemption approval rates by issuer"
              data={
                filterDataByPlatform(approvalData, [
                  "Wells Fargo",
                  "HDFC",
                  "JPMorgan Chase",
                  "Bank of America",
                ]).data
              }
              dataKeys={
                filterDataByPlatform(approvalData, [
                  "Wells Fargo",
                  "HDFC",
                  "JPMorgan Chase",
                  "Bank of America",
                ]).dataKeys
              }
              colors={filterDataByPlatform(approvalData, [
                "Wells Fargo",
                "HDFC",
                "JPMorgan Chase",
                "Bank of America",
              ]).colors(["#EF4444", "#6366F1", "#06B6D4", "#D946EF"])}
              valueFormatter={(value) => `${value}%`}
              yAxisDomain={[50, 85]}
              yAxisTicks={[50, 60, 70, 80]}
            />
            <ReusableChart
              title="Exemption Request Rate by Type"
              subtitle="Breakdown of exemption request rates by type"
              data={
                filterDataByPlatform(exemptionData, [
                  "LowValue",
                  "Merchant",
                  "TRA",
                ]).data
              }
              dataKeys={
                filterDataByPlatform(exemptionData, [
                  "LowValue",
                  "Merchant",
                  "TRA",
                ]).dataKeys
              }
              colors={filterDataByPlatform(exemptionData, [
                "LowValue",
                "Merchant",
                "TRA",
              ]).colors(["#84CC16", "#14B8A6", "#F43F5E"])}
              valueFormatter={(value) => `${value}%`}
              yAxisDomain={[30, 90]}
              yAxisTicks={[30, 45, 60, 75, 90]}
            />
          </div>

          <div className="mt-6">
            <AuthSummaryTable />
          </div>
        </div>
      </div>
    </div>
  );
}
