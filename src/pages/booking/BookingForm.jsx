import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../service/api";

export default function BookingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    phone: "",
    route: "",
    flightNumber: "",
    travelDate: "",
    travelClass: "Economy",
    passengers: 1,
    amount: 0,
    status: "Pending",
    paymentStatus: "Pending",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "passengers" || name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newBooking = {
        customer: formData.customer,
        email: formData.email,
        phone: formData.phone,
        route: formData.route,
        flightNumber: formData.flightNumber,
        travelDate: formData.travelDate,
        travelClass: formData.travelClass,
        passengers: formData.passengers,
        amount: formData.amount,
        status: formData.status,
        paymentStatus: formData.paymentStatus,
      };

      await createBooking(newBooking);
      alert("Booking created successfully!");
      navigate("/admin/bookings");
    } catch (err) {
      setError(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold mb-2">New Booking</h2>
      <p className="text-gray-600 mb-8">Create a new flight booking reservation</p>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Customer Information */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address *</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
                placeholder="customer@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        </section>

        {/* Flight Details */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Flight Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">From → To *</label>
              <input
                name="route"
                value={formData.route}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
                placeholder="e.g. JFK → LHR"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Flight Number</label>
              <input
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="e.g. AA1234"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Travel Date *</label>
              <input
                name="travelDate"
                type="date"
                value={formData.travelDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Class *</label>
              <select
                name="travelClass"
                value={formData.travelClass}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">Passengers *</label>
            <input
              name="passengers"
              type="number"
              min="1"
              value={formData.passengers}
              onChange={handleChange}
              required
              className="w-32 px-4 py-2 border rounded-md"
            />
          </div>
        </section>

        {/* Booking Details */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Booking Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Total Amount (USD) *</label>
              <input
                name="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Status</label>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-12">
          <button
            type="button"
            onClick={() => navigate("/admin/bookings")}
            className="px-6 py-2.5 border rounded hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}