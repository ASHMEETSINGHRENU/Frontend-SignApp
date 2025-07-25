import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css'; 
const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('https://backendsignapp.vercel.app/api/auth/login', { // 👈 update this URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      navigate("/pdf-signer");
      alert("Login successful");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Network or server error");
  }
};


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="title">Welcome Back</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p className="note">Don't have an account? <a href="/register">Register</a></p>
      </form>
       {/*  Animated background */}
    <div className="bubbles">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    </div>
  );
};

export default Login;
