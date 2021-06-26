import Axios from "axios";

const BASE_URL = "http://localhost:3056";

const axios = Axios.create({
    baseURL: BASE_URL,
});

export default axios;
