import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingById } from "../../service/api";

export default function BookingView() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  function DetailItem({ label, value }) {
    return (
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="mt-0.5 font-medium">{value || "—"}</div>
      </div>
    );
  }

  if (loading) return <div className="p-6 text-center">Loading booking details...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!booking) return <div className="p-6 text-center">Booking not found</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Booking {booking.bookingId}</h1>
          <p className="text-gray-600 mt-1">Booked on {booking.bookedAt}</p>
        </div>
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            booking.status === "Confirmed"
              ? "bg-green-100 text-green-800"
              : booking.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {booking.status}
        </span>
      </div>

      <div className="p-6 space-y-10">
        {/* Flight Information */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Flight Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailItem label="Booking ID" value={booking.bookingId} />
            <DetailItem label="Flight Number" value={booking.flightNumber} />
            <DetailItem label="Route" value={booking.route} />
            <DetailItem label="Travel Date" value={booking.travelDate} />
            <DetailItem label="Departure Time" value={booking.departureTime} />
            <DetailItem label="Arrival Time" value={booking.arrivalTime} />
            <DetailItem label="Travel Class" value={booking.travelClass} />
            <DetailItem label="Seat Number(s)" value={booking.seat} />
          </div>
        </section>

        {/* Passenger Information */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Passenger Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailItem label="Customer Name" value={booking.customer} />
            <DetailItem label="Email Address" value={booking.email} />
            <DetailItem label="Phone Number" value={booking.phone} />
            <DetailItem label="Number of Passengers" value={booking.passengers} />
          </div>
        </section>

        {/* Payment & Status */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Payment & Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailItem label="Total Amount" value={`${booking.currency} ${booking.amount.toFixed(2)}`} />
            <DetailItem label="Payment Status" value={booking.paymentStatus} />
            <DetailItem label="Booking Status" value={booking.status} />
          </div>
        </section>

        {/* Audit Info */}
        <section className="text-sm text-gray-600 bg-gray-50 p-5 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <strong>Booked Date:</strong><br />
              {booking.bookedAt}
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
          onClick={() => navigate(`/admin/bookings/${bookingId}/edit`)}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Booking
        </button>
      </div>
    </div>
  );
}