import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStaffById } from "../../service/api";

export default function StaffView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchStaff = async () => {
      try {
        const data = await getStaffById(id);
        if (mounted) {
          setStaff(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchStaff();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading staff details...
      </div>
    );
  }

  if (error || !staff) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">Staff member not found</p>
        <button
          onClick={() => navigate("/admin/staff")}
          className="px-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          Back to Staff List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header / Modal-like title bar */}
      <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Staff Details</h2>
          <p className="text-sm text-gray-500">View staff information and activity</p>
        </div>
        <button
          onClick={() => navigate("/admin/staff")}
          className="text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>
      </div>

      <div className="p-6">
        {/* Profile header */}
        <div className="flex items-start gap-5 pb-6 border-b">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-medium">
            {staff.name.charAt(0)}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold">{staff.name}</h3>
            <p className="text-gray-600 mt-1">{staff.email}</p>

            <div className="mt-3 flex gap-3">
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {staff.role}
              </span>
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {staff.status}
              </span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="py-6 border-b">
          <h4 className="text-lg font-semibold mb-4">Personal Information</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Employee ID</label>
              <p className="mt-1 font-medium">USR-{String(staff.id).padStart(3, "0")}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Email Address</label>
              <p className="mt-1 font-medium">{staff.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Phone Number</label>
              <p className="mt-1 font-medium">{staff.phone ?? "+1 (555) 123-4567"}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Registration Date</label>
              <p className="mt-1 font-medium">{staff.registration ?? "Jan 15, 2024"}
                </p>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
      <div className="p-6">
        <h4 className="font-semibold mb-4">Activity Summary</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border rounded p-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Total Logins</p>
            <p className="text-xl font-semibold">{(staff.totalLogins ?? 342).toLocaleString()}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Actions This Month</p>
            <p className="text-xl font-semibold">{(staff.actions ?? 1287).toLocaleString()}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Account Age</p>
            <p className="text-xl font-semibold">{staff.age ?? "156 days"}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}