import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const customers = [
  { id: 1, invoice: 'INV-001', nama: 'Andi Saputra', alamat: 'Jl. Merdeka No.1', status: 'Lunas' },
  { id: 2, invoice: 'INV-002', nama: 'Budi Santoso', alamat: 'Jl. Mawar No.5', status: 'Belum Lunas' },
  { id: 3, invoice: 'INV-003', nama: 'Citra Dewi', alamat: 'Jl. Melati No.10', status: 'Lunas' },
];

const Customer = () => {
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
                <span className={`badge ${customer.status === 'Lunas' ? 'bg-success' : 'bg-danger'}`}>
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
