import axios, { AxiosInstance } from 'axios';
import useAuthStore from '../stores/useAuthStore';

let axiosInstance: AxiosInstance | null = null;
let axiosNoInterceptor: AxiosInstance | null = null;


const getBaseUrl = () => window.__ENV__?.VITE_API_BASE_URL || '/';
console.log("test", getBaseUrl());

const getAxiosNoInterceptor = (): AxiosInstance => {
    if (!axiosNoInterceptor) {
        axiosNoInterceptor = axios.create({
            baseURL: getBaseUrl(),
        });
    }
    return axiosNoInterceptor
};

const getAxiosInstance = (): AxiosInstance => {
    if (!axiosInstance) {
        axiosInstance = axios.create({
            baseURL: getBaseUrl(),
        });

        axiosInstance.interceptors.request.use((config) => {
            const token = useAuthStore.getState().accessToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            config.headers['Content-Type'] = 'application/json';
            return config;
        });

        axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const newAccessToken = await getNewToken();
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return getAxiosInstance()(originalRequest);
                    } catch (err) {
                        return Promise.reject(err);
                    }
                }
                return Promise.reject(error);
            }
        );
    }
    return axiosInstance;
}

const getNewToken = async () => {
    const { accessToken, refreshToken } = useAuthStore.getState();
    const payload = { accessToken, refreshToken };
    const response = await getAxiosNoInterceptor().post('/api/v1/auth/login/refresh', payload);

    if (response.data.success) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken, memberId } = response.data.data;
        useAuthStore.getState().setTokens(newAccessToken, newRefreshToken, memberId);
        return newAccessToken;
    } else {
        useAuthStore.getState().clearTokens();
        throw new Error(response.data.message);
    }
};

export { getAxiosInstance, getAxiosNoInterceptor };