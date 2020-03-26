import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescripton] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const UserId = localStorage.getItem('UserId');

    async function NewIncident(event) {
        event.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: UserId
                }
            });

            history.push('/profile');
        } catch(erro){
            alert(erro);
        }
    }
    
    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" /> 
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={NewIncident}>
                    <input type="text" value={title} onChange={event => setTitle(event.target.value)} placeholder="Titulo do caso" />

                    <textarea value={description} onChange={event => setDescripton(event.target.value)} placeholder="Descrição" />

                    <input type="number" value={value} onChange={event => setValue(event.target.value)} placeholder="Valor em reais"/>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}