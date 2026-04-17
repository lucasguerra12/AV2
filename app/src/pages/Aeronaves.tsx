import { useState } from 'react';
import { useSystem } from '../contexts/SystemContext';
import type { TipoAeronave } from '../domain/types';

export function Aeronaves() {
  const { aeronaves, registrarAeronave } = useSystem();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [codigo, setCodigo] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipo, setTipo] = useState<TipoAeronave>('COMERCIAL');
  const [capacidade, setCapacidade] = useState('');
  const [alcance, setAlcance] = useState('');

  const handleRegistrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo || !modelo) return;

    registrarAeronave({
      codigo,
      modelo,
      tipo,
      capacidade: Number(capacidade) || 0,
      alcance: Number(alcance) || 0,
      pecas: [],
      etapas: [],
      testes: []
    });

    setCodigo(''); setModelo(''); setCapacidade(''); setAlcance('');
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative font-body">
      <header className="h-16 border-b border-outline-variant/20 bg-background/80 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-10">
        <h2 className="text-lg font-bold text-on-surface font-headline uppercase">Operações de Frota</h2>
      </header>

      <main className="p-8">
        <div className="flex justify-between items-end mb-10">
          <h1 className="text-4xl font-headline font-bold text-on-surface tracking-tight">Aeronaves</h1>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="bg-primary/10 text-primary border border-primary/30 px-6 py-2.5 rounded-sm font-bold text-xs tracking-widest hover:bg-primary hover:text-background transition-all flex items-center gap-2 font-headline uppercase"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Nova Aeronave
          </button>
        </div>

        <div className="bg-surface-low rounded-sm border border-outline-variant/20 shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-surface-container/30 border-b border-outline-variant/20">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surfaceVariant uppercase font-label">Código</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surfaceVariant uppercase font-label">Modelo</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surfaceVariant uppercase font-label">Tipo</th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surfaceVariant uppercase font-label text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {aeronaves.map((aero) => (
                <tr key={aero.codigo} className="hover:bg-surface-highest/20 transition-colors">
                  <td className="px-6 py-5 font-headline font-bold text-primary tracking-widest">{aero.codigo}</td>
                  <td className="px-6 py-5 text-sm text-on-surface">{aero.modelo}</td>
                  <td className="px-6 py-5">
                    <span className="text-[9px] font-bold px-2 py-0.5 border border-primary/30 text-primary uppercase rounded-sm">
                      {aero.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="material-symbols-outlined text-on-surfaceVariant cursor-pointer hover:text-primary">visibility</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {isDrawerOpen && (
        <>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]" onClick={() => setIsDrawerOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-low border-l border-outline-variant/20 z-[70] p-8 flex flex-col">
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-6 uppercase">Adicionar Aeronave</h2>
            
            <form onSubmit={handleRegistrar} className="space-y-6 flex-1 overflow-y-auto pr-2">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surfaceVariant uppercase tracking-widest font-label">Código do Ativo</label>
                <input 
                  required 
                  value={codigo} 
                  onChange={e => setCodigo(e.target.value)} 
                  className="w-full bg-background border border-outline-variant/20 rounded-sm py-3 px-4 focus:border-primary focus:bg-surface-low text-primary outline-none transition-all placeholder:text-on-surfaceVariant/30 text-sm font-headline tracking-widest uppercase shadow-inner" 
                  placeholder="EX: KV-001" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surfaceVariant uppercase tracking-widest font-label">Modelo da Aeronave</label>
                <input 
                  required 
                  value={modelo} 
                  onChange={e => setModelo(e.target.value)} 
                  className="w-full bg-background border border-outline-variant/20 rounded-sm py-3 px-4 focus:border-primary focus:bg-surface-low text-primary outline-none transition-all placeholder:text-on-surfaceVariant/30 text-sm shadow-inner" 
                  placeholder="ex: Lockheed Martin SR-71" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surfaceVariant uppercase tracking-widest font-label">Tipo de Registro</label>
                <div className="relative">
                  <select 
                    value={tipo} 
                    onChange={e => setTipo(e.target.value as TipoAeronave)} 
                    className="w-full appearance-none bg-background border border-outline-variant/20 rounded-sm py-3 px-4 focus:border-primary focus:bg-surface-low text-primary outline-none transition-all pr-10 text-sm font-headline tracking-widest uppercase shadow-inner cursor-pointer"
                  >
                    <option value="COMERCIAL" className="bg-background text-primary">Comercial</option>
                    <option value="MILITAR" className="bg-background text-primary">Militar</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">keyboard_arrow_down</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surfaceVariant uppercase tracking-widest font-label">Capacidade</label>
                  <input 
                    required
                    type="number"
                    value={capacidade} 
                    onChange={e => setCapacidade(e.target.value)} 
                    className="w-full bg-background border border-outline-variant/20 rounded-sm py-3 px-4 focus:border-primary focus:bg-surface-low text-primary outline-none transition-all placeholder:text-on-surfaceVariant/30 text-sm shadow-inner" 
                    placeholder="Passageiros / Trip." 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surfaceVariant uppercase tracking-widest font-label">Alcance Máx. (km)</label>
                  <input 
                    required
                    type="number"
                    value={alcance} 
                    onChange={e => setAlcance(e.target.value)} 
                    className="w-full bg-background border border-outline-variant/20 rounded-sm py-3 px-4 focus:border-primary focus:bg-surface-low text-primary outline-none transition-all placeholder:text-on-surfaceVariant/30 text-sm shadow-inner" 
                    placeholder="Distância" 
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surfaceVariant font-label">Planta / Ativo Visual</label>
                <div className="border-2 border-dashed border-outline-variant/30 rounded-sm p-6 flex flex-col items-center justify-center gap-2 bg-surface-container-highest/20 hover:bg-surface-container-highest/50 transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors text-2xl">cloud_upload</span>
                  <div className="text-center">
                    <p className="text-[11px] font-medium text-on-surface">Arraste a documentação técnica</p>
                    <p className="text-[9px] text-on-surfaceVariant mt-1 uppercase tracking-widest">Formatos CAD ou PNG</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 mt-auto">
                <button 
                  type="button" 
                  onClick={() => setIsDrawerOpen(false)} 
                  className="flex-1 py-3 text-[11px] font-bold uppercase tracking-widest text-on-surfaceVariant hover:text-primary hover:bg-primary/10 transition-colors border border-outline-variant/30 hover:border-primary/50 rounded-sm font-headline"
                >
                  Descartar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 text-[11px] font-bold uppercase tracking-widest bg-primary text-background rounded-sm hover:bg-primary/90 active:scale-95 transition-all shadow-[0_0_15px_rgba(183,199,235,0.15)] hover:shadow-[0_0_20px_rgba(183,199,235,0.3)] font-headline"
                >
                  Registrar Ativo
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}