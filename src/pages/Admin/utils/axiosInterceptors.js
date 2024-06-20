import axios from "axios";

let baseUrl = import.meta.env.VITE_BASE_URL;

const adminApi = axios.create({
    baseURL: baseUrl,
})

adminApi.interceptors.request.use(
    (request) =>{
        const token = localStorage.getItem("token");
        if(token){
            request.headers["Authorization"] = `${token}`
        }
        return request;
    },
    (error)=>{
        return Promise.reject(error)
    }
)
adminApi.interceptors.response.use(
    (response) =>{
        return response
    },
    (error) =>{
        return Promise.reject(error)
    }
)
export default adminApi;