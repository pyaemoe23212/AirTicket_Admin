import { useState } from "react";
import { createStaff, mockRoles } from "../../service/api";

export default function StaffForm() {
  const [status, setStatus] = useState("Active");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    employeeId: "",
    role: "",
    joinDate: "",
    sendInvitation: false,
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change for text/email/date fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email address is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.role) {
      setError("Role is required");
      return false;
    }
    if (!formData.joinDate) {
      setError("Join date is required");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const staffPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        employeeId: formData.employeeId || null,
        role: formData.role,
        status: status,
        joinDate: formData.joinDate,
        sendInvitation: formData.sendInvitation,
      };

      const response = await createStaff(staffPayload);
      setSuccess("Staff member added successfully!");

      // Reset form
      resetForm();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to add staff member");
    } finally {
      setLoading(false);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      employeeId: "",
      role: "",
      joinDate: "",
      sendInvitation: false,
      photo: null,
    });
    setStatus("Active");
  };

  // Handle cancel
  const handleCancel = () => {
    resetForm();
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex-1 p-6">
      {/* FORM CARD */}
      <div className="border bg-white rounded p-5 space-y-6">
        {/* ERROR/SUCCESS MESSAGES */}
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* PROFILE SECTION */}
          <div>
            <h3 className="font-medium text-sm mb-3">Profile Information</h3>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200"></div>
              <div>
                <label
                  htmlFor="photo-upload"
                  className="border px-3 py-1 rounded text-sm cursor-pointer hover:bg-gray-50 inline-block"
                >
                  Upload Photo
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: Square image, at least 200×200px
                </p>
              </div>
            </div>
          </div>

          <hr />

          {/* PERSONAL INFO */}
          <div>
            <h3 className="font-medium text-sm mb-3">Personal Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium block mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border rounded w-full px-2 py-2 text-sm"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border rounded w-full px-2 py-2 text-sm"
                  placeholder="email@airline.com"
                />
              </div>

              <div>
                <label className="text-xs font-medium block mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border rounded w-full px-2 py-2 text-sm"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className="border rounded w-full px-2 py-2 text-sm"
                  placeholder="e.g., EMP-2026-001"
                />
              </div>
            </div>
          </div>

          <hr />

          {/* EMPLOYMENT DETAILS */}
          <div>
            <h3 className="font-medium text-sm mb-3">Employment Details</h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="text-xs font-medium block mb-1">Role*</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="border rounded w-full px-2 py-2 text-sm"
                >
                  <option value="">Select Role</option>
                  {mockRoles.map((role) => (
                    <option key={role.id} value={role.title}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <label className="text-xs font-medium block mb-1">
                  Join Date*
                </label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  className="border rounded w-full px-2 py-2 text-sm"
                />
              </div>

              <div className="col-span-1">
                <label className="text-xs font-medium block mb-1">Status</label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      checked={status === "Active"}
                      onChange={() => setStatus("Active")}
                    />
                    Active
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      checked={status === "Inactive"}
                      onChange={() => setStatus("Inactive")}
                    />
                    Inactive
                  </label>
                </div>
              </div>
            </div>
          </div>

          <hr />

          {/* ADDITIONAL OPTIONS */}
          <div>
            <h3 className="font-medium text-sm mb-3">Additional Options</h3>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="sendInvitation"
                checked={formData.sendInvitation}
                onChange={handleInputChange}
              />
              Send invitation email
            </label>
            <p className="text-xs text-gray-500 pl-6">
              User will receive login credentials and account setup instructions
            </p>
          </div>

          {/* FOOTER BUTTONS */}
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border rounded text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-900 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Staff Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
