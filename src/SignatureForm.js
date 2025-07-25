import React, { useState } from 'react';

const SignatureForm = () => {
  const [fileName, setFileName] = useState('');
  const [coordinates, setCoordinates] = useState([{ x: 10, y: 20 }]); // Dummy data for now

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/signature/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName, coordinates })
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button type="submit">Save Signature</button>
    </form>
  );
};

export default SignatureForm;
