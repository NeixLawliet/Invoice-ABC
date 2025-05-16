import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Customer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://192.168.100.72:5000/customer/customers', {
          headers: { Authorization: `Bearer ${token}` }
        });        
        setCustomers(response.data);
      } catch (error) {
        console.error('Gagal mengambil data customer:', error);
      }
    };

    fetchCustomers();
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = customers.map(customer =>
      customer.id === id ? { ...customer, status: newStatus } : customer
    );
    setCustomers(updated);
  };

  return (
    <div className="container mt-5">
      <h4 className="mb-4">Daftar Customer</h4>
      <table className="table table-bordered table-striped">
        <thead className="text-white bg-purple">
          <tr>
            <th>No. Invoice</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.invoice_number}</td>
              <td>{customer.nama}</td>
              <td>{customer.alamat}</td>
              <td>
                <select
                  className={`form-select ${
                    customer.status === 'Lunas'
                      ? 'bg-success text-white'
                      : customer.status === 'Overdue'
                      ? 'bg-warning text-dark'
                      : 'bg-danger text-white'
                  }`}
                  value={customer.status}
                  onChange={(e) => updateStatus(customer.id, e.target.value)}
                >
                  <option value="Lunas">Lunas</option>
                  <option value="Belum Lunas">Belum Lunas</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
