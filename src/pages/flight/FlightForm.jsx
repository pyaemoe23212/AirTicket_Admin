import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFlight } from "../../service/api";

export default function FlightForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    originAirport: "",
    destinationAirport: "",

    departureDateTime: "",
    arrivalDateTime: "",
    duration: "",
    status: "Scheduled",

    aircraftType: "",
    terminal: "",
    gate: "",

    economySeats: 120,
    businessSeats: 20,
    firstClassSeats: 10,

    economyPrice: 850,
    businessPrice: 1000,
    firstClassPrice: 1200,

    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["economySeats", "businessSeats", "firstClassSeats", "economyPrice", "businessPrice", "firstClassPrice"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createFlight(formData);
      navigate("/admin/flights");
    } catch (err) {
      setError(err.message || "Failed to create flight");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="max-w-5xl mx-auto bg-white rounded-lg p-8 border">

    <p className="text-gray-500 mb-6">Add a new flight to the schedule</p>

    {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded">{error}</div>}

    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Basic Flight Information */}
      <div className="border rounded-md p-5">
        <h3 className="text-sm font-semibold mb-4">Basic Flight Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Flight Number</label>
            <input name="flightNumber" value={formData.flightNumber} onChange={handleChange} className="input" placeholder="e.g. AA 101" />
          </div>
          <div>
            <label className="label">Airline</label>
            <input name="airline" value={formData.airline} onChange={handleChange} className="input" placeholder="American" />
          </div>
          <div>
            <label className="label">Origin Airport</label>
            <input name="originAirport" value={formData.originAirport} onChange={handleChange} className="input" placeholder="e.g. JFK" />
          </div>
          <div>
            <label className="label">Destination Airport</label>
            <input name="destinationAirport" value={formData.destinationAirport} onChange={handleChange} className="input" placeholder="e.g. LAX" />
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="border rounded-md p-5">
        <h3 className="text-sm font-semibold mb-4">Schedule</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Departure Date & Time</label>
            <input name="departureDateTime" value={formData.departureDateTime} onChange={handleChange} className="input" placeholder="e.g. Jan 15, 9:30 AM" />
          </div>
          <div>
            <label className="label">Arrival Date & Time</label>
            <input name="arrivalDateTime" value={formData.arrivalDateTime} onChange={handleChange} className="input" placeholder="e.g. Jan 15, 4:30 PM" />
          </div>
          <div>
            <label className="label">Flight Duration</label>
            <input name="duration" value={formData.duration} onChange={handleChange} className="input" placeholder="e.g. 5h 30m" />
          </div>
          <div>
            <label className="label">Status</label>
             <select className="border rounded px-3 py-2 text-sm w-full">
              <option>Select Status</option>
              <option>Scheduled</option>
              <option>Delayed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Aircraft Details */}
      <div className="border rounded-md p-5">
        <h3 className="text-sm font-semibold mb-4">Aircraft Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Aircraft Type</label>
            <input name="aircraftType" value={formData.aircraftType} onChange={handleChange} className="input" placeholder="e.g. Boeing 777-200" />
          </div>
          <div>
            <label className="label">Terminal</label>
            <input name="terminal" value={formData.terminal} onChange={handleChange} className="input" placeholder="Terminal 8" />
          </div>
          <div>
            <label className="label">Gate</label>
            <input name="gate" value={formData.gate} onChange={handleChange} className="input" placeholder="Gate 3" />
          </div>
          <div>
            <label className="label">Arrival Time</label>
            <input name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} className="input" placeholder="e.g. 03:15 PM" />
          </div>
        </div>
      </div>

      {/* Seating */}
      <div className="border rounded-md p-5">
        <h3 className="text-sm font-semibold mb-4">Seating Configuration</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Economy</label>
            <input type="number" name="economySeats" value={formData.economySeats} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">Business</label>
            <input type="number" name="businessSeats" value={formData.businessSeats} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">First Class</label>
            <input type="number" name="firstClassSeats" value={formData.firstClassSeats} onChange={handleChange} className="input" />
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="border rounded-md p-5">
        <h3 className="text-sm font-semibold mb-4">Pricing</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Economy</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" name="economyPrice" value={formData.economyPrice} onChange={handleChange} className="input !pl-5" />
          </div>
          </div>
          
          <div>
            <label className="label">Business</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" name="businessPrice" value={formData.businessPrice} onChange={handleChange} className="input !pl-5" />
          </div>
          </div>
          
          <div>
            <label className="label">First Class</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" name="firstClassPrice" value={formData.firstClassPrice} onChange={handleChange} className="input !pl-5" />
          </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="border rounded-md p-5">
        <h3 className="text-sm font-semibold mb-2">Additional Information</h3>
        <label className="label">Notes (Optional)</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="input" placeholder="Add any additional flight information or special notes..." />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => navigate("/admin/flights")} className="border px-6 py-2 rounded-md text-sm">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded-md text-sm disabled:opacity-50">
          {loading ? "Creating..." : "Create Flight"}
        </button>
      </div>

    </form>
  </div>
);

}
