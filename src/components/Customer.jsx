import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Customer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.100.72:5000/api/invoices/customers') // Ganti dengan port backend kamu
      .then(res => {
        const today = new Date();

        const updated = res.data.map((item, index) => {
          const dueDate = new Date(item.due_date);
          let status = 'Belum Lunas';

          if (dueDate < today) {
            status = 'Overdue';
          }

          return {
            id: index + 1,
            invoice: item.invoice_number,
            nama: item.bill_to,
            alamat: item.ship_to,
            status: status
          };
        });

        setCustomers(updated);
      })
      .catch(err => console.error(err));
  }, []);

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
              <td>{customer.invoice}</td>
              <td>{customer.nama}</td>
              <td>{customer.alamat}</td>
              <td>
                <span className={`badge ${
                  customer.status === 'Lunas' ? 'bg-success' :
                  customer.status === 'Overdue' ? 'bg-warning' : 'bg-danger'
                }`}>
                  {customer.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
