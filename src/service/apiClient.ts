import axios from 'axios';
import {BASE_URL} from './config.ts';
import {apis} from '../utils/apis.ts';
import {getAccessToken, getRefreshToken, setAccessToken} from './storage.ts';

const apiClient = axios.create({
    baseURL: BASE_URL,
});

// request interceptor
apiClient.interceptors.request.use(
    async config => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error),
);

// response interceptor
apiClient.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 403) {
            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {
                const {data} = await axios.post(apis.refreshTokenApi, refreshToken);
                setAccessToken(data?.accessToken);
                error.config.headers.Authorization = `Bearer ${data?.accessToken}`;
                return axios(error.config);
            } catch (refreshTokenError: any) {
                return Promise.reject(refreshTokenError);
            }
        }

        return Promise.reject(error);
    },
);

export default apiClient;
