import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFlight } from "../../service/api";

export default function FlightForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    aircraftType: "",
    status: "Scheduled",
    originAirport: "",
    destinationAirport: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    duration: "",
    totalCapacity: 180,
    basePrice: 0,
    currency: "USD",
    classType: "Economy",
    gate: "",
    terminal: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["totalCapacity", "basePrice"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createFlight(formData);
      alert("Flight created successfully!");
      navigate("/admin/flights");
    } catch (err) {
      setError(err.message || "Failed to create flight");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold mb-2">New Flight</h2>
      <p className="text-gray-600 mb-8">Add a new flight to the schedule</p>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Basic Flight Information */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Basic Flight Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Flight Number *</label>
              <input
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
                placeholder="e.g. AA101"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Airline *</label>
              <input
                name="airline"
                value={formData.airline}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
                placeholder="e.g. American Airlines"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Aircraft Type *</label>
              <input
                name="aircraftType"
                value={formData.aircraftType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
                placeholder="e.g. Boeing 737"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Active">Active</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </section>

        {/* Route Information */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Route Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Origin Airport *</label>
              <input
                name="originAirport"
                value={formData.originAirport}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
                placeholder="e.g. JFK"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Destination Airport *</label>
              <input
                name="destinationAirport"
                value={formData.destinationAirport}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
                placeholder="e.g. LHR"
              />
            </div>
          </div>
        </section>

        {/* Schedule Information */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Schedule Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Departure Date *</label>
              <input
                name="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Departure Time *</label>
              <input
                name="departureTime"
                type="time"
                value={formData.departureTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Arrival Date *</label>
              <input
                name="arrivalDate"
                type="date"
                value={formData.arrivalDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Arrival Time *</label>
              <input
                name="arrivalTime"
                type="time"
                value={formData.arrivalTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>
        </section>

        {/* Capacity & Pricing */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Capacity & Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Total Capacity *</label>
              <input
                name="totalCapacity"
                type="number"
                value={formData.totalCapacity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Base Price (USD) *</label>
              <input
                name="basePrice"
                type="number"
                step="0.01"
                value={formData.basePrice}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Currency *</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="THB">THB</option>
              </select>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Gate Number (Optional)</label>
              <input
                name="gate"
                value={formData.gate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Terminal (Optional)</label>
              <input
                name="terminal"
                value={formData.terminal}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Add any additional information..."
            />
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-12">
          <button
            type="button"
            onClick={() => navigate("/admin/flights")}
            className="px-6 py-2.5 border rounded hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Flight"}
          </button>
        </div>
      </form>
    </div>
  );
}