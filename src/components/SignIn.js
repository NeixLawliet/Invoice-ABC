import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Simpan token jika perlu
        localStorage.setItem('token', data.token);
        console.log('Token:', data.token);
        // Menyimpan token setelah login
        localStorage.setItem('token', data.token);

        // Navigasi ke halaman invoice
        navigate('/invoice');
      } else {
        alert(data.message || 'Login gagal!');
      }
    } catch (err) {
      alert('Terjadi kesalahan pada server.');
      console.error(err);
    }
    

  };
  

  return (
    <div className="container-fluid vh-100 d-flex p-0">
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-start px-5">
        <img src="/logo abc 1.png" alt="Logo" style={{ width: 220, marginBottom: '2rem' }} />

        <h4 className="mb-2">Welcome To</h4>
        <h2 className="mb-4 fw-bold" style={{ color: '#3f0147' }}>INVOICE ABC</h2>

        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 360 }}>
          <div className="mb-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control border-0 border-bottom rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
          <div className="mb-4 position-relative">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control border-0 border-bottom rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
          <button type="submit" className="btn w-100 text-white fw-bold" style={{ backgroundColor: '#8e24aa' }}>
            SIGN IN
          </button>
          <p className="mt-3 text-center">
            Don't have account? <a href="/register" style={{ textDecoration: 'underline', color: '#8e24aa' }}>Register</a>
          </p>
        </form>

        <div className="mt-5">
          <small className="text-muted">&copy; ABCGROUP</small>
        </div>
      </div>

      <div
        className="col-md-6 d-none d-md-flex justify-content-center align-items-center"
      >
        <img src="/gambar.png" alt="Login Illustration" style={{ maxWidth: '100%' }} />
      </div>
    </div>
  );
}

export default SignIn;
