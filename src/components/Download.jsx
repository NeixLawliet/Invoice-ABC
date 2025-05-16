// Download.js
import React from "react";

function Download({ invoiceRef }) {
  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Invoice Preview</h3>
      <div className="border p-3">
        <div ref={invoiceRef}>
          <p className="text-muted">Isi invoice akan muncul di sini.</p>
        </div>
      </div>
    </div>
  );
}

export default Download;
