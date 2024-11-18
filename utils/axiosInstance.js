const axios = require('axios');

const baseUrl = process.env.BASE_URL || 'localhost';

const createAxiosInstance = (port) => {
    return axios.create({
        baseURL: `http://${baseUrl}:${port}`,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const axiosUser = createAxiosInstance(process.env.PORT_USER);

module.exports = { axiosUser };