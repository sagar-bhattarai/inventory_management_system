import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function logout() {
  const navigate = useNavigate();

  const logOutUser = async () => {
    const confirmLogout = window.confirm("Are you sure, you want to logout?");
    if (confirmLogout) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/v1/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "pos-accessToken"
              )}`,
            },
          }
        );
        if (response) {
          localStorage.removeItem("pos-accessToken");
          localStorage.removeItem("pos-refreshToken");
          localStorage.removeItem("pos-user");
          navigate("/login");
        }
      } catch (error) {
        if (error.response.data?.message) {
          alert(error.response.data?.message);
        }
      }
    }
  };

  useEffect(() => {
    logOutUser();
  });

  return false;
}

export default logout;
