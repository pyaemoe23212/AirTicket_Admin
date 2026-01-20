import { useState } from "react";
export default function FlightManagement() {
   const [openCurrencyModal, setOpenCurrencyModal] = useState(false);
  const [rate, setRate] = useState("1.12");

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        
        {/* RIGHT ACTION BUTTONS */}
        <div className="flex items-center gap-2 text-xs">
          <button className="border px-3 py-1.5 rounded" onClick={() => setOpenCurrencyModal(true)}>Currency Exchange</button>
          <button className="border px-3 py-1.5 rounded">Ticket Price</button>

        </div>
      </div>

    {/* FILTERS BOX */}
    <div className="bg-white border rounded p-4 mb-6">

        {/* LABEL ROW */}
        <div className="grid grid-cols-5 gap-4 text-xs font-medium text-gray-600 mb-1">
          <span>Search Flights</span>
          <span>Status</span>
          <span>Origin</span>
          <span>Destination</span>
          <span>Departure Date</span>
        </div>

        {/* INPUT ROW */}
        <div className="grid grid-cols-5 gap-4 mb-3">
          <input
            className="border rounded p-2 text-sm"
            placeholder="Flight No., Route, Airline..."
          />

          <select className="border rounded p-2 text-sm">
            <option>All Status</option>
            <option>Scheduled</option>
            <option>Delayed</option>
            <option>Cancelled</option>
            <option>In Progress</option>
          </select>

          <select className="border rounded p-2 text-sm">
            <option>All Airports</option>
            <option>JFK</option>
            <option>LAX</option>
            <option>SFO</option>
            <option>MIA</option>
            <option>ORD</option>
            <option>SEA</option>
            <option>BOS</option>
            <option>DFW</option>
          </select>

          <select className="border rounded p-2 text-sm">
            <option>All Airports</option>
            <option>LHR</option>
            <option>NRT</option>
            <option>CDG</option>
            <option>MAD</option>
            <option>FCO</option>
            <option>AMS</option>
            <option>BCN</option>
            <option>LIS</option>
          </select>

          <select className="border rounded p-2 text-sm">
            <option>All Dates</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>

        <button className="bg-gray-800 text-white px-4 py-2 text-sm rounded mb-2">
          Filter
        </button>

        {/* ACTIVE FILTERS */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-medium">Active Filters:</span>

          <div className="bg-gray-100 border rounded px-2 py-0.5 text-xs flex items-center gap-1">
            Status: Scheduled <span className="cursor-pointer text-gray-400">✕</span>
          </div>

          <div className="bg-gray-100 border rounded px-2 py-0.5 text-xs flex items-center gap-1">
            Origin: JFK <span className="cursor-pointer text-gray-400">✕</span>
          </div>

          <div className="bg-gray-100 border rounded px-2 py-0.5 text-xs flex items-center gap-1">
            All Flights <span className="cursor-pointer text-gray-400">✕</span>
          </div>

          <button className="text-xs text-blue-600">Clear All</button>
        </div>
      </div>

      {/* TABLE HEADER */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs text-gray-500">
          Showing 152 of 856 flights
        </p>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sort by:</span>
          <select className="border rounded p-1 text-xs">
            <option>Departure Time</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-2 text-left text-xs font-medium"></th>
              <th className="p-2 text-left text-xs font-medium">Flight No.</th>
              <th className="p-2 text-left text-xs font-medium">Airline</th>
              <th className="p-2 text-left text-xs font-medium">Route</th>
              <th className="p-2 text-left text-xs font-medium">Departure</th>
              <th className="p-2 text-left text-xs font-medium">Arrival</th>
              <th className="p-2 text-left text-xs font-medium">Duration</th>
              <th className="p-2 text-left text-xs font-medium">Capacity</th>
              <th className="p-2 text-left text-xs font-medium">Price</th>
              <th className="p-2 text-left text-xs font-medium">Status</th>
              <th className="p-2 text-left text-xs font-medium">Actions</th>
            </tr>
          </thead>

           <tbody>

            <tr className="border-b">
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2">AA 101</td>
              <td className="p-2">American</td>
              <td className="p-2">JFK → LHR</td>
              <td className="p-2">Jan 15, 9:30 AM</td>
              <td className="p-2">Jan 15, 9:45 PM</td>
              <td className="p-2">7h 15m</td>
              <td className="p-2">180/220</td>
              <td className="p-2">$850</td>
              <td className="p-2"><span className="border px-2 rounded bg-gray-200 text-xs">Scheduled</span></td>
              <td className="p-2 flex space-x-1">
                <button className="border rounded px-2 text-xs">View</button>
                <button className="border rounded px-2 text-xs">Edit</button>
                <button className="border rounded px-2 text-xs">...</button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2">UA 875</td>
              <td className="p-2">United</td>
              <td className="p-2">LAX → NRT</td>
              <td className="p-2">Jan 16, 11:00 AM</td>
              <td className="p-2">Jan 17, 3:15 PM</td>
              <td className="p-2">11h 15m</td>
              <td className="p-2">245/260</td>
              <td className="p-2">$1,200</td>
              <td className="p-2"><span className="border px-2 rounded bg-gray-200 text-xs">Scheduled</span></td>
              <td className="p-2 flex space-x-1">
                <button className="border rounded px-2 text-xs">View</button>
                <button className="border rounded px-2 text-xs">Edit</button>
                <button className="border rounded px-2 text-xs">...</button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2">DL 456</td>
              <td className="p-2">Delta</td>
              <td className="p-2">SFO → CDG</td>
              <td className="p-2">Jan 17, 6:45 PM</td>
              <td className="p-2">Jan 18, 2:30 PM</td>
              <td className="p-2">10h 45m</td>
              <td className="p-2">168/200</td>
              <td className="p-2">$920</td>
              <td className="p-2"><span className="border px-2 rounded bg-gray-200 text-xs">Delayed</span></td>
              <td className="p-2 flex space-x-1">
                <button className="border rounded px-2 text-xs">View</button>
                <button className="border rounded px-2 text-xs">Edit</button>
                <button className="border rounded px-2 text-xs">...</button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2">BA 178</td>
              <td className="p-2">British</td>
              <td className="p-2">MIA → MAD</td>
              <td className="p-2">Jan 18, 8:15 AM</td>
              <td className="p-2">Jan 18, 10:30 PM</td>
              <td className="p-2">8h 15m</td>
              <td className="p-2">195/240</td>
              <td className="p-2">$780</td>
              <td className="p-2"><span className="border px-2 rounded bg-gray-200 text-xs">Scheduled</span></td>
              <td className="p-2 flex space-x-1">
                <button className="border rounded px-2 text-xs">View</button>
                <button className="border rounded px-2 text-xs">Edit</button>
                <button className="border rounded px-2 text-xs">...</button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2">LH 410</td>
              <td className="p-2">Lufthansa</td>
              <td className="p-2">ORD → FCO</td>
              <td className="p-2">Jan 19, 5:20 PM</td>
              <td className="p-2">Jan 20, 9:45 AM</td>
              <td className="p-2">9h 25m</td>
              <td className="p-2">142/180</td>
              <td className="p-2">$995</td>
              <td className="p-2"><span className="border px-2 rounded bg-gray-200 text-xs">In Progress</span></td>
              <td className="p-2 flex space-x-1">
                <button className="border rounded px-2 text-xs">View</button>
                <button className="border rounded px-2 text-xs">Edit</button>
                <button className="border rounded px-2 text-xs">...</button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2">AF 334</td>
              <td className="p-2">Air France</td>
              <td className="p-2">SEA → AMS</td>
              <td className="p-2">Jan 20, 3:40 PM</td>
              <td className="p-2">Jan 21, 11:15 AM</td>
              <td className="p-2">9h 35m</td>
              <td className="p-2">210/260</td>
              <td className="p-2">$975</td>
              <td className="p-2"><span className="border px-2 rounded bg-gray-200 text-xs">Scheduled</span></td>
              <td className="p-2 flex space-x-1">
                <button className="border rounded px-2 text-xs">View</button>
                <button className="border rounded px-2 text-xs">Edit</button>
                <button className="border rounded px-2 text-xs">...</button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2">IB 6251</td>
              <td className="p-2">Iberia</td>
              <td className="p-2">BOS → BCN</td>
              <td className="p-2">Jan 21, 7:00 PM</td>
              <td className="p-2">Jan 22, 8:30 AM</td>
              <td className="p-2">7h 30m</td>
              <td className="p-2">156/190</td>
              <td className="p-2">$835</td>
              <td className="p-2"><span className="border px-2 rounded bg-gray-200 text-xs">Scheduled</span></td>
              <td className="p-2 flex space-x-1">
                <button className="border rounded px-2 text-xs">View</button>
                <button className="border rounded px-2 text-xs">Edit</button>
                <button className="border rounded px-2 text-xs">...</button>
              </td>
            </tr>

            <tr>
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2">TP 218</td>
              <td className="p-2">TAP</td>
              <td className="p-2">DFW → LIS</td>
              <td className="p-2">Jan 22, 4:25 PM</td>
              <td className="p-2">Jan 23, 7:10 AM</td>
              <td className="p-2">8h 45m</td>
              <td className="p-2">172/210</td>
              <td className="p-2">$795</td>
              <td className="p-2"><span className="border px-2 rounded bg-gray-200 text-xs">Cancelled</span></td>
              <td className="p-2 flex space-x-1">
                <button className="border rounded px-2 text-xs">View</button>
                <button className="border rounded px-2 text-xs">Edit</button>
                <button className="border rounded px-2 text-xs">...</button>
              </td>
            </tr>

          </tbody>

        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-3 text-xs">
          <span>Showing 1-8 of 152 results</span>
          <div className="flex items-center gap-1">
            <button className="border px-2 py-1 rounded">&lt;</button>
            <button className="border px-2 py-1 rounded bg-black text-white">1</button>
            <button className="border px-2 py-1 rounded">2</button>
            <button className="border px-2 py-1 rounded">3</button>
            <span>...</span>
            <button className="border px-2 py-1 rounded">19</button>
            <button className="border px-2 py-1 rounded">&gt;</button>
          </div>
        </div>
      </div>

       {/* =================== CURRENCY MODAL =================== */}
      {openCurrencyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[800px] rounded shadow-lg relative">
            <div className="flex justify-between items-start p-6 border-b">
              <div>
                <h2 className="text-xl font-semibold">Currency Exchange Management</h2>
                <p className="text-gray-500 text-sm">
                  Update exchange rates for pricing calculations
                </p>
              </div>
              <button
                onClick={() => setOpenCurrencyModal(false)}
                className="text-xl px-2"
              >
                ✖
              </button>
            </div>

            <div className="p-6">
              <h3 className="font-medium mb-3">Current Exchange Rates</h3>

              <table className="w-full border">
                <thead className="bg-gray-100 text-sm text-gray-600">
                  <tr>
                    <th className="p-3 text-left">Currency</th>
                    <th className="p-3 text-left">Current Rate (to USD)</th>
                    <th className="p-3 text-left">New Rate</th>
                    <th className="p-3 text-left">Last Updated</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t">
                    <td className="p-3">EUR</td>
                    <td className="p-3">1.12</td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="border p-2 w-24"
                      />
                    </td>
                    <td className="p-3 text-gray-500 text-sm">2 hours ago</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setOpenCurrencyModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-black text-white rounded">
                  Update Rates & Continue
                </button>
                 </div>
            </div>
          </div>
    </div>
      )}
    </div>  
  );
}
