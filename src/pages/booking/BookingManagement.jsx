import { useState } from "react";

export default function BookingManagement() {
  const [filters] = useState({
    status: "Confirmed",
    route: "JFK → LHR",
  });

  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const TABLE_DATA = [
    {
      id: "BK-10245",
      customer: "John Smith",
      email: "john.smith@email.com",
      route: "JFK → LHR",
      date: "Jan 15, 2026",
      amount: "$850",
      status: "Confirmed"
    },
    {
      id: "BK-10246",
      customer: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      route: "LAX → NRT",
      date: "Jan 16, 2026",
      amount: "$1,200",
      status: "Pending"
    },
    {
      id: "BK-10247",
      customer: "Mike Chen",
      email: "mike.chen@email.com",
      route: "SFO → CDG",
      date: "Jan 17, 2026",
      amount: "$920",
      status: "Confirmed"
    },
    {
      id: "BK-10248",
      customer: "Emma Wilson",
      email: "emma.wilson@email.com",
      route: "MIA → MAD",
      date: "Jan 18, 2026",
      amount: "$780",
      status: "Cancelled"
    },
    {
      id: "BK-10249",
      customer: "David Lee",
      email: "david.lee@email.com",
      route: "ORD → FCO",
      date: "Jan 19, 2026",
      amount: "$895",
      status: "Confirmed"
    },
    {
      id: "BK-10250",
      customer: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      route: "SEA → AMS",
      date: "Jan 20, 2026",
      amount: "$975",
      status: "Pending"
    },
    {
      id: "BK-10251",
      customer: "Robert Taylor",
      email: "robert.taylor@email.com",
      route: "BOS → BCN",
      date: "Jan 21, 2026",
      amount: "$835",
      status: "Confirmed"
    },
    {
      id: "BK-10252",
      customer: "Maria Garcia",
      email: "maria.garcia@email.com",
      route: "DFW → LIS",
      date: "Jan 22, 2026",
      amount: "$795",
      status: "Pending"
    }
  ];

  const handleView = (data) => {
    setSelectedBooking({
      ...data,
      phone: "+1 (555) 123-4567",
      passengers: 1,
      seat: "12A",
      travelClass: "Economy",
      paymentStatus: "Paid",
    });
    setShowView(true);
  };

  const handleEdit = (data) => {
    setSelectedBooking({
      ...data,
      phone: "+1 (555) 123-4567",
      passengers: 1,
      seat: "12A",
      travelClass: "Economy",
      paymentStatus: "Paid",
    });
    setShowEdit(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F7F7] flex text-sm">
      <div className="w-56 bg-white border-r"></div>

      <div className="flex-1 flex flex-col p-8 gap-6">
        <div className="flex items-center justify-end mb-6" />

        {/* FILTER PANEL */}
        <div className="bg-white border rounded-lg p-5 flex flex-col gap-4 shadow-sm">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-gray-600 block mb-1">Search Bookings</label>
              <input type="text" placeholder="Booking ID, Customer name, Email..." className="border rounded px-3 py-2 w-full outline-none bg-white" />
            </div>

            <div>
              <label className="text-gray-600 block mb-1">Status</label>
              <select className="border rounded px-3 py-2 w-full outline-none bg-white">
                <option>All Status</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div>
              <label className="text-gray-600 block mb-1">Route</label>
              <select className="border rounded px-3 py-2 w-full outline-none bg-white">
                <option>All Routes</option>
                <option>JFK → LHR</option>
                <option>LAX → NRT</option>
                <option>SFO → CDG</option>
                <option>MIA → MAD</option>
              </select>
            </div>

            <div>
              <label className="text-gray-600 block mb-1">Date Range</label>
              <select className="border rounded px-3 py-2 w-full outline-none bg-white">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>This Year</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-4 py-2 bg-gray-200 text-black rounded text-sm border shadow-sm">
              Apply Filters
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium">Active Filters:</span>
            <span className="flex items-center gap-1 rounded bg-gray-100 border px-2 py-1">
              Status: {filters.status} <button className="text-xs">×</button>
            </span>
            <span className="flex items-center gap-1 rounded bg-gray-100 border px-2 py-1">
              Route: {filters.route} <button className="text-xs">×</button>
            </span>
            <button className="text-xs text-blue-600 hover:underline">Clear All</button>
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-semibold text-sm">All Bookings</span>
            <span className="text-xs text-gray-500">Showing <b>248</b> of <b>12,450</b> bookings</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs">Sort by:</span>
            <select className="border rounded px-2 py-1 bg-white outline-none">
              <option>Most Recent</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white border rounded-lg shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 w-10"></th>
                <th className="p-3 text-left">Booking ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Route</th>
                <th className="p-3 text-left">Travel Date</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {TABLE_DATA.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3"><input type="checkbox" /></td>
                  <td className="p-3">{row.id}</td>
                  <td className="p-3">{row.customer}</td>
                  <td className="p-3">{row.email}</td>
                  <td className="p-3">{row.route}</td>
                  <td className="p-3">{row.date}</td>
                  <td className="p-3 font-medium">{row.amount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded border ${
                      row.status === "Confirmed"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : row.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                        : "bg-red-100 text-red-700 border-red-200"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleView(row)} className="px-2 py-1 border rounded text-xs hover:bg-gray-50">View</button>
                    <button onClick={() => handleEdit(row)} className="px-2 py-1 border rounded text-xs hover:bg-gray-50">Edit</button>
                    <button className="px-2 py-1 border rounded text-xs hover:bg-gray-50">...</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center gap-1 px-4 py-3 border-t justify-end">
            <button className="border rounded px-2 py-1 hover:bg-gray-50">{`<`}</button>
            <button className="bg-black text-white px-3 py-1 rounded">1</button>
            <button className="border rounded px-3 py-1 hover:bg-gray-50">2</button>
            <button className="border rounded px-3 py-1 hover:bg-gray-50">3</button>
            <span className="px-2">...</span>
            <button className="border rounded px-3 py-1 hover:bg-gray-50">31</button>
            <button className="border rounded px-2 py-1 hover:bg-gray-50">{`>`}</button>
          </div>
        </div>
      </div>

      {/* VIEW MODAL - REPLACED */}
      {showView && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-6 z-50 overflow-y-auto">
          <div className="bg-white w-[900px] rounded-lg shadow-lg">

            {/* HEADER */}
            <div className="flex justify-between items-start p-6 border-b">
              <div className="flex flex-col">
                <span className="text-xl font-semibold">{selectedBooking.id}</span>
                <span className="text-xs text-gray-500">Booked on Dec 20, 2025</span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-xs rounded border ${
                    selectedBooking.status === "Confirmed"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : selectedBooking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                      : "bg-red-100 text-red-700 border-red-200"
                  }`}
                >
                  {selectedBooking.status}
                </span>
                <button onClick={() => setShowView(false)} className="text-lg font-bold">×</button>
              </div>
            </div>

            <div className="p-6 space-y-8 text-sm">

              {/* FLIGHT SECTION */}
              <section className="border p-5 rounded-md">
                <h3 className="font-semibold mb-4 text-base">Flight Information</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-24">

                  <div>
                    <p className="text-xs text-gray-600">Flight Number</p>
                    <p className="font-medium">AA 101</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Travel Class</p>
                    <p className="font-medium">{selectedBooking.travelClass}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Origin</p>
                    <p className="font-medium">{selectedBooking.route.split(" → ")[0]}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Destination</p>
                    <p className="font-medium">{selectedBooking.route.split(" → ")[1]}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Departure Time</p>
                    <p className="font-medium">9:30 AM</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Arrival Time</p>
                    <p className="font-medium">9:45 PM</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Travel Date</p>
                    <p className="font-medium">{selectedBooking.date}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Seat Numbers</p>
                    <p className="font-medium">{selectedBooking.seat}</p>
                  </div>
                </div>
              </section>

              {/* PASSENGER SECTION */}
              <section className="border p-5 rounded-md">
                <h3 className="font-semibold mb-4 text-base">Passenger Information</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-24">

                  <div>
                    <p className="text-xs text-gray-600">Passenger Name</p>
                    <p className="font-medium">{selectedBooking.customer}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Number of Passengers</p>
                    <p className="font-medium">{selectedBooking.passengers}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="font-medium">{selectedBooking.email}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="font-medium">{selectedBooking.phone}</p>
                  </div>
                </div>
              </section>

              {/* PAYMENT SECTION */}
              <section className="border p-5 rounded-md">
                <h3 className="font-semibold mb-4 text-base">Payment & Billing</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-24">

                  <div>
                    <p className="text-xs text-gray-600">Amount</p>
                    <p className="font-medium">{selectedBooking.amount}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Payment Status</p>
                    <p className="font-medium">{selectedBooking.paymentStatus}</p>
                  </div>
                </div>
              </section>

            </div>

            <div className="p-6 border-t flex justify-end">
              <button onClick={() => setShowView(false)} className="px-4 py-2 border rounded">
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEdit && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-6 z-50">
          <div className="bg-white w-[900px] rounded-lg shadow-lg max-height-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-lg font-semibold">Edit Booking</h2>
                <p className="text-xs text-gray-500">
                  Update booking information - {selectedBooking.id}
                </p>
              </div>
              <button onClick={() => setShowEdit(false)} className="text-lg font-bold">×</button>
            </div>

            <div className="p-6 space-y-6">
              <section>
                <h3 className="font-semibold mb-2">Passenger Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                    <input className="border rounded px-3 py-2 w-full" defaultValue={selectedBooking.customer} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                    <input className="border rounded px-3 py-2 w-full" defaultValue={selectedBooking.email} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                    <input className="border rounded px-3 py-2 w-full" defaultValue={selectedBooking.phone} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Passengers</label>
                    <input type="number" className="border rounded px-3 py-2 w-full" defaultValue={selectedBooking.passengers} />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-semibold mb-2">Flight Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Route</label>
                    <input className="border rounded px-3 py-2 w-full" defaultValue={selectedBooking.route} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Travel Class</label>
                    <input className="border rounded px-3 py-2 w-full" defaultValue={selectedBooking.travelClass} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Travel Date</label>
                    <input className="border rounded px-3 py-2 w-full" defaultValue={selectedBooking.date} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Seat Number</label>
                    <input className="border rounded px-3 py-2 w-full" defaultValue={selectedBooking.seat} />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-semibold mb-2">Booking Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Status</label>
                    <select className="border rounded px-3 py-2 w-full" defaultValue={selectedBooking.status}>
                      <option>Confirmed</option>
                      <option>Pending</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Payment Status</label>
                    <select className="border rounded px-3 py-2 w-full" defaultValue={selectedBooking.paymentStatus}>
                      <option>Paid</option>
                      <option>Pending</option>
                      <option>Refunded</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>

            <div className="flex justify-end gap-2 p-6 border-t">
              <button onClick={() => setShowEdit(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button className="px-4 py-2 bg-black text-white rounded">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
