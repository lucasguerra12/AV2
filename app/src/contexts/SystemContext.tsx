// src/contexts/SystemContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Aeronave } from '../domain/types';
import { mockAeronaves } from '../infrastructure/mocks';

// --- TIPAGENS ---
export interface SystemLog {
  id: number;
  time: string;
  tag: string;
  color: string;
  text: string;
}

export type StatusPeca = 'PRONTA' | 'EM_TRANSPORTE' | 'EM_PRODUCAO' | 'MANUTENCAO';

export interface PecaInventario {
  codigo: string;
  nome: string;
  categoria: string;
  fornecedor: string;
  status: StatusPeca;
  aeronaveDestino?: string | null;
}

interface SystemContextData {
  aeronaves: Aeronave[];
  logs: SystemLog[];
  inventario: PecaInventario[];
  
  // Funções de Aeronaves
  registrarAeronave: (novaAeronave: Aeronave) => void;
  atualizarAeronave: (codigo: string, dados: Partial<Aeronave>) => void;
  removerAeronave: (codigo: string) => void;

  // Funções de Inventário (CRUD Completo)
  registrarPeca: (novaPeca: PecaInventario) => void;
  atualizarPeca: (codigo: string, dados: Partial<PecaInventario>) => void;
  removerPeca: (codigo: string) => void;
  
  adicionarLog: (tag: string, color: string, text: string) => void;
}

const SystemContext = createContext<SystemContextData>({} as SystemContextData);

const mockInventario: PecaInventario[] = [
  { codigo: 'PRP-902', nome: 'Motor GE9X', categoria: 'PROPULSÃO', fornecedor: 'GE Aviation', status: 'PRONTA', aeronaveDestino: 'KV-001' },
  { codigo: 'AVN-014', nome: 'Sistema de Navegação Inercial', categoria: 'AVIÔNICOS', fornecedor: 'Honeywell', status: 'EM_TRANSPORTE', aeronaveDestino: 'AC-402' },
  { codigo: 'EST-881', nome: 'Trem de Pouso Principal', categoria: 'ESTRUTURA', fornecedor: 'Safran', status: 'EM_PRODUCAO', aeronaveDestino: null },
  { codigo: 'INT-330', nome: 'Módulo de Assentos', categoria: 'INTERIOR', fornecedor: 'Collins', status: 'PRONTA', aeronaveDestino: null },
];

export function SystemProvider({ children }: { children: ReactNode }) {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>(mockAeronaves);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [inventario, setInventario] = useState<PecaInventario[]>(mockInventario);

  const getTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const adicionarLog = (tag: string, color: string, text: string) => {
    const newLog = { id: Date.now(), time: getTime(), tag, color, text };
    setLogs(prev => [newLog, ...prev].slice(0, 15)); 
  };

  // --- CRUD AERONAVES ---
  const registrarAeronave = (novaAeronave: Aeronave) => {
    setAeronaves(prev => [novaAeronave, ...prev]);
    adicionarLog('FROTA', 'bg-primary-container text-primary', `Novo ativo ${novaAeronave.codigo} registrado.`);
  };
  const atualizarAeronave = (codigo: string, dados: Partial<Aeronave>) => {
    setAeronaves(prev => prev.map(a => a.codigo === codigo ? { ...a, ...dados } : a));
    adicionarLog('FROTA', 'bg-primary-container text-primary', `Ativo ${codigo} atualizado.`);
  };
  const removerAeronave = (codigo: string) => {
    setAeronaves(prev => prev.filter(a => a.codigo !== codigo));
    adicionarLog('ALERTA', 'bg-[#ef4444]/20 text-[#ef4444]', `Aeronave ${codigo} removida do sistema.`);
  };

  // --- CRUD INVENTÁRIO ---
  const registrarPeca = (novaPeca: PecaInventario) => {
    setInventario(prev => [novaPeca, ...prev]);
    adicionarLog('LOGÍSTICA', 'bg-[#1b2e36] text-[#b5cad4]', `Componente ${novaPeca.codigo} adicionado.`);
  };
  
  const atualizarPeca = (codigo: string, dados: Partial<PecaInventario>) => {
    setInventario(prev => prev.map(p => p.codigo === codigo ? { ...p, ...dados } : p));
    adicionarLog('LOGÍSTICA', 'bg-[#1b2e36] text-[#b5cad4]', `Status do componente ${codigo} atualizado.`);
  };

  const removerPeca = (codigo: string) => {
    setInventario(prev => prev.filter(p => p.codigo !== codigo));
    adicionarLog('ALERTA', 'bg-[#ef4444]/20 text-[#ef4444]', `Componente ${codigo} descartado do estoque.`);
  };

  useEffect(() => {
    adicionarLog('SIST', 'bg-surface-highest text-on-surface', 'Protocolo Aerocode inicializado.');
  }, []);

  return (
    <SystemContext.Provider value={{ 
      aeronaves, logs, inventario, 
      registrarAeronave, atualizarAeronave, removerAeronave,
      registrarPeca, atualizarPeca, removerPeca, 
      adicionarLog 
    }}>
      {children}
    </SystemContext.Provider>
  );
}

export const useSystem = () => useContext(SystemContext);