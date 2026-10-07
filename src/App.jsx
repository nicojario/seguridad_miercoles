import React, { useState } from 'react';
import { Shield, Lock, FileCode, CheckCircle, AlertTriangle } from 'lucide-react';

export default function SeguridadMiercoles() {
  const [selectedPillar, setSelectedPillar] = useState('integridad');

  const pillarData = {
    confidencialidad: {
      title: 'CONFIDENCIALIDAD',
      subtitle: 'Pilar clave de la Seguridad',
      mecanismos: ['Cifrado de Datos (AES)', 'Control de Acceso (RBAC)', 'Autenticación Multifactor'],
      amenazas: ['Fuga de Información', 'Ataques Man-in-the-Middle', 'Phishing']
    },
    integridad: {
      title: 'INTEGRIDAD',
      subtitle: 'Pilar clave de la Ciberseguridad',
      mecanismos: ['Suma de Comprobación (Hashing)', 'Firma Digital'],
      amenazas: ['Modificación no autorizada de datos', 'Inyección de Código (SQLi, XSS)']
    },
    disponibilidad: {
      title: 'DISPONIBILIDAD',
      subtitle: 'Pilar clave de la Disponibilidad',
      mecanismos: ['Sistemas Redundantes', 'Copias de Seguridad (Backups)', 'Planes DRP'],
      amenazas: ['Ataques DDoS', 'Fallo de Hardware', 'Ransomware']
    }
  };

  const currentData = pillarData[selectedPillar];

  return (
    /* Forzamos alto exacto de 100vh y desactivamos scroll */
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }} className="bg-[#0b0f19] text-white flex flex-col p-4 box-border">
      
      {/* Header Compacto de 1 Sola Línea */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <h1 className="text-base font-bold">Seguridad Miércoles</h1>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">v1.1</span>
        </div>
        <p className="text-xs text-slate-400">Modelo C.I.A. Fundamental</p>
      </header>

      {/* Título de la Sección */}
      <div className="text-center mb-3 flex-shrink-0">
        <h2 className="text-xl font-extrabold tracking-tight">La Tríada de la <span className="underline decoration-purple-500">Información</span></h2>
        <p className="text-xs text-slate-400">Marco de trabajo de seguridad para guiar las políticas de seguridad de la información.</p>
      </div>

      {/* Contenedor Horizontal (2 Columnas lado a lado) */}
      <div className="flex-1 flex flex-row gap-4 min-h-0 overflow-hidden">
        
        {/* COLUMNA IZQUIERDA: Triángulo interactivo */}
        <div className="w-1/3 bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center relative">
          
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* SVG Triángulo Punteado */}
            <svg className="absolute inset-0 w-full h-full text-slate-600" viewBox="0 0 100 100">
              <polygon points="50,15 15,85 85,85" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            {/* Vértices */}
            <button
              onClick={() => setSelectedPillar('confidencialidad')}
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all ${
                selectedPillar === 'confidencialidad' ? 'bg-purple-600 ring-4 ring-purple-500/30' : 'bg-slate-800 text-slate-300'
              }`}
            >
              C
            </button>

            <button
              onClick={() => setSelectedPillar('integridad')}
              className={`absolute bottom-0 left-0 w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all ${
                selectedPillar === 'integridad' ? 'bg-purple-600 ring-4 ring-purple-500/30' : 'bg-slate-800 text-slate-300'
              }`}
            >
              I
            </button>

            <button
              onClick={() => setSelectedPillar('disponibilidad')}
              className={`absolute bottom-0 right-0 w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all ${
                selectedPillar === 'disponibilidad' ? 'bg-purple-600 ring-4 ring-purple-500/30' : 'bg-slate-800 text-slate-300'
              }`}
            >
              A
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 text-center">
            Diagrama Interactivo. Haz clic en un pilar para ver detalles.
          </p>
        </div>

        {/* COLUMNA DERECHA: Detalle del Pilar */}
        <div className="w-2/3 bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FileCode className="w-7 h-7 text-purple-400" />
              <div>
                <h3 className="text-2xl font-black">{currentData.title}</h3>
                <p className="text-xs text-slate-400">{currentData.subtitle}</p>
              </div>
            </div>
            <hr className="border-slate-800 my-3" />

            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Mecanismos */}
              <div>
                <h4 className="text-xs font-bold text-purple-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle className="w-3.5 h-3.5" /> Mecanismos de Protección Clave
                </h4>
                <div className="flex flex-col gap-2">
                  {currentData.mecanismos.map((m, i) => (
                    <div key={i} className="bg-slate-950/50 border border-slate-800 p-2 rounded text-xs">
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenazas */}
              <div>
                <h4 className="text-xs font-bold text-purple-400 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" /> Principales Amenazas
                </h4>
                <div className="flex flex-col gap-2">
                  {currentData.amenazas.map((a, i) => (
                    <div key={i} className="bg-slate-950/50 border border-slate-800 p-2 rounded text-xs">
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}