import axios, { AxiosRequestConfig } from 'axios';
import { authService } from '../api/auth.service';

const httpClient = axios.create({
    baseURL: '/app',
});

httpClient.interceptors.request.use((config) => {
    const token = authService.token;
    if (token) {
        setAuthHeader(token, config);
    }

    return config;
});

function setAuthHeader(token: string, config: AxiosRequestConfig) {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers = {
            Authorization: `Bearer ${token}`
        };
    }
}

export default httpClient;