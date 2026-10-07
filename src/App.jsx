import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  FileCode, 
  Key, 
  AlertTriangle, 
  CheckCircle, 
  EyeOff, 
  Server, 
  FileCheck 
} from 'lucide-react';

export default function SeguridadMiercoles() {
  const [selectedPillar, setSelectedPillar] = useState('integridad');

  // Datos de cada pilar
  const pillarData = {
    confidencialidad: {
      title: 'CONFIDENCIALIDAD',
      subtitle: 'Garantizar que la información solo sea accesible por personal autorizado.',
      mecanismos: ['Cifrado de Datos (AES, RSA)', 'Control de Acceso (RBAC)', 'Autenticación Multifactor (MFA)'],
      amenazas: ['Fuga de Información', 'Ataques Man-in-the-Middle (MitM)', 'Ingeniería Social / Phishing']
    },
    integridad: {
      title: 'INTEGRIDAD',
      subtitle: 'Garantizar que la información se mantenga exacta, completa y no alterada.',
      mecanismos: ['Suma de Comprobación (Hashing)', 'Firma Digital', 'Control de Versiones y Auditoría'],
      amenazas: ['Modificación no autorizada de datos', 'Inyección de Código (SQLi, XSS)', 'Sabotaje de Archivos']
    },
    disponibilidad: {
      title: 'DISPONIBILIDAD',
      subtitle: 'Garantizar que los sistemas y datos estén accesibles cuando se requieran.',
      mecanismos: ['Sistemas Redundantes y Balanceo', 'Copias de Seguridad (Backups)', 'Planes de Recuperación (DRP)'],
      amenazas: ['Ataques de Denegación de Servicio (DDoS)', 'Fallo de Hardware / Infrestructura', 'Ransomware']
    }
  };

  const currentData = pillarData[selectedPillar];

  return (
    <div className="h-screen w-screen bg-[#0a0f1d] text-white flex flex-col p-4 overflow-hidden justify-between">
      {/* Top Navbar / Header compacto */}
      <header className="flex items-center justify-between border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-cyan-400" />
          <h1 className="text-lg font-bold tracking-wide">Seguridad Miércoles</h1>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">v1.1</span>
        </div>
        <span className="text-xs text-slate-400">Modelo C.I.A. Fundamental</span>
      </header>

      {/* Main Content Grid: Ocupa todo el alto disponible sin desbordar */}
      <main className="grid grid-cols-12 gap-4 flex-1 my-3 items-stretch overflow-hidden">
        
        {/* LADO IZQUIERDO: Diagrama C.I.A. Interactivo */}
        <div className="col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between items-center relative">
          <div className="text-center">
            <h2 className="text-base font-semibold text-slate-200">La Tríada de la Información</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Marco de trabajo para guiar las políticas de seguridad. Haz clic en un pilar.
            </p>
          </div>

          {/* Triángulo Interactivo SVG */}
          <div className="relative w-full max-w-[220px] aspect-square flex items-center justify-center my-auto">
            {/* Líneas conectoras punteadas */}
            <svg className="absolute inset-0 w-full h-full text-slate-700" viewBox="0 0 100 100">
              <polygon points="50,15 15,80 85,80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>

            {/* Vértice C (Confidencialidad) */}
            <button 
              onClick={() => setSelectedPillar('confidencialidad')}
              className={`absolute top-[5%] left-[50%] -translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-lg ${
                selectedPillar === 'confidencialidad'
                  ? 'bg-purple-600 text-white ring-4 ring-purple-500/30 scale-110'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              C
            </button>

            {/* Vértice I (Integridad) */}
            <button 
              onClick={() => setSelectedPillar('integridad')}
              className={`absolute bottom-[10%] left-[10%] w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-lg ${
                selectedPillar === 'integridad'
                  ? 'bg-purple-600 text-white ring-4 ring-purple-500/30 scale-110'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              I
            </button>

            {/* Vértice A (Disponibilidad) */}
            <button 
              onClick={() => setSelectedPillar('disponibilidad')}
              className={`absolute bottom-[10%] right-[10%] w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-lg ${
                selectedPillar === 'disponibilidad'
                  ? 'bg-purple-600 text-white ring-4 ring-purple-500/30 scale-110'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              A
            </button>
          </div>

          {/* Tarjeta inferior selector en texto */}
          <div className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium capitalize">{selectedPillar}</span>
            </div>
            <span className="text-[10px] text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
              Activo
            </span>
          </div>
        </div>

        {/* LADO DERECHO: Detalle del Pilar Seleccionado */}
        <div className="col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between overflow-hidden">
          
          {/* Encabezado del Pilar */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-purple-950/50 border border-purple-800/40 text-purple-400">
                <FileCode className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-wider text-white">
                  {currentData.title}
                </h2>
                <p className="text-xs text-slate-400">{currentData.subtitle}</p>
              </div>
            </div>
            <hr className="border-slate-800 my-3" />
          </div>

          {/* Grid de Contenido (Mecanismos vs Amenazas) */}
          <div className="grid grid-cols-2 gap-4 flex-1 my-1">
            
            {/* Columna Mecanismos */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-purple-400 font-semibold text-xs mb-1">
                <CheckCircle className="w-4 h-4" />
                <span>Mecanismos de Protección Clave</span>
              </div>
              <div className="flex flex-col gap-2">
                {currentData.mecanismos.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/40 border border-slate-800/60 p-2.5 rounded-lg text-xs text-slate-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna Amenazas */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-purple-400 font-semibold text-xs mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Principales Amenazas</span>
              </div>
              <div className="flex flex-col gap-2">
                {currentData.amenazas.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/40 border border-slate-800/60 p-2.5 rounded-lg text-xs text-slate-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Pie de la tarjeta */}
          <footer className="mt-2 pt-2 border-t border-slate-800/60 flex justify-between items-center text-[11px] text-slate-500">
            <span>Seguridad de la información</span>
            <span>Sistema equilibrado</span>
          </footer>

        </div>
      </main>
    </div>
  );
}