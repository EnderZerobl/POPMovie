'use client'
import Header from "../Header/page";
import { User } from "../../../service/User";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'; 
import axios from 'axios';
import Filmes from "./filmes";
import Footer from "../Footer/page";

interface nomes {
    id: number;
    nome: string;
}

interface Movie {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
}

export default function Filmespage() {
    const Usuario = new User();
    const [data, setData] = useState<nomes[] | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]); 

    useEffect(() => {
        const loggedUserId = Cookies.get('Iddoparca');
        
        //User

        if (loggedUserId) {
            Usuario.listarall()
                .then((response) => {
                    const allData = response.data;
                    const filteredData = allData.filter((user: nomes) => user.id === parseInt(loggedUserId));
                    setData(filteredData);
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            console.log('Usuário out');
        }

        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1');
                setMovies(response.data.results);
            } catch (error) {
                console.log('Erro');
            }
        };

        fetchMovies();

    }, []);

    return (
        <body className="movies">
            <Header/>   
            <Filmes movies={movies} /> 
            <Footer/>
        </body>
    );
}