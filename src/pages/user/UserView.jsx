// pages/user/UserView.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../service/api";

export default function UserView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        if (mounted) {
          setUser(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading user details...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!user) return <div className="p-6 text-center">User not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Customer Details</h1>
          <p className="text-sm text-gray-500">View customer information and booking history</p>
        </div>
        <button
          onClick={() => navigate("/admin/users")}
          className="text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-2xl font-medium">
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-lg">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
          <div className="flex gap-2 mt-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {user.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
              {user.type || "Standard User"}
            </span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-600">Customer ID</p>
            <p className="font-medium">USR-{String(user.id).padStart(3, "0")}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Email Address</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Phone Number</p>
            <p className="font-medium">{user.phone || "N/A"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Preferred Class</p>
            <p className="font-medium">{user.preferredClass || "Economy"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Registration Date</p>
            <p className="font-medium">{user.registration}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Last Active</p>
            <p className="font-medium">{user.lastActive}</p>
          </div>
        </div>
      </div>

      {/* Booking Statistics */}
      {user.bookingStats && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Booking Statistics</h3>
          <div className="grid grid-cols-4 text-center border rounded-lg overflow-hidden">
            <div className="p-4 border-r">
              <p className="text-xs text-gray-500">Total Bookings</p>
              <p className="text-xl font-semibold">{user.bookingStats.total}</p>
            </div>
            <div className="p-4 border-r">
              <p className="text-xs text-gray-500">Total Spent</p>
              <p className="text-xl font-semibold">${user.bookingStats.totalSpent}</p>
            </div>
            <div className="p-4 border-r">
              <p className="text-xs text-gray-500">Cancelled</p>
              <p className="text-xl font-semibold">{user.bookingStats.cancelled}</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500">Avg Booking</p>
              <p className="text-xl font-semibold">${user.bookingStats.avgBooking}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Bookings */}
      {user.recentBookings && user.recentBookings.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Booking ID</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Route</th>
                <th className="p-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {user.recentBookings.map((bk) => (
                <tr key={bk.id} className="border-t">
                  <td className="p-2">{bk.id}</td>
                  <td className="p-2">{bk.date}</td>
                  <td className="p-2">{bk.route}</td>
                  <td className="p-2">${bk.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate("/admin/users")}
          className="px-6 py-2 border rounded hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}