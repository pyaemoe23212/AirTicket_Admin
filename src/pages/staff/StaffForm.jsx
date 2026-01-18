import { useState } from "react";

export default function StaffForm() {
  const [status, setStatus] = useState("Active");

  const permissions = [
    "Booking Management",
    "Flight Management",
    "Customer Support",
    "Reports Access",
    "Currency Settings",
    "Staff Management",
    "Analytics Dashboard",
    "System Settings",
  ];

  return (
    <div className="flex-1 p-6">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Add Staff Member</h2>
        <p className="text-xs text-gray-500">Enter staff member details</p>
      </div>

      {/* FORM CARD */}
      <div className="border bg-white rounded p-5 space-y-6">
        
        {/* PROFILE SECTION */}
        <div>
          <h3 className="font-medium text-sm mb-3">Profile Information</h3>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200"></div>
            <div>
              <button className="border px-3 py-1 rounded text-sm">Upload Photo</button>
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
              <label className="text-xs font-medium block mb-1">Full Name*</label>
              <input type="text" className="border rounded w-full px-2 py-2 text-sm" placeholder="Enter full name" />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1">Email Address*</label>
              <input type="email" className="border rounded w-full px-2 py-2 text-sm" placeholder="email@airline.com" />
            </div>

            <div>
              <label className="text-xs font-medium block mb-1">Phone Number</label>
              <input type="text" className="border rounded w-full px-2 py-2 text-sm" placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1">Employee ID</label>
              <input type="text" className="border rounded w-full px-2 py-2 text-sm" placeholder="e.g., EMP-2026-001" />
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
              <select className="border rounded w-full px-2 py-2 text-sm">
                <option>Select Role</option>
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>Supervisor</option>
                <option>Agent</option>
                <option>Support</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium block mb-1">Join Date*</label>
              <input type="date" className="border rounded w-full px-2 py-2 text-sm" />
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium block mb-1">Status</label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" checked={status === "Active"} onChange={() => setStatus("Active")} />
                  Active
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" checked={status === "Inactive"} onChange={() => setStatus("Inactive")} />
                  Inactive
                </label>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* PERMISSIONS */}
        <div>
          <h3 className="font-medium text-sm mb-3">Permissions & Access</h3>
          <div className="grid grid-cols-2 gap-y-2">
            {permissions.map((p, i) => (
              <label key={i} className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                {p}
              </label>
            ))}
          </div>
        </div>

        <hr />

        {/* ADDITIONAL OPTIONS */}
        <div>
          <h3 className="font-medium text-sm mb-3">Additional Options</h3>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            Send invitation email
          </label>
          <p className="text-xs text-gray-500 pl-6">
            User will receive login credentials and account setup instructions
          </p>
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div className="mt-4 flex justify-between">
        <button className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button className="px-4 py-2 bg-black text-white rounded text-sm">Add Staff Member</button>
      </div>
    </div>
  );
}
