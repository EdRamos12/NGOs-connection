import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './style.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    useEffect(() => {
        api.get('profile', { headers: { Authorization: ongId } }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);

    async function handleDelete(id) {
        try {
            await api.delete('incidents/'+id, {headers: {Authorization: ongId}});
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Error trying to delete case, see console for details.');
            console.error(err);
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="NGOs connection" />
                <span>Welcome, {ongName}</span>

                <Link className="button" to="/incidents/new">Register new case</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Registered cases</h1>

            <ul>
                {incidents.map(incident => {
                    return (
                        <li key={incident.id}>
                            <strong>CASE:</strong>
                            <p>{incident.title}</p>
                            <strong>DESCRIPTION:</strong>
                            <p>{incident.description}</p>
                            <strong>VALUE:</strong>
                            <p>{Intl.NumberFormat('us-EN', { style: 'currency', currency: 'USD'}).format(incident.value)}</p>
                            <button onClick={() => handleDelete(incident.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}