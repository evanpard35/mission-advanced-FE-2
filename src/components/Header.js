import React, { useState, useEffect } from 'react';
import './Header.css';
import { FaUser, FaStar, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!mobileMenuVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); // Menghapus user dari localStorage
        navigate('/login'); // Arahkan ke halaman login
    };

    const handleMyListClick = () => {
        navigate('/my-list');
    };

    const handleSeriesClick = () => {
        navigate('/');
    };

    const handleFilmClick = () => {
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.profile-menu') && !event.target.closest('.mobile-menu')) {
                setDropdownVisible(false);
                setMobileMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src="./img/Vector.svg" alt="Logo" className="logo" />
                <span className="brand-name">CHILL</span>
                <button className="nav-link" onClick={handleSeriesClick}>Series</button>
                <button className="nav-link" onClick={handleFilmClick}>Film</button>
                <button className="nav-link" onClick={handleMyListClick}>Daftar Saya</button>
            </div>
            <div className="navbar-right">
                <div className="profile-menu" onClick={toggleDropdown}>
                    <img src="./img/avtar.png" alt="Profile" className="profile-icon" />
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <button className="dropdown-item">
                                <FaUser /> Profil Saya
                            </button>
                            <button className="dropdown-item">
                                <FaStar /> Ubah Premium
                            </button>
                            <button className="dropdown-item" onClick={handleLogout}>
                                <FaSignOutAlt /> Keluar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
