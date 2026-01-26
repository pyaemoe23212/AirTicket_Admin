import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBookings, deleteBookingById } from "../../service/api";

export default function BookingManagement() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        if (mounted) {
          setBookings(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchBookings();

    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await deleteBookingById(bookingId);
      setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
      alert("Booking deleted successfully");
    } catch (err) {
      alert("Failed to delete booking: " + err.message);
    }
  };

  const getStatusStyle = (status) => {
    const base = "inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ";
    if (status === "Confirmed") return base + "bg-green-100 text-green-800 border-green-200";
    if (status === "Pending") return base + "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (status === "Cancelled") return base + "bg-red-100 text-red-800 border-red-200";
    return base + "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) return <div className="p-6 text-center">Loading bookings...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white border rounded-lg p-6">
        <div className="grid grid-cols-5 gap-4">
          <input
            className="border rounded px-3 py-2 text-sm"
            placeholder="Search bookings..."
          />
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Routes</option>
          </select>
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Dates</option>
          </select>
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Classes</option>
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
              <th className="p-4 text-left">Booking ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Route</th>
              <th className="p-4 text-left">Travel Date</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {bookings.map((booking) => (
              <tr key={booking.bookingId} className="hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="p-4 font-medium">{booking.bookingId}</td>
                <td className="p-4">{booking.customer}</td>
                <td className="p-4 text-gray-600">{booking.email}</td>
                <td className="p-4">{booking.route}</td>
                <td className="p-4">{booking.travelDate}</td>
                <td className="p-4 font-medium">
                  {booking.currency} {booking.amount.toFixed(2)}
                </td>
                <td className="p-4">
                  <span className={getStatusStyle(booking.status)}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/bookings/${booking.bookingId}`)}
                      className="border px-3 py-1 text-xs rounded hover:bg-gray-100"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/admin/bookings/${booking.bookingId}/edit`)}
                      className="border px-3 py-1 text-xs rounded hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking.bookingId)}
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
    </div>
  );
}