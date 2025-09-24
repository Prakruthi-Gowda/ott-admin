import React, { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_URL}/categories`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const fetchedCategories = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setCategories(fetchedCategories);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || error.message, "error");
    }
  };

  // Fetch movies
  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedMovies = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setMovies(fetchedMovies);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || error.message, "error");
    }
  };

  // Add Movie
  const addMovie = async ({
    title,
    categoryId,
    banner,
    trailer,
    movie,
    genre,
    releaseDate,
    description,
  }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("categoryId", categoryId);
      formData.append("banner", banner);
      formData.append("trailer", trailer);
      formData.append("movie", movie);
      formData.append("genre", genre);
      formData.append("releaseDate", releaseDate);
      formData.append("description", description);

      await axios.post(`${API_URL}/movies`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchMovies();
      Swal.fire("Success", "Movie added successfully!", "success");
      return true;
    } catch (error) {
      Swal.fire("Error", error.response?.data?.error || error.message, "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Edit Movie
  const editMovie = async (movieId, {
    title,
    categoryId,
    banner,
    trailer,
    movie,
    genre,
    releaseDate,
    description,
    oldBanner,
    oldTrailer,
    oldMovie,
  }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("categoryId", categoryId);
      formData.append("genre", genre);
      formData.append("releaseDate", releaseDate);
      formData.append("description", description);
      if (banner instanceof File) formData.append("banner", banner);
      if (trailer instanceof File) formData.append("trailer", trailer);
      if (movie instanceof File) formData.append("movie", movie);

      await axios.put(
        `${API_URL}/movies/${movieId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchMovies();
      Swal.fire("Success", "Movie updated successfully!", "success");
      return true;
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || error.message, "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete Movie
  const deleteMovie = async (movieId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchMovies();
      Swal.fire("Deleted!", "Movie removed successfully.", "success");
      return true;
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || error.message, "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        categories,
        setCategories,
        fetchMovies,
        fetchCategories,
        addMovie,
        editMovie,
        deleteMovie,
        loading,
        API_URL,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};