import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi'
import './style.css';
import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('sessions', {id});
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch (err) {
            alert('Login failed, try again.');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="NGOs connection"/>
                <form onSubmit={handleLogin}>
                    <h1>Insert your ID</h1>
                    <input type="text" placeholder="Your ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Sign in</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        I don't have an account
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt=""/>
        </div>
    );
}