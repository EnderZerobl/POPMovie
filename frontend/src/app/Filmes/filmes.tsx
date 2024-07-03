import { GetServerSideProps } from 'next';
import axios from 'axios';
import Image from 'next/image';
import { NextPage } from 'next';
import "./filmes.css";
import Cookies from 'js-cookie'; 


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

const Filmes: NextPage<HomePageProps> = ({ movies }) => {

    const handleFavoritar = (movie: Movie) => {
        const idsFavoritos = Cookies.get("IdsFavoritos");
        let idsArray = idsFavoritos ? JSON.parse(idsFavoritos) : [];

        if (!idsArray.includes(movie.id)) {
            idsArray.push(movie.id);
            Cookies.set('IdsFavoritos', JSON.stringify(idsArray), { expires: 1 });
        }
    };
    return (
            <div className='filmes-page'>
                <section className='filmes-list'>

                    <h1>Filmes disponíveis</h1>
                    
                    {movies.map((movie) => (
                        <div key={movie.id} className='filmes-card'>
                            <figure className='capa-filme'>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                            </figure>

                            <div className='info-filme'>
                                <h2>{movie.title}</h2>
                                <p>Lançamento: {movie.release_date}</p>
                                <p>{movie.overview}</p>
                                <button className="favoritar" onClick={() => handleFavoritar(movie)}><Image src="/favoritas.png" alt="favoritar" width={30} height={30}/> <p> Favoritar</p></button>
                            </div>
                            
                        </div>
                    ))}
                </section>
            </div>
    );
};

export default Filmes;