import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLanguage, FaSun, FaMoon } from 'react-icons/fa';

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); 

    const updateLoginStatus = () => {
        const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loginStatus);
    };

    useEffect(() => {
        updateLoginStatus();

        // Dengarkan event penyimpanan lokal
        window.addEventListener('storage', updateLoginStatus);
        return () => {
            window.removeEventListener('storage', updateLoginStatus);
        };
    }, []);

    const handleToggle = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    const handleLanguage = (lang) => {
        setSelectedLanguage(lang);
        setShowLanguageMenu(false);
    };

    const goToSignIn = () => {
        navigate('/signIn'); 
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate('/signIn');
    };

    return (
        <nav className="navbar navbar-expand-lg px-4" style={{ backgroundColor: darkMode ? '#222' : '#3f0147' }}>
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <img
                        src="/abc-group-teknologi.png"
                        alt="logo"
                        width="60"
                        style={{ marginRight: "10px", cursor: 'pointer' }}
                        onClick={() => navigate('/invoice')}
                    />
                </div>
                <div className="d-flex align-items-center gap-4 text-white">
                    <span onClick={() => navigate('/help')} style={{ cursor: 'pointer' }}>Help</span>
                    <span onClick={() => navigate('/history')} style={{ cursor: 'pointer' }}>History</span>
                    <span onClick={() => navigate('/information')} style={{ cursor: 'pointer' }}>Information</span>
                </div>
                <div className="d-flex align-items-center gap-3 position-relative">
                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    >
                        <FaLanguage />
                    </button>
                    {showLanguageMenu && (
                        <div className="dropdown-menu show position-absolute mt-5">
                            <button className="dropdown-item" onClick={() => handleLanguage('en')}>English</button>
                            <button className="dropdown-item" onClick={() => handleLanguage('id')}>Indonesia</button>
                        </div>
                    )}
                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={handleToggle}
                        title="Toggle dark mode"
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>

                    {isLoggedIn ? (
                        <button className="btn btn-danger btn-sm rounded-3 px-4" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <button className="btn btn-light btn-sm rounded-3 px-4" onClick={goToSignIn}>
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
