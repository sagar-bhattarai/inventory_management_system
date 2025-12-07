import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("pos-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData, accessToken, refreshToken) => {
    setUser(userData);
    localStorage.setItem("pos-user", JSON.stringify(userData));
    localStorage.setItem("pos-accessToken", accessToken);
    localStorage.setItem("pos-refreshToken", refreshToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pos-user");
    localStorage.removeItem("pos-accessToken");
    localStorage.removeItem("pos-refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
