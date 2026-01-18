export default function StaffManagement() {
  const roles = [
    { id: 1, title: "Super Admin", desc: "Full Access", count: 3 },
    { id: 2, title: "Admin", desc: "High-level Access", count: 8 },
    { id: 3, title: "Manager", desc: "Operational Access", count: 15 },
    { id: 4, title: "Supervisor", desc: "Store Access", count: 22 },
    { id: 5, title: "Agent", desc: "Limited Access", count: 78 },
    { id: 6, title: "Support", desc: "Customer Support", count: 21 },
  ];

  const staff = [
    { id: 1, name: "Sarah Johnson", email: "sarah.johnson@airline.com", role: "Admin", registration: "Jan 15, 2024", lastActive: "2 hours ago", status: "Active" },
    { id: 2, name: "Michael Chen", email: "michael.chen@airline.com", role: "Manager", registration: "Feb 3, 2024", lastActive: "5 minutes ago", status: "Active" },
    { id: 3, name: "Emily Rodriguez", email: "emily.r@airline.com", role: "Admin", registration: "Mar 12, 2024", lastActive: "1 day ago", status: "Active" },
  ];

  return (
    <div className="flex-1 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Staff Management</h2>
          <p className="text-xs text-gray-500">Manage staff members, roles, and permissions</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded text-sm">+ Add Staff</button>
      </div>

      {/* ROLES */}
      <div className="border rounded bg-white p-4 mb-6">
        <h3 className="font-medium mb-3 text-sm">Roles & Permissions</h3>

        <div className="space-y-3">
          {roles.map(role => (
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

      {/* STAFF TABLE */}
      <div className="border rounded bg-white">
        <div className="px-4 py-3 border-b text-sm">
          <p className="font-medium">All Staff Members</p>
          <p className="text-xs text-gray-500">Total: 147 active members</p>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 border-b w-10"></th>
              <th className="p-2 border-b text-left">Name</th>
              <th className="p-2 border-b text-left">Email</th>
              <th className="p-2 border-b text-left">Role</th>
              <th className="p-2 border-b text-left">Registration Date</th>
              <th className="p-2 border-b text-left">Last Active</th>
              <th className="p-2 border-b text-left">Status</th>
              <th className="p-2 border-b text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {staff.map(member => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="p-2 border-b text-center"><input type="checkbox" /></td>
                <td className="p-2 border-b">{member.name}</td>
                <td className="p-2 border-b">{member.email}</td>
                <td className="p-2 border-b">
                  <span className="border px-2 py-0.5 rounded text-xs">{member.role}</span>
                </td>
                <td className="p-2 border-b">{member.registration}</td>
                <td className="p-2 border-b">{member.lastActive}</td>
                <td className="p-2 border-b">
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">{member.status}</span>
                </td>
                <td className="p-2 border-b">
                  <button className="text-xs border px-2 py-1 rounded mr-1">View</button>
                  <button className="text-xs border px-2 py-1 rounded">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
