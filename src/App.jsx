import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, Lock, KeySquare, UserCheck, 
  FileCode, Zap, DatabaseZap, Clock, WifiOff, BotMessageSquare, Code 
} from 'lucide-react';

const colors = {
  bg: '#111827',
  text: '#f3f4f6',
  mutedText: '#9ca3af',
  pilarC: '#00b0ff',
  pilarI: '#bb86fc',
  pilarA: '#4cd964',
  card: '#1f2937',
  border: '#374151',
};

const pilarData = {
  Confidencialidad: {
    color: colors.pilarC,
    colorSecondary: 'rgba(0, 176, 255, 0.1)',
    icon: Lock,
    key_controls: [
      { name: 'Cifrado (AES-256)', icon: KeySquare },
      { name: 'Autenticación Multifactor', icon: UserCheck },
      { name: 'Control de Acceso (RBAC)', icon: ShieldCheck },
    ],
    amenazas: [
      'Ingeniería Social / Phishing',
      'Intercepción de Red (Sniffing)',
      'Fuga de Información (Data Leakage)',
    ],
    caso: 'Base de datos médica con historial cifrado donde solo personal asignado ve la ficha.',
  },
  Integridad: {
    color: colors.pilarI,
    colorSecondary: 'rgba(187, 134, 252, 0.1)',
    icon: FileCode,
    key_controls: [
      { name: 'Suma de Comprobación (Hashing)', icon: FileCode },
      { name: 'Firma Digital', icon: Zap },
      { name: 'Control de Versiones y Auditoría', icon: ShieldCheck },
    ],
    amenazas: [
      'Modificación no autorizada de datos',
      'Inyección de Código (SQLi, XSS)',
      'Ataques de Re-play',
    ],
    caso: 'Registro financiero donde cada transacción tiene una firma única inalterable.',
  },
  Disponibilidad: {
    color: colors.pilarA,
    colorSecondary: 'rgba(76, 217, 100, 0.1)',
    icon: DatabaseZap,
    key_controls: [
      { name: 'Redundancia y Alta Disponibilidad', icon: Clock },
      { name: 'Respaldos de Datos (Backups)', icon: KeySquare },
      { name: 'Planes de Recuperación (DRP)', icon: Zap },
    ],
    amenazas: [
      'Ataques DDoS',
      'Falla de Hardware',
      'Interrupción de Red/Servicio',
    ],
    caso: 'Un servidor de comercio electrónico distribuido en la nube para garantizar servicio 24/7.',
  },
};

const PilarSelector = ({ pilarKey, data, active, onSelect }) => {
  const Icon = data.icon;
  return (
    <button
      onClick={() => onSelect(pilarKey)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.25rem',
        borderRadius: '12px',
        border: `2px solid ${active ? data.color : colors.border}`,
        backgroundColor: active ? data.colorSecondary : colors.card,
        color: active ? data.color : colors.text,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        gap: '0.75rem',
        flex: '1 1 200px',
        maxWidth: '100%',
      }}
    >
      <Icon size={40} style={{ opacity: active ? 1 : 0.7 }} />
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{pilarKey}</h3>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: active ? data.color : colors.mutedText }}>Pilar clave de la Seguridad</p>
      </div>
    </button>
  );
};

