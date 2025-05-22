// src/Navbar.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLanguage, FaSun, FaMoon } from 'react-icons/fa';
import { DarkModeContext } from './DarkModeContext';
import { useLanguage } from './LanguageContext';


function Navbar() {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();
    const { language, changeLanguage } = useLanguage();
    const translations = {
        en: {
          dashboard: 'Dashboard',
          help: 'Help',
          history: 'History',
          information: 'Information',
          logout: 'Logout',
          signin: 'Sign In',
          confirmLogout: 'Confirm Logout',
          logoutQuestion: 'Are you sure you want to logout?',
          cancel: 'Cancel',
        },
        id: {
          dashboard: 'Beranda',
          help: 'Bantuan',
          history: 'Riwayat',
          information: 'Informasi',
          logout: 'Keluar',
          signin: 'Masuk',
          confirmLogout: 'Konfirmasi Keluar',
          logoutQuestion: 'Apakah Anda yakin ingin keluar?',
          cancel: 'Batal',
        },
      };      
    const t = translations[language];


    const updateLoginStatus = () => {
        const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loginStatus);
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleLogout = async () => {
        try {
            const currentToken = localStorage.getItem('token');
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');

            await fetch('http://192.168.100.72:5000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                }
            });

            console.log('Token berhasil direset');
            setIsLoggedIn(false);
            setShowLogoutModal(false);
            navigate('/signIn');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        updateLoginStatus();
        window.addEventListener('storage', updateLoginStatus);
        return () => {
            window.removeEventListener('storage', updateLoginStatus);
        };
    }, []);

    const handleLanguage = (lang) => {
        changeLanguage(lang); // dari context
        setShowLanguageMenu(false);
      };
      

    const goToSignIn = () => {
        navigate('/signIn');
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg px-4 ${darkMode ? 'dark-mode-navbar' : 'light-mode-navbar'}`}>
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
                        <span onClick={() => navigate('/dashboard')}>{t.dashboard}</span>
                        <span onClick={() => navigate('/help')}>{t.help}</span>
                        <span onClick={() => navigate('/history')}>{t.history}</span>
                        <span onClick={() => navigate('/information')}>{t.information}</span>
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
                            onClick={toggleDarkMode}
                            title="Toggle dark mode"
                        >
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </button>
                        {isLoggedIn ? (
                            <button className="btn btn-danger" onClick={handleLogoutClick}>
                                {t.logout}
                            </button>
                        ) : (
                            <button className="btn btn-light btn-sm" onClick={goToSignIn}>
                                {t.signin}
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Modal Logout */}
            {showLogoutModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title">{t.confirmLogout}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowLogoutModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to logout?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
