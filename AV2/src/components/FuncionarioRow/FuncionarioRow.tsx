import React from 'react';
import './FuncionarioRow.css';
import { Funcionario } from '../../models/Funcionario';
import { NivelPermissao } from '../../models/enums';
import { FaTrash } from 'react-icons/fa';

interface FuncionarioRowProps {
    funcionario: Funcionario;
    onRemove: (idFuncionario: number) => void;
}

const getPermissaoClass = (nivel: NivelPermissao) => { /* ...código inalterado... */ };

const FuncionarioRow = ({ funcionario, onRemove }: FuncionarioRowProps) => {
    const permissaoClassName = getPermissaoClass(funcionario.nivelPermissao);

    return (
        <div className="funcionario-row">
            <div className="funcionario-info nome">{funcionario.nome}</div>
            <div className="funcionario-info email">{funcionario.email}</div>
            <div className="funcionario-info permissao">
                <span className={`permissao-pill ${permissaoClassName}`}>{funcionario.nivelPermissao}</span>
            </div>
            {/* Adicionando botão de remover */}
            <div className="funcionario-actions">
                <button className="action-button remove" onClick={() => onRemove(funcionario.id)} title="Remover">
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default FuncionarioRow;