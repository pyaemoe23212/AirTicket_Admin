import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingById, updateBooking } from "../../service/api";

export default function BookingEdit() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateBooking(bookingId, booking);
      alert("Booking updated successfully");
      navigate("/admin/bookings");
    } catch (err) {
      alert("Failed to update booking: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setBooking(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!booking) return <div className="p-6 text-center">Booking not found</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit Booking</h2>
      <p className="text-gray-600 mb-8">Booking ID: {bookingId}</p>

      {/* Passenger Information */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Passenger Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name <span className="text-red-600">*</span></label>
            <input
              type="text"
              value={booking.customer}
              onChange={(e) => handleInputChange("customer", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-600">*</span></label>
            <input
              type="email"
              value={booking.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={booking.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Passengers <span className="text-red-600">*</span></label>
            <input
              type="number"
              value={booking.passengers}
              onChange={(e) => handleInputChange("passengers", Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Flight Details */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Flight Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
            <input
              type="text"
              value={booking.route}
              onChange={(e) => handleInputChange("route", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date <span className="text-red-600">*</span></label>
            <input
              type="date"
              value={booking.travelDate}
              onChange={(e) => handleInputChange("travelDate", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Travel Class</label>
            <select
              value={booking.travelClass}
              onChange={(e) => handleInputChange("travelClass", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seat Number(s)</label>
            <input
              type="text"
              value={booking.seat}
              onChange={(e) => handleInputChange("seat", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Status & Payment */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Status & Payment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Booking Status</label>
            <select
              value={booking.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              value={booking.paymentStatus}
              onChange={(e) => handleInputChange("paymentStatus", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option>Paid</option>
              <option>Pending</option>
              <option>Refunded</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
            <input
              type="number"
              step="0.01"
              value={booking.amount}
              onChange={(e) => handleInputChange("amount", parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-12">
        <button
          type="button"
          onClick={() => navigate("/admin/bookings")}
          className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 font-medium disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}