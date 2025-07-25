import React, { useState } from 'react';
import './Register.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    gender: '',
    dob: '',
    age: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registration successful!");
        window.location.href = "/login";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-container">
<form className="register-form" onSubmit={handleRegister}>
  <h2>Create Account</h2>

  <div className="input-grid">
    <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
    <input type="text" name="gender" placeholder="Gender" required onChange={handleChange} />
    <input type="date" name="dob" placeholder="DOB" required onChange={handleChange} />
    <input type="number" name="age" placeholder="Age" required onChange={handleChange} />
    <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
    <input type="tel" name="phone" placeholder="Phone" required onChange={handleChange} />
    <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
    <input type="text" name="address" placeholder="Address" required onChange={handleChange} />
  </div>

  <button type="submit">Register</button>
  <p className="note">Already have an account? <a href="/login">Login</a></p>
</form>
    </div>
  );
};

export default Register;
