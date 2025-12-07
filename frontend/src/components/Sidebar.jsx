import React from "react";
import {
  FaBox,
  FaCog,
  FaHome,
  FaShoppingCart,
  FaSignOutAlt,
  FaTable,
  FaTruck,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <FaHome />,
      isParent: true,
    },
    {
      name: "Categories",
      path: "/admin-dashboard/categories",
      icon: <FaTable />,
      isParent: false,
    },
    {
      name: "Products",
      path: "/admin-dashboard/Products",
      icon: <FaBox />,
      isParent: false,
    },
    {
      name: "Suppliers",
      path: "/admin-dashboard/suppliers",
      icon: <FaTruck />,
      isParent: false,
    },
    {
      name: "Orders",
      path: "/admin-dashboard/orders",
      icon: <FaShoppingCart />,
      isParent: false,
    },
    {
      name: "Users",
      path: "/admin-dashboard/users",
      icon: <FaUsers />,
      isParent: false,
    },
    {
      name: "Profile",
      path: "/admin-dashboard/profile",
      icon: <FaCog />,
      isParent: false,
    },
    {
      name: "Logout",
      path: "/admin-dashboard/logout",
      icon: <FaSignOutAlt />,
      isParent: false,
    },
  ];

  return (
    <div className="felx flex-col h-screen p-1 md:p-3 bg-black text-white w-16 md:w-64">
      <div className="p-2 md:p-4 font-bold">
        <span className="hidden md:block">Inventory MS</span>
        <span className="block md:hidden ">IMS</span>
      </div>
      <ul className="space-y-2 p-1 md:p-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              end={item.isParent}
              to={item.path}
              className={({ isActive }) =>
                (isActive
                  ? "bg-gray-700 hover:text-white hover:bg-gray-600 "
                  : "") +
                " flex flex-row items-center p-2 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition duration-200"
              }
            >
              <span className="md:pr-2">{item.icon} </span>
              <span className="hidden md:block ">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
