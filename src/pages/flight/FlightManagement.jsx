import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFlights, deleteFlight } from "../../service/api";

export default function FlightManagement() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCurrencyModal, setOpenCurrencyModal] = useState(false);
  const [eurRate, setEurRate] = useState("1.12");

  useEffect(() => {
    let mounted = true;
    const fetchFlights = async () => {
      try {
        const data = await getAllFlights();
        if (mounted) {
          setFlights(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    fetchFlights();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (flightId) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;

    try {
      await deleteFlight(flightId);
      setFlights((prev) => prev.filter((f) => f.id !== flightId));
      alert("Flight deleted successfully");
    } catch (err) {
      alert("Failed to delete flight: " + err.message);
    }
  };

  const getStatusStyle = (status) => {
    const base = "inline-block px-2 py-1 text-xs border rounded ";
    if (status === "Scheduled") return base + "bg-green-100 text-green-800 border-green-200";
    if (status === "Delayed") return base + "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (status === "Cancelled") return base + "bg-red-100 text-red-800 border-red-200";
    return base + "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) return <div className="p-6 text-center">Loading flights...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          
          <p className="text-sm text-gray-500">Manage flights, schedules, and routes</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setOpenCurrencyModal(true)}
            className="border px-4 py-2 text-sm rounded hover:bg-gray-50"
          >
            Currency Exchange
          </button>
          <button className="border px-4 py-2 text-sm rounded hover:bg-gray-50">
            Ticket Price
          </button>
          
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-lg p-4">
        <div className="grid grid-cols-5 gap-4 items-end">
          <div>
            <label className="text-xs text-gray-500">Search Bookings</label>
            <input
              className="border rounded px-3 py-2 text-sm w-full"
              placeholder="Booking ID, Customer name, Email..."
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Status</label>
            <select className="border rounded px-3 py-2 text-sm w-full">
              <option>Select Status</option>
              <option>Scheduled</option>
              <option>Delayed</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-500">Route</label>
            <select className="border rounded px-3 py-2 text-sm w-full">
              <option>Select Route</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-500">Date Range</label>
            <select className="border rounded px-3 py-2 text-sm w-full">
              <option>Select date range</option>
            </select>
          </div>
       

        <div className="flex justify-end">
        <button className="bg-gray-800 hover:bg-black text-white text-sm px-4 py-2 rounded">
            Apply Filters
          </button>
          </div>
          </div>
      
    
        <div className="flex items-center gap-2 text-xs mt-3 text-gray-500">
          <span>Active Filters:</span>
          <span className="border rounded px-2 py-1 text-xs">Status: Scheduled</span>
          <span className="border rounded px-2 py-1 text-xs">Route: JFK - LHR</span>
          <button className="underline">Clear All</button>
        </div>
      </div>
          

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h3 className="font-medium">All Flights</h3>
          <p className="text-xs text-gray-500">Showing All Flights</p>
          </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 w-10"></th>
              <th className="p-4 text-left">Flight No.</th>
              <th className="p-4 text-left">Airline</th>
              <th className="p-4 text-left">Route</th>
              <th className="p-4 text-left">Departure</th>
              <th className="p-4 text-left">Arrival</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Capacity</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {flights.map((flight) => (
              <tr key={flight.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="p-4 font-medium">{flight.flightNumber}</td>
                <td className="p-4">{flight.airline}</td>
                <td className="p-4">
                  {flight.originAirport} → {flight.destinationAirport}
                </td>
                <td className="p-4">
                  {flight.departureDate} {flight.departureTime}
                </td>
                <td className="p-4">
                  {flight.arrivalDate} {flight.arrivalTime}
                </td>
                <td className="p-4">{flight.duration}</td>
                <td className="p-4">
                  {flight.availableSeats}/{flight.totalCapacity}
                </td>
                <td className="p-4 font-medium">
                  {flight.currency} {flight.basePrice}
                </td>
                <td className="p-4">
                  <span className={getStatusStyle(flight.status)}>
                    {flight.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/flights/${flight.id}`)}
                      className="border px-3 py-1 text-xs rounded hover:bg-gray-100"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/admin/flights/${flight.id}/flight-edit`)}
                      className="border px-3 py-1 text-xs rounded hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(flight.id)}
                      className="border border-red-300 text-red-600 px-3 py-1 text-xs rounded hover:bg-red-50"
                    >
                       🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 flex justify-between text-sm text-gray-500 border-t">
          <span>Showing 1–{flights.length} of {flights.length} results</span>
          <div className="flex gap-1">
          <button className="border px-2 py-1 rounded">{"<"}</button>
          <button className="border px-2 py-1 rounded bg-black text-white">1</button>
          <button className="border px-2 py-1 rounded">2</button>
          <button className="border px-2 py-1 rounded">3</button>
          <button className="border px-2 py-1 rounded">…</button>
          <button className="border px-2 py-1 rounded">31</button>
          <button className="border px-2 py-1 rounded">{">"}</button>
          </div>
        </div>
        </div>
          

    

      {/* Currency Modal */}
      {openCurrencyModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setOpenCurrencyModal(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Currency Exchange</h2>
              <button onClick={() => setOpenCurrencyModal(false)}>×</button>
            </div>

            <p>EUR to USD rate:</p>
            <input
              type="number"
              step="0.01"
              value={eurRate}
              onChange={(e) => setEurRate(e.target.value)}
              className="border p-2 w-32 my-2"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpenCurrencyModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-black text-white rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
