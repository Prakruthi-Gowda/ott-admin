import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useMovieContext } from "../context/MovieContext";

const Movies = () => {
  const {
    movies,
    categories,
    addMovie,
    editMovie,
    deleteMovie,
    loading,
  } = useMovieContext();

  // Add movie states
  const [newMovie, setNewMovie] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newTrailer, setNewTrailer] = useState(null);
  const [newVideo, setNewVideo] = useState(null);
  const [newGenre, setNewGenre] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Edit movie states
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editTrailer, setEditTrailer] = useState(null);
  const [editVideo, setEditVideo] = useState(null);
  const [editGenre, setEditGenre] = useState("");
  const [editReleaseDate, setEditReleaseDate] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Open Add modal
  const handleOpenModal = () => {
    setNewMovie("");
    setSelectedCategory("");
    setNewImage(null);
    setNewTrailer(null);
    setNewVideo(null);
    setNewGenre("");
    setNewReleaseDate("");
    setNewDescription("");
    setIsModalOpen(true);
  };

  // Add Movie
  const handleAdd = async (e) => {
    e.preventDefault();
    if (
      !newMovie ||
      !selectedCategory ||
      !newImage ||
      !newTrailer ||
      !newVideo
    ) {
      Swal.fire("Missing Fields", "Please fill all required fields.", "error");
      return;
    }
    const success = await addMovie({
      title: newMovie,
      categoryId: selectedCategory,
      banner: newImage,
      trailer: newTrailer,
      movie: newVideo,
      genre: newGenre,
      releaseDate: newReleaseDate,
      description: newDescription,
    });
    if (success) setIsModalOpen(false);
  };

  // Open Edit Modal
  const handleEdit = (index) => {
    const movie = movies[index];
    setEditingIndex(index);
    setEditTitle(movie.title);
    setEditCategory(movie.categoryId);
    setEditImage(null); // Reset to null for file input
    setEditTrailer(null);
    setEditVideo(null);
    setEditGenre(movie.genre);
    setEditReleaseDate(movie.releaseDate?.split("T")[0] || "");
    setEditDescription(movie.description);
    setIsEditModalOpen(true);
  };

  // Save edited movie
  const handleSave = async (e) => {
    e.preventDefault();
    if (!editTitle || !editCategory) {
      Swal.fire("Missing Fields", "Please fill all required fields.", "error");
      return;
    }
    const movieId = movies[editingIndex].id;
    const movie = movies[editingIndex];
    const success = await editMovie(movieId, {
      title: editTitle,
      categoryId: editCategory,
      banner: editImage || movie.banner,
      trailer: editTrailer || movie.trailer,
      movie: editVideo || movie.movie,
      genre: editGenre,
      releaseDate: editReleaseDate,
      description: editDescription,
    });
    if (success) setIsEditModalOpen(false);
  };

  // Delete movie
  const handleDelete = async (index) => {
    const movieId = movies[index].id;
    Swal.fire({
      title: "Are you sure?",
      text: "This movie will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton:
          "bg-[#0F172A] text-white px-4 py-2 rounded shadow hover:bg-[#1E293B] mr-2",
        cancelButton:
          "bg-[#E5E7EB] text-gray-700 px-4 py-2 rounded shadow hover:bg-[#D1D5DB]",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteMovie(movieId);
      }
    });
  };

  // DataTable columns
  const columns = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    {
      name: "Category",
      selector: (row) =>
        row.category?.name ||
        categories.find((c) => c.id === row.categoryId)?.name ||
        "N/A",
      sortable: true,
    },
    { name: "Genre", selector: (row) => row.genre || "-", sortable: true },
    {
      name: "Release Date",
      selector: (row) =>
        row.releaseDate ? new Date(row.releaseDate).toLocaleDateString() : "-",
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description || "-",
      wrap: true,
    },
    {
      name: "Banner",
      cell: (row) =>
        row.banner ? (
          <img
            src={`http://localhost:3000/${row.banner}`}
            alt="banner"
            className="h-16 w-16 object-cover rounded"
          />
        ) : (
          <span>No Banner</span>
        ),
    },
    {
      name: "Trailer",
      cell: (row) =>
        row.trailer ? (
          <video controls className="h-20 w-36">
            <source
              src={`http://localhost:3000/${row.trailer}`}
              type="video/mp4"
            />
          </video>
        ) : (
          <span>No Trailer</span>
        ),
    },
    {
      name: "Movie",
      cell: (row) =>
        row.movie ? (
          <video controls className="h-20 w-36">
            <source
              src={`http://localhost:3000/${row.movie}`}
              type="video/mp4"
            />
          </video>
        ) : (
          <span>No Movie</span>
        ),
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div className="flex gap-2">
          <button
            className="bg-gray-200 px-3 py-1 rounded flex items-center gap-1"
            onClick={() => handleEdit(index)}
          >
            <FaEdit />
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
            onClick={() => handleDelete(index)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Movies</h1>
        <button
          className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow"
          onClick={handleOpenModal}
        >
          + Add Movie
        </button>
      </div>

      <DataTable
        columns={columns}
        data={movies}
        pagination
        striped
        highlightOnHover
      />

      {/* Add Movie Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[700px]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add Movie</h2>
            <form onSubmit={handleAdd}>
              <div className="grid grid-cols-2 gap-4">
                <select
                  className="border p-2 rounded w-full"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Title"
                  value={newMovie}
                  onChange={(e) => setNewMovie(e.target.value)}
                  required
                />

                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Genre"
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                />

                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  value={newReleaseDate}
                  onChange={(e) => setNewReleaseDate(e.target.value)}
                />

                <textarea
                  className="border p-2 rounded w-full col-span-2"
                  placeholder="Description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />

                <div className="border p-2 rounded">
                  <label className="block mb-1">Banner</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImage(e.target.files[0])}
                    required
                  />
                </div>

                <div className="border p-2 rounded">
                  <label className="block mb-1">Trailer</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setNewTrailer(e.target.files[0])}
                    required
                  />
                </div>

                <div className="border p-2 rounded">
                  <label className="block mb-1">Movie</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setNewVideo(e.target.files[0])}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow"
                >
                  {loading ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Movie Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[700px]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Movie</h2>
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-2 gap-4">
                <select
                  className="border p-2 rounded w-full"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />

                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Genre"
                  value={editGenre}
                  onChange={(e) => setEditGenre(e.target.value)}
                />

                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  value={editReleaseDate}
                  onChange={(e) => setEditReleaseDate(e.target.value)}
                />

                <textarea
                  className="border p-2 rounded w-full col-span-2"
                  placeholder="Description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />

                <div className="border p-2 rounded">
                  <label className="block mb-1">Banner</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditImage(e.target.files[0])}
                  />
                </div>

                <div className="border p-2 rounded">
                  <label className="block mb-1">Trailer</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setEditTrailer(e.target.files[0])}
                  />
                </div>

                <div className="border p-2 rounded">
                  <label className="block mb-1">Movie</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setEditVideo(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;