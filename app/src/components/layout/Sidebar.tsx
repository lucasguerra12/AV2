import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Sidebar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ nome: 'Desconhecido', nivelPermissao: 'N/A', id: 'N/A' });

  useEffect(() => {
    const userString = localStorage.getItem('@Aerocode:user');
    if (userString) {
      setUserData(JSON.parse(userString));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('@Aerocode:user');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Painel', icon: 'dashboard', path: '/' },
    { name: 'Aeronaves', icon: 'flight_takeoff', path: '/aeronaves' },
    { name: 'Inventário', icon: 'inventory_2', path: '/inventario' },
    { name: 'Equipe', icon: 'groups', path: '/equipe' },
    { name: 'Relatórios', icon: 'assessment', path: '/relatorios' },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 flex flex-col py-6 px-4 z-50 bg-surface-low border-r-0">
      
      {/* Área do Logo */}
      <div className="mb-10 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-container flex items-center justify-center rounded-sm shrink-0">
            <span className="material-symbols-outlined text-primary text-[20px]">deployed_code</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-primary uppercase font-headline">The Kinetic Vault</h1>
            <p className="text-[10px] font-label tracking-widest text-on-surfaceVariant uppercase opacity-70">Aerospace Control</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 font-medium transition-transform active:scale-95 rounded-sm ${
                isActive 
                  ? 'text-primary bg-primary-container border-l-2 border-primary' 
                  : 'text-on-surfaceVariant hover:text-on-surface hover:bg-surface-highest/50 border-l-2 border-transparent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                <span className="font-label text-sm">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Rodapé Dinâmico */}
      <div className="mt-auto border-t border-outline-variant/20 pt-4 space-y-1">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-on-surfaceVariant hover:text-on-surface hover:bg-surface-highest/50 transition-colors rounded-sm text-left">
          <span className="material-symbols-outlined text-[22px]">settings</span>
          <span className="font-label text-sm">Configuração do Sistema</span>
        </button>
        
        {/* NOVO BOTÃO DE SAIR */}
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors rounded-sm text-left">
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <span className="font-label text-sm">Encerrar Sessão</span>
        </button>

        <div className="mt-6 flex items-center gap-3 px-3">
          <div className="w-10 h-10 rounded-lg bg-surface-highest flex items-center justify-center overflow-hidden shrink-0 border border-outline-variant/30">
            <span className="material-symbols-outlined text-on-surfaceVariant text-2xl">person</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-on-surface truncate uppercase font-headline">{userData.nivelPermissao}</p>
            <p className="text-[10px] text-on-surfaceVariant truncate font-label">ID: {userData.nome}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}