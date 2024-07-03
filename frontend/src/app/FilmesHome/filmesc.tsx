import { GetServerSideProps } from 'next';
import axios from 'axios';
import Image from 'next/image';
import { NextPage } from 'next';
import Cookies from 'js-cookie'; 
import "./filmeshome.css";


interface Movie {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
}

interface HomePageProps {
    movies: Movie[];
}

const Filmesh: NextPage<HomePageProps> = ({ movies }) => {


    //Função favoritando
    
    const handleFavoritar = (movie: Movie) => {
        const idsFavoritos = Cookies.get("IdsFavoritos");
        let idsArray = idsFavoritos ? JSON.parse(idsFavoritos) : [];

        if (!idsArray.includes(movie.id)) {
            idsArray.push(movie.id);
            Cookies.set('IdsFavoritos', JSON.stringify(idsArray), { expires: 1 });
        }
        alert("Filme Favoritado")
    };
    return (
            <main className='filmeshome-page'>

                <section className='filmeshome-list'>

                    {movies.map((movie) => (
                        <div className='filmeshome-card' key={movie.id}>

                            <figure className='figure'>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                            </figure>

                            <div className='title'>
                                <h2>{movie.title}</h2>
                                <button className='filmeshome-favoritar' onClick={() => handleFavoritar(movie)}> <Image src="/favoritas.png" alt="favoritar" width={20} height={20} /> Favoritar </button>
                            </div>

                        </div>
                    ))}
                </section>
            </main>
    );
};

export default Filmesh;