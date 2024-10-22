import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './Components/Chat';
import RoomCred from './Components/RoomCred';
import { useGlobalUserContext } from './Context/UserContext';
import Login from './pages/Login';

const App = () => {
  console.log('app component');
  const { state } = useGlobalUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user data exists in local storage
    if (state.user) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Routes>
      {/* Route for home page */}
      <Route path="/login" element={<Login />} />
      {isLoggedIn && <Route exact path="/" element={<RoomCred />} />}

      {/* Route for login page */}
    </Routes>
  );
};

export default App;
