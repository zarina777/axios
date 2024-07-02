import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";
import "./index.scss";
import { ContextProvide } from "./context";
import Productinfo from "./pages/[id]";
import AuthProvider from "./authProvider";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path="admin"
        element={
          <AuthProvider>
            <Admin />
          </AuthProvider>
        }
      />
      <Route
        path="admin/product/:id"
        element={
          <AuthProvider>
            <Productinfo />
          </AuthProvider>
        }
      />
      <Route path="login" element={<Login />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvide>
      <RouterProvider router={router} />
    </ContextProvide>
  </React.StrictMode>
);
