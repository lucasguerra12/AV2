import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Aeronave } from '../domain/types';
import { mockAeronaves } from '../infrastructure/mocks';

export interface SystemLog {
  id: number;
  time: string;
  tag: string;
  color: string;
  text: string;
}

interface SystemContextData {
  aeronaves: Aeronave[];
  logs: SystemLog[];
  registrarAeronave: (novaAeronave: Aeronave) => void;
  adicionarLog: (tag: string, color: string, text: string) => void;
}

const SystemContext = createContext<SystemContextData>({} as SystemContextData);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>(mockAeronaves);
  const [logs, setLogs] = useState<SystemLog[]>([]);

  const getTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const adicionarLog = (tag: string, color: string, text: string) => {
    const newLog = { id: Date.now(), time: getTime(), tag, color, text };
    setLogs(prev => [newLog, ...prev].slice(0, 10)); // Mantém os 10 últimos
  };

  const registrarAeronave = (novaAeronave: Aeronave) => {
    setAeronaves(prev => [novaAeronave, ...prev]);
    adicionarLog('FROTA', 'bg-primary-container text-primary', `Novo ativo ${novaAeronave.codigo} registrado no sistema.`);
  };

  // Log de inicialização
  useEffect(() => {
    adicionarLog('SIST', 'bg-surface-highest text-on-surface', 'Protocolo Aerocode inicializado.');
  }, []);

  return (
    <SystemContext.Provider value={{ aeronaves, logs, registrarAeronave, adicionarLog }}>
      {children}
    </SystemContext.Provider>
  );
}

export const useSystem = () => useContext(SystemContext);