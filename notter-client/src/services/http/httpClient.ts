import axios, { AxiosRequestConfig } from 'axios';
import { AuthService } from '../user/auth';

const httpClient = axios.create({
    baseURL: '/app',
});

httpClient.interceptors.request.use((config) => {
    const token = AuthService.token;
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