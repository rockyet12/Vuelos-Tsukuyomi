import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:5251/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config =>{
    // También, asegúrate de que el nombre del token sea el mismo
    const token = localStorage.getItem('userToken'); 
    if (token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

export default apiClient;