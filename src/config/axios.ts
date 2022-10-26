import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    'https://beta.pokeapi.co/graphql/v1beta',
  headers: {
    'Content-Type': 'application/json',
    'X-Method-Used': 'graphql'
  }
});

export default axiosInstance;