import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTopRated, addMovieToMyList, removeMovieFromMyList } from './store/redux/apiSlice';
import { getTopRated } from './services/api/api';
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
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((state) => state.api.topRated);
  const myMovies = useSelector((state) => state.api.myMovies || []); 

  const addToMyList = (movie) => {
    dispatch(addMovieToMyList(movie)); 
  };

  const removeFromMyList = (movieTitle) => {
    dispatch(removeMovieFromMyList(movieTitle)); 
  };

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await getTopRated();
        dispatch(setTopRated(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTopRatedMovies();
  }, [dispatch]);

  const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

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

                <Carousel title="Top Rating Film dan Series Hari Ini" movies={topRatedMovies} addToMyList={addToMyList} />
              </div>
            ) : (
              <Navigate to="/login" />
            )}
          />

          <Route
            path="/my-list"
            element={isAuthenticated() ? (
              <MyListPage myMovies={myMovies} removeFromMyList={removeFromMyList} />
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
