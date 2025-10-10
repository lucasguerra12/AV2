import React from 'react';
import './Sidebar.css';
import logoImage from '../../assets/logo_branco.png';
import { NavLink } from 'react-router-dom'; 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src={logoImage} alt="AeroCode Logo" className="sidebar-logo" />
            </div>
            {/* Use <ul> e <li> para a semântica correta */}
            <ul className="sidebar-menu">
                {/* Cada item é um NavLink */}
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/funcionarios" className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}>
                        Funcionários
                    </NavLink>
                </li>
                 <li>
                    <div className="menu-item">Configurações</div> {/* Mantemos como div por enquanto */}
                </li>
            </ul>
            <div className="sidebar-footer">
                <div className="menu-item">Sair</div>
            </div>
        </div>
    );
};

export default Sidebar;