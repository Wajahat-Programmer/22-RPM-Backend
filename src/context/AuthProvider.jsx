// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const API_BASE = import.meta.env.VITE_BACKEND_API;

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: false,
    loading: true, // prevent flicker on refresh
  });

  // Check cookies on initial load
  //   useEffect(() => {
  //     const checkAuth = async () => {
  //       try {
  //         const response = await fetch(
  //           `${API_BASE}/api/auth/check-me`,
  //           {
  //             credentials: "include", // send cookies
  //           }
  //         );

  //         if (!response.ok) {
  //           setAuth({ user: null, isAuthenticated: false, loading: false });
  //           navigate("/");
  //           return;
  //         }

  //         const data = await response.json();
  //         console.log("Auth Check:", data);
  //         if (data?.user?.role === "patient") {
  //           alert("You are not authorized to access this page.");
  //           setAuth({ user: null, isAuthenticated: false, loading: false });
  //           navigate("/");
  //           return;
  //         }

  //         setAuth({ user: data.user, isAuthenticated: true, loading: false });

  //         if (data.user.role === "admin") {
  //           navigate("/admin");
  //         } else {
  //           navigate("/dashboard");
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         setAuth({ user: null, isAuthenticated: false, loading: false });
  //       }
  //     };

  //     checkAuth();
  //   }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/auth/check-me`, {
          credentials: "include",
        });

        if (!response.ok) {
          setAuth({ user: null, isAuthenticated: false, loading: false });
          navigate("/");
          return;
        }

        const data = await response.json();
        // console.log("Auth Check:", data);
        
        setAuth({ user: data.user, isAuthenticated: true, loading: false });
      } catch (err) {
        console.error(err);
        setAuth({ user: null, isAuthenticated: false, loading: false });
        navigate("/");
      }
    };

    checkAuth(); // run immediately

    // recheck every 30s
    const interval = setInterval(checkAuth, 600000);

    return () => clearInterval(interval);
  }, [navigate]);

  const login = async (credentials) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      credentials: "include", // ensures cookie is set
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (res.ok) {
      const data = await res.json();
      setAuth({ user: data.user, isAuthenticated: true, loading: false });

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }

    return res;
  };

  const logout = async () => {
    await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setAuth({ user: null, isAuthenticated: false, loading: false });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
