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
    pecas: [
      { id: 'p1', nome: 'Turbina GE-90', tipo: 'IMPORTADA', fornecedor: 'GE Aviation', status: 'PRONTA' },
      { id: 'p2', nome: 'Trem de Pouso Principal', tipo: 'NACIONAL', fornecedor: 'AeroTech BR', status: 'EM_TRANSPORTE' },
    ],
    etapas: [
      { id: 'e1', nome: 'Montagem da Fuselagem', prazo: '2026-05-10', status: 'CONCLUIDA', funcionariosAlocados: [mockFuncionarios[1]], etapaAnteriorId: null },
      { id: 'e2', nome: 'Instalação Elétrica', prazo: '2026-05-15', status: 'ANDAMENTO', funcionariosAlocados: [], etapaAnteriorId: 'e1' },
      { id: 'e3', nome: 'Montagem dos Propulsores', prazo: '2026-05-20', status: 'PENDENTE', funcionariosAlocados: [], etapaAnteriorId: 'e2' },
    ],
    testes: []
  },
  {
    codigo: 'AC-402',
    modelo: 'Stratosphere X',
    tipo: 'MILITAR',
    capacidade: 2,
    alcance: 12000,
    pecas: [],
    etapas: [],
    testes: []
  }
];