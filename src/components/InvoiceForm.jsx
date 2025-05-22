  import React, { useState, useEffect } from "react";
  import "bootstrap/dist/css/bootstrap.min.css";
  import jsPDF from "jspdf";
  import html2canvas from "html2canvas";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import { useNavigate } from "react-router-dom";
  import { useLanguage } from './LanguageContext';
  import  { useRef } from "react";


  function InvoiceForm({ contentRef }) {
    const navigate = useNavigate();

    const translations = {
      en : {
        addLogo : '+Add Your Logo',
        whoIsFrom : 'Who Is This From?',
        billto : 'Bill To',
        shipto : 'Ship To',
        date : 'Date',
        selecetDate : 'Select Date',
        paymentterms : 'Payment Terms',
        duedate :'Due Date',
        ponumber : 'PO Number',
        item : 'Item',
        quantity : 'Quantity',
        rate : 'Rate',
        amount : 'Amount',
        lineItem : '+Line Item',
        descriptionItem : 'Description Item',
        dIScount : 'Discount',
        amountPaid : 'Amount Paid',
        balanceDue : 'Balance Due',
        submitInvoice : 'Submit Invoice',
        pleaseFillin : 'Please fill in the items and make sure the subtotal is not zero.',
        invoiceSaved : 'Invoice saved successfully:',
        invoicesaved : 'Invoice Saved Successfully',
        failedSaved : 'Failed to Save Invoce:',
        faiLed : 'Failed',
        defaultData : 'Default data saved successfully',
        selectDuedate : 'Select Due Date',
        download : 'Download',
        saveDefault : 'Save Default',
 
      },
      id: {
        addLogo: '+Tambah Logo Anda',
        whoIsFrom: 'Dari Siapa Ini?',
        billto: 'Tagih Kepada',
        shipto: 'Kirim Kepada',
        date: 'Tanggal',
        selecetDate: 'Pilih Tanggal',
        paymentterms: 'Syarat Pembayaran',
        duedate: 'Jatuh Tempo',
        ponumber: 'Nomor PO',
        item: 'Item',
        quantity: 'Kuantitas',
        rate: 'Harga',
        amount: 'Jumlah',
        lineItem: '+Item Baru',
        descriptionItem: 'Deskripsi Item',
        dIScount: 'Diskon',
        amountPaid: 'Jumlah Dibayar',
        balanceDue: 'Sisa Tagihan',
        submitInvoice: 'Kirim Invoice',
        pleaseFillin: 'Harap isi item dan pastikan subtotal tidak nol.',
        invoiceSaved: 'Invoice berhasil disimpan:',
        invoicesaved: 'Invoice Berhasil Disimpan',
        failedSaved: 'Gagal Menyimpan Invoice:',
        faiLed: 'Gagal',
        defaultData: 'Data default berhasil disimpan',
        selectDuedate: 'Pilih Tanggal Jatuh Tempo',
        download: 'Unduh',
        saveDefault: 'Simpan Default',
        confirmInvoice: 'Konfirmasi Invoice'
      }
    };
    const {language} = useLanguage();
    const t = translations[language];

   

    // State untuk form fields
    const [logo, setLogo] = useState(null);
    const [items, setItems] = useState([{ description: "", quantity: 1, rate: 0 }]);
    const [discount, setDiscount] = useState(0);
    const [currency, setCurrency] = useState("IDR");

    const [invoiceDate, setInvoiceDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);

    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [billTo, setBillTo] = useState('');
    const [from, setFrom] = useState('');
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
        alert(t.pleaseFillin);
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
        from: from,
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
        const response = await fetch("http://192.168.100.72:5000/api/invoices", {
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
            console.log(t.invoiceSaved, data);
            alert(t.invoicesaved);
            navigate("/history");
          } else {
            console.error(t.failedSaved, data);
            alert(`${t.failedSaved} ${data.message}`);
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
    const previewRef = useRef(null);
    const handleDownload = async () => {
      const element = previewRef.current;
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
    
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice-${invoiceNumber || 'no-number'}.pdf`);
    };

    useEffect(() => {
      const savedDefaults = JSON.parse(localStorage.getItem("invoiceDefaults"));
      if (savedDefaults) {
        setFrom(savedDefaults.from || "");
        setBillTo(savedDefaults.billTo || "");
        setCurrency(savedDefaults.currency || "IDR");
        setDiscount(savedDefaults.discount || 0);
      }
    }, []);

    const handleSaveDefault = () => {
      const defaults = {
        from,
        billTo,
        currency,
        discount,
      };
      localStorage.setItem("invoiceDefaults", JSON.stringify(defaults));
      alert(t.defaultData);
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
                    <span className="text-justify">{t.addLogo}</span>
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
                  placeholder={t.whoIsFrom}
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div className="col-md-6" style={{ width: '50%', marginLeft: 'auto' }}>
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
                  <div className="d-flex justify-content-between align-items-center" style={{ width: '100%', marginLeft: 'auto' }}>
                    <label className="me-3 text-end ms-auto">{t.date}</label>
                    <DatePicker
                      selected={invoiceDate}
                      onChange={(date) => setInvoiceDate(date)}
                      className="form-control"
                      dateFormat="dd/MM/yyyy"
                      placeholderText={t.selecetDate}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="me-3 text-end ms-auto">{t.paymentterms}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                      style={{ width: '205px' }}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="me-3 text-end ms-auto" >{t.duedate}</label>
                    <DatePicker
                      selected={dueDate}
                      onChange={(date) => setDueDate(date)}
                      className="form-control"
                      dateFormat="dd/MM/yyyy"
                      placeholderText={t.selectDuedate}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="me-3 text-end ms-auto">{t.ponumber}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={poNumber}
                      onChange={(e) => setPoNumber(e.target.value)}
                      style={{ width: '205px' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">

            <div className="col-md-4">
                <label>{t.billto}</label>
                <input
                  type="text"
                  className="form-control"
                  value={billTo}
                  onChange={(e) => setBillTo(e.target.value)}
                  placeholder=""
                />
              </div>

              <div className="col-md-4">
                <label>{t.shipto}</label>
                <input
                  type="text"
                  className="form-control"
                  value={shipTo}
                  onChange={(e) => setShipTo(e.target.value)}
                  placeholder="(optional)"
                />
              </div>
            </div>

            <div className="invoice-container" style={{ marginTop: '24px' }}>
              <div className="invoice-header">
                <div>{t.item}</div>
                <div>{t.quantity}</div>
                <div>{t.rate}</div>
                <div>{t.amount}</div>
              </div>

              {items.map((item, index) => (
                <div className="invoice-row" key={index}>
                  <input
                    type="text"
                    className="invoice-input"
                    placeholder={t.descriptionItem}
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                  />
                  <input
                    type="number"
                    className="invoice-input short"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  />
                  <div className="invoice-rate-group">
                    <span className="currency-symbol">{getCurrencySymbol(currency)}</span>
                    <input
                      type="number"
                      className="invoice-input rate"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                    />
                  </div>
                  <div className="invoice-amount">
                    {getCurrencySymbol(currency)}{" "}
                    {calculateAmount(item.quantity, item.rate).toLocaleString()}
                    <button className="remove-btn" onClick={() => handleRemoveItem(index)}>
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>



            <button
              type="button"
              className="btn btn-outline-primary mt-3 mb-3"
              style={{ borderColor: "#a000c8", color: "#a000c8" }}
              onClick={handleAddItem}
            >
              {t.lineItem}
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
                <span>{t.dIScount}</span>
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
                <span>{t.amountPaid}</span>
                <div className="input-group" style={{ width: "150px" }}>
                  <span className="input-group-text">{getCurrencySymbol(currency)}</span>
                  <input type="number" className="form-control" defaultValue={0} />
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <span>{t.balanceDue}</span>
                <span>
                  {getCurrencySymbol(currency)} {total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-primary">
                {t.submitInvoice}
              </button>
            </div>
          </form>
          <div
  ref={previewRef}
  style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
>
  <div className="p-4 border" style={{ width: "800px", background: "white" }}>
    {/* Header section */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {/* Logo & From */}
      <div style={{ width: "50%" }}>
        <div style={{ width: "200px", height: "100px", marginBottom: "8px" }}>
          {logo && (
            <img
              src={logo}
              alt="Logo"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </div>
        <p style={{ margin: 0 }}>
          {from}
        </p>
      </div>

      {/* Invoice Info */}
      <div style={{ textAlign: "right", width: "50%" }}>
        <h2 style={{ marginBottom: "8px" }}>INVOICE</h2>

        {invoiceNumber && (
          <p style={{ margin: 0 }}>
            <strong>#</strong> {invoiceNumber}
          </p>
        )}
        <p className="align-right">
          <strong>Invoice Date:</strong>{" "}
          {invoiceDate ? invoiceDate.toLocaleDateString() : "-"}
        </p>
        <p className="align-right">
          <strong>Payment Terms:</strong> {paymentTerms || "-"}
        </p>
        <p className="align-right">
          <strong>Due Date:</strong>{" "}
          {dueDate ? dueDate.toLocaleDateString() : "-"}
        </p>
        <p className="align-right">
          <strong>PO Number:</strong> {poNumber || "-"}
        </p>
      </div>
    </div>

    {/* Bill To / Ship To */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "24px",
      }}
    >
      <div style={{ width: "48%" }}>
        <p style={{ margin: 0 }}>
          <strong>Bill To:</strong>
        </p>
        <p>{billTo}</p>
      </div>
      <div style={{ width: "48%", textAlign: "left" }}>
        <p style={{ margin: 0 }}>
          <strong>Ship To:</strong>
        </p>
        <p>{shipTo}</p>
      </div>
    </div>

    {/* Table */}
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "16px",
        fontSize: "14px",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#800080", color: "white" }}>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>{t.item}</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>{t.quantity}</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>{t.rate}</th>
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>{t.amount}</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i}>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {item.description}
            </td>
            <td
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              {item.quantity}
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {getCurrencySymbol(currency)} {item.rate}
            </td>
            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
              {getCurrencySymbol(currency)}{" "}
              {calculateAmount(item.quantity, item.rate).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Totals */}
    <div style={{ textAlign: "right", marginTop: "20px" }}>
      <p>
        <strong>Subtotal:</strong> {getCurrencySymbol(currency)}{" "}
        {subtotal.toLocaleString()}
      </p>
      <p>
        <strong>Total:</strong> {getCurrencySymbol(currency)}{" "}
        {total.toLocaleString()}
      </p>
      <p>
        <strong>{t.dIScount}:</strong> {discount}%
      </p>
      <p>
        <strong>{t.balanceDue}:</strong> {getCurrencySymbol(currency)}{" "}
        {total.toLocaleString()}
      </p>
    </div>
  </div>
</div>

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
            {t.download}
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

          <button 
            type="button"
            className="btn btn-success w-100"
            onClick={handleSaveDefault}
          >
            {t.saveDefault}
          </button>

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
