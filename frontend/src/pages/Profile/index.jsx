import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';

export default function Profile() {
    const UserName = localStorage.getItem('UserName');
    const UserId = localStorage.getItem('UserId');

    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
 
    function getApiReturnData() {
        api.get('profile', {
            headers: { 
                Authorization: UserId, 
            }
        }).then(resposta => { 
            setIncidents(resposta.data);
        });
    }

    async function DeletarIncident(id) {
        try{
          await api.delete(`/incidents/${id}`, {
              headers: {
                  Authorization: UserId,
              }
          });

          setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(erro) {
            alert(erro);
        }
    }

    function Logout() {
        localStorage.clear();

        history.push('/');
    }


    useEffect(getApiReturnData, [UserId]);

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo, {UserName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={Logout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>    
            <ul>
                {incidents.map(incidente => (
                        <li key={incidente.id}>
                            <strong>CASO: </strong>
                            <p>{incidente.title}</p>

                            <strong>DESCRIÇÃO: </strong>
                            <p>{incidente.description}</p>

                            <strong>VALOR: </strong>
                            <p>{incidente.value.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL'})}</p>

                            <button onClick={() => DeletarIncident(incidente.id)} type="button"><FiTrash2 size={20} color="#a8a8b3" /></button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}