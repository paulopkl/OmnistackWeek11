import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';

export default function Register() {

    const [name, setName] =  useState('');
    const [email, setEmail] =  useState('');
    const [whatssap, setWhatssap] =  useState('');
    const [city, setCidade] =  useState('');
    const [uf, setUf] =  useState('');

    const history = useHistory();

    async function handleRegister(evento) {
        evento.preventDefault(); // Previne comportamento default do form

        let data = { name, email, whatssap, city, uf };
        console.log(data);

        try {
            const resposta = await api.post('users', data);
            alert(`Seu ID de sucesso! ${resposta.data.id}`);

            history.push('/');
        } catch(erro) {
            alert(erro);
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" /> 
                        Já tem Cadastro?
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Nome da ONG" value={name} onChange={event => setName(event.target.value)} />
                    <input type="email" placeholder="E-mail" value={email} onChange={event => setEmail(event.target.value)} />
                    <input type="text" placeholder="Whatssap" value={whatssap} onChange={event => setWhatssap(event.target.value)} />
                    <div className="input-group">
                        <input type="text" placeholder="Cidade" value={city} onChange={event => setCidade(event.target.value)} />
                        <input type="text" placeholder="UF" value={uf} onChange={event => setUf(event.target.value)} style={{ width: 80 }} />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
};
