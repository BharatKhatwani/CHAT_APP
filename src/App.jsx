import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'; // Import Routes and Route correctly
import Login from './pages/Login/Login.jsx';
import Chat from './pages/Chat/Chat.jsx';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase'; // Correct capitalization of 'config'
 // Firebase authentication

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {  // Fixed the comma and async placement
      if (user) {
        // Logic for authenticated users
        navigate('/chat');
      } else {
        navigate('/');  // Navigate to login page if no user is authenticated
      }
    });
  }, [navigate]);  // Added navigate as a dependency

  return (
    <>
      <ToastContainer />
      <Routes> {/* Use Routes without an additional Router */}
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfileUpdate />} />
      </Routes>
    </>
  );
};

export default App;
