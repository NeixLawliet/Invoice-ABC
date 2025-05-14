import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";


function InvoiceForm({ contentRef }) {
  const navigate = useNavigate();

  // State untuk form fields
  const [logo, setLogo] = useState(null);
  const [items, setItems] = useState([{ description: "", quantity: 1, rate: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [currency, setCurrency] = useState("IDR");

  const [invoiceDate, setInvoiceDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [billTo, setBillTo] = useState('');
  const [shipTo, setShipTo] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [notes, setNotes] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const getCurrencySymbol = (code) => {
    const symbols = {
      IDR: "Rp",
      USD: "$",
      EUR: "€", 
      GBP: "£",
      CAD: "$",
      AUD: "$",
      JPY: "¥",
      CNY: "¥",
    };
    return symbols[code] || code;
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // Maksimum 2MB
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Logo terlalu besar. Maksimum ukuran adalah 2MB.");
    }
  };

  // Add new item row
  const handleAddItem = () => setItems([...items, { description: "", quantity: 1, rate: 0 }]);

  // Remove item row
  const handleRemoveItem = (indexToRemove) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  // Update item data
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === "description" ? value : Number(value);
    setItems(newItems);
  };

  // Calculate the amount for each item
  const calculateAmount = (quantity, rate) => quantity * rate;

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + calculateAmount(item.quantity, item.rate),
    0
  );

  // Calculate discount amount
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit

    if (items.length === 0 || subtotal === 0) {
      alert("Harap isi item dan pastikan subtotal tidak nol.");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    const payload = {
      invoice_number: invoiceNumber,
      date: invoiceDate ? invoiceDate.toISOString().split("T")[0] : null,
      payment_terms: paymentTerms,
      due_date: dueDate ? dueDate.toISOString().split("T")[0] : null,
      po_number: poNumber,
      bill_to: billTo,
      ship_to: shipTo,
      total_amount: total,
      logo: logo,
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        amount: item.quantity * item.rate
      }))
    };

    try {
      const response = await fetch("http://localhost:5000/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`  // Token diambil dari localStorage
        },
        body: JSON.stringify(payload)
      });
  
      const text = await response.text(); // Membaca respons sebagai text
      try {
        const data = JSON.parse(text); // Mengonversi respons menjadi JSON
        if (response.ok) {
          console.log("Invoice berhasil disimpan:", data);
          alert("Invoice berhasil disimpan");
          navigate("/history");
        } else {
          console.error("Gagal menyimpan invoice:", data);
          alert(`Gagal: ${data.message}`);
        }
      } catch (err) {
        console.error("Gagal mengonversi respons ke JSON:", err);
        console.log("Respons yang diterima:", text);
        alert('Terjadi kesalahan saat menerima respons dari server.');
      }
    } catch (err) {
      console.error("Gagal mengirim data:", err);
      alert('Terjadi kesalahan saat mengirim data ke server.');
    }
    setShowConfirmModal(false);
  };

  // Handle PDF download
  const handleDownload = () => {
    const input = contentRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };

  return (
    <div className="d-flex" style={{ gap: "15px" }}>
      <div ref={contentRef} className="container border mt-3 p-4" style={{ flex: 1 }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div
                className="border d-flex align-items-center justify-content-center position-relative"
                style={{ height: "150px", width: "200px" }}
              >
                {logo ? (
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                ) : (
                  <span className="text-muted">+Add Your Logo</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="position-absolute w-100 h-100"
                  style={{ opacity: 0, cursor: "pointer" }}
                />
              </div>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Who is this from?"
                value={billTo}
                onChange={(e) => setBillTo(e.target.value)}
              />
            </div>
            <div className="col-md-6" style={{ width: '300px', marginLeft: 'auto' }}>
              <h2 className="fw-bold text-end">INVOICE</h2>
              <div className="input-group mb-3" style={{ width: '200px', marginLeft: 'auto' }}>
                <span className="input-group-text">#</span>
                <input
                  type="text"
                  className="form-control text-end"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </div>
              <div className="d-flex flex-column gap-2 mt-5 pt-5">
                <div className="d-flex justify-content-between align-items-center" style={{ width: '230px', marginLeft: 'auto' }}>
                  <label className="me-3 text-end ms-auto">Date</label>
                  <DatePicker
                    selected={invoiceDate}
                    onChange={(date) => setInvoiceDate(date)}
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select date"
                    style={{ width: '180px' }}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <label className="me-3 text-end ms-auto">Payment Terms</label>
                  <input
                    type="text"
                    className="form-control"
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    style={{ width: '180px' }}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center" style={{ width: '255px', marginLeft: 'auto' }}>
                  <label className="me-3 text-end ms-auto">Due Date</label>
                  <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select due date"
                    style={{ width: '180px' }}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <label className="me-3 text-end ms-auto">PO Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    style={{ width: '180px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label>Ship To</label>
              <input
                type="text"
                className="form-control"
                value={shipTo}
                onChange={(e) => setShipTo(e.target.value)}
                placeholder="(optional)"
              />
            </div>
          </div>

          <table className="table table-bordered">
            <thead style={{ backgroundColor: "#a000c8", color: "white" }}>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                      placeholder="Description of item"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <div className="input-group">
                      <span className="input-group-text">{getCurrencySymbol(currency)}</span>
                      <input
                        type="number"
                        className="form-control"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(index, "rate", e.target.value)
                        }
                      />
                    </div>
                  </td>
                  <td className="d-flex justify-content-between align-items-center">
                    <span>
                      {getCurrencySymbol(currency)}{" "}
                      {calculateAmount(item.quantity, item.rate).toLocaleString()}
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => handleRemoveItem(index)}
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="button"
            className="btn btn-outline-primary mb-3"
            style={{ borderColor: "#a000c8", color: "#a000c8" }}
            onClick={handleAddItem}
          >
            + Line Item
          </button>

          <div className="col-md-6 ms-auto">
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>
                {getCurrencySymbol(currency)} {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Total</span>
              <span>
                {getCurrencySymbol(currency)} {total.toLocaleString()}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Diskon</span>
              <div className="input-group" style={{ width: "150px" }}>
                <input
                  type="number"
                  className="form-control"
                  value={discount}
                  onChange={(e) => {
                    const discountPercent = Number(e.target.value);
                    setDiscount(discountPercent);
                  }}
                  min="0"
                  max="100"
                />
                <span className="input-group-text">%</span>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Amount Paid</span>
              <div className="input-group" style={{ width: "150px" }}>
                <span className="input-group-text">{getCurrencySymbol(currency)}</span>
                <input type="number" className="form-control" defaultValue={0} />
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <span>Balance Due</span>
              <span>
                {getCurrencySymbol(currency)} {total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button type="submit" className="btn btn-primary">
              Submit Invoice
            </button>
          </div>
        </form>
      </div>

      <div
        className="d-flex flex-column align-items-start mt-5 me-3"
        style={{ width: "200px" }}
      >
        <button 
          type="button"
          className="btn btn-success w-100 mb-2" 
          onClick={handleDownload}
        >
          Download
        </button>

        <select
          className="form-select mb-2"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="IDR">IDR (Rp)</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="CAD">CAD ($)</option>
          <option value="AUD">AUD ($)</option>
          <option value="JPY">JPY (¥)</option>
          <option value="CNY">CNY (¥)</option>
        </select>

        <a href="#" className="text-success text-center w-100">
          Save Default
        </a>
      </div>

      {/* Modal Konfirmasi Submit */}
      {showConfirmModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Konfirmasi Invoice</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
              </div>
              <div className="modal-body">
                <h6>Detail Invoice:</h6>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Invoice Number:</td>
                      <td>{invoiceNumber}</td>
                    </tr>
                    <tr>
                      <td>Bill To:</td>
                      <td>{billTo}</td>
                    </tr>
                    <tr>
                      <td>Ship To:</td>
                      <td>{shipTo}</td>
                    </tr>
                    <tr>
                      <td>Date:</td>
                      <td>{invoiceDate ? invoiceDate.toLocaleDateString() : '-'}</td>
                    </tr>
                    <tr>
                      <td>Due Date:</td>
                      <td>{dueDate ? dueDate.toLocaleDateString() : '-'}</td>
                    </tr>
                    <tr>
                      <td>Payment Terms:</td>
                      <td>{paymentTerms}</td>
                    </tr>
                    <tr>
                      <td>PO Number:</td>
                      <td>{poNumber}</td>
                    </tr>
                  </tbody>
                </table>

                <h6>Items:</h6>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Rate</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>{getCurrencySymbol(currency)} {item.rate.toLocaleString()}</td>
                        <td>{getCurrencySymbol(currency)} {calculateAmount(item.quantity, item.rate).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="row">
                  <div className="col-md-6 ms-auto">
                    <div className="d-flex justify-content-between">
                      <strong>Subtotal:</strong>
                      <span>{getCurrencySymbol(currency)} {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <strong>Discount ({discount}%):</strong>
                      <span>{getCurrencySymbol(currency)} {discountAmount.toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <strong>Total:</strong>
                      <span>{getCurrencySymbol(currency)} {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleConfirmSubmit}>Confirm Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceForm;
