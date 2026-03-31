import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingById, deleteBooking, getSecureTicket } from "../../config/api";

export default function BookingView() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId);
        if (mounted) {
          setBooking(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchBooking();

    return () => {
      mounted = false;
    };
  }, [bookingId]);

  const handleDeleteBooking = async () => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking(bookingId);
        navigate("/admin/bookings");
      } catch (err) {
        alert("Failed to delete booking: " + err.message);
      }
    }
  };

  const handleDownloadTicket = async () => {
    try {
      setDownloading(true);
      const blob = await getSecureTicket(bookingId);
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = booking.original_ticket_name || booking.original_name || `ticket-${booking.booking_code}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert("Failed to download ticket: " + (err.message || "Unknown error"));
    } finally {
      setDownloading(false);
    }
  };

  function DetailItem({ label, value }) {
    return (
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="mt-0.5 font-medium">{value || "—"}</div>
      </div>
    );
  }

    const extractTravelDate = (booking) => {
    try {
      const departureTime =
        booking.flight_snapshot?.outbound?.departure_time ||
        booking.flight_snapshot?.departure_time;
      if (!departureTime) return "-";

      return new Date(departureTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "-";
    }
  };

    const extractRoute = (booking) => {
    return (
      booking.flight_snapshot?.outbound?.route ||
      booking.flight_snapshot?.route ||
      "-"
    );
  };

  if (loading)
    return <div className="p-6 text-center">Loading booking details...</div>;
  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!booking) return <div className="p-6 text-center">Booking not found</div>;

  const fs = booking.flight_snapshot || {};
  const isRoundTrip = booking.type === "ROUND_TRIP";
  console.log("Booking Data:", booking);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Booking {booking.booking_code}</h1>
          <p className="text-gray-600 mt-1">Booked on {new Date(booking.created_at).toLocaleDateString()}</p>
        </div>
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            booking.status === "CONFIRMED"
              ? "bg-green-100 text-green-800"
              : booking.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {booking.status}
        </span>
      </div>

      <div className="p-6 space-y-10">
        {/* Booking Summary */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Booking Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailItem label="Booking Code" value={booking.booking_code} />
            <DetailItem label="Booking ID" value={booking.booking_id} />
            <DetailItem label="Trip Type" value={booking.type === "ROUND_TRIP" ? "Round Trip" : "One Way"} />
            <DetailItem label="Number of Adults" value={booking.adults} />
            <DetailItem label="Base Price (USD)" value={`$${fs.base_price_usd?.toFixed(2)}`} />
            <DetailItem label="Final Price (USD)" value={`$${booking.final_price_usd?.toFixed(2)}`} />
            <DetailItem label="Final Price (MMK)" value={`MMK ${booking.final_price_mmk?.toLocaleString()}`} />
          </div>
        </section>

        {/* Outbound Flight */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Outbound Flight</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailItem
              label="Airline & Flight"
              value={`${fs.outbound?.airline_code || fs.airline_code} ${fs.outbound?.flight_number || fs.flight_number}`}
            />
            <DetailItem label="Route" value={extractRoute(booking)} />
            <DetailItem
              label="Departure"
              value={extractTravelDate(booking) !== "-" ? new Date(fs.outbound?.departure_time || fs.departure_time).toLocaleString() : "—"}
            />
            <DetailItem
              label="Arrival"
              value={extractTravelDate(booking) !== "-" ? new Date(fs.outbound?.arrival_time || fs.arrival_time).toLocaleString() : "—"}
            />
            <DetailItem label="Duration" value={`${fs.outbound?.duration_minutes} minutes`} />
            <DetailItem label="Airline Name" value={fs.outbound?.airline} />
          </div>
        </section>

        {/* Inbound Flight (if Round Trip) */}
        {isRoundTrip && fs.inbound && (
          <section>
            <h2 className="text-lg font-semibold mb-4">Inbound Flight</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DetailItem
                label="Airline & Flight"
                value={`${fs.inbound.airline_code} ${fs.inbound.flight_number}`}
              />
              <DetailItem label="Route" value={fs.inbound.route} />
              <DetailItem
                label="Departure"
                value={fs.inbound.departure_time ? new Date(fs.inbound.departure_time).toLocaleString() : "—"}
              />
              <DetailItem
                label="Arrival"
                value={fs.inbound.arrival_time ? new Date(fs.inbound.arrival_time).toLocaleString() : "—"}
              />
              <DetailItem label="Duration" value={`${fs.inbound.duration_minutes} minutes`} />
              <DetailItem label="Airline Name" value={fs.inbound.airline} />
            </div>
          </section>
        )}

        {/* Passengers */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Passengers</h2>
          <div className="space-y-4">
            {booking.passengers?.map((passenger, idx) => (
              <div key={passenger.id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Passenger {idx + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <DetailItem
                    label="Full Name"
                    value={`${passenger.given_name} ${passenger.last_name}`}
                  />
                  <DetailItem label="Passport Number" value={passenger.passport_number} />
                  <DetailItem label="Gender" value={passenger.gender} />
                  <DetailItem label="Date of Birth" value={new Date(passenger.date_of_birth).toLocaleDateString()} />
                  <DetailItem label="Nationality" value={passenger.nationality} />
                  <DetailItem label="Phone Number" value={passenger.phone_number} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Payment & Status */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Payment & Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailItem label="Payment Status" value={booking.payment_status} />
            <DetailItem label="Booking Status" value={booking.status} />
            <DetailItem
              label="Booked Date"
              value={new Date(booking.created_at).toLocaleString()}
            />
          </div>
        </section>

        {/* Uploaded Ticket File */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Ticket File</h2>
              <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-800">Download to see the uploaded file.</p>
                  <button
                    disabled={downloading}
                    onClick={handleDownloadTicket}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm disabled:opacity-60"
                  >
                    {downloading ? "Downloading..." : "⬇️ Download"}
                  </button>
                </div>
              </div>
            </section>
      </div>

      {/* Buttons */}
      <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
        <button
          onClick={() => navigate("/admin/bookings")}
          className="px-6 py-2 border rounded hover:bg-gray-50"
        >
          Back to List
        </button>
        <button
          onClick={handleDeleteBooking}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Booking
        </button>
      </div>
    </div>
  );
}