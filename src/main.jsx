import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Manager from "./pages/Manager";
import TaskTimer from "./pages/TaskTimer";
import Planner from "./pages/Planner";
import Login from "./pages/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <TaskTimer />,
      },
      {
        path: "/calendar",
        element: <Planner />,
      },
      {
        path: "/manager",
        element: <Manager />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
