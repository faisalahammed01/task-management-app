import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import AuthProvider from "./components/Auth/AuthProvider";
import Register from "./page/Register";
import PrivatesRoute from "./page/PrivatesRoute";
import UpdateTask from "./components/UpdateTask";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/update/:id",
    element: <UpdateTask></UpdateTask>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivatesRoute>
        <Dashboard></Dashboard>
      </PrivatesRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
