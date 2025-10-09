// src/pages/Login/Login.tsx
import React, { useState } from 'react';
import './Login.css'; // O nosso ficheiro de estilo

// Importe as imagens com os nomes corretos
import backgroundImage from '../../assets/aviao.jpg'; // Imagem de fundo
import logoImage from '../../assets/logo.png';

// 1. AJUSTE AQUI: Receba a propriedade 'onLogin'
const Login = ({ onLogin }: { onLogin: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Renomeei para handleFormSubmit para ficar mais claro
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Tentando fazer login com:', { email, password });
        // alert(`Login simulado para: ${email}`); // Pode remover o alert agora
        
        // 2. AJUSTE AQUI: Chame a função onLogin() que veio do App.tsx
        onLogin();
    };

    return (
        <div className="login-page-container">
            {/* Lado Esquerdo: A Imagem */}
            <div 
                className="login-image-side" 
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
            </div>

            {/* Lado Direito: O Formulário */}
            <div className="login-form-side">
                <div className="login-card">
                    <img src={logoImage} alt="AeroCode Logo" className="login-logo" />
                    <h2>LOGIN</h2>
                    {/* 3. AJUSTE AQUI: Certifique-se que o onSubmit chama a função correta */}
                    <form onSubmit={handleFormSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;