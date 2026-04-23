import type { Aeronave, Funcionario } from '../domain/types';

export const mockFuncionarios: Funcionario[] = [
  { id: 'f1', nome: 'Eng. Chefe Gerson', telefone: '11999999999', endereco: 'Base 1', usuario: 'gerson.admin', nivelPermissao: 'ADMINISTRADOR' },
  { id: 'f2', nome: 'Op. Lucas Guerra', telefone: '11888888888', endereco: 'Hangar B', usuario: 'lucas.op', nivelPermissao: 'ENGENHEIRO' },
];

export const mockAeronaves: Aeronave[] = [
  {
    codigo: 'KV-001',
    modelo: 'Boeing 737-800',
    tipo: 'COMERCIAL',
    capacidade: 215,
    alcance: 5436,
    pecas: [],
    etapas: [
      { id: 'e1', nome: 'Montagem da Fuselagem', prazo: '2026-05-10', status: 'CONCLUIDA', funcionariosAlocados: [] },
      { id: 'e2', nome: 'Instalação Elétrica', prazo: '2026-05-15', status: 'ANDAMENTO', funcionariosAlocados: [] },
      { id: 'e3', nome: 'Montagem dos Propulsores', prazo: '2026-05-20', status: 'PENDENTE', funcionariosAlocados: [] },
    ],
    testes: [
      { id: 't1', nome: 'Inspeção de Cabeamento', tipo: 'ELETRICO', dataValidade: '2026-12-01', resultado: 'APROVADO' },
      { id: 't2', nome: 'Pressão Estática', tipo: 'AERODINAMICO', dataValidade: '2026-11-15', resultado: null },
    ]
  }
];