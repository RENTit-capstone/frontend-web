import { getAxiosInstance, getAxiosNoInterceptor } from './api';

export const login = async (email: string, password: string) => {
    const payload = { email, password };
    const response = await getAxiosNoInterceptor().post('/api/v1/auth/login', payload);
    if (!response.data.success) {
        throw new Error(response.data.message);
    }
    return response.data;
};

export const getData = async (url: string) => {
    const response = await getAxiosInstance().get(url);
    if (!response.data.success) {
        throw new Error(response.data.message);
    }
    return response.data;
};

export const postData = async (url: string, payload?: { [key: string]: unknown }) => {
    const response = await getAxiosInstance().post(url, payload);
    if (!response.data.success) {
        throw new Error(response.data.message);
    }
    return response.data;
};

export const putData = async (url: string, payload?: { [key: string]: unknown }) => {
    const response = await getAxiosInstance().put(url, payload);
    if (!response.data.success) {
        throw new Error(response.data.message);
    }
    return response.data;
};
