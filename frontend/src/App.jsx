import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import Root from "./utils/Root.jsx";
import Login from "./pages/login.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const sidebarItems = [
    { name: "categories" },
    { name: "products" },
    { name: "suppliers" },
    { name: "orders" },
    { name: "users" },
    { name: "profile" },
    { name: "logout" },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoutes requiredRole={["admin"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route index element={<h1>Summary of Dashboard</h1>} />
          {sidebarItems.map((items) => (
              <Route
                key={items.name}
                path={items.name}
                element={<h1 className="capitalize">{items.name}</h1>}
              />
            )
          )}
        </Route>
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
