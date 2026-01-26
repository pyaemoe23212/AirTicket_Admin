// pages/user/UserEdit.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../service/api";

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        if (mounted) {
          setUser(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          alert("User not found");
        }
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateUser(id, user);
      alert("User updated successfully");
      navigate("/admin/users");
    } catch (err) {
      alert("Failed to update user: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!user) return <div className="p-6 text-center">User not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-2xl font-bold mb-8">Edit User — {user.name}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1">First Name</label>
              <input
                name="name"
                value={user.name.split(" ")[0]}
                onChange={(e) => {
                  const parts = user.name.split(" ");
                  parts[0] = e.target.value;
                  handleChange({ target: { name: "name", value: parts.join(" ") } });
                }}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <input
                value={user.name.split(" ")[1] || ""}
                onChange={(e) => {
                  const parts = user.name.split(" ");
                  parts[1] = e.target.value;
                  handleChange({ target: { name: "name", value: parts.join(" ") } });
                }}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone Number</label>
              <input
                name="phone"
                value={user.phone || ""}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Account Status</label>
              <select
                name="status"
                value={user.status}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </section>

        {/* Travel Preferences */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Travel Preferences</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1">Preferred Class</label>
              <select
                name="preferredClass"
                value={user.preferredClass || "Economy"}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              >
                <option>Economy</option>
                <option>Premium Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Seat Preference</label>
              <input
                type="text"
                placeholder="Window / Aisle"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Meal Preference</label>
              <input
                type="text"
                placeholder="Vegetarian / Vegan / None"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-between mt-12">
          <button
            type="button"
            className="px-6 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50"
          >
            Delete Account
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="px-6 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}