// layout/AdminHeader.jsx
import { useLocation, useNavigate } from "react-router";

const HEADER_CONFIG = {
  "/admin": {
    title: "Booking Management",
    actionLabel: "+ New Booking",
    actionPath: "/admin/bookings/bookingform",
  },
  "/admin/flights": {
    title: "Flight Management",
    actionLabel: "+ New Flight",
    actionPath: "/admin/flights/flightform",
  },
  "/admin/users": {
    title: "User Management",
   
  },
  "/admin/staff": {
    title: "Staff Management",
    actionLabel: "+ New Staff",
    actionPath: "/admin/staff/staff-form",
  },
};

export default function AdminHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const header = HEADER_CONFIG[pathname];

  return (
    <header className="h-16 bg-white border-b border-gray-300 px-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold">
        {header?.title || "Admin"}
      </h1>

      {header?.actionPath && (
        <button
          onClick={() => navigate(header.actionPath)}
          className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
        >
          {header.actionLabel}
        </button>
      )}
    </header>
  );
}
