// import { createContext, useContext, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:3000/api/auth/login", {
//         email,
//         password,
//       });
//       if (response.data.success) {
//         localStorage.setItem("token", response.data.token);
//         setUser({ email });
//         return { success: true };
//       } else {
//         return { success: false, message: response.data.message || "Login failed" };
//       }
//     } catch (err) {
//       return { success: false, message: err.response?.data?.message || "Something went wrong!" };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

// --------3000 port change-------------------
// import { createContext, useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/auth/login", {
//         email,
//         password,
//       });
//       if (response.data.success) {
//         localStorage.setItem("token", response.data.token);
//         setUser({ email });
//         return { success: true };
//       } else {
//         return { success: false, message: response.data.message || "Login failed" };
//       }
//     } catch (err) {
//       return { success: false, message: err.response?.data?.message || "Something went wrong!" };
//     }
//   };

//   const signup = async (name, email, password, role = "admin") => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/auth/register",
//         { name, email, password, role },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       if (response.status === 201 || response.status === 200) {
//         return { success: true, message: "Registration successful! You can now log in." };
//       } else {
//         return { success: false, message: response.data.message || "Registration failed" };
//       }
//     } catch (err) {
//       return { success: false, message: err.response?.data?.message || "Something went wrong!" };
//     }
//   };

//   // Accept a callback for navigation
//   const logout = async (onLogout) => {
//     try {
//       await axios.post("http://localhost:3001/api/auth/logout");
//     } catch (err) {
//       // Optionally handle error
//     }
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/");
//     if (onLogout) onLogout();
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, signup }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

// -----------------------------------port change --------------
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL; 

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL.replace('/admin','')}/auth/login`, {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setUser({ email });
        return { success: true };
      } else {
        return { success: false, message: response.data.message || "Login failed" };
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Something went wrong!" };
    }
  };

  const signup = async (name, email, password, role = "admin") => {
    try {
      const response = await axios.post(
          `${API_URL.replace('/admin','')}/auth/register`,
        { name, email, password, role },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 201 || response.status === 200) {
        return { success: true, message: "Registration successful! You can now log in." };
      } else {
        return { success: false, message: response.data.message || "Registration failed" };
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Something went wrong!" };
    }
  };

  // Accept a callback for navigation
  const logout = async (onLogout) => {
    try {
      await axios.post(`${API_URL.replace('/admin','')}/auth/logout`);
    } catch (err) {
      // Optionally handle error
    }
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    if (onLogout) onLogout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
