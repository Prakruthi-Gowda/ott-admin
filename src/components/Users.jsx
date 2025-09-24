import React from 'react';
import UsersList from './UsersList';

const Users = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h2 className="text-2xl font-bold mb-4">Users</h2>
    <UsersList />
  </div>
);

export default Users;
