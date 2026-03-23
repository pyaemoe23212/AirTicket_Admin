import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStaffById, updateStaff, deleteStaffById } from "../../config/api";

export default function StaffEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const staff = await getStaffById(id);
        setForm(staff);
        setError("");
      } catch (err) {
        setError(err.message || "Failed to load staff member");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    if (!form.name || !form.email) {
      setError("Name and email are required");
      return;
    }

    setSaving(true);
    try {
      await updateStaff(id, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
      });
      alert("Staff member updated successfully");
      navigate("/admin/staff");
    } catch (err) {
      setError(err.message || "Failed to update staff member");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) {
      return;
    }

    setSaving(true);
    try {
      await deleteStaffById(id);
      alert("Staff member deleted successfully");
      navigate("/admin/staff");
    } catch (err) {
      setError(err.message || "Failed to delete staff member");
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error && !form) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!form) return <div className="p-6">Staff member not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Edit Staff Member</h2>
            <p className="text-sm text-gray-500">Update staff information</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-xl text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <h3 className="font-medium">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                name="name"
                value={form.name || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                name="phone"
                value={form.phone || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Role</label>
              <input
                name="role"
                value={form.role || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Registration Date</label>
              <input
                name="registration"
                value={form.registration || ""}
                disabled
                className="w-full border rounded px-3 py-2 mt-1 bg-gray-100 text-gray-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Status</label>
              <input
                name="status"
                value={form.status || ""}
                disabled
                className="w-full border rounded px-3 py-2 mt-1 bg-gray-100 text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <button
            onClick={handleDelete}
            disabled={saving}
            className="border px-4 py-2 text-sm rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Delete Account
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-black text-white px-5 py-2 rounded text-sm hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
