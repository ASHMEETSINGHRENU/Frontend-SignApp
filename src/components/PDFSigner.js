import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './upload.css';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const PDFSigner = ({ user }) => {
  const [file, setFile] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [signature, setSignature] = useState(user.signatureText || '');
  const [fontFamily, setFontFamily] = useState(user.fontFamily || 'Pacifico');
  const [dragPos, setDragPos] = useState({ x: 50, y: 50 });
  const signatureRef = useRef(null);
  const pdfWrapperRef = useRef(null);

  const fonts = [
    'Great Vibes',
    'Dancing Script',
    'Pacifico',
    'Satisfy',
    'Shadows Into Light',
    'Caveat',
    'Homemade Apple',
    'Indie Flower',
  ];

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = () => setPdfData(reader.result);
      reader.readAsDataURL(uploadedFile);
    } else {
      alert('Only PDF files allowed.');
    }
  };

  const startDrag = (e) => {
    const sigEl = signatureRef.current;
    const pdfEl = pdfWrapperRef.current;

    const shiftX = e.clientX - sigEl.getBoundingClientRect().left;
    const shiftY = e.clientY - sigEl.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
      const bounds = pdfEl.getBoundingClientRect();
      const x = pageX - bounds.left - shiftX;
      const y = pageY - bounds.top - shiftY;
      setDragPos({ x, y });
    };

    const onMouseMove = (e) => {
      moveAt(e.pageX, e.pageY);
    };

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null;
    };
  };

  const handleDownload = async () => {
    const existingPdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
    const page = pdfDoc.getPages()[0];
    const { height } = page.getSize();

    page.drawText(signature, {
      x: dragPos.x,
      y: height - dragPos.y - 30,
      size: 24,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signed.pdf';
    a.click();
  };

  return (
  <div className="pdf-signer-container">
    <h2>Upload PDF and Add Signature</h2>

    <input type="file" accept="application/pdf" onChange={handleFileChange} />

    <br />
    <input
      type="text"
      value={signature}
      onChange={(e) => setSignature(e.target.value)}
      placeholder="Enter Signature"
    />
    <select
      value={fontFamily}
      onChange={(e) => setFontFamily(e.target.value)}
    >
      {fonts.map((f, i) => (
        <option key={i} value={f}>{f}</option>
      ))}
    </select>

    {pdfData && (
      <div className="pdf-wrapper" ref={pdfWrapperRef}>
        <Document file={pdfData}>
          <Page pageNumber={1} width={600} />
        </Document>

        <div
          className="signature"
          ref={signatureRef}
          onMouseDown={startDrag}
          style={{ top: dragPos.y, left: dragPos.x, fontFamily }}
        >
          {signature}
        </div>
      </div>
    )}

    {pdfData && (
      <button className="download-button" onClick={handleDownload}>
        Download Signed PDF
      </button>
    )}
  </div>
);
};

export default PDFSigner;
