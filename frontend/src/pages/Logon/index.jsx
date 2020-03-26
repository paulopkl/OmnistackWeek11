import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const resposta = await api.post('sessions', { id });

            localStorage.setItem('UserId', id);
            localStorage.setItem('UserName', resposta.data.name);
            history.push('/profile');
        } catch(erro) {
            alert(erro);
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input type="text" value={id} placeholder="Seu ID" onChange={event => setId(event.target.value)} />
                    <button type="submit" className="button">Entrar</button>
                        <Link to="/register" className="back-link">
                            <FiLogIn size={16} color="#e02041" /> 
                            Não tem Cadastro?
                        </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}