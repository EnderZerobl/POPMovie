import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3002"

})

export class User{

    listarall(){
        return axiosInstance.get('/banco')
    }
}

export class Postar{

    Criar(){
        return axiosInstance.post('/usuarios')
    }
    
}

export const Apifilmes = axios.create({
    baseURL: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"

})

