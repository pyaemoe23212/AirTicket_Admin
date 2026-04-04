import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllFlightOverrides,
  disableFlightOverride,
} from "../../config/api";

export default function FlightOverride() {
  const navigate = useNavigate();
  const [overrideFlights, setOverrideFlights] = useState([]);
  const [loadingOverrides, setLoadingOverrides] = useState(false);

  // Fetch overrides on page load
  const fetchOverrides = async () => {
    setLoadingOverrides(true);
    try {
      const overrides = await getAllFlightOverrides();
      setOverrideFlights(overrides);
    } catch (err) {
      console.error("Failed to fetch overrides:", err);
    } finally {
      setLoadingOverrides(false);
    }
  };

  useEffect(() => {
    fetchOverrides();
  }, []);

  const handleDisableOverride = async (overrideId) => {
    if (window.confirm("Are you sure you want to disable this override?")) {
      try {
        const updatedOverride = await disableFlightOverride(overrideId);
        // Update the override in the list instead of removing it
        setOverrideFlights(prev =>
          prev.map(o => (o.id === overrideId ? { ...o, is_active: false } : o))
        );
        alert("Override disabled successfully");
      } catch (err) {
        alert("Failed to disable override: " + err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Flight Overrides</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage price overrides for flights
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/flights")}
          className="border px-4 py-2 text-sm rounded hover:bg-gray-50"
        >
          Back to Search
        </button>
      </div>

      {/* Override Flights Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h3 className="font-medium">All Overrides</h3>
          <p className="text-xs text-gray-500">
            {overrideFlights.length > 0
              ? `Showing ${overrideFlights.length} override${overrideFlights.length !== 1 ? "s" : ""}`
              : "No overrides created yet"}
          </p>
        </div>

        {loadingOverrides ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : overrideFlights.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No override flights yet.</p>
            <button
              onClick={() => navigate("/admin/flights")}
              className="mt-3 text-blue-600 hover:underline text-sm"
            >
              Create one from search results
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Airline Code</th>
                <th className="p-4 text-left">Flight No.</th>
                <th className="p-4 text-left">Departure Date</th>
                <th className="p-4 text-left">Override Price (USD)</th>
                <th className="p-4 text-left">Expires At</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {overrideFlights.map((override) => (
                <tr key={override.id} className="hover:bg-gray-50">
                  <td className="p-4">{override.airline_code}</td>
                  <td className="p-4 font-medium">{override.flight_number}</td>
                  <td className="p-4">{override.departure_date}</td>
                  <td className="p-4 font-medium">${override.override_price_usd}</td>
                  <td className="p-4 text-sm">
                    {new Date(override.expires_at).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        override.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {override.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDisableOverride(override.id)}
                      className="border border-red-300 px-3 py-1 text-xs rounded text-red-600 hover:bg-red-50"
                    >
                      Disable
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}