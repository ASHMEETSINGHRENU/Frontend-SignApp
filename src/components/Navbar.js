import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("signapp-user");
    setUser(null);
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.title}>SignApp</h2>
      <div>
        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <span style={styles.user}>Hello, {user.username}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    background: '#282c34',
    color: 'white'
  },
  title: {
    margin: 0
  },
  link: {
    margin: '0 10px',
    color: 'white',
    textDecoration: 'none'
  },
  user: {
    marginRight: '15px',
    fontWeight: 'bold'
  },
  button: {
    background: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px'
  }
};

export default Navbar;
