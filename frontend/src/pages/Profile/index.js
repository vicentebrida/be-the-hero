import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiSun, FiMoon } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from '../../services/api';

import { Container } from './styles';

import logoImg from '../../assets/logo.svg';

export default function Profile({ toggleTheme }) {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const { title: themeTitle } = useContext(ThemeContext);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar o caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <Container>
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={toggleTheme} type="button">
          {themeTitle == 'light' ? <FiMoon size={18} color="#E02041" /> : <FiSun size={18} color="#E02041" />}
        </button>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
