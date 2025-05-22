// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
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
  const [kpiData, setKpiData] = useState([]);
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem("token");

  const fetchKpiData = async () => {
    try {
      const res = await fetch("http://192.168.100.72:5000/api/dashboard/kpi", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log('KPI API Response:', data);
      setKpiData([
        { title: "Total Invoice", value: data.totalInvoice },
        { title: "Unpaid Invoice", value: data.unpaidInvoice },
        { title: "Total New Customer", value: data.totalNewCustomer }
      ]);      
    } catch (error) {
      console.error("Gagal fetch KPI:", error);
    }
  };
  

  const fetchChartData = async () => {
    try {
      const res = await fetch("http://192.168.100.72:5000/api/dashboard/chart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
  
      // Mapping bar chart (Monthly Invoice)
      const invoiceMonths = data.monthlyInvoice.map((item) => `Bulan ${item.month}`);
      const invoiceTotals = data.monthlyInvoice.map((item) => item.total);
  
      const barChartData = {
        labels: invoiceMonths,
        datasets: [
          {
            label: 'Total Invoice',
            data: invoiceTotals,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      };
  
      // Mapping line chart (Monthly New Customers)
      const customerMonths = data.monthlyCustomers.map((item) => `Bulan ${item.month}`);
      const customerTotals = data.monthlyCustomers.map((item) => item.total);
  
      const lineChartData = {
        labels: customerMonths,
        datasets: [
          {
            label: 'New Customers',
            data: customerTotals,
            fill: false,
            borderColor: 'rgba(153, 102, 255, 1)',
            tension: 0.3,
          },
        ],
      };
  
      // Mapping pie chart (Invoice Status)
      const statusLabels = data.invoiceStatus.map((item) => item.status);
      const statusTotals = data.invoiceStatus.map((item) => item.total);
  
      const pieChartData = {
        labels: statusLabels,
        datasets: [
          {
            data: statusTotals,
            backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
          },
        ],
      };
  
      setBarData(barChartData);
      setLineData(lineChartData);
      setPieData(pieChartData);
    } catch (error) {
      console.error("Gagal fetch Chart:", error);
    }
  };
  

  const fetchInvoiceTable = async () => {
    try {
      const res = await fetch("http://192.168.100.72:5000/api/dashboard/table", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTableData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Gagal fetch Table:", error);
    }
  };

  useEffect(() => {
    fetchKpiData();
    fetchChartData();
    fetchInvoiceTable();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = tableData.filter(
      (row) =>
        row.customer.toLowerCase().includes(value) ||
        row.invoice_number.toLowerCase().includes(value) ||
        row.status.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="main-content">
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

      {/* Charts */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Card.Title>Monthly Invoice</Card.Title>
              <div style={{ height: '250px' }}>
                {barData && <Bar data={barData} options={{ maintainAspectRatio: false }} />}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Card.Title>New Customer Monthly</Card.Title>
              <div style={{ height: '250px' }}>
                {lineData && <Line data={lineData} options={{ maintainAspectRatio: false }} />}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Card.Title>Status Invoice</Card.Title>
              <div style={{ height: '250px' }}>
                {pieData && <Pie data={pieData} options={{ maintainAspectRatio: false }} />}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Data Invoice</Card.Title>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Cari berdasarkan customer, invoice, atau status"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

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
              {filteredData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.customer}</td>
                  <td>{row.invoice_number}</td>
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