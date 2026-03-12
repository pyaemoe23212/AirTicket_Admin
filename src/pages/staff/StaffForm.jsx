import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function StaffForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { createStaff } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email address is required");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleCancel = () => {
    resetForm();
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { success: isSuccess } = await createStaff(
        formData.name,
        formData.email,
        formData.password,
      );
      if (isSuccess) {
        setSuccess("Staff account created successfully");
        resetForm();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to create staff account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="border bg-white rounded p-5 space-y-6 max-w-2xl">
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
          <h3 className="font-medium text-sm mb-4">Create Staff Account</h3>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-xs font-medium block mb-1">
                Full Name
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
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border rounded w-full px-2 py-2 text-sm"
                placeholder="staff@airline.com"
              />
            </div>

            <div>
              <label className="text-xs font-medium block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="border rounded w-full px-2 py-2 text-sm"
                placeholder="Enter temporary password"
              />
            </div>

            <div>
              <label className="text-xs font-medium block mb-1">Role</label>
              <input
                value="STAFF"
                readOnly
                className="border rounded w-full px-2 py-2 text-sm bg-gray-100 text-gray-600"
              />
            </div>
          </div>

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
              {loading ? "Creating..." : "Create Staff Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
