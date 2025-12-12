import { BrowserRouter as Router, Routes, Route } from "react-router";
// import "./App.css";
import Root from "./utils/Root.jsx";
import Login from "./pages/login.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Categories from "./components/Categories.jsx";
import Logout from "./pages/logout.jsx";
import Suppliers from "./components/Suppliers.jsx";

function App() {
  const sidebarItems = [
    { name: "categories", element: <Categories /> },
    { name: "products", element: <Categories /> },
    { name: "suppliers", element: <Suppliers /> },
    { name: "orders", element: <Categories /> },
    { name: "users", element: <Categories /> },
    { name: "profile", element: <Categories /> },
    { name: "logout", element: <Logout /> },
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
            <Route key={items.name} path={items.name} element={items.element} />
          ))}
        </Route>
        <Route
          path="/customer-dashboard"
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
