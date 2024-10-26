import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { getContinueWatching, getTopRated } from './services/api/api'; // Panggil API dari api.js
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Footer from './components/Footer';
import MyListPage from './components/MyListPage';
import './App.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <Header />}
      {children}
      {!isAuthPage && <Footer />}
    </>
  );
};

const App = () => {
  const [myMovies, setMyMovies] = useState([]);
  // const [continueWatching, setContinueWatching] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  const addToMyList = (movie) => {
    setMyMovies((prevMovies) => {
      if (!prevMovies.find((m) => m.title === movie.title)) {
        return [...prevMovies, movie];
      }
      return prevMovies;
    });
  };

  const removeFromMyList = (movieTitle) => {
    setMyMovies((prevMovies) => prevMovies.filter(movie => movie.title !== movieTitle));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const continueWatchingResponse = await getContinueWatching();
        const topRatedResponse = await getTopRated();
        // setContinueWatching(continueWatchingResponse.data);
        setTopRated(topRatedResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated() ? (
              <div className="App">
                <div className="hero">
                  <img src={'./img/dutyafterschool.png'} alt="Duty After School" className="hero-image" />
                  <div className="hero-content">
                    <h1>Duty After School</h1>
                    <p>Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusaasaan, </p>
                    <p>Departemen pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah.</p>
                    <p>Mereka pun segera menjadi pejuang garis depan dalam perang.</p>
                    <button className="btn-mulai">Mulai</button>
                    <button className="btn-selengkapnya">Selengkapnya</button>
                    <button className="btn-umur">18+</button>
                  </div>
                </div>

                {/* <Carousel title="Melanjutkan Tonton Film" movies={continueWatching} addToMyList={addToMyList} /> */}
                <Carousel title="Top Rating Film dan Series Hari Ini" movies={topRated} addToMyList={addToMyList} />
              </div>
            ) : (
              <Navigate to="/login" />
            )}
          />

          <Route
            path="/my-list"
            element={isAuthenticated() ? (
              <div>
                <MyListPage myMovies={myMovies} removeFromMyList={removeFromMyList} />
              </div>
            ) : (
              <Navigate to="/login" />
            )}
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
