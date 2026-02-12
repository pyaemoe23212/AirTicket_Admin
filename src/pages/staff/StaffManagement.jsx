import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockRoles, getAllStaff, deleteStaffById } from "../../service/api";

export default function StaffManagement() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchStaff = async () => {
      try {
        const data = await getAllStaff();
        if (mounted) {
          setStaff(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    fetchStaff();
    return () => { mounted = false; };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this staff member?")) return;

    try {
      await deleteStaffById(id);
      setStaff(prev => prev.filter(s => s.id !== id));
      alert("Staff member removed successfully");
    } catch (err) {
      alert("Failed to remove staff: " + err.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading staff members...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Manage staff members, roles, and permissions</p>
        </div>
        </div>
      {/* Roles & Permissions */}
      <div className="border rounded bg-white p-4 mb-6">
        <h3 className="font-medium mb-3 text-sm">Roles & Permissions</h3>

        <div className="space-y-3">
          {mockRoles.map(role => (
            <div key={role.id} className="flex items-center justify-between border rounded p-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border rounded"></div>
                <div>
                  <p className="text-sm font-medium">{role.title}</p>
                  <p className="text-xs text-gray-500">{role.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">{role.count}</p>
                <p className="text-xs text-gray-500">members</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">All Staff Members</h3>
              <p className="text-sm text-gray-500">Total: {staff.length} members</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-max">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left w-10"><input type="checkbox" /></th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Registration</th>
                <th className="p-4 text-left">Last Active</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staff.map(member => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="p-4 font-medium">{member.name}</td>
                  <td className="p-4 text-gray-600">{member.email}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100">
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{member.registration}</td>
                  <td className="p-4 text-gray-600">{member.lastActive}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        member.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/staff/${member.id}`)}
                        className="border border-gray-300 hover:bg-gray-100 px-3 py-1 text-xs rounded"
                      >
                        View
                      </button>
                      <button
                       onClick={() => navigate(`/admin/staff/${member.id}/edit`)}
                       className="border border-gray-300 hover:bg-gray-100 px-3 py-1 text-xs rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="border border-gray-300 hover:bg-gray-100 p-2 rounded"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}