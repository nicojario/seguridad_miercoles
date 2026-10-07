import React, { useState } from 'react';
import { 
  BookOpenCheck, ShieldAlert, BrainCircuit, BotMessageSquare, ShieldCheck, Lock, 
  KeySquare, UserCheck, FileCode, Zap, DatabaseZap, Clock, WifiOff, Code 
} from 'lucide-react';

const colors = {
  bg: '#111827',
  text: '#f3f4f6',
  mutedText: '#9ca3af',
  pilarC: '#00b0ff',
  pilarI: '#bb86fc',
  pilarA: '#4cd964',
  card: '#1f2937',
  navBtnBg: '#111827',
  navBtnText: '#d1d5db',
  border: '#374151',
};

const navigationTabs = [
  { name: 'Infografía CIA', icon: BookOpenCheck, color: colors.pilarC },
  { name: 'Simulador de Incidentes', icon: ShieldAlert, color: colors.pilarI },
  { name: 'Evaluación', icon: BrainCircuit, color: colors.pilarA },
  { name: 'Matriz de Mecanismos', icon: BotMessageSquare, color: colors.text },
];

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
        flex: 1,
        minWidth: '220px',
      }}
    >
      <Icon size={48} style={{ opacity: active ? 1 : 0.7 }} />
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{pilarKey}</h3>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: active ? data.color : colors.mutedText }}>Pilar clave de la Seguridad</p>
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
    <svg width="240" height="240" viewBox="0 0 100 100">
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
      padding: '2rem',
      backgroundColor: colors.card,
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: `2px solid ${data.color}`, paddingBottom: '1rem' }}>
        <Icon size={40} color={data.color} />
        <div>
          <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{pilar}</h2>
          <p style={{ margin: '0.25rem 0 0', color: colors.mutedText, fontSize: '1.1rem' }}>Pilar clave de la Ciberseguridad</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <h4 style={{ color: data.color, borderBottom: `1px solid ${data.colorSecondary}`, paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            <ShieldCheck style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Mecanismos de Protección Clave
          </h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.key_controls.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: colors.text }}>
                  <ItemIcon size={18} style={{ color: colors.mutedText }} /> {item.name}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4 style={{ color: data.color, borderBottom: `1px solid ${data.colorSecondary}`, paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            <ShieldAlert style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Principales Amenazas
          </h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.amenazas.map((threat, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: colors.text }}>
                <WifiOff size={18} style={{ color: colors.mutedText }} /> {threat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '2.5rem', borderTop: `1px solid ${colors.border}`, paddingTop: '1.5rem' }}>
        <h4 style={{ color: data.color }}> <BotMessageSquare style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Caso Práctico</h4>
        <div style={{ padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', fontStyle: 'italic', color: colors.mutedText }}>
          {data.caso}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
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
      <header style={{
        padding: '1.5rem',
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
          <ShieldCheck size={28} color={colors.pilarC} />
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>Seguridad Miércoles <span style={{ color: colors.mutedText, fontSize: '1rem', fontWeight: 300 }}>v1.1</span></h1>
        </div>
        
        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          {navigationTabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = idx === activeTab;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '6px',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : colors.navBtnBg,
                  color: isActive ? colors.text : colors.navBtnText,
                  cursor: 'pointer',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s',
                }}
              >
                <Icon size={18} /> {tab.name}
              </button>
            );
          })}
        </nav>
      </header>

      <main style={{
        flex: 1,
        padding: '3rem',
        display: 'flex',
        gap: '3rem',
        maxWidth: '1600px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <aside style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', width: '300px' }}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TriangleDiagram activePilar={activePilar} />
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: colors.mutedText, marginTop: '1rem' }}>Diagrama Interactivo. Haz clic en un pilar para ver detalles.</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', width: '100%' }}>
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

        <section style={{ flex: 1 }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} color={colors.pilarC} />
              <p style={{ color: colors.mutedText, margin: 0 }}>Modelo C.I.A. Fundamental</p>
            </div>
            <h1 style={{ margin: '0.5rem 0', fontSize: '3.5rem', fontWeight: 800 }}>La Triada de la <span style={{ textDecoration: 'underline' }}>Información</span></h1>
            <p style={{ color: colors.text, fontSize: '1.2rem', maxWidth: '800px', lineHeight: '1.7' }}>Marco de trabajo de seguridad para guiar las políticas de seguridad de la información. Un sistema debe equilibrar y garantizar estos principios.</p>
          </div>

          <PilarDetails pilar={activePilar} data={pilarData[activePilar]} />
        </section>
      </main>

      <footer style={{
        padding: '2rem',
        borderTop: `1px solid ${colors.border}`,
        marginTop: '3rem',
        textAlign: 'center',
        color: colors.mutedText,
        fontSize: '0.9rem',
      }}>
        &copy; {new Date().getFullYear()} Proyecto Seguridad Miercoles. Material Educativo de Ciberseguridad
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <Code size={16} /> <a href="#" style={{ color: colors.mutedText, textDecoration: 'none' }}>React + Vite</a> + <a href="#" style={{ color: colors.mutedText, textDecoration: 'none' }}>Lucide Icons</a>
        </div>
      </footer>
    </div>
  );
};

export default App;