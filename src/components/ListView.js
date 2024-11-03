// components/ListView.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTopRated } from '../store/redux/apiSlice';
import { getTopRated } from '../services/api/api';

const ListView = () => {
    const dispatch = useDispatch();
    const topRatedMovies = useSelector((state) => state.api.topRated);

    useEffect(() => {
        getTopRated()
            .then((response) => {
                dispatch(setTopRated(response.data));
            })
            .catch((error) => {
                console.error("Error fetching top-rated data:", error);
            });
    }, [dispatch]);

    return (
        <div>
            <h2>Top Rated Movies</h2>
            <ul>
                {topRatedMovies.map((movie) => (
                    <li key={movie.id}>{movie.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListView;
