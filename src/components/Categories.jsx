import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { useCategories } from "../context/CategoriesContext";

const Categories = () => {
  const {
    categories,
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const [newCategory, setNewCategory] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [addError, setAddError] = useState("");
  const [editError, setEditError] = useState("");

  // Add category
  const handleAdd = async (e) => {
    e.preventDefault();
    const value = newCategory.trim();

    if (!value) {
      setAddError("Category name is required.");
      return;
    }
    if (categories.some((cat) => cat.name.toLowerCase() === value.toLowerCase())) {
      setAddError("This category already exists.");
      return;
    }

    const result = await addCategory(value);
    if (result.success) {
      setIsModalOpen(false);
      Swal.fire("Success", `"${value}" was added successfully!`, "success");
      setNewCategory("");
      setAddError("");
    } else {
      Swal.fire("Error", result.error, "error");
    }
  };

  // Open Edit modal
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(categories[index].name);
    setEditError("");
    setIsEditModalOpen(true);
  };

  // Save edited category
  const handleSave = async (e) => {
    e.preventDefault();
    const value = editValue.trim();

    if (!value) {
      setEditError("Category name is required.");
      return;
    }
    if (
      categories.some(
        (cat, i) => cat.name.toLowerCase() === value.toLowerCase() && i !== editingIndex
      )
    ) {
      setEditError("This category already exists.");
      return;
    }

    const category = categories[editingIndex];
    const result = await updateCategory(category.id, value);

    if (result.success) {
      setIsEditModalOpen(false);
      setEditingIndex(null);
      Swal.fire("Success", "Category updated successfully!", "success");
    } else {
      Swal.fire("Error", result.error, "error");
    }
  };

  // Delete category
  const handleDelete = (index) => {
    const category = categories[index];

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
        const res = await deleteCategory(category.id);
        if (res.success) {
          Swal.fire("Deleted!", "Your category has been deleted.", "success");
        } else {
          Swal.fire("Error", res.error, "error");
        }
      }
    });
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <span className="text-gray-800">{row.name}</span>,
    },
    {
      name: "Actions",
      cell: (row, rowIndex) => (
        <div className="flex justify-center gap-2">
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded shadow flex items-center gap-1"
            onClick={() => handleEdit(rowIndex)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="bg-gray-300 hover:bg-red-100 text-red-600 px-3 py-1 rounded shadow flex items-center gap-1"
            onClick={() => handleDelete(rowIndex)}
          >
            <FaTrash /> Delete
          </button>
        </div>
      ),
      center: true,
    },
  ];

  const customStyles = {
    table: { style: { width: "100%" } },
    headRow: { style: { backgroundColor: "#f3f4f6" } },
    rows: { style: { backgroundColor: "#fff" } },
    headCells: { style: { fontWeight: "bold", color: "#374151" } },
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <button
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow"
          onClick={() => {
            setNewCategory("");
            setAddError("");
            setIsModalOpen(true);
          }}
        >
          <FaPlus /> Add
        </button>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        customStyles={customStyles}
        pagination
        highlightOnHover
        striped
        progressPending={loading}
        progressComponent={<div className="p-6 text-center text-gray-700">Loading...</div>}
        noDataComponent={<div className="p-6 text-center text-gray-500">No categories added yet.</div>}
      />

      {/* Add Modal */}
      {isModalOpen && (
        <Modal
          title="Add Category"
          value={newCategory}
          setValue={setNewCategory}
          error={addError}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAdd}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <Modal
          title="Edit Category"
          value={editValue}
          setValue={setEditValue}
          error={editError}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleSave}
          submitLabel="Save"
        />
      )}
    </div>
  );
};

// Reusable Modal Component
const Modal = ({ title, value, setValue, error, onClose, onSubmit, submitLabel = "Submit" }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl w-96">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-lg w-full text-black mb-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default Categories;