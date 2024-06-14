import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AppProvider } from "./store/AppContext";
import FetchProjects from "./components/Fetch/Fetch";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/*" element={<FetchProjects />}>
              <Route path="posts" element={<FetchProjects />} />
              <Route path="users" element={<FetchProjects />} />
              <Route path="new-post" element={<FetchProjects />} />
              <Route path="" element={<Navigate to="posts" />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
export default App;
