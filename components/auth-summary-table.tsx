import React from "react";

// Sample data for authentication summary
const authSummaryData = [
  {
    connector: "Netcetera",
    successRate: "87.25%",
    currentWeekSR: "88.12%",
    authCount: 412,
    authSuccessCount: 359,
    topErrorReasons: "user_abandoned_...",
  },
  {
    connector: "Juspay ThreeDS Server",
    successRate: "93.46%",
    currentWeekSR: "94.58%",
    authCount: 293,
    authSuccessCount: 274,
    topErrorReasons: "timeout_error...",
  },
  {
    connector: "Cardinal Commerce",
    successRate: "89.71%",
    currentWeekSR: "90.33%",
    authCount: 175,
    authSuccessCount: 157,
    topErrorReasons: "verification_failed...",
  },
];

export function AuthSummaryTable() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">
          Authentication Summary
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-medium">Connector</th>
              <th className="px-6 py-3 font-medium">Success Rate</th>
              <th className="px-6 py-3 font-medium">Current Week S.R</th>
              <th className="px-6 py-3 font-medium">Auth Count</th>
              <th className="px-6 py-3 font-medium">Auth Success Count</th>
              <th className="px-6 py-3 font-medium">Top 5 Error Reasons</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {authSummaryData.map((row) => (
              <tr key={row.connector} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {row.connector}
                </td>
                <td className="px-6 py-4">{row.successRate}</td>
                <td className="px-6 py-4">{row.currentWeekSR}</td>
                <td className="px-6 py-4">{row.authCount}</td>
                <td className="px-6 py-4">{row.authSuccessCount}</td>
                <td className="px-6 py-4 text-blue-600 hover:underline">
                  {row.topErrorReasons}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
