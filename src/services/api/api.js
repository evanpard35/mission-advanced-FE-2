import axios from 'axios';

// Ambil URL API dari .env
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Fungsi untuk mengambil continueWatching data
// export const getContinueWatching = () => {
//     return api.get('/continueWatching');
// };

// Fungsi untuk mengambil topRated data
export const getTopRated = () => {
    return api.get('/topRated');
};

export default api;
