import React from 'react';
import './Sidebar.css';
import logoImage from '../../assets/logo_branco.png'; // Reutilize a sua logo

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src={logoImage} alt="AeroCode Logo" className="sidebar-logo" />
            </div>
            <ul className="sidebar-menu">
                <li className="menu-item active">Dashboard</li>
                <li className="menu-item">Funcionários</li>
                <li className="menu-item">Configurações</li>
            </ul>
            <div className="sidebar-footer">
                <div className="menu-item">Sair</div>
            </div>
        </div>
    );
};

export default Sidebar;