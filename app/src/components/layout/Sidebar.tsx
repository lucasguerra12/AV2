// src/components/layout/Sidebar.tsx
import { NavLink } from 'react-router-dom';

// Componente de ícone Material Symbols (igual ao HTML original)
function Icon({ name, fill = false }: { name: string; fill?: boolean }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        fontSize: '24px',
      }}
    >
      {name}
    </span>
  );
}

export function Sidebar() {
  const menuItems = [
    { name: 'Painel',      icon: 'dashboard',     path: '/'          },
    { name: 'Aeronaves',   icon: 'flight_takeoff', path: '/aeronaves' },
    { name: 'Inventário',  icon: 'inventory_2',    path: '/inventario'},
    { name: 'Equipe',      icon: 'groups',         path: '/equipe'    },
    { name: 'Relatórios',  icon: 'assessment',     path: '/relatorios'},
  ];

  return (
    <>
      {/* Google Fonts — Material Symbols (adicione isso no index.html se ainda não tiver) */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" /> */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" /> */}

      <aside
        className="h-screen w-64 fixed left-0 top-0 flex flex-col py-6 px-4 z-50"
        style={{ backgroundColor: '#10131a', borderRight: 'none' }}
      >
        {/* ── Logo ── */}
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3">
            {/* Ícone cubo com fundo primary-container */}
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{
                backgroundColor: '#1b2b48',
                borderRadius: '0.125rem',
              }}
            >
              <Icon name="deployed_code" fill />
            </div>
            <div>
              <h1
                className="text-xl font-bold tracking-tight uppercase"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#b7c7eb',
                  letterSpacing: '-0.01em',
                }}
              >
                The Kinetic Vault
              </h1>
              <p
                className="text-[10px] uppercase tracking-widest"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#c5c6ce',
                  opacity: 0.7,
                }}
              >
                Aerospace Control
              </p>
            </div>
          </div>
        </div>

        {/* ── Navegação ── */}
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 transition-colors font-medium ${
                  isActive
                    ? 'text-[#b7c7eb]'          // ativo: cor primary
                    : 'text-[#c5c6ce] hover:text-[#e1e2eb]'
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: '#1b2b48',           // primary-container
                      borderLeft: '2px solid #b7c7eb',      // borda esquerda primary
                    }
                  : {
                      borderLeft: '2px solid transparent',  // mantém alinhamento
                    }
              }
            >
              {({ isActive }) => (
                <>
                  {/* Hover bg via className — só nos inativos */}
                  <Icon name={item.icon} />
                  <span
                    className="text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── Rodapé ── */}
        <div
          className="mt-auto pt-4"
          style={{ borderTop: '1px solid rgba(68,71,77,0.1)' }}
        >
          {/* Configuração do Sistema */}
          
            href="#"
            className="flex items-center gap-3 px-3 py-2 transition-colors text-[#c5c6ce] hover:text-[#e1e2eb]"
            style={{ fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(50,53,60,0.5)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')
            }
          >
            <Icon name="settings" />
            <span className="text-sm">Configuração do Sistema</span>
          </a>

          {/* Perfil do usuário */}
          <div className="mt-6 flex items-center gap-3 px-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJbUnDcGEB2p1uaW1Y7hI8BmGku0HuLrBecP7UlzdiVLUAmo0w2yVWxgou16cBJregLNzB2wcai5rHnSlSJLBlP9HP88aDymB1HUtZIIfIALl5iey-llO2aQ93T1SJqQOpG2LhgtyLzrlbk7Kh7kBvHU_LNMsSEU5lcR1AmBP1CFkWq-6XoGzYcF-UqRnrI9itqoS2ABOr-UrAx2LK_V8t66U_bAU42mUAWTNWKPX40NtpSI9WAhCR5zN2xnk2YPPhrIFUNQC1rqzF"
              alt="Engenheiro Chefe Avatar"
              className="w-10 h-10 object-cover shrink-0"
              style={{
                borderRadius: '0.25rem',   // rounded-lg do protótipo
                filter: 'grayscale(1) brightness(0.75)',
              }}
            />
            <div className="overflow-hidden">
              <p
                className="text-xs font-bold truncate uppercase"
                style={{ color: '#e1e2eb', fontFamily: "'Inter', sans-serif" }}
              >
                ENGENHEIRO CHEFE
              </p>
              <p
                className="text-[10px] truncate"
                style={{ color: '#c5c6ce', fontFamily: "'Inter', sans-serif" }}
              >
                ID: ARC-29402-K
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}