import { createSlice } from '@reduxjs/toolkit';

const apiSlice = createSlice({
    name: 'api',
    initialState: {
        topRated: [],
        users: [],
        myMovies: [],
        loading: true,
    },
    reducers: {
        setTopRated: (state, action) => {
            state.topRated = action.payload;
            state.loading = false;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        addMovieToMyList: (state, action) => {
            state.myMovies.push(action.payload);
        },
        removeMovieFromMyList: (state, action) => {
            state.myMovies = state.myMovies.filter(movie => movie.title !== action.payload);
        },
    },
});

export const { setTopRated, setUsers, addMovieToMyList, removeMovieFromMyList } = apiSlice.actions;
export default apiSlice.reducer;
