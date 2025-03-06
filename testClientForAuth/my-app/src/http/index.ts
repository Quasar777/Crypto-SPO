import axios from "axios";

export const API_URL = 'http://localhost:5030/api'

const $api = axios.create({
    withCredentials: true, // чтоб куки автоматически цеплялись
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api;