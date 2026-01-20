import { useState } from "react";

export default function UserManagement() {
  const [editUser, setEditUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@airline.com",
      registration: "Jan 15, 2024",
      lastActive: "2 hours ago",
      status: "Active",
      type: "Business Traveler",
      phone: "+1 (555) 123-4567",
      preferredClass: "Business",
      bookingStats: { total: 12, totalSpent: 4580, cancelled: 2, avgBooking: 382 },
      recentBookings: [
        { id: "BK-101", date: "Jan 05, 2024", route: "NYC → LAX", amount: 420 },
        { id: "BK-102", date: "Dec 28, 2023", route: "LAX → SEA", amount: 260 },
        { id: "BK-103", date: "Dec 10, 2023", route: "SEA → MIA", amount: 390 },
      ],
    },
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
      {/* FILTER BOX */}
      <div className="border rounded p-4 mb-5 bg-white">
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Search Users</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
              <input type="text" placeholder="Name, Email, ID..." className="border rounded pl-8 pr-3 py-2 text-sm w-full" />
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

          <button className="px-4 py-2 bg-black text-white rounded text-sm">Filter</button>
        </div>

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
          <p className="text-xs text-gray-500 mt-1">Showing 48 of 2,847 users</p>
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
                <td className="p-2 border-b text-center"><input type="checkbox" /></td>
                <td className="p-2 border-b">{user.name}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">{user.registration}</td>
                <td className="p-2 border-b">{user.lastActive}</td>
                <td className="p-2 border-b">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-2 border-b">
                  <button className="text-xs border px-2 py-1 rounded mr-1" onClick={() => setViewUser(user)}>View</button>
                  <button className="text-xs border px-2 py-1 rounded" onClick={() => setEditUser(user)}>Edit</button>
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

      {/* ===== VIEW MODAL ===== */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-6 overflow-y-auto">
          <div className="bg-white w-[950px] rounded shadow-lg p-6">

            {/* header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Customer Details</h2>
                <p className="text-sm text-gray-500">View customer information and booking history</p>
              </div>
              <button className="text-gray-500 hover:text-black" onClick={() => setViewUser(null)}>✕</button>
            </div>

            <hr className="my-3 border-t border-gray-300" />

            {/* profile */}
            <div className="flex items-center gap-4 mb-3">
              <div className="w-16 h-16 rounded-full bg-gray-300"></div>
              <div>
                <p className="font-medium">{viewUser.name}</p>
                <p className="text-sm text-gray-500">{viewUser.email}</p>

                <div className="flex gap-2 mt-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      viewUser.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {viewUser.status}
                  </span>

                  <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                    {viewUser.type || "Standard User"}
                  </span>
                </div>
              </div>
            </div>

            <hr className="my-3 border-t border-gray-300" />

            {/* personal info */}
            <h3 className="text-sm font-semibold mb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-20 text-sm mb-6">
              <Info label="Customer ID" value={`USR-${viewUser.id}`} />
              <Info label="Email Address" value={viewUser.email} />
              <Info label="Phone Number" value={viewUser.phone || "+1 (555) 123-4567"} />
              <Info label="Preferred Class" value={viewUser.preferredClass || "Economy"} />
              <Info label="Registration Date" value={viewUser.registration} />
              <Info label="Last Active" value={viewUser.lastActive} />
            </div>

            {/* booking stats */}
            {viewUser.bookingStats && (
              <>
                <h3 className="text-sm font-semibold mb-2">Booking Statistics</h3>
                <div className="grid grid-cols-4 text-center border rounded-lg overflow-hidden text-sm mb-6">
                  <Stat label="Total Bookings" value={viewUser.bookingStats.total} />
                  <Stat label="Total Spent" value={`$${viewUser.bookingStats.totalSpent}`} />
                  <Stat label="Cancelled" value={viewUser.bookingStats.cancelled} />
                  <Stat label="Average Booking" value={`$${viewUser.bookingStats.avgBooking}`} />
                </div>
              </>
            )}

            {/* recent bookings */}
            {viewUser.recentBookings && (
              <>
                <h3 className="text-sm font-semibold mb-2">Recent Bookings</h3>
                <table className="w-full text-sm border mb-6">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Booking ID</th>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Route</th>
                      <th className="p-2 text-left">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewUser.recentBookings.map((bk) => (
                      <tr key={bk.id} className="border-t">
                        <td className="p-2">{bk.id}</td>
                        <td className="p-2">{bk.date}</td>
                        <td className="p-2">{bk.route}</td>
                        <td className="p-2">${bk.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            <div className="flex justify-end">
              <button className="border px-4 py-2 rounded text-sm" onClick={() => setViewUser(null)}>Close</button>
            </div>

          </div>
        </div>
      )}

      {/* ===== EDIT MODAL ===== */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-6 overflow-y-auto">
          <div className="bg-white w-[750px] rounded shadow-lg p-6">

            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Edit Customer</h2>
                <p className="text-sm text-gray-500">Update customer information and preferences</p>
              </div>
              <button className="text-gray-500 hover:text-black" onClick={() => setEditUser(null)}>✕</button>
            </div>

            <hr className="my-3 border-t border-gray-300" />

            <div className="mb-4">
              <h3 className="font-medium mb-3">Personal Information</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1">First Name</label>
                  <input className="border rounded px-3 py-2 text-sm" defaultValue={editUser.name.split(" ")[0]} />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1">Last Name</label>
                  <input className="border rounded px-3 py-2 text-sm" defaultValue={editUser.name.split(" ")[1] || ""} />
                </div>
              </div>

              <div className="flex flex-col mt-3">
                <label className="text-xs text-gray-600 mb-1">Email Address</label>
                <input className="border rounded px-3 py-2 text-sm w-full" defaultValue={editUser.email} />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1">Phone Number</label>
                  <input className="border rounded px-3 py-2 text-sm" placeholder="+1 (555) 123-4567" defaultValue={editUser.phone || ""} />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1">Account Status</label>
                  <input className="border rounded px-3 py-2 text-sm" defaultValue={editUser.status} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Travel Preferences</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1">Preferred Class</label>
                  <input className="border rounded px-3 py-2 text-sm" defaultValue={editUser.preferredClass || ""} />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1">Seat Preference</label>
                  <input className="border rounded px-3 py-2 text-sm" placeholder="Window / Aisle" />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1">Meal Preference</label>
                <input className="border rounded px-3 py-2 text-sm" placeholder="Vegetarian / Vegan / None" />
              </div>
            </div>

            <hr className="my-4 border-t border-gray-300" />

            <div className="flex justify-between">
              <button className="border px-4 py-2 rounded text-sm">Delete Account</button>
              <div className="flex gap-2">
                <button className="border px-4 py-2 rounded text-sm" onClick={() => setEditUser(null)}>Cancel</button>
                <button className="bg-black text-white px-4 py-2 rounded text-sm">Save Changes</button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p>{value}</p>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-4 border-r last:border-r-0">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-base font-semibold">{value}</p>
    </div>
  );
}
