// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// const CategoriesContext = createContext();
// export const useCategories = () => useContext(CategoriesContext);

// const API_URL = "http://localhost:3000/api/admin/categories";

// export const CategoriesProvider = ({ children }) => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Helper to get a fresh axios instance with current token
//   const getAxiosInstance = () => {
//     const token = localStorage.getItem("token") || "";
//     return axios.create({
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   };

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await getAxiosInstance().get(API_URL);
//       setCategories(Array.isArray(response.data.data) ? response.data.data : []);
//     } catch (error) {
//       Swal.fire("Error", "Failed to fetch categories", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addCategory = async (name) => {
//     setLoading(true);
//     try {
//       const response = await getAxiosInstance().post(API_URL, { name });
//       setCategories((prev) => [...prev, response.data.data]);
//       return { success: true, data: response.data.data };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.error || "Failed to add category" };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateCategory = async (id, name) => {
//     setLoading(true);
//     try {
//       await getAxiosInstance().put(`${API_URL}/${id}`, { name });
//       setCategories((prev) =>
//         prev.map((cat) => (cat.id === id ? { ...cat, name } : cat))
//       );
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.error || "Failed to update category" };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteCategory = async (id) => {
//     setLoading(true);
//     try {
//       await getAxiosInstance().delete(`${API_URL}/${id}`);
//       setCategories((prev) => prev.filter((cat) => cat.id !== id));
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.error || "Failed to delete category" };
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <CategoriesContext.Provider
//       value={{
//         categories,
//         loading,
//         fetchCategories,
//         addCategory,
//         updateCategory,
//         deleteCategory,
//       }}
//     >
//       {children}
//     </CategoriesContext.Provider>
//   );
// };
// -------------oct 4rth------------------------
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CategoriesContext = createContext();
export const useCategories = () => useContext(CategoriesContext);

// Use Vite environment variable for API
const API_URL = import.meta.env.VITE_API_URL + "/categories"; // e.g., http://localhost:3001/api/admin/categories

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper to get axios instance with token
  const getAxiosInstance = () => {
    const token = localStorage.getItem("token") || "";
    return axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getAxiosInstance().get(API_URL);
      setCategories(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to fetch categories", "error");
    } finally {
      setLoading(false);
    }
  };

  // Add category
  const addCategory = async (name) => {
    setLoading(true);
    try {
      const response = await getAxiosInstance().post(API_URL, { name });
      setCategories((prev) => [...prev, response.data.data]);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "Failed to add category" };
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const updateCategory = async (id, name) => {
    setLoading(true);
    try {
      await getAxiosInstance().put(`${API_URL}/${id}`, { name });
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, name } : cat))
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "Failed to update category" };
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      await getAxiosInstance().delete(`${API_URL}/${id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "Failed to delete category" };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loading,
        fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
