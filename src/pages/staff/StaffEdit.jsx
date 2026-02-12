import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mock staff data (same as your table)
const staffList = [
  { id: 1, firstName: "Sarah", lastName: "Johnson", employeeId: "USR-001", email: "sarah.johnson@airline.com", phone: "+1 (555) 123-4567", registrationDate: "Jan 15, 2024" },
  { id: 2, firstName: "Michael", lastName: "Chen", employeeId: "USR-002", email: "michael.chen@airline.com", phone: "+1 (555) 234-5678", registrationDate: "Feb 3, 2024" },
  { id: 3, firstName: "Emily", lastName: "Rodriguez", employeeId: "USR-003", email: "emily.r@airline.com", phone: "+1 (555) 345-6789", registrationDate: "Mar 12, 2024" },
  { id: 4, firstName: "James", lastName: "Patel", employeeId: "USR-004", email: "james.p@airline.com", phone: "+1 (555) 456-7890", registrationDate: "Jun 20, 2025" },
  { id: 5, firstName: "Anna", lastName: "Kowalski", employeeId: "USR-005", email: "anna.k@airline.com", phone: "+1 (555) 567-8901", registrationDate: "Sep 08, 2025" },
];

export default function StaffEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const staff = staffList.find((s) => String(s.id) === String(id));
    if (staff) setForm(staff);
  }, [id]);

  if (!form) return <div className="p-6">Loading...</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Changes saved!");
    navigate(-1);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      alert("Employee deleted");
      navigate("/admin/staff");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow border">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Edit Employee</h2>
            <p className="text-sm text-gray-500">
              Update customer information and preferences
            </p>
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
          <h3 className="font-medium">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Employee ID</label>
              <input
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Registration Date</label>
              <input
                name="registrationDate"
                value={form.registrationDate}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <button
            onClick={handleDelete}
            className="border px-4 py-2 text-sm rounded hover:bg-gray-100"
          >
            Delete Account
          </button>

          <button
            onClick={handleSave}
            className="bg-black text-white px-5 py-2 rounded text-sm hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
