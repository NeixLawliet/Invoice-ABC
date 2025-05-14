import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InvoiceForm({ contentRef }) {
  const [logo, setLogo] = useState(null);
  const [items, setItems] = useState([{ description: "", quantity: 1, rate: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [currency, setCurrency] = useState("IDR");

  const [invoiceDate, setInvoiceDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);

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

  const handleSubmit = () => {
  
    if (items.length === 0 || subtotal === 0) {
      alert("Harap isi item dan pastikan subtotal tidak nol.");
      return;
    }
  
    const invoiceData = {
      logo,
      items,
      discount,
      currency,
      subtotal,
      total,
      invoiceDate,
      dueDate,
    };
  
    console.log("Invoice submitted:", invoiceData);
    alert("Invoice submitted!");
    
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = () => setItems([...items, { description: "", quantity: 1, rate: 0 }]);

  const handleRemoveItem = (indexToRemove) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === "description" ? value : Number(value);
    setItems(newItems);
  };

  const calculateAmount = (quantity, rate) => quantity * rate;

  const subtotal = items.reduce(
    (total, item) => total + calculateAmount(item.quantity, item.rate),
    0
  );

  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

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
            <textarea
              className="form-control mt-2" style={{height:'60px', width:'300px'}}
              placeholder="Who is this from?"
            ></textarea>
          </div>
          <div className="col-md-6" style={{width:'300px', marginLeft:'auto'}}>
            <h2 className="fw-bold text-end">INVOICE</h2>
            <div className="input-group mb-3" style={{width:'200px', marginLeft:'auto'}}>
              <span className="input-group-text">#</span>
              <input type="text" className="form-control text-end" defaultValue={1}/>
            </div>
            <div className="d-flex flex-column gap-2 mt-5 pt-5">
              <div className="d-flex justify-content-between align-items-center" style={{width:'230px', marginLeft:'auto'}}>
                <label className="me-3 text-end ms-auto">Date</label>
                <DatePicker
                  selected={invoiceDate}
                  onChange={(date) => setInvoiceDate(date)}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date"
                  style={{width: '180px'}}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <label className="me-3 text-end ms-auto">Payment Terms</label>
                <input type="text" className="form-control" style={{width:'180px'}}/>
              </div>
              <div className="d-flex justify-content-between align-items-center" style={{width:'255px', marginLeft:'auto'}}>
                <label className="me-3 text-end ms-auto">Due Date</label>
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select due date"
                  style={{width: '180px'}}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <label className="me-3 text-end ms-auto">PO Number</label>
                <input type="text" className="form-control" style={{width:'180px'}}/>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Bill To</label>
            <input type="text" className="form-control" placeholder="Who is this to?" />
          </div>
          <div className="col-md-6">
            <label>Ship To</label>
            <input type="text" className="form-control" placeholder="(optional)" />
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
          className="btn btn-outline-primary mb-3"
          style={{ borderColor: "#a000c8", color: "#a000c8" }}
          onClick={handleAddItem}
        >
          + Line Item
        </button>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label>Notes</label>
              <textarea
                className="form-control"
                placeholder="Notes - Any relevant information not already covered"
              ></textarea>
            </div>
            <div className="mb-3">
              <label>Terms</label>
              <textarea
                className="form-control"
                placeholder="Terms and conditions - Late fees, payment method, delivery schedule"
              ></textarea>
            </div>
          </div>
          <div className="col-md-6">
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
          <div className="d-flex justify-content-end">
            <button
               className="btn btn-primary w-25 mt-2"
               onClick={handleSubmit}
                >
                  Submit
            </button>
          </div>
        </div>
      </div>

      <div
        className="d-flex flex-column align-items-start mt-5 me-3"
        style={{ width: "200px" }}
      >
        <button className="btn btn-success w-100 mb-2" onClick={handleDownload}>
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
    </div>
  );
}

export default InvoiceForm;
