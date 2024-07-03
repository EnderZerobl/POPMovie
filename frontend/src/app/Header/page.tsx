'use client'
import Image from "next/image";
import "./header.css";
import { User } from "../../../service/User";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'; 
import { useRouter } from "next/navigation";
import Modal from "../Modal/page";

interface nomes {
    id: number;
    nome: string;
}

export default function Header() {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleFavoriteClick = () => {
        router.push("/Favoritos");
    };

    const handleHomeClick = () => {
        router.push("/Home");
    };

    const handleMovieClick = () => {
        router.push("/Filmes");
    };

    const Usuario = new User();
    const [data, setData] = useState<nomes[] | null>(null);

    useEffect(() => {
        const loggedUserId = Cookies.get('Iddoparca');

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
    }, []);

    return (
        
        <header className='header-container'>

            <section className="esquerdo">
                <div className="nome-site">
                    <button className="button-logo" onClick={handleHomeClick}>
                        <h1>POPMOVIES</h1>
                        <Image className="image-logo" src='/cinema.png' alt="logo" width={30} height={30}/>
                    </button>
                </div>

                <div className="icons-header">
                    <button onClick={handleMovieClick}> <p className="additional-content"> Ver filmes </p> <p className="responsivo"> Filmes </p></button> 
                    <button onClick={handleFavoriteClick}><p className="additional-content"> Meus favoritos </p> <p className="responsivo"> Favoritos </p></button>     
                </div>
                
            </section>

            <section className="direito">

                <div className="pesquisar">
                    <button onClick={() => setIsOpen(true)}><Image src="/search.png" alt="Exemplo" width={20} height={20} /></button>
                </div>

                <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                    <></>
                </Modal>

                {data ? (
                    <div className="usuario">
                    {data.map((item) => (
                        <div key={item.id} className='nomes'>
                            <p className='nome'>Olá, {item.nome}</p>
                        </div>
                    ))}
                    </div>

                ) : (
                    <p>Carregando dados...</p>
                )}

            </section>

        </header>
    );
}
