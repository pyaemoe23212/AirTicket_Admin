import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FlightService from "../../service/flightService";

export default function FlightView() {
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

  function DetailItem({ label, value }) {
    return (
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="mt-0.5 font-medium">{value || "—"}</div>
      </div>
    );
  }

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!flight) return <div className="p-6 text-center">Flight not found</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Flight {flight.flightNumber}</h1>
          <p className="text-gray-600 mt-1">{flight.airline}</p>
        </div>
        <span className="bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium">
          {flight.status}
        </span>
      </div>

      <div className="p-6 space-y-10">
        <section>
          <h2 className="text-lg font-semibold mb-4">Flight Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailItem label="Flight Number" value={flight.flightNumber} />
            <DetailItem label="Airline" value={flight.airline} />
            <DetailItem label="Status" value={flight.status} />
            <DetailItem label="Origin Airport" value={flight.originAirport} />
            <DetailItem
              label="Destination Airport"
              value={flight.destinationAirport}
            />
            <DetailItem
              label="Departure"
              value={`${flight.departureDate} ${flight.departureTime}`}
            />
            <DetailItem
              label="Arrival"
              value={`${flight.arrivalDate} ${flight.arrivalTime}`}
            />
            <DetailItem label="Duration" value={flight.duration} />
            <DetailItem label="Aircraft Type" value={flight.aircraftType} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Capacity & Pricing</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <DetailItem
              label="Total Capacity"
              value={`${flight.totalCapacity} seats`}
            />
            <DetailItem
              label="Available Seats"
              value={`${flight.availableSeats} seats`}
            />
            <DetailItem
              label="Booked Seats"
              value={`${flight.bookedSeats} seats`}
            />
            <DetailItem
              label="Base Price"
              value={`${flight.currency} ${flight.basePrice}`}
            />
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <DetailItem label="Gate Number" value={flight.gate} />
            <DetailItem label="Terminal" value={flight.terminal} />
          </div>
          <div>
            <h3 className="font-medium mb-2">Notes</h3>
            <p className="text-gray-700">{flight.notes}</p>
          </div>
        </section>

        <section className="text-sm text-gray-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <strong>Created Date:</strong>
              <br />
              {flight.createdDate}
            </div>
            <div>
              <strong>Modified Date:</strong>
              <br />
              {flight.lastModified}
            </div>
            <div>
              <strong>Modified By:</strong>
              <br />
              {flight.modifiedBy}
            </div>
          </div>
        </section>
      </div>

      {/* Buttons */}
      <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
        <button
          onClick={() => navigate("/admin/flights")}
          className="px-6 py-2 border rounded hover:bg-gray-50"
        >
          Back to List
        </button>
        <button
          onClick={() => navigate(`/admin/flights/${flightId}/flight-edit`)}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Flight
        </button>
      </div>
    </div>
  );
}
