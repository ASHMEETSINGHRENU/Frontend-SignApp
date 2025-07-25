import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import TypedSignature from './components/TypedSignature';
import PDFSigner from './components/PDFSigner';

function App() {
  const [user, setUser] = useState(null);

  console.log("User in App.js:", user); // ✅ Debug user state

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/pdf-signer" /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/typed-signature"
          element={
            user ? <TypedSignature userId={user._id} /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/pdf-signer"
          element={
            user ? <PDFSigner user={user} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
