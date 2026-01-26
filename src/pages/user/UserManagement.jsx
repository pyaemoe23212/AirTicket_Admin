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

    return () => {
      mounted = false;
    };
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

  const getStatusStyle = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  if (loading) return <div className="p-6 text-center">Loading users...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Filter Box */}
      <div className="border rounded p-4 bg-white">
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Search Users</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Name, Email, ID..."
                className="border rounded pl-8 pr-3 py-2 text-sm w-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Status</label>
            <select className="border rounded px-3 py-2 text-sm w-full">
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Registration Date</label>
            <select className="border rounded px-3 py-2 text-sm w-full">
              <option>All Dates</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Last Active</label>
            <select className="border rounded px-3 py-2 text-sm w-full">
              <option>Last Active</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded text-sm">Filter</button>
        </div>
      </div>

      {/* User Table */}
      <div className="border rounded bg-white overflow-hidden">
        <div className="px-4 py-2 text-sm border-b flex justify-between items-center">
          <div>
            <span>All Users</span>
            <p className="text-xs text-gray-500 mt-1">Showing {users.length} of {users.length} users</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span>Sort by:</span>
            <select className="border rounded px-2 py-1">
              <option>Last Active</option>
              <option>Registration Date</option>
            </select>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 border-b w-10"></th>
              <th className="p-2 border-b text-left">Name</th>
              <th className="p-2 border-b text-left">Email</th>
              <th className="p-2 border-b text-left">Registration Date</th>
              <th className="p-2 border-b text-left">Last Active</th>
              <th className="p-2 border-b text-left">Status</th>
              <th className="p-2 border-b text-left w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-2 border-b text-center">
                  <input type="checkbox" />
                </td>
                <td className="p-2 border-b">{user.name}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">{user.registration}</td>
                <td className="p-2 border-b">{user.lastActive}</td>
                <td className="p-2 border-b">
                  <span
                    className={`px-2 py-0.5 rounded text-xs border ${getStatusStyle(user.status)}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-2 border-b flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                    className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                    className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-xs border border-red-300 text-red-600 px-2 py-1 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-3 text-xs">
          <span>Showing 1–{users.length} of {users.length} results</span>
          <div className="flex gap-1">
            <button className="border rounded px-2 py-1">&lt;</button>
            <button className="border rounded px-2 py-1 bg-black text-white">1</button>
            <button className="border rounded px-2 py-1">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}