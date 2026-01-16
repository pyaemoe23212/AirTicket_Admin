import { createBrowserRouter } from "react-router";
import AdminLayout from "../layout/AdminLayout"
import BookingManagement from "../pages/booking/BookingManagement"
import BookingForm from "../pages/booking/BookingForm"
import FlightManagement from "../pages/flight/FlightManagement"
import FlightForm from "../pages/flight/FlightForm"
import UserManagement from "../pages/user/UserManagement"
import StaffManagement from "../pages/staff/StaffManagement"
import StaffForm from "../pages/staff/StaffForm"

const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      {
        path: "/admin/bookings",
        Component: BookingManagement,
      },
      {
        path: "/admin/bookings/bookingform",
        Component: BookingForm,
      },
      {
        path: "/admin/flights",
        Component: FlightManagement,
      },
      {
        path: "/admin/flights/flightform",
        Component: FlightForm,
      },
      {
        path: "/admin/users",
        Component: UserManagement,
      },
      {
        path: "/admin/staff",
        Component: StaffManagement,
      },
      {
        path: "/admin/staff/staff-form",
        Component: StaffForm,
      }
    ],
  },
]);

export default router;