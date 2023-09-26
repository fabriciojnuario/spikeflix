
//base da URL da API = https://api.themoviedb.org/3/
// url da API = movie/now_playing?api_key=d8207577d5790df318a627a14067bcac

import axios from "axios";

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;