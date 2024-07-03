'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import "./pesquisa.css";

interface Filme {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export default function Pesquisar() {
  const [aberto, setAberto] = useState(false);
  const [Textual, setTextual] = useState('');
  const [resultado, setResultado] = useState<Filme | null>(null);

  const Parabrir = () => {
    setAberto(!aberto);
  };

  const Pesquisa = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextual(e.target.value);
  };

  const Mandar = () => {
    if (Textual.trim()) {

      axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: '04c35731a5ee918f014970082a0088b1',
          query: Textual
        }
      })
        .then((response) => {
          if (response.data.results && response.data.results.length > 0) {
            const firstResult = response.data.results[0];
            setResultado({
              id: firstResult.id,
              titulo: firstResult.title,
              descricao: firstResult.overview,
              imagem: `https://image.tmdb.org/t/p/w500${firstResult.poster_path}`,
              original_language: firstResult.original_language,
              popularity: firstResult.popularity,
              vote_average: firstResult.vote_average,
              vote_count: firstResult.vote_count
            });
          } else {
            setResultado(null); 
          }
        })
        .catch((error) => {
          setResultado(null);
        });
    }
  };

  const limpar = () => {
    setResultado(null);
    setTextual('');
  };

  return (
    <main className='container-pesquisa'>

      <section className='pesquisar-modal'>
          
          <div className='search-bar'>
            <input type='text' placeholder='Buscar filme' value={Textual} onChange={Pesquisa} onKeyDown={(e) => {
                if (e.key === 'Enter') Mandar();
              }}
            />
          </div>

          <div className='search-button'>
            <button onClick={() => {
              Parabrir();
              Mandar(); 
            }}>
              <Image src='/search.png' alt='Pesquisar' width={20} height={20} />
            </button>
          </div>
            
      </section>

      {resultado && (
        <section className='resultado-pesquisa'>
              <figure className='capa-filme'>
                <img src={resultado.imagem}/>
              </figure>

              <div className='info-pesquisa'>
                <h1>{resultado.titulo}</h1>
                <p>Idioma original: {resultado.original_language.toUpperCase()}</p>
                <p>Acessos: {resultado.popularity.toFixed(0)}</p>
                <p>Avaliações: {resultado.vote_count}</p>
                <p>Média: <span>{resultado.vote_average.toFixed(2)}</span></p>
              </div>

              {/*<button onClick={limpar}>Limpar Pesquisa</button>*/}

        </section>
        )}

    </main>
  );
}