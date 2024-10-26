import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './Carousel.css';

const Carousel = ({ title, movies, addToMyList }) => {
    const carouselRef = useRef(null);
    const touchStartX = useRef(0);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        const touchEndX = e.touches[0].clientX;
        if (touchStartX.current - touchEndX > 50) {
            scrollRight(); // Swipe left
        } else if (touchEndX - touchStartX.current > 50) {
            scrollLeft(); // Swipe right
        }
    };

    return (
        <div className="carousel">
            <h2>{title}</h2>
            <button
                className="carousel-button left"
                onClick={scrollLeft}
                aria-label="Scroll left"
            >
                ❮
            </button>
            <div
                className="carousel-items"
                ref={carouselRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                {movies.map((movie, index) => (
                    <Card key={index} movie={movie} addToMyList={addToMyList} />
                ))}
            </div>
            <button
                className="carousel-button right"
                onClick={scrollRight}
                aria-label="Scroll right"
            >
                ❯
            </button>
        </div>
    );
};

Carousel.propTypes = {
    title: PropTypes.string.isRequired,
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    addToMyList: PropTypes.func.isRequired,
};

export default Carousel;
