// pages/user/UserView.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCustomerById } from "../../config/api";

export default function UserView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        const data = await getCustomerById(id);
        if (mounted) {
          setUser(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading)
    return <div className="p-6 text-center">Loading user details...</div>;
  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!user) return <div className="p-6 text-center">User not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Customer Details</h1>
          <p className="text-sm text-gray-500">
            View customer information and booking history
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/users")}
          className="text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-2xl font-medium">
          {user.full_name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-lg">{user.full_name}</p>
          <p className="text-gray-600">{user.email}</p>
          <div className="flex gap-2 mt-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.is_active ? "Active" : "Inactive"}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
              {user.is_email_verified ? "Email Verified" : "Unverified"}
            </span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-600">Customer ID</p>
            <p className="font-medium">{user.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Full Name</p>
            <p className="font-medium">{user.full_name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Email Address</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Phone Number</p>
            <p className="font-medium">{user.phone || "N/A"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Email Verified</p>
            <p className="font-medium">
              {user.is_email_verified ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Registration Date</p>
            <p className="font-medium">
              {new Date(user.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>


      {/* Footer */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate("/admin/users")}
          className="px-6 py-2 border rounded hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}
