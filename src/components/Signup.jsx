// import React, { useState } from 'react';
// import axios from 'axios';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
      
//       const payload = { ...formData, role: 'admin' }; 
//      console.log(payload)
//       const response = await axios.post(
//         'http://localhost:3000/api/auth/register',
//         payload,
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       if (response.status === 201 || response.status === 200) {
//         setSuccess('Registration successful! You can now log in.');
//         setFormData({ name: '', email: '', password: '' });
//       }
//     } catch (err) {
//       if (err.response) {
//         setError(err.response.data.message || 'Registration failed');
//       } else {
//         setError('Network error: Unable to reach the server');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-full">
//       <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//       <form 
//         onSubmit={handleSubmit} 
//         className="bg-white p-6 rounded shadow-md w-80"
//       >
//         {error && <p className="text-red-500 mb-3">{error}</p>}
//         {success && <p className="text-green-500 mb-3">{success}</p>}

//         <input 
//           type="text" 
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Username" 
//           className="mb-3 w-full px-3 py-2 border rounded" 
//           required
//         />

//         <input 
//           type="email" 
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email" 
//           className="mb-3 w-full px-3 py-2 border rounded" 
//           required
//         />

//         <input 
//           type="password" 
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password" 
//           className="mb-3 w-full px-3 py-2 border rounded" 
//           required
//         />

//         <button 
//           type="submit" 
//           className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
//           disabled={loading}
//         >
//           {loading ? 'Signing Up...' : 'Sign Up'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // adjust path if needed

const Signup = () => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { name, email, password } = formData;
    const result = await signup(name, email, password, 'admin');
    if (result.success) {
      setSuccess(result.message);
      setFormData({ name: '', email: '', password: '' });
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded shadow-md w-80"
      >
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-500 mb-3">{success}</p>}

        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Username" 
          className="mb-3 w-full px-3 py-2 border rounded" 
          required
        />

        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email" 
          className="mb-3 w-full px-3 py-2 border rounded" 
          required
        />

        <input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password" 
          className="mb-3 w-full px-3 py-2 border rounded" 
          required
        />

        <button 
          type="submit" 
          className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;