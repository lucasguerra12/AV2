export type TipoAeronave = 'COMERCIAL' | 'MILITAR';

export type TipoPeca = 'NACIONAL' | 'IMPORTADA';

export type StatusPeca = 'EM_PRODUCAO' | 'EM_TRANSPORTE' | 'PRONTA';

export type StatusEtapa = 'PENDENTE' | 'ANDAMENTO' | 'CONCLUIDA';

export type NivelPermissao = 'ADMINISTRADOR' | 'ENGENHEIRO' | 'OPERADOR';

export type TipoTeste = 'ELETRICO' | 'HIDRAULICO' | 'AERODINAMICO';

export type ResultadoTeste = 'APROVADO' | 'REPROVADO';

// ==========================================
// INTERFACES (As Entidades - AV1)
// ==========================================

export interface Funcionario {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string; 
  senha?: string; 
  nivelPermissao: NivelPermissao;
}

export interface Peca {
  id: string;
  nome: string;
  tipo: TipoPeca;
  fornecedor: string;
  status: StatusPeca;
}

export interface Etapa {
  id: string;
  nome: string;
  prazo: string; 
  status: StatusEtapa;
  funcionariosAlocados: Funcionario[];
  etapaAnteriorId?: string | null; 
}

export interface Teste {
  id: string;
  tipo: TipoTeste;
  resultado: ResultadoTeste | null; 
}

export interface Aeronave {
  codigo: string; 
  modelo: string;
  tipo: TipoAeronave;
  capacidade: number;
  alcance: number;
  pecas: Peca[];
  etapas: Etapa[];
  testes: Teste[];
}

export interface Relatorio {
  id: string;
  aeronaveCodigo: string;
  cliente: string;
  dataEntrega: string;
  resumoOperacao: string;
}