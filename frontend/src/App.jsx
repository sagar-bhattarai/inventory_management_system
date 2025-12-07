import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import Root from "./utils/Root.jsx";
import Login from "./pages/login.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoutes requiredRole={["admin"]}>
              <h1>admin dashboard</h1>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/customer/dashboard"
          element={<h1>customer dashboard</h1>}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/unauthorized"
          element={<p className="bold text-3xl m-20">Unauthorized</p>}
        />
      </Routes>
    </Router>
  );
}

export default App;
