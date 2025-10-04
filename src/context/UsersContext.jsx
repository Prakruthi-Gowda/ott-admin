import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(users.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get('http://localhost:3001/api/admin/users/1', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedUsers = Array.isArray(res.data) ? res.data : [res.data];
        setUsers(fetchedUsers);
        localStorage.setItem('users', JSON.stringify(fetchedUsers));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (users.length === 0) {
      fetchUsers();
    }
  }, [users.length]);

  return (
    <UsersContext.Provider value={{ users, loading, error }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);