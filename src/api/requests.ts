import { axiosInstance, axiosNoInterceptor } from './api';

export const login = async (email: string, password: string) => {
    const payload = { email, password };
    const response = await axiosNoInterceptor.post('/api/v1/auth/login', payload);
    if (!response.data.success) {
        throw new Error(response.data.message);
    }
    return response.data;
};

export const getData = async (url: string) => {
    const response = await axiosInstance.get(url);
    if (!response.data.success) {
        throw new Error(response.data.message);
    }
    return response.data;
};

export const postData = async (url: string, payload?: { [key: string]: unknown }) => {
    const response = await axiosInstance.post(url, payload);
    if (!response.data.success) {
        throw new Error(response.data.message);
    }
    return response.data;
};

export const putData = async (url: string, payload?: { [key: string]: unknown }) => {
    const response = await axiosInstance.put(url, payload);
    if (!response.data.success) {
        throw new Error(response.data.message);
    }
    return response.data;
};
