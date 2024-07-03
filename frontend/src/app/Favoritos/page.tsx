'use client'
import axios from "axios";
import Header from "../Header/page";
import "./favoritos.css";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'; 
import Footer from "../Footer/page";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
}



export default function Favoritos() {
  const [filmesFavoritos, setFilmesFavoritos] = useState<number[]>([]);
  const [filmesDetalhes, setFilmesDetalhes] = useState<Movie[]>([]);

  //Favoritos

  useEffect(() => {
    const Favoritos = Cookies.get("IdsFavoritos");
    if (Favoritos) {
      const Fav = JSON.parse(Favoritos) as number[];
      setFilmesFavoritos(Fav);
      
      Promise.all(
        Fav.map(id =>
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=04c35731a5ee918f014970082a0088b1&page=1`)
            .then(response => response.data)
        )
      ).then(detalhes => {
        setFilmesDetalhes(detalhes.filter(filme => filme !== null) as Movie[]);
      });
    } 
  }, []);

  const Apagar = (id: number) => {
    const novosFavoritos = filmesFavoritos.filter(favoritoId => favoritoId !== id);
    setFilmesFavoritos(novosFavoritos);
    Cookies.set('IdsFavoritos', JSON.stringify(novosFavoritos), { expires: 1 });
    setFilmesDetalhes(filmesDetalhes.filter(filme => filme.id !== id));
  };

  return (
    <main className="favoritos-page">

      <Header />

      <section className="favoritos-list">

        <h1>Meus favoritos</h1>

        {filmesDetalhes.length > 0 ? (
          filmesDetalhes.map(filme => (

            <div key={filme.id} className="favoritos-card">

              <figure>
                <img src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title}/>
              </figure>

              <div className="info-filme">
                <h2>{filme.title}</h2>
                <p>Lançamento: {filme.release_date}</p>
                <p>{filme.overview}</p>
                
                <button className="desfavoritar" onClick={() => Apagar(filme.id)}>Excluir dos favoritos</button>
              </div>

            </div>
          ))
        ) : (
          <p className="aviso-favoritos">Você não adicionou nenhum filme aos favoritos</p>
        )}

      </section>

      <Footer />

    </main>
  );
}