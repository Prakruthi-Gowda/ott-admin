import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);

const API_URL = "http://localhost:3000/api/admin/categories";

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_URL);
      setCategories(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch categories", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (name) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_URL, { name });
      setCategories((prev) => [...prev, response.data.data]);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || "Failed to add category" };
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, name) => {
    setLoading(true);
    try {
      await axiosInstance.put(`${API_URL}/${id}`, { name });
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, name } : cat))
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || "Failed to update category" };
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`${API_URL}/${id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || "Failed to delete category" };
    } finally {
      setLoading(false);
    }
  };

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