const TriangleDiagram = ({ activePilar }) => {
  const pilarC_coords = { x: 50, y: 15 };
  const pilarI_coords = { x: 15, y: 85 };
  const pilarA_coords = { x: 85, y: 85 };

  const lines = [
    { from: pilarC_coords, to: pilarI_coords },
    { from: pilarC_coords, to: pilarA_coords },
    { from: pilarI_coords, to: pilarA_coords },
  ];

  const nodes = [
    { pilar: 'Confidencialidad', label: 'C', ...pilarC_coords, color: colors.pilarC },
    { pilar: 'Integridad', label: 'I', ...pilarI_coords, color: colors.pilarI },
    { pilar: 'Disponibilidad', label: 'A', ...pilarA_coords, color: colors.pilarA },
  ];

  return (
    <svg width="200" height="200" viewBox="0 0 100 100" style={{ maxWidth: '100%', height: 'auto' }}>
      {lines.map((line, index) => (
        <line
          key={index}
          x1={line.from.x} y1={line.from.y}
          x2={line.to.x} y2={line.to.y}
          stroke={colors.border}
          strokeWidth="0.75"
          strokeDasharray="1 2"
        />
      ))}
      {nodes.map((node) => {
        const isActive = activePilar === node.pilar;
        return (
          <g key={node.pilar} transform={`translate(${node.x}, ${node.y})`}>
            <circle
              r="7"
              fill={colors.card}
              stroke={isActive ? node.color : colors.border}
              strokeWidth={isActive ? '1.5' : '1'}
              style={{ transition: 'all 0.3s ease' }}
            />
            <text
              x="0"
              y="0"
              dy=".3em"
              textAnchor="middle"
              fill={isActive ? node.color : colors.text}
              fontSize="6"
              fontWeight="800"
              style={{ pointerEvents: 'none' }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const PilarDetails = ({ pilar, data }) => {
  const Icon = data.icon;
  return (
    <div style={{
      padding: '1.5rem',
      backgroundColor: colors.card,
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: `2px solid ${data.color}`, paddingBottom: '1rem', flexWrap: 'wrap' }}>
        <Icon size={36} color={data.color} />
        <div>
          <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{pilar}</h2>
          <p style={{ margin: '0.25rem 0 0', color: colors.mutedText, fontSize: '0.95rem' }}>Pilar clave de la Ciberseguridad</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div>
          <h4 style={{ color: data.color, borderBottom: `1px solid ${data.colorSecondary}`, paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '1rem' }}>
            <ShieldCheck style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} size={18} /> Mecanismos de Protección Clave
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {data.key_controls.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: colors.text, fontSize: '0.95rem' }}>
                  <ItemIcon size={18} style={{ color: colors.mutedText, flexShrink: 0 }} /> {item.name}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4 style={{ color: data.color, borderBottom: `1px solid ${data.colorSecondary}`, paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '1rem' }}>
            <ShieldAlert style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} size={18} /> Principales Amenazas
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {data.amenazas.map((threat, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: colors.text, fontSize: '0.95rem' }}>
                <WifiOff size={18} style={{ color: colors.mutedText, flexShrink: 0 }} /> {threat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '2rem', borderTop: `1px solid ${colors.border}`, paddingTop: '1.25rem' }}>
        <h4 style={{ color: data.color, marginTop: 0, fontSize: '1rem' }}> <BotMessageSquare style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} size={18} /> Caso Práctico</h4>
        <div style={{ padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', fontStyle: 'italic', color: colors.mutedText, fontSize: '0.95rem', lineHeight: '1.5' }}>
          {data.caso}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activePilar, setActivePilar] = useState('Confidencialidad');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.bg,
      color: colors.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <style>{`
        .app-main {
          display: flex;
          flex-direction: row;
          gap: 2.5rem;
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .app-aside {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 300px;
          flex-shrink: 0;
        }

        .pilar-selector-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }

        @media (max-width: 900px) {
          .app-main {
            flex-direction: column;
            padding: 1.25rem;
            gap: 2rem;
          }

          .app-aside {
            width: 100%;
          }

          .pilar-selector-container {
            flex-direction: row;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 600px) {
          .pilar-selector-container {
            flex-direction: column;
          }
        }
      `}</style>

      <header style={{
        padding: '1rem 1.5rem',
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.bg,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldCheck size={26} color={colors.pilarC} />
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            Seguridad Miércoles <span style={{ color: colors.mutedText, fontSize: '0.8rem', fontWeight: 300 }}>v1.1</span>
          </h1>
        </div>
      </header>

      <main className="app-main">
        <aside className="app-aside">
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <TriangleDiagram activePilar={activePilar} />
            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: colors.mutedText, marginTop: '0.75rem', margin: '0.75rem 0 0 0' }}>
              Diagrama Interactivo. Haz clic en un pilar para ver detalles.
            </p>
          </div>

          <div className="pilar-selector-container">
            {Object.keys(pilarData).map((pilarKey) => (
              <PilarSelector
                key={pilarKey}
                pilarKey={pilarKey}
                data={pilarData[pilarKey]}
                active={pilarKey === activePilar}
                onSelect={setActivePilar}
              />
            ))}
          </div>
        </aside>

        <section style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} color={colors.pilarC} />
              <p style={{ color: colors.mutedText, margin: 0, fontSize: '0.9rem' }}>Modelo C.I.A. Fundamental</p>
            </div>
            <h1 style={{ margin: '0.5rem 0', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2 }}>
              La Triada de la <span style={{ textDecoration: 'underline' }}>Información</span>
            </h1>
            <p style={{ color: colors.text, fontSize: '1rem', maxWidth: '800px', lineHeight: '1.5', margin: 0 }}>
              Marco de trabajo de seguridad para guiar las políticas de seguridad de la información. Un sistema debe equilibrar y garantizar estos principios.
            </p>
          </div>

          <PilarDetails pilar={activePilar} data={pilarData[activePilar]} />
        </section>
      </main>

      <footer style={{
        padding: '1.5rem',
        borderTop: `1px solid ${colors.border}`,
        marginTop: 'auto',
        textAlign: 'center',
        color: colors.mutedText,
        fontSize: '0.85rem',
      }}>
        &copy; {new Date().getFullYear()} Proyecto Seguridad Miércoles. Material Educativo de Ciberseguridad
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <Code size={16} /> <a href="#" style={{ color: colors.mutedText, textDecoration: 'none' }}>React + Vite</a> + <a href="#" style={{ color: colors.mutedText, textDecoration: 'none' }}>Lucide Icons</a>
        </div>
      </footer>
    </div>
  );
};

export default App;