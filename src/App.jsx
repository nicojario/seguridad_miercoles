import React, { useState } from 'react';
import './index.css';
import { 
  ShieldCheck, 
  Lock, 
  FileCode, 
  DatabaseZap, 
  ShieldAlert, 
  KeySquare, 
  UserCheck, 
  Zap, 
  Clock, 
  WifiOff, 
  BotMessageSquare, 
  Code 
} from 'lucide-react';

const colors = {
  bg: '#0a0f1d',
  card: '#131b2e',
  cardHover: '#1e293b',
  text: '#f8fafc',
  mutedText: '#94a3b8',
  pilarC: '#38bdf8',
  pilarI: '#c084fc',
  pilarA: '#4ade80',
  border: '#1e293b',
  borderActive: '#3b82f6',
};

const pilarData = {
  Confidencialidad: {
    color: colors.pilarC,
    bgAlpha: 'rgba(56, 189, 248, 0.1)',
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
    bgAlpha: 'rgba(192, 132, 252, 0.1)',
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
    bgAlpha: 'rgba(74, 222, 128, 0.1)',
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
    caso: 'Servidor distribuido en la nube para garantizar servicio 24/7 sin interrupciones.',
  },
};

export default function App() {
  const [activePilar, setActivePilar] = useState('Integridad');
  const activeData = pilarData[activePilar];
  const ActiveIcon = activeData.icon;

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: colors.bg,
      color: colors.text,
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 20px',
      overflow: 'hidden'
    }}>
      {/* 1. Header Fijo Compacto */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '8px',
        borderBottom: `1px solid ${colors.border}`,
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={22} color={colors.pilarC} />
          <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
            Seguridad Miércoles
          </h1>
          <span style={{ fontSize: '0.7rem', color: colors.mutedText, backgroundColor: colors.card, padding: '2px 6px', borderRadius: '4px' }}>v1.1</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: colors.mutedText }}>
          Modelo C.I.A. Fundamental
        </span>
      </header>

      {/* 2. Título de Sección Fijo */}
      <div style={{ textAlign: 'center', margin: '8px 0', flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>
          La Tríada de la <span style={{ color: activeData.color }}>Información</span>
        </h2>
        <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: colors.mutedText }}>
          Marco de trabajo de seguridad para guiar las políticas de seguridad. Haz clic en un pilar para explorar.
        </p>
      </div>

      {/* 3. Panel Principal Lado a Lado (Flex) */}
      <main style={{
        flex: 1,
        display: 'flex',
        gap: '16px',
        minHeight: 0,
        overflow: 'hidden'
      }}>
        
        {/* COLUMNA IZQUIERDA: Diagrama Interactivo C.I.A. */}
        <div style={{
          width: '320px',
          flexShrink: 0,
          backgroundColor: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}>
          <span style={{ fontSize: '0.75rem', color: colors.mutedText, fontWeight: 600 }}>
            DIAGRAMA INTERACTIVO
          </span>

          {/* Triángulo SVG */}
          <div style={{ position: 'relative', width: '180px', height: '180px', margin: 'auto' }}>
            <svg width="180" height="180" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0 }}>
              <polygon points="50,15 15,82 85,82" fill="none" stroke={colors.border} strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>

            {/* Vértices / Botones */}
            {[
              { id: 'Confidencialidad', label: 'C', top: '2%', left: '50%', color: colors.pilarC },
              { id: 'Integridad', label: 'I', top: '70%', left: '8%', color: colors.pilarI },
              { id: 'Disponibilidad', label: 'A', top: '70%', left: '72%', color: colors.pilarA }
            ].map((node) => {
              const isActive = activePilar === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActivePilar(node.id)}
                  style={{
                    position: 'absolute',
                    top: node.top,
                    left: node.left,
                    transform: 'translateX(-50%)',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: `2px solid ${isActive ? node.color : colors.border}`,
                    backgroundColor: isActive ? node.color : colors.bg,
                    color: isActive ? '#000' : colors.text,
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? `0 0 12px ${node.color}` : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {node.label}
                </button>
              );
            })}
          </div>

          {/* Selector de Pilares */}
          <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
            {Object.keys(pilarData).map((pilarKey) => {
              const isActive = activePilar === pilarKey;
              const pColor = pilarData[pilarKey].color;
              return (
                <button
                  key={pilarKey}
                  onClick={() => setActivePilar(pilarKey)}
                  style={{
                    flex: 1,
                    padding: '6px 4px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    borderRadius: '6px',
                    border: `1px solid ${isActive ? pColor : colors.border}`,
                    backgroundColor: isActive ? pilarData[pilarKey].bgAlpha : colors.bg,
                    color: isActive ? pColor : colors.mutedText,
                    cursor: 'pointer'
                  }}
                >
                  {pilarKey.substring(0, 4)}.
                </button>
              );
            })}
          </div>
        </div>

        {/* COLUMNA DERECHA: Detalle del Pilar Seleccionado */}
        <div style={{
          flex: 1,
          backgroundColor: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <div>
            {/* Header de Tarjeta */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingBottom: '12px',
              borderBottom: `2px solid ${activeData.color}`
            }}>
              <div style={{
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: activeData.bgAlpha
              }}>
                <ActiveIcon size={30} color={activeData.color} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, letterSpacing: '0.5px' }}>
                  {activePilar.toUpperCase()}
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: colors.mutedText }}>
                  Pilar clave de la Ciberseguridad
                </p>
              </div>
            </div>

            {/* Mecanismos y Amenazas (Grid 2 cols) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginTop: '16px'
            }}>
              {/* Mecanismos */}
              <div style={{
                backgroundColor: colors.bg,
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`
              }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: activeData.color, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} /> Mecanismos de Protección Clave
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {activeData.key_controls.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <li key={idx} style={{ fontSize: '0.8rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: colors.text }}>
                        <ItemIcon size={14} color={activeData.color} />
                        {item.name}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Amenazas */}
              <div style={{
                backgroundColor: colors.bg,
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`
              }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldAlert size={16} /> Principales Amenazas
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {activeData.amenazas.map((threat, idx) => (
                    <li key={idx} style={{ fontSize: '0.8rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: colors.text }}>
                      <WifiOff size={14} color="#f87171" />
                      {threat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Caso Práctico Footer */}
          <div style={{
            backgroundColor: colors.bg,
            padding: '12px',
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            marginTop: '12px'
          }}>
            <h5 style={{ margin: '0 0 4px 0', fontSize: '0.8rem', color: activeData.color, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BotMessageSquare size={14} /> Caso Práctico
            </h5>
            <p style={{ margin: 0, fontSize: '0.78rem', color: colors.mutedText, lineHeight: '1.4' }}>
              {activeData.caso}
            </p>
          </div>

        </div>

      </main>

      {/* 4. Pie de página compacto */}
      <footer style={{
        paddingTop: '8px',
        marginTop: '8px',
        borderTop: `1px solid ${colors.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.7rem',
        color: colors.mutedText,
        flexShrink: 0
      }}>
        <span>&copy; {new Date().getFullYear()} Proyecto Seguridad Miércoles. Material Educativo.</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Code size={12} /> React + Vite + Lucide Icons
        </span>
      </footer>

    </div>
  );
}