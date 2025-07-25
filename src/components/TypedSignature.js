import React, { useState } from 'react';
import '@fontsource/pacifico';     // Font 1
import '@fontsource/satisfy';      // Font 2
import '@fontsource/great-vibes';  // Font 3

const fontStyles = [
  { name: 'Pacifico', style: { fontFamily: 'Pacifico, cursive' } },
  { name: 'Satisfy', style: { fontFamily: 'Satisfy, cursive' } },
  { name: 'Great Vibes', style: { fontFamily: 'Great Vibes, cursive' } },
];

const TypedSignature = ({ userId }) => {
  const [text, setText] = useState('');
  const [selectedFont, setSelectedFont] = useState(null);

  const handleUpdate = async () => {
    if (!text || !selectedFont) {
      alert("Please type signature and select a style");
      return;
    }

    const res = await fetch('http://localhost:5000/api/signature/save-text-signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        signatureText: text,
        fontFamily: selectedFont
      })
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
    } else {
      alert("Error: " + data.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Type your signature</h2>
      <input
        type="text"
        value={text}
        placeholder="Enter your name"
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
      />

      <div style={styles.fontGrid}>
        {fontStyles.map((font, index) => (
          <div
            key={index}
            onClick={() => setSelectedFont(font.name)}
            style={{
              ...styles.card,
              ...font.style,
              border: selectedFont === font.name ? '2px solid teal' : '1px solid #ccc'
            }}
          >
            {text || "Your Signature"}
          </div>
        ))}
      </div>

      <button style={styles.button} onClick={handleUpdate}>Update</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: 'auto',
    padding: 20,
    textAlign: 'center'
  },
  input: {
    padding: 10,
    width: '100%',
    marginBottom: 20,
    fontSize: 18
  },
  fontGrid: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 20
  },
  card: {
    width: 200,
    height: 80,
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    cursor: 'pointer',
    background: '#fff'
  },
  button: {
    padding: '10px 30px',
    backgroundColor: 'teal',
    color: '#fff',
    border: 'none',
    borderRadius: 25,
    fontSize: 16,
    cursor: 'pointer'
  }
};

export default TypedSignature;
