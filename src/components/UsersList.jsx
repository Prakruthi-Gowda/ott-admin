import React from 'react';
import DataTable from 'react-data-table-component';
import { useUsers } from '../context/UsersContext';

const columns = [
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
  {
    name: 'Phone',
    selector: row => row.phone,
    sortable: true,
  },
];

const customStyles = {
  table: {
    style: {
      width: '100%',
    },
  },
  headRow: {
    style: {
      backgroundColor: '#f3f4f6',
    },
  },
};

const UsersList = () => {
  const { users, loading, error } = useUsers();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Users List</h2>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error fetching users.</p>}
      {users && (
        <DataTable
          columns={columns}
          data={users}
          customStyles={customStyles}
          pagination
          highlightOnHover
          striped
        />
      )}
    </div>
  );
};

export default UsersList;