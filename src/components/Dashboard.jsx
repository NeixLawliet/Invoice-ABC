// src/components/Dashboard.js
import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Data KPI
  const kpiData = [
    { title: 'Total Invoice', value: 1200 },
    { title: 'Total Pengguna', value: 350 },
    { title: 'Invoice Belum Bayar', value: 75 },
  ];

  // Data grafik contoh
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    datasets: [
      {
        label: 'Invoice per Bulan',
        data: [100, 150, 120, 170, 160, 190],
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    datasets: [
      {
        label: 'Pengguna Baru',
        data: [20, 40, 35, 50, 45, 60],
        fill: false,
        borderColor: 'rgba(153,102,255,1)',
        tension: 0.1,
      },
    ],
  };

  const pieData = {
    labels: ['Lunas', 'Belum Bayar'],
    datasets: [
      {
        label: 'Status Invoice',
        data: [1125, 75],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverOffset: 4,
      },
    ],
  };

  // Data tabel contoh
  const tableData = [
    { id: 1, customer: 'John Doe', invoice: 'INV-001', amount: 500, status: 'Lunas' },
    { id: 2, customer: 'Jane Smith', invoice: 'INV-002', amount: 300, status: 'Belum Bayar' },
    { id: 3, customer: 'Mark Johnson', invoice: 'INV-003', amount: 450, status: 'Lunas' },
  ];

  return (
    <div style={{ marginLeft: '270px', padding: '20px' }}>
      <h4>Dashboard</h4>

      {/* KPI Cards */}
      <Row className="mb-4">
        {kpiData.map((kpi) => (
          <Col md={4} key={kpi.title}>
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <Card.Title>{kpi.title}</Card.Title>
                <h3>{kpi.value}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Grafik */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Card.Title>Invoice per Bulan</Card.Title>
              <Bar data={barData} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Card.Title>Pengguna Baru per Bulan</Card.Title>
              <Line data={lineData} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Card.Title>Status Invoice</Card.Title>
              <Pie data={pieData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabel Data */}
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Data Invoice</Card.Title>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Invoice</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.customer}</td>
                  <td>{row.invoice}</td>
                  <td>${row.amount}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
