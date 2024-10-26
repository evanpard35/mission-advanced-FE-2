import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

// Fungsi untuk mendapatkan user berdasarkan username
export const getUser = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            params: { username }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};
