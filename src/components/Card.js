import React, { useState } from 'react';
import './Card.css';

const Card = ({ movie, addToMyList, disableModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageClick = () => {
        if (!disableModal) {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="card">
            <img src={movie.img} alt={movie.title} onClick={handleImageClick} />
            <div className="card-content">
                <h3>{movie.title}</h3>
                <p>
                    <i className="fas fa-star"></i>
                    {movie.rating}
                </p>
            </div>

            {isModalOpen && (
                <div className="modal" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={movie.img} alt={movie.title} className="modal-img" />
                        <div className="modal-gradient"></div>
                        <h2 className="modal-title">{movie.title}</h2>
                        <div className="modal-buttons">
                            <button className="start-button">Mulai</button>
                            <button className="add-button" onClick={() => addToMyList(movie)}>+</button>
                        </div>
                        <p className="modal-description">{movie.description}</p>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
