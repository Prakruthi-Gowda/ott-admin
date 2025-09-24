import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";

const Users = () => {
  const [users, setUsers] = useState([]); // {name, email, role}
  const [newUser, setNewUser] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editUser, setEditUser] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const roles = ["Admin", "User", "Guest"];

  const handleOpenModal = () => {
    setNewUser("");
    setNewEmail("");
    setNewRole("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newUser.trim() || !newEmail.trim() || !newRole.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields",
        customClass: {
          confirmButton:
            "bg-[#0F172A] text-white px-4 py-2 rounded shadow hover:bg-[#1E293B]",
        },
        buttonsStyling: false,
      });
      return;
    }

    setUsers([
      ...users,
      {
        name: newUser,
        email: newEmail,
        role: newRole,
      },
    ]);
    setIsModalOpen(false);

    Swal.fire({
      icon: "success",
      title: "User Added",
      text: `"${newUser}" was added!`,
      customClass: {
        confirmButton:
          "bg-[#0F172A] text-white px-4 py-2 rounded shadow hover:bg-[#1E293B]",
      },
      buttonsStyling: false,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
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
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((_, i) => i !== index));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User removed successfully.",
          customClass: {
            confirmButton:
              "bg-[#0F172A] text-white px-4 py-2 rounded shadow hover:bg-[#1E293B]",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  const handleEdit = (index) => {
    const user = users[index];
    setEditingIndex(index);
    setEditUser(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setIsEditModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUsers = [...users];
    updatedUsers[editingIndex] = {
      name: editUser,
      email: editEmail,
      role: editRole,
    };
    setUsers(updatedUsers);
    setIsEditModalOpen(false);

    Swal.fire({
      icon: "success",
      title: "Updated",
      text: "User details updated successfully!",
      customClass: {
        confirmButton:
          "bg-[#0F172A] text-white px-4 py-2 rounded shadow hover:bg-[#1E293B]",
      },
      buttonsStyling: false,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true },
    {
      name: "Actions",
      cell: (row, index) => (
        <div className="flex gap-2">
          <button
            className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-gray-700 px-3 py-1 rounded flex items-center gap-1"
            onClick={() => handleEdit(index)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-3 py-1 rounded flex items-center gap-1"
            onClick={() => handleDelete(index)}
          >
            <FaTrash /> Delete
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    table: {
      style: {
        width: "100%",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f3f4f6",
      },
    },
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <button
          className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow"
          onClick={handleOpenModal}
        >
          + Add User
        </button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        customStyles={customStyles}
        pagination
        highlightOnHover
        striped
      />
      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add User</h2>
            <form onSubmit={handleAdd}>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full text-black mb-4"
                placeholder="Enter user name"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              />
              <input
                type="email"
                className="border border-gray-300 p-2 rounded-lg w-full text-black mb-4"
                placeholder="Enter user email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <select
                className="border border-gray-300 p-2 rounded-lg w-full text-black mb-4"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="">Select Role</option>
                {roles.map((role, i) => (
                  <option key={i} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-gray-700 px-4 py-2 rounded"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit User</h2>
            <form onSubmit={handleSave}>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full text-black mb-4"
                placeholder="Edit user name"
                value={editUser}
                onChange={(e) => setEditUser(e.target.value)}
              />
              <input
                type="email"
                className="border border-gray-300 p-2 rounded-lg w-full text-black mb-4"
                placeholder="Edit user email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
              <select
                className="border border-gray-300 p-2 rounded-lg w-full text-black mb-4"
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
              >
                {roles.map((role, i) => (
                  <option key={i} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-gray-700 px-4 py-2 rounded"
                  onClick={handleCloseEditModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;