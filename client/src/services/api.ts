import axios from "axios";

export const requestMyAPI = axios.create({
  baseURL: "http://localhost:3333/",
  timeout: 5000,
});

