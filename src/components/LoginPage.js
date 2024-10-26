import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { getUser } from '../services/api/userService';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Ambil data user berdasarkan username dari mockAPI.io
            const users = await getUser(username);

            if (users.length === 0) {
                alert("Username tidak ditemukan.");
                return;
            }

            const userData = users[0];

            // Periksa kecocokan password
            if (userData.password === password) {
                // Simpan data pengguna ke localStorage
                localStorage.setItem('user', JSON.stringify(userData));

                // Arahkan ke halaman utama
                navigate('/');
            } else {
                alert("Username atau kata sandi salah.");
            }
        } catch (error) {
            alert("Terjadi kesalahan saat login, silakan coba lagi.");
        }
    };


    return (
        <div className="auth-container" style={{ backgroundImage: 'url(/img/background.jpeg)' }}>
            <div className="auth-form">
                <div className='design-logo'>
                    <div className="logos">
                        <img src="./img/Vector.svg" alt='logo'></img>
                    </div>
                    <div className="chills">
                        <img src="./img/CHILL.svg" alt='CHILL'></img>
                    </div>
                </div>
                <p className="auth-subtitle-masuk">Masuk</p>
                <p className="auth-subtitle">Selamat datang kembali!</p>
                <form onSubmit={handleLogin}>
                    <div className="auth-input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Masukkan username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="auth-input-group">
                        <label htmlFor="password">Kata Sandi</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Masukkan kata sandi"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="auth-links">
                        <a href="/register">Belum punya akun? Daftar</a>
                        <a href="/forgot-password">Lupa kata sandi?</a>
                    </div>
                    <button type="submit" className="auth-btn">Masuk</button>
                    <div className="auth-or">Atau</div>
                    <button type="button" className="auth-btn-google">
                        <i className="fab fa-google"></i> Masuk dengan Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
