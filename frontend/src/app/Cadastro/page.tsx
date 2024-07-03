'use client'
import React, { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./cadastro.css";
import { axiosInstance } from "../../../service/User";

export default function Cadastro() {

    const router = useRouter();

    const handleSignUpClick = () => {
        router.push("/Login");
    };

    //Estados 
    
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState<number | "">("");
    const [password, setPassword] = useState(""); 
    const [state, setState] = useState(""); 
    const [city, setCity] = useState(""); 
    const [email, setEmail] = useState(""); 

    //Corrigir erro
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!name || quantity === "" || !password || !state || !city || !email) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const dataResponse = await axiosInstance.post('/usuarios', {
                nome: name,
                email: email,
                senha: password,
                idade: quantity as number,
                estado: state,
                cidade: city
            });

            console.log("Data posted successfully:", dataResponse.data);
            alert("Cadastro feito")
            setName("");
            setQuantity("");
            setPassword("");
            setState("");
            setCity("");
            setEmail("");
            window.location.reload()

        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    return (
        <section className="cadastro-container">
            
            <form className="form-cadastro" onSubmit={handleSubmit}>

                <h1>Cadastro</h1>

                <label htmlFor="username">Nome</label>
                <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="email">E-mail</label>
                <input type="email" placeholder="exemplo@exemplo" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Senha</label>
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="idade">Idade</label>
                <input type="number" placeholder="Idade" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />

                <label htmlFor="estado">Estado</label>
                <input type="text" placeholder="Estado" value={state} onChange={(e) => setState(e.target.value)} />

                <label htmlFor="cidade">Cidade</label>
                <input type="text" placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} />

                <div className="botoes-cadastro">
                    <button type="submit" className="cadastrar">Cadastrar</button>
                    <button onClick={handleSignUpClick} className="botao-login">Login</button>
                </div>
                
            </form>
        </section>
    );
}

