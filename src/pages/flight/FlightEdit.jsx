import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FlightService from "../../data/FlightService"

export default function FlightEdit() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const data = await FlightService.getFlightById(flightId);
        setFlight(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFlight();
  }, [flightId]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!flight) return <div className="p-6 text-center">Flight not found</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit Flight</h2>
      <p className="text-gray-600 mb-8">Flight ID: {flightId}</p>

      {/* Basic Flight Information */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Flight Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Flight Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              defaultValue={flight.flightNumber}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Airline <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              defaultValue={flight.airline}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-600">*</span>
            </label>
            <select defaultValue={flight.status} className="w-full px-4 py-2 border border-gray-300 rounded-md">
              <option>Scheduled</option>
              <option>Delayed</option>
              <option>Cancelled</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Origin Airport <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              defaultValue={flight.originAirport}
              placeholder="e.g. JFK"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination Airport <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              defaultValue={flight.destinationAirport}
              placeholder="e.g. LHR"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departure Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              defaultValue={flight.departureDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departure Time <span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              defaultValue={flight.departureTime}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              defaultValue={flight.duration}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Arrival Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              defaultValue={flight.arrivalDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Arrival Time <span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              defaultValue={flight.arrivalTime}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aircraft Type <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              defaultValue={flight.aircraftType}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Capacity & Pricing */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Capacity & Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Capacity <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              defaultValue={flight.totalCapacity}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Seats (Auto-calculated)</label>
            <input
              type="number"
              defaultValue={flight.availableSeats}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Booked Seats (Read-only)</label>
            <input
              type="number"
              defaultValue={flight.bookedSeats}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Ticket Price <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              defaultValue={flight.basePrice}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency <span className="text-red-600">*</span>
            </label>
            <select defaultValue={flight.currency} className="w-full px-4 py-2 border border-gray-300 rounded-md">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>THB</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Type <span className="text-red-600">*</span>
            </label>
            <select defaultValue={flight.classType} className="w-full px-4 py-2 border border-gray-300 rounded-md">
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>
        </div>
      </section>

      {/* Gate & Terminal + Notes */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gate Number</label>
            <input
              type="text"
              defaultValue={flight.gate}
              placeholder="e.g. B12"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Terminal</label>
            <input
              type="text"
              defaultValue={flight.terminal}
              placeholder="e.g. Terminal 4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes / Special Instructions</label>
          <textarea
            defaultValue={flight.notes}
            rows={4}
            placeholder="Enter any special instructions or notes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </section>

      {/* Audit Info */}
      <section className="mb-10 text-sm text-gray-600 bg-gray-50 p-5 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <strong>Created Date:</strong><br />
            {flight.createdDate}
          </div>
          <div>
            <strong>Last Modified:</strong><br />
            {flight.lastModified}
          </div>
          <div>
            <strong>Modified By:</strong><br />
            {flight.modifiedBy}
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-12">
        <button
          onClick={() => navigate("/admin/flights")}
          className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button className="px-8 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 font-medium">
          Save & Publish
        </button>
      </div>
    </div>
  );
}