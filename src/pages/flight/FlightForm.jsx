// pages/flight/FlightForm.jsx
import { useNavigate } from "react-router-dom";

export default function FlightForm() {
  const navigate = useNavigate();

  return (
    <div className=" mx-auto bg-white rounded-lg shadow-sm p-8">
      {/* Basic Flight Information */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Basic Flight Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
            <input
              type="text"
              placeholder="e.g. AA101"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Airline</label>
            <input
              type="text"
              placeholder="e.g. American Airlines"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aircraft Type</label>
            <input
              type="text"
              placeholder="e.g. Boeing 737"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flight Status</label>
            <select className="w-full px-4 py-2 border rounded-md">
              <option>Scheduled</option>
              <option>Active</option>
              <option>Cancelled</option>
              <option>Delayed</option>
            </select>
          </div>
        </div>
      </section>

      {/* Route Information */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Route Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Origin Airport</label>
            <input
              type="text"
              placeholder="Search (e.g. JFK)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination Airport</label>
            <input
              type="text"
              placeholder="Search (e.g. LAX)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
            <input type="number" placeholder="e.g. 4000" className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flight Duration</label>
            <input type="text" placeholder="e.g. 5h 30m" className="w-full px-4 py-2 border rounded-md" />
          </div>
        </div>
      </section>

      {/* Schedule Information */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Schedule Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
            <input type="date" className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
            <input type="time" className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Date</label>
            <input type="date" className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
            <input type="time" className="w-full px-4 py-2 border rounded-md" />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Flight Frequency</label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input type="radio" name="frequency" defaultChecked className="mr-2" />
              One-time
            </label>
            <label className="flex items-center">
              <input type="radio" name="frequency" className="mr-2" />
              Daily
            </label>
            <label className="flex items-center">
              <input type="radio" name="frequency" className="mr-2" />
              Weekly
            </label>
            <label className="flex items-center">
              <input type="radio" name="frequency" className="mr-2" />
              Custom
            </label>
          </div>
        </div>
      </section>

      {/* Capacity & Pricing */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Capacity & Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Capacity</label>
            <input type="number" placeholder="e.g. 180" className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Seats</label>
            <input type="number" placeholder="e.g. 180" className="w-full px-4 py-2 border rounded-md" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Economy</label>
            <input type="number" defaultValue={120} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Premium Eco</label>
            <input type="number" defaultValue={30} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business</label>
            <input type="number" defaultValue={20} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Class</label>
            <input type="number" defaultValue={10} className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (Economy)</label>
            <input type="number" step="0.01" placeholder="0.00" className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select className="w-full px-4 py-2 border rounded-md">
              <option>USD</option>
              <option>EUR</option>
              <option>THB</option>
            </select>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gate Number (Optional)</label>
            <input type="text" placeholder="e.g. A22" className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Terminal (Optional)</label>
            <input type="text" placeholder="e.g. Terminal 3" className="w-full px-4 py-2 border rounded-md" />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
          <textarea
            rows={4}
            placeholder="Add additional flight information or special notes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </section>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-12">
        <button
          onClick={() => navigate("/admin/flights")}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Create Flight
        </button>
      </div>
    </div>
  );
}