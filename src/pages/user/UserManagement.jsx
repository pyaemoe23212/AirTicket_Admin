export default function UserManagement() {
  const users = [
    { id: 1, name: "Sarah Johnson", email: "sarah.johnson@airline.com", registration: "Jan 15, 2024", lastActive: "2 hours ago", status: "Active" },
    { id: 2, name: "Michael Chen", email: "michael.chen@airline.com", registration: "Feb 3, 2024", lastActive: "5 minutes ago", status: "Active" },
    { id: 3, name: "Emily Rodriguez", email: "emily.r@airline.com", registration: "Mar 12, 2024", lastActive: "1 day ago", status: "Active" },
    { id: 4, name: "David Park", email: "david.park@airline.com", registration: "Apr 7, 2024", lastActive: "3 days ago", status: "Suspended" },
    { id: 5, name: "Jessica Williams", email: "jessica.w@airline.com", registration: "May 19, 2024", lastActive: "12 hours ago", status: "Active" },
    { id: 6, name: "Robert Taylor", email: "robert.t@airline.com", registration: "Jun 2, 2024", lastActive: "6 hours ago", status: "Active" },
    { id: 7, name: "Amanda Lee", email: "amanda.lee@airline.com", registration: "Jun 29, 2024", lastActive: "1 hour ago", status: "Suspended" },
    { id: 8, name: "James Brown", email: "james.brown@airline.com", registration: "Jul 10, 2024", lastActive: "4 days ago", status: "Active" },
  ];

  return (
    <div className="flex-1 p-6">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>
        <p className="text-xs text-gray-500">Manage user accounts and permissions</p>
      </div>

      {/* FILTER BOX */}
      <div className="border rounded p-4 mb-5 bg-white">
        {/* FILTER ROW */}
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
            <option>Last 30 Days</option>
          </select>
            </div>

             <div className="flex flex-col">
    <label className="text-xs text-gray-500 mb-1">Last Active</label>
          <select className="border rounded px-3 py-2 text-sm w-full">
            <option>Last Active</option>
            <option>5 minutes ago</option>
            <option>1 hour ago</option>
            <option>1 day ago</option>
          </select>
            </div>

          <button className="px-4 py-2 bg-black text-white rounded text-sm">
            Filter
          </button>
        </div>

        {/* ACTIVE FILTER TAGS */}
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span>Active Filters:</span>
          <div className="border rounded-full px-2 py-1">Status: Active ✕</div>
          <button className="underline">Clear All</button>
        </div>
      </div>

      {/* USER TABLE */}
      <div className="border rounded bg-white">
        {/* TABLE HEADER */}
        <div className="px-4 py-2 text-sm border-b">
          <div className="flex justify-between items-center">
            <span>All Users</span>

            <div className="flex items-center text-xs gap-2">
              <span>Sort by:</span>
              <select className="border rounded px-2 py-1">
                <option>Last Active</option>
                <option>Registration Date</option>
                <option>Name</option>
              </select>
            </div>
          </div>

          {/* RESULT TEXT */}
          <p className="text-xs text-gray-500 mt-1">Showing 48 of 2,847 users</p>
        </div>

        {/* TABLE */}
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
                <td className="p-2 border-b text-center"><input type="checkbox" /></td>
                <td className="p-2 border-b">{user.name}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">{user.registration}</td>
                <td className="p-2 border-b">{user.lastActive}</td>
                <td className="p-2 border-b">
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-2 border-b">
                  <button className="text-xs border px-2 py-1 rounded mr-1">View</button>
                  <button className="text-xs border px-2 py-1 rounded">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-3 text-xs">
          <span>Showing 1–8 of 48 results</span>

          <div className="flex gap-1">
            <button className="border rounded px-2 py-1">&lt;</button>
            <button className="border rounded px-2 py-1 bg-black text-white">1</button>
            <button className="border rounded px-2 py-1">2</button>
            <button className="border rounded px-2 py-1">3</button>
            <button className="border rounded px-2 py-1">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
