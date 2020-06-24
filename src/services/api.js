import axios from 'axios';
const api = axios.create({ baseURL : process.env.baseURL || "http://191.37.47.54:9080" });
export default api;