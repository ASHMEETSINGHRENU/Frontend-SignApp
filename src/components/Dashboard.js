import React from 'react';

const Dashboard = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <h2>Welcome {user?.username}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
