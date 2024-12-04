import axios from "axios";

const apiCleint = axios.create({
    baseURL: 'localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiCleint;