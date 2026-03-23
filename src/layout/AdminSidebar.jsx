import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const navItemClass = ({ isActive }) =>
  `block px-4 py-3 rounded text-sm font-medium ${
    isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-200"
  }`;

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <aside className="w-64 bg-gray-200 border-r border-gray-300 p-4">
      {/* Logo */}
      <div className="text-xl font-bold mb-8">Admin Panel</div>

      {/* Navigation */}
      <nav className="space-y-2">
        <NavLink to="/admin/bookings" end className={navItemClass}>
          Booking Management
        </NavLink>

        <NavLink to="/admin/flights" className={navItemClass}>
          Flight Management
        </NavLink>

        <NavLink to="/admin/users" className={navItemClass}>
          User Management
        </NavLink>

        <NavLink to="/admin/staff" className={navItemClass}>
          Staff Management
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="w-full mt-8 px-4 py-3 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition"
      >
        Logout
      </button>
    </aside>
  );
}
