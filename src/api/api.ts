import axios from 'axios';
import useAuthStore from '../stores/useAuthStore';

const BASE_URL = window.__ENV__?.VITE_API_BASE_URL || '/';

export const axiosNoInterceptor = axios.create({
    baseURL: BASE_URL,
});

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

const getNewToken = async () => {
    const { accessToken, refreshToken } = useAuthStore.getState();
    const payload = { accessToken, refreshToken };
    const response = await axiosNoInterceptor.post('/api/v1/auth/login/refresh', payload);

    if (response.data.success) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken, memberId } = response.data.data;
        useAuthStore.getState().setTokens(newAccessToken, newRefreshToken, memberId);
        return newAccessToken;
    } else {
        useAuthStore.getState().clearTokens();
        throw new Error(response.data.message);
    }
};

axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = 'application/json';
        console.log(`request config ${config.url} :`, config);
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`response ${response.config.url}: `,response);
        return response
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await getNewToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                useAuthStore.getState().clearTokens();
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);
