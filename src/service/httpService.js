import https from "https";
import axios from "axios";
import { config } from '../config/settings';

export const httpAPI = () => {
  const instance = axios.create({
    baseURL: config.omdbBaseURL,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    timeout: 5000,
    headers: {
      "Content-Type": "application/json"
    }
  });

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return instance;
};
