import { createBrowserRouter } from "react-router";
import AdminLayout from "../layout/AdminLayout";
import BookingManagement from "../pages/booking/BookingManagement";
import BookingForm from "../pages/booking/BookingForm";
import BookingView from "../pages/booking/BookingView";
import BookingEdit from "../pages/booking/BookingEdit";
import FlightManagement from "../pages/flight/FlightManagement";
import FlightForm from "../pages/flight/FlightForm";
import UserManagement from "../pages/user/UserManagement";
import UserView from "../pages/user/UserView";
import UserEdit from "../pages/user/UserEdit";
import StaffManagement from "../pages/staff/StaffManagement";
import StaffForm from "../pages/staff/StaffForm";
import FlightView from "../pages/flight/FlightView";
import FlightEdit from "../pages/flight/FlightEdit";
import StaffView from "../pages/staff/StaffView";
import StaffEdit from "../pages/staff/StaffEdit";

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
        path: "/admin/bookings/:bookingId",
        Component: BookingView,
      },
      {
        path: "/admin/bookings/:bookingId/edit",
        Component: BookingEdit,
      },
      {
        path: "/admin/flights",
        Component: FlightManagement,
      },
      {
        path: "/admin/flights/:flightId",
        Component: FlightView,
      },
      {
        path: "/admin/flights/:flightId/flight-edit",
        Component: FlightEdit,
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
        path: "/admin/users/:id",
        Component: UserView,
      },
      {
        path: "/admin/users/:id/edit",
        Component: UserEdit,
      },
      {
        path: "/admin/staff",
        Component: StaffManagement,
      },
      {
        path: "/admin/staff/:id",
        Component: StaffView,
      },
      {
        path: "/admin/staff/staff-form",
        Component: StaffForm,
      },
      {
        path: "/admin/staff/:id/edit",
        Component: StaffEdit,
      },
    ],
  },
]);

export default router;
