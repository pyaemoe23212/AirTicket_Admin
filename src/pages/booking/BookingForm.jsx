// pages/booking/BookingForm.jsx
import { useNavigate } from "react-router-dom";

export default function BookingForm() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto bg-white rounded-lg shadow-sm p-8">
      {/* Customer Information */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="customer@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </section>

      {/* Flight Details */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Flight Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From (Origin airport or city)</label>
            <input
              type="text"
              placeholder="Search airport or city"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To (Destination airport or city)</label>
            <input
              type="text"
              placeholder="Search airport or city"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Date (Optional)</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Trip Type</label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input type="radio" name="tripType" defaultChecked className="mr-2" />
              One Way
            </label>
            <label className="flex items-center">
              <input type="radio" name="tripType" className="mr-2" />
              Round Trip
            </label>
            <label className="flex items-center">
              <input type="radio" name="tripType" className="mr-2" />
              Multi-City
            </label>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
            <input type="number" min="1" defaultValue={1} className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
            <input type="number" min="0" defaultValue={0} className="w-full px-4 py-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select className="w-full px-4 py-2 border rounded-md">
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>
        </div>
      </section>

      {/* Booking Details */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Booking Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
            <input
              type="text"
              placeholder="e.g. AA1234"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
            <input
              type="text"
              placeholder="$0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full px-4 py-2 border rounded-md">
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <input type="text" className="w-full px-4 py-2 border rounded-md" placeholder="e.g. Credit Card" />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
          <textarea
            rows={4}
            placeholder="Add any special requests or notes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </section>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-12">
        <button
          onClick={() => navigate("/admin/bookings")}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Create Booking
        </button>
      </div>
    </div>
  );
}