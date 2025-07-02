const axios = require('axios') ; 
const { API_ENDPOINTS, API_BASE_URL } = require('../utils/constants');


const API = axios.create({
    baseURL : API_BASE_URL, 
    withCredentials : true , 
    headers : {
        'Content-Type' : 'application.json'
    }
}) ; 

export const signin = (inputs) => API.post(`${API_ENDPOINTS.signup}` , inputs) ; 
export const login = (inputs) => API.post(`${API_ENDPOINTS.login}` , inputs) ; 
export const getuser = () => API.get(`${API_ENDPOINTS.getuser}`)