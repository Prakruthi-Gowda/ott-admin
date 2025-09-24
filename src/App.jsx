// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import Signup from './components/Signup';
// import Signin from './components/Signin';
// import Dashboard from './components/Dashboard';
// import Users from './components/Users';

// function App() {
//   return (
//     <Router>
//       <div className="flex h-screen bg-gray-100">
//         <Sidebar />
//         <div className="flex-1 flex flex-col overflow-hidden">
//           <Header />
//           <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/users" element={<Users />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/signin" element={<Signin />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Categories from "./components/Categories";
import Movies from "./components/Movies";
import { AuthProvider } from "./context/AuthContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { MovieProvider as MoviesProvider } from "./context/MovieContext";
import { UsersProvider } from "./context/UsersContext";

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CategoriesProvider>
          <MoviesProvider>
            <UsersProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Signin />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Layout Routes */}
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/movies" element={<Movies />} />
                  {/* Redirect unknown paths */}
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Route>
              </Routes>
            </UsersProvider>
          </MoviesProvider>
        </CategoriesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;