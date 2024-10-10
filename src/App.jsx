import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Chat from './pages/Chat/Chat.jsx';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Config/firebase';
import { AppContext } from './context/AppContext.jsx';

const App = () => {
  const navigate = useNavigate();
  const { loadUserData } = useContext(AppContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          if (window.location.pathname === '/') {
            navigate('/profile');  // Navigate to profile page after login
          }
          await loadUserData(user.uid);
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      } else {
        navigate('/');  // Navigate to login page if no user is authenticated
      }
    });
  
    return () => unsubscribe(); // Clean up the subscription on component unmount
  }, [navigate, loadUserData]);
  

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfileUpdate />} />
      </Routes>
    </>
  );
};

export default App;
