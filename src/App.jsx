import { RouterProvider } from "react-router-dom";
import { router } from "./Route/index";

export default function App() {
  return <RouterProvider router={router} />;
}
