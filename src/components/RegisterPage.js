import React, { useState } from 'react';
import './Auth.css';
import { registerUser } from '../services/api/userService';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password dan konfirmasi password tidak cocok!");
            return;
        }

        const userData = { username, password };

        try {
            // Simpan user ke mockAPI.io
            await registerUser(userData);

            alert("Registrasi berhasil! Silakan login.");
            window.location.href = '/login';
        } catch (error) {
            alert("Registrasi gagal, silakan coba lagi.");
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
                <p className="auth-subtitle-daftar">Daftar</p>
                <p className="auth-subtitle">Selamat datang!</p>
                <form onSubmit={handleRegister}>
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
                    <div className="auth-input-group">
                        <label htmlFor="confirm-password">Konfirmasi Kata Sandi</label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Masukkan kata sandi"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="auth-links">
                        <a href="/login">Sudah punya akun? Masuk</a>
                    </div>
                    <button type="submit" className="auth-btn">Daftar</button>
                    <div className="auth-or">Atau</div>
                    <button type="button" className="auth-btn-google">
                        <i className="fab fa-google"></i> Daftar dengan Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
