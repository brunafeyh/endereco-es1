import axios from "axios";
import { API } from "../utilidades/constantes/api";

const apiInstancia = axios.create({
  baseURL: API, 
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
  },
});

export default apiInstancia