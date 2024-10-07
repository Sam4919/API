import axios from 'axios'

const http = axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:4001/api' : '/api',
}) 

export default http