'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'; 
import "./login.css";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUpClick = () => {
        router.push("/Cadastro");
    };

    const handleHome = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setError('');

        try {
            const response = await axios.post('http://localhost:3002/login', {
                email,
                senha: password 
            });

            if (response.status === 200 && response.data.usuario) {
                const userId = response.data.usuario.id;
                Cookies.set('Iddoparca', userId.toString(), { expires: 1 }); 
                router.push('/Home');
            } 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    setError('Email ou senha incorretos.');
                } 
            }
        }
    };

    return (
        <section className="login-container">
            <form className="form-login" onSubmit={handleHome}>
                <h1>POPMovies</h1>

                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" className="email-icon" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" className="senha-icon" value={password} onChange={(e) => setPassword(e.target.value)} required />

                {error && <p className="error">{error}</p>}

                <div className="botoes-login">
                    <button type="submit" className="entrar">Entrar</button>
                    <p>Não tem uma conta? <button type="button" onClick={handleSignUpClick} className="botao-cadastro">Cadastre-se</button></p>
                </div>
            </form>
        </section>
    );
}