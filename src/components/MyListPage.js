import React from 'react';
import Card from './Card';
import './MyListPage.css';

const MyListPage = ({ myMovies, removeFromMyList }) => {
    return (
        <div className="my-list-page">
            <h2>Daftar Saya</h2>
            <div className="movie-list">
                {myMovies.map((movie, index) => (
                    <div key={index}>
                        <Card movie={movie} disableModal={true} />
                        <button className="delete-button" onClick={() => removeFromMyList(movie.title)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyListPage;
