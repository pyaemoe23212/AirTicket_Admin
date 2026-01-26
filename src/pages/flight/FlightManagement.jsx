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
    return () => { mounted = false; };
  }, []);

  const handleDelete = async (flightId) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;

    try {
      await deleteFlight(flightId);
      setFlights(prev => prev.filter(f => f.id !== flightId));
      alert("Flight deleted successfully");
    } catch (err) {
      alert("Failed to delete flight: " + err.message);
    }
  };

  const getStatusStyle = (status) => {
    const base = "inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ";
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
      <div className="bg-white border rounded-lg p-6">
        <div className="grid grid-cols-5 gap-4">
          <input
            className="border rounded px-3 py-2 text-sm"
            placeholder="Search flights..."
          />
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Status</option>
          </select>
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Origin</option>
          </select>
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Destination</option>
          </select>
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Dates</option>
          </select>
        </div>
        <button className="mt-4 bg-gray-800 text-white px-5 py-2 rounded">
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left w-10"></th>
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
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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