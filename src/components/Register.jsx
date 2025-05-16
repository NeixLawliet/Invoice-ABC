import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://192.168.100.72:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert('Pendaftaran berhasil!');
      navigate('/signin');
      
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex p-0">
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-start px-5">
        <img src="/logoabc.png" alt="Logo" style={{ width: 220, marginBottom: '2rem', marginTop: '3rem' }} />

        <h4 className="mb-2">Register for</h4>
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control border-0 border-bottom rounded-0"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
          <button type="submit" className="btn w-100 text-white fw-bold" style={{ backgroundColor: '#8e24aa' }}>
            REGISTER
          </button>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </form>

        <div className="mt-5">
          <small className="text-muted">&copy; ABCGROUP</small>
        </div>
      </div>

      <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
        <img src="/gambar.png" alt="Register Illustration" style={{ maxWidth: '100%' }} />
      </div>
    </div>
  );
}

export default Register;
