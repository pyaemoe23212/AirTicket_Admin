// pages/user/UserManagement.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUserById } from "../../service/api";

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        if (mounted) {
          setUsers(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchUsers();
    return () => (mounted = false);
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Delete this user? This action cannot be undone.")) return;

    try {
      await deleteUserById(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      alert("User deleted successfully");
    } catch (err) {
      alert("Failed to delete user: " + err.message);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading users...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="flex-1 p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div>
        
        <p className="text-xs text-gray-500">Manage user accounts and permissions</p>
      </div>

      {/* Filters */}
      <div className="border rounded bg-white p-4">
        <div className="grid grid-cols-5 gap-4 items-end">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Search Bookings</label>
            <input
              
              placeholder="Booking ID, Customer name, Email..."
              className="border rounded px-3 py-2 text-sm w-full"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Status</label>
            <select className="border rounded px-3 py-2 text-sm w-full">
              <option>Select Status</option>
              <option>Active</option>
              <option>Suspended</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Last Active</label>
            <select className="border rounded px-3 py-2 text-sm w-full">
              <option>Select time range</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Registration Date</label>
            <select className="border rounded px-3 py-2 text-sm w-full">
              <option>Select date range</option>
            </select>
          </div>

          <button className="bg-gray-800 hover:bg-black text-white text-sm px-4 py-2 rounded">
            Apply Filters
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs mt-3 text-gray-500">
          <span>Active Filters:</span>
          <span className="border rounded px-2 py-0.5">Status: Active</span>
          <button className="underline">Clear All</button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded bg-white">
        <div className="px-4 py-3 border-b">
          <h2 className="text-sm font-medium">All Users</h2>
          <p className="text-xs text-gray-500">
            Showing {users.length} of {users.length} users
          </p>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 border-b">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Registration Date</th>
              <th className="p-3 text-left">Last Active</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300" />
                  {user.name}
                </td>

                <td className="p-3 text-gray-600">{user.email}</td>
                <td className="p-3 text-gray-600">{user.registration}</td>
                <td className="p-3 text-gray-600">{user.lastActive}</td>

                <td className="p-3">
                  <span className="border rounded px-2 py-0.5 text-xs">
                    {user.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                    className="border px-2 py-1 rounded text-xs hover:bg-gray-100"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                    className="border px-2 py-1 rounded text-xs hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="border px-2 py-1 rounded text-xs text-red-500 hover:bg-red-50"
                    title="Delete"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-3 text-xs text-gray-500 border-t">
          <span>Showing 1–{users.length} of {users.length} results</span>
          <div className="flex gap-1">
            <button className="border px-2 py-1 rounded">&lt;</button>
            <button className="border px-2 py-1 rounded bg-gray-800 text-white">1</button>
            <button className="border px-2 py-1 rounded">2</button>
            <button className="border px-2 py-1 rounded">3</button>
            <button className="border px-2 py-1 rounded">...</button>
            <button className="border px-2 py-1 rounded">6</button>
            <button className="border px-2 py-1 rounded">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
