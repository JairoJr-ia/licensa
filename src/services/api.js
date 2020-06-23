import axios from 'axios';

console.log(process.env.BANCO_URL)
const api = axios.create({ baseURL : process.env.baseURL || "https://191.37.47.54:9080" });
export default api;