import axios from 'axios';

const baseAxios = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

baseAxios.interceptors.request.use(
	(config) => {
		config.headers.Authorization = `bearer ${localStorage.getItem('token')}`;
		return config;
	},
	(error) => { //402 -> function force logout
		return Promise.reject(error);
	},
);

// status code 402 -> expire token
// baseAxios.interceptors.response.use

export default baseAxios;
