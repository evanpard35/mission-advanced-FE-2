import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../store/redux/apiSlice';
import { getUser } from '../services/api/userService';
import './Auth.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Mengambil data users dari Redux
    const users = useSelector((state) => state.api.users);

    // Memuat data users dari API jika belum ada di Redux
    useEffect(() => {
        const fetchUsers = async () => {
            if (users.length === 0) {  // Cek apakah data users belum ada di Redux
                try {
                    const allUsers = await getUser();  // Dapatkan semua pengguna dari MockAPI.io
                    dispatch(setUsers(allUsers));  // Simpan ke Redux
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            }
        };
        fetchUsers();
    }, [dispatch, users]);

    const handleLogin = (e) => {
        e.preventDefault();

        // Cek apakah username ada di dalam Redux state
        const user = users.find((u) => u.username === username);

        if (!user) {
            alert("Username tidak ditemukan.");
            return;
        }

        // Periksa kecocokan password
        if (user.password === password) {
            // Simpan data pengguna ke Redux atau lakukan pengaturan lain jika diperlukan
            localStorage.setItem('user', JSON.stringify(user));

            // Arahkan ke halaman utama
            navigate('/');
        } else {
            alert("Username atau kata sandi salah.");
        }
    };

    return (
        <div className="auth-container" style={{ backgroundImage: 'url(/img/background.jpeg)' }}>
            <div className="auth-form">
                <div className='design-logo'>
                    <div className="logos">
                        <img src="./img/Vector.svg" alt='logo' />
                    </div>
                    <div className="chills">
                        <img src="./img/CHILL.svg" alt='CHILL' />
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
