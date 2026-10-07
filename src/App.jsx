import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  FileCheck, 
  Server, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  RefreshCw, 
  Eye, 
  Key, 
  Database, 
  HardDrive, 
  Zap, 
  BookOpen, 
  Award, 
  ChevronRight, 
  ShieldAlert,
  Cpu,
  Layers,
  HelpCircle,
  Activity,
  Terminal,
  ExternalLink,
  Info
} from 'lucide-react';

const TRIAD_DATA = {
  confidencialidad: {
    id: 'confidencialidad',
    title: 'Confidencialidad',
    english: 'Confidentiality',
    shortDesc: 'Garantizar que la información sea accesible únicamente por personas, sistemas o procesos autorizados.',
    color: 'emerald',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    activeBg: 'bg-emerald-500',
    borderGlow: 'border-emerald-500/50 shadow-emerald-500/20',
    gradient: 'from-emerald-500/20 via-emerald-900/10 to-transparent',
    icon: Lock,
    keyConcept: 'Acceso restringido y Privacidad de los Datos.',
    mechanisms: [
      { name: 'Cifrado de Datos', desc: 'Uso de algoritmos (AES-256, RSA) en tránsito y en reposo.' },
      { name: 'Autenticación Multifactor (MFA)', desc: 'Validación de identidad mediante más de un factor.' },
      { name: 'Control de Acceso Basado en Roles (RBAC)', desc: 'Permisos otorgados estrictamente según el principio de menor privilegio.' },
      { name: 'Enmascaramiento y Anonimización', desc: 'Ocultar información sensible en ambientes no productivos.' }
    ],
    threats: [
      { name: 'Ingeniería Social / Phishing', desc: 'Engañar a usuarios para obtener credenciales.' },
      { name: 'Sniffing de Red', desc: 'Intercepción de tráfico no cifrado en redes públicas.' },
      { name: 'Fuga de Información (Data Leakage)', desc: 'Divulgación accidental o maliciosa de datos sensibles.' }
    ],
    realWorldExample: 'Una base de datos de historial médico cifrada donde solo los médicos asignados con credenciales tokenizadas pueden ver la ficha médica del paciente.',
    metrics: 'Porcentaje de datos sensibles cifrados, tasa de adopción de MFA.'
  },
  integridad: {
    id: 'integridad',
    title: 'Integridad',
    english: 'Integrity',
    shortDesc: 'Asegurar que la información no sea alterada, modificada o destruida de manera no autorizada o accidental.',
    color: 'blue',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    activeBg: 'bg-blue-500',
    borderGlow: 'border-blue-500/50 shadow-blue-500/20',
    gradient: 'from-blue-500/20 via-blue-900/10 to-transparent',
    icon: FileCheck,
    keyConcept: 'Exactitud, Completitud y No Alteración.',
    mechanisms: [
      { name: 'Funciones Hash (Checksums)', desc: 'Generación de huellas digitales únicas (SHA-256) para verificar archivos.' },
      { name: 'Firmas Digitales', desc: 'Garantizan la autenticidad y el no repudio del emisor.' },
      { name: 'Sistemas de Control de Versiones', desc: 'Trazabilidad de cambios e historial de modificaciones.' },
      { name: 'Validación de Entradas (Input Sanitation)', desc: 'Prevención de inyecciones de datos maliciosos.' }
    ],
    threats: [
      { name: 'Ataques Man-in-the-Middle (MitM)', desc: 'Alteración de paquetes de datos en tránsito.' },
      { name: 'Inyección SQL (SQLi)', desc: 'Modificación de tablas y registros en bases de datos.' },
      { name: 'Malware de Tampering', desc: 'Modificación silenciosa de archivos de sistema o ejecutables.' }
    ],
    realWorldExample: 'Una transferencia bancaria en línea donde el monto enviado de $100 no puede ser interceptado y cambiado a $10,000 mientras viaja hacia el servidor.',
    metrics: 'Número de discrepancias de suma de comprobación detectadas, eventos de manipulación de registros.'
  },
  disponibilidad: {
    id: 'disponibilidad',
    title: 'Disponibilidad',
    english: 'Availability',
    shortDesc: 'Garantizar que los sistemas y datos estén operables y accesibles para los usuarios autorizados cuando los necesiten.',
    color: 'purple',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    activeBg: 'bg-purple-500',
    borderGlow: 'border-purple-500/50 shadow-purple-500/20',
    gradient: 'from-purple-500/20 via-purple-900/10 to-transparent',
    icon: Server,
    keyConcept: 'Continuidad del Servicio y Resiliencia.',
    mechanisms: [
      { name: 'Redundancia y Alta Disponibilidad (HA)', desc: 'Servidores duplicados, clusters y failover automático.' },
      { name: 'Copias de Seguridad (Backups)', desc: 'Estrategias 3-2-1 con respaldos probados periódicamente.' },
      { name: 'Balanceo de Carga (Load Balancing)', desc: 'Distribución equitativa de tráfico de red.' },
      { name: 'Planes de Recuperación ante Desastres (DRP)', desc: 'Procedimientos de restauración RTO y RPO.' }
    ],
    threats: [
      { name: 'Ataques de Denegación de Servicio (DDoS)', desc: 'Saturación masiva del servidor con tráfico falso.' },
      { name: 'Ransomware', desc: 'Secuestro y bloqueo de acceso a sistemas críticos.' },
      { name: 'Fallas de Hardware o Desastres Naturales', desc: 'Daños físicos en servidores o cortes de energía.' }
    ],
    realWorldExample: 'Un portal de comercio electrónico en el Black Friday que utiliza balanceadores de carga y escalado automático en la nube para responder a millones de peticiones simultáneas sin caerse.',
    metrics: 'SLA Uptime (ej. 99.99%), Tiempo Medio de Recuperación (MTTR).'
  }
};

const INCIDENT_SCENARIOS = [
  {
    id: 1,
    title: 'Ataque de Ransomware en Servidor de Archivos',
    description: 'Un empleado ejecutó un archivo adjunto malicioso. Toda la información contable ha sido cifrada por los atacantes y la empresa no puede acceder a las planillas de sueldos.',
    correctPillar: 'disponibilidad',
    explanation: 'Aunque la confidencialidad también se ve amenazada si hay filtración, el impacto primario e inmediato es la interrupción total del servicio y la falta de acceso a los datos (Pérdida de Disponibilidad).',
    recommendation: 'Restauración de copias de seguridad aisladas (Air-Gapped Backups) e implementación de EDR.',
    difficulty: 'Fácil'
  },
  {
    id: 2,
    title: 'Modificación No Autorizada de Notas Académicas',
    description: 'Un estudiante descubrió una falla de validación en el portal web de la universidad y cambió sus calificaciones finales de 3.0 a 5.0 en la base de datos.',
    correctPillar: 'integridad',
    explanation: 'La información sigue estando disponible y no necesariamente se filtró al público, pero los datos sufrieron una alteración no autorizada (Violación de la Integridad).',
    recommendation: 'Implementación de logs de auditoría inmutables, firmas digitales y sanitización de entradas.',
    difficulty: 'Intermedio'
  },
  {
    id: 3,
    title: 'Filtración de Contraseñas por Correo en Texto Plano',
    description: 'Un desarrollador envió por correo electrónico no cifrado la lista completa de credenciales y tokens API del entorno de producción a un proveedor externo.',
    correctPillar: 'confidencialidad',
    explanation: 'El sistema sigue funcionando y los datos no se han borrado, pero información altamente confidencial fue expuesta a terceros no autorizados (Violación de Confidencialidad).',
    recommendation: 'Uso de gestores de secretos (Vault), cifrado de extremo a extremo y políticas DLP (Data Loss Prevention).',
    difficulty: 'Fácil'
  },
  {
    id: 4,
    title: 'Ataque Man-in-the-Middle en Red Wi-Fi Pública',
    description: 'Un atacante en una cafetería interceptó la sesión HTTP de un ejecutivo y alteró el número de cuenta bancaria de destino en una orden de pago antes de que llegara al banco.',
    correctPillar: 'integridad',
    explanation: 'Aunque hubo intercepción (confidencialidad), el daño crítico directo ocurrió al modificar los datos en tránsito (Violación de la Integridad).',
    recommendation: 'Implementación obligatoria de HTTPS/TLS, HSTS y uso de VPNs corporativas.',
    difficulty: 'Avanzado'
  }
];

const QUIZ_QUESTIONS = [
  {
    question: '¿Qué principio de la triada garantiza que una firma digital asegure que un documento no ha sido modificado desde su creación?',
    options: [
      { text: 'Confidencialidad', correct: false },
      { text: 'Integridad', correct: true },
      { text: 'Disponibilidad', correct: false },
      { text: 'No Repudio únicamente', correct: false }
    ],
    feedback: '¡Correcto! Las funciones hash y firmas digitales protegen la integridad de los datos detectando cualquier alteración.'
  },
  {
    question: 'Si un ataque DDoS satura el ancho de banda de un banco e impide que los clientes inicien sesión, ¿qué pilar se está vulnerando?',
    options: [
      { text: 'Confidencialidad', correct: false },
      { text: 'Integridad', correct: false },
      { text: 'Disponibilidad', correct: true },
      { text: 'Autenticidad', correct: false }
    ],
    feedback: '¡Exacto! Los ataques DDoS buscan dejar inoperativos los servicios, afectando la disponibilidad.'
  },
  {
    question: 'El uso del algoritmo AES-256 para cifrar un disco duro en un computador portátil previene principalmente fallas en:',
    options: [
      { text: 'Confidencialidad si el equipo es robado.', correct: true },
      { text: 'Disponibilidad en caso de daño físico.', correct: false },
      { text: 'Integridad contra virus informáticos.', correct: false },
      { text: 'Rendimiento del sistema operativo.', correct: false }
    ],
    feedback: '¡Muy bien! El cifrado asegura que nadie sin la clave pueda leer los datos sensibles aunque posea el disco físicamente.'
  },
  {
    question: '¿Cuál de las siguientes combinaciones de controles satisface los 3 pilares de la Triada CIA?',
    options: [
      { text: 'Cifrado SSL, Firewalls y Antivirus.', correct: false },
      { text: 'Cifrado AES (Confidencialidad), Hashing SHA-256 (Integridad) y Clusters Redundantes (Disponibilidad).', correct: true },
      { text: 'Contraseñas seguras, Backups diarios e Impresoras conectadas.', correct: false },
      { text: 'MFA, Token de acceso y Certificado HTTPS.', correct: false }
    ],
    feedback: '¡Excelente! Esta combinación aborda cada dimensión fundamental de la seguridad de la información.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('infografia'); // 'infografia' | 'simulador' | 'quiz' | 'matriz'
  const [selectedPillar, setSelectedPillar] = useState('confidencialidad');
  
  // Simulator State
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showScenarioResult, setShowScenarioResult] = useState(false);
  const [simScore, setSimScore] = useState(0);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const currentPillarObj = TRIAD_DATA[selectedPillar];
  const CurrentIcon = currentPillarObj.icon;

  const handleScenarioSelect = (pillarKey) => {
    if (showScenarioResult) return;
    setSelectedAnswer(pillarKey);
    setShowScenarioResult(true);
    if (pillarKey === INCIDENT_SCENARIOS[currentScenarioIdx].correctPillar) {
      setSimScore(prev => prev + 1);
    }
  };

  const handleNextScenario = () => {
    setSelectedAnswer(null);
    setShowScenarioResult(false);
    if (currentScenarioIdx < INCIDENT_SCENARIOS.length - 1) {
      setCurrentScenarioIdx(prev => prev + 1);
    } else {
      // End of scenarios
      setCurrentScenarioIdx(0);
      alert(`¡Simulación completada! Tu puntuación fue ${simScore + (selectedAnswer === INCIDENT_SCENARIOS[currentScenarioIdx].correctPillar ? 1 : 0)} / ${INCIDENT_SCENARIOS.length}`);
      setSimScore(0);
    }
  };

  const handleQuizAnswer = (optionIdx) => {
    setUserAnswers({ ...userAnswers, [quizIndex]: optionIdx });
  };

  const calculateQuizScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (userAnswers[idx] !== undefined && q.options[userAnswers[idx]].correct) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setQuizIndex(0);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 pb-12">
      {/* Background Decorator Grids */}
      <div className="fixed inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header Container */}
      <header className="relative border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Seguridad Miércoles
                </span>
                <span className="text-xs text-slate-400 font-mono">v1.0</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
                La Triada de la Información (CIA)
              </h1>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            {[
              { id: 'infografia', label: 'Infografía CIA', icon: BookOpen },
              { id: 'simulador', label: 'Simulador de Incidentes', icon: Terminal },
              { id: 'quiz', label: 'Evaluación', icon: Award },
              { id: 'matriz', label: 'Matriz de Mecanismos', icon: Layers }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/80' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex border-t border-slate-800 overflow-x-auto p-2 gap-2 bg-slate-900/90">
          {[
            { id: 'infografia', label: 'Infografía', icon: BookOpen },
            { id: 'simulador', label: 'Simulador', icon: Terminal },
            { id: 'quiz', label: 'Quiz', icon: Award },
            { id: 'matriz', label: 'Matriz', icon: Layers }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 bg-slate-950'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: INFOGRAFÍA INTERACTIVA */}
        {activeTab === 'infografia' && (
          <div className="space-y-8">
            {/* Banner Intro */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 relative overflow-hidden shadow-2xl">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5" /> Modelo C.I.A. (Confidentiality, Integrity, Availability)
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Los Tres Pilares Fundamentales de la Ciberseguridad
                </h2>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  La Triada de la Información es el marco de trabajo de seguridad diseñado para guiar las políticas de seguridad de la información en las organizaciones. Un sistema seguro debe equilibrar y garantizar estos tres principios según sus requerimientos de negocio.
                </p>
              </div>
            </div>

            {/* Visual Interactive Triad Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Triangle Visualizer */}
              <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative flex flex-col items-center justify-center min-h-[420px] shadow-xl">
                <div className="text-center mb-6">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Diagrama Interactivo</span>
                  <p className="text-xs text-slate-500">Haz clic en un nodo para explorar sus características</p>
                </div>

                {/* SVG Triangle Connections */}
                <div className="relative w-72 h-72 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full text-slate-800" viewBox="0 0 200 200">
                    <polygon 
                      points="100,25 25,160 175,160" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeDasharray="4 4"
                      className="text-slate-700/80"
                    />
                    {/* Active highlight paths */}
                    <circle cx="100" cy="25" r="3" className="fill-emerald-400 animate-ping" />
                    <circle cx="25" cy="160" r="3" className="fill-blue-400 animate-ping" />
                    <circle cx="175" cy="160" r="3" className="fill-purple-400 animate-ping" />
                  </svg>

                  {/* Central Security Core */}
                  <div className="absolute z-10 w-20 h-20 rounded-full bg-slate-950 border-2 border-slate-700 shadow-2xl flex flex-col items-center justify-center text-center p-2">
                    <Shield className="w-6 h-6 text-cyan-400 mb-0.5" />
                    <span className="text-[10px] font-black uppercase text-slate-300 tracking-tighter">SEGURIDAD</span>
                  </div>

                  {/* Node 1: Confidencialidad (Top) */}
                  <button
                    onClick={() => setSelectedPillar('confidencialidad')}
                    className={`absolute -top-2 left-1/2 -translate-x-1/2 group transition-all duration-300 z-20 ${
                      selectedPillar === 'confidencialidad' ? 'scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <div className={`p-4 rounded-2xl border flex flex-col items-center gap-1 transition-all shadow-lg ${
                      selectedPillar === 'confidencialidad'
                        ? 'bg-slate-900 border-emerald-500 text-emerald-400 shadow-emerald-500/20'
                        : 'bg-slate-950/90 border-slate-800 text-slate-400 hover:border-emerald-500/50'
                    }`}>
                      <Lock className="w-6 h-6" />
                      <span className="text-xs font-bold">Confidencialidad</span>
                    </div>
                  </button>

                  {/* Node 2: Integridad (Bottom Left) */}
                  <button
                    onClick={() => setSelectedPillar('integridad')}
                    className={`absolute -bottom-2 -left-4 group transition-all duration-300 z-20 ${
                      selectedPillar === 'integridad' ? 'scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <div className={`p-4 rounded-2xl border flex flex-col items-center gap-1 transition-all shadow-lg ${
                      selectedPillar === 'integridad'
                        ? 'bg-slate-900 border-blue-500 text-blue-400 shadow-blue-500/20'
                        : 'bg-slate-950/90 border-slate-800 text-slate-400 hover:border-blue-500/50'
                    }`}>
                      <FileCheck className="w-6 h-6" />
                      <span className="text-xs font-bold">Integridad</span>
                    </div>
                  </button>

                  {/* Node 3: Disponibilidad (Bottom Right) */}
                  <button
                    onClick={() => setSelectedPillar('disponibilidad')}
                    className={`absolute -bottom-2 -right-4 group transition-all duration-300 z-20 ${
                      selectedPillar === 'disponibilidad' ? 'scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <div className={`p-4 rounded-2xl border flex flex-col items-center gap-1 transition-all shadow-lg ${
                      selectedPillar === 'disponibilidad'
                        ? 'bg-slate-900 border-purple-500 text-purple-400 shadow-purple-500/20'
                        : 'bg-slate-950/90 border-slate-800 text-slate-400 hover:border-purple-500/50'
                    }`}>
                      <Server className="w-6 h-6" />
                      <span className="text-xs font-bold">Disponibilidad</span>
                    </div>
                  </button>
                </div>

                {/* Quick Selector Pills */}
                <div className="mt-8 flex items-center gap-2 w-full pt-4 border-t border-slate-800/80">
                  {Object.keys(TRIAD_DATA).map(key => {
                    const item = TRIAD_DATA[key];
                    const isSel = selectedPillar === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedPillar(key)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                          isSel 
                            ? `${item.badgeBg}`
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Detailed Pillar Breakdown Card */}
              <div className="lg:col-span-7 space-y-6">
                <div className={`rounded-2xl border bg-slate-900/90 p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${currentPillarObj.borderGlow}`}>
                  {/* Background Ambient Glow */}
                  <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${currentPillarObj.gradient} rounded-full blur-3xl pointer-events-none`} />

                  <div className="relative z-10 space-y-6">
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-5">
                      <div className="flex items-center gap-4">
                        <div className={`p-3.5 rounded-2xl border ${currentPillarObj.badgeBg}`}>
                          <CurrentIcon className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-bold text-white">{currentPillarObj.title}</h3>
                            <span className="text-xs font-mono text-slate-500">({currentPillarObj.english})</span>
                          </div>
                          <p className="text-sm text-cyan-400 font-medium mt-0.5">
                            Pilar clave: {currentPillarObj.keyConcept}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/60">
                      {currentPillarObj.shortDesc}
                    </p>

                    {/* Technical Protection Mechanisms */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        Mecanismos de Protección Clave
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentPillarObj.mechanisms.map((m, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 hover:border-slate-700 transition-colors">
                            <span className="text-xs font-bold text-slate-200 block mb-1">{m.name}</span>
                            <span className="text-xs text-slate-400 leading-snug block">{m.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Threats section */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        Principales Amenazas y Vulnerabilidades
                      </h4>
                      <div className="space-y-2">
                        {currentPillarObj.threats.map((t, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs bg-amber-500/5 border border-amber-500/10 p-2.5 rounded-lg text-slate-300">
                            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-amber-200 font-semibold">{t.name}: </strong>
                              <span className="text-slate-400">{t.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Case Study Example */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                      <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                        <Info className="w-3.5 h-3.5 text-cyan-400" /> Caso Práctico en la Industria
                      </span>
                      <p className="text-slate-300 leading-relaxed italic">
                        "{currentPillarObj.realWorldExample}"
                      </p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: SIMULADOR DE INCIDENTES DE SEGURIDAD */}
        {activeTab === 'simulador' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Laboratorio de Diagnóstico de Incidentes
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Caso {currentScenarioIdx + 1} de {INCIDENT_SCENARIOS.length}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">Simulador de Brechas de Seguridad</h2>
              <p className="text-xs text-slate-400">
                Analiza el escenario operacional real y determina qué pilar fundamental de la Triada CIA sufrió la mayor vulneración.
              </p>
            </div>

            {/* Scenario Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 relative shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  {INCIDENT_SCENARIOS[currentScenarioIdx].title}
                </h3>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                  Dificultad: {INCIDENT_SCENARIOS[currentScenarioIdx].difficulty}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm md:text-base leading-relaxed font-mono">
                {INCIDENT_SCENARIOS[currentScenarioIdx].description}
              </div>

              {/* Options Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  ¿Qué pilar de la Triada se ha visto principalmente vulnerado?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { key: 'confidencialidad', label: 'Confidencialidad', icon: Lock, color: 'hover:border-emerald-500' },
                    { key: 'integridad', label: 'Integridad', icon: FileCheck, color: 'hover:border-blue-500' },
                    { key: 'disponibilidad', label: 'Disponibilidad', icon: Server, color: 'hover:border-purple-500' }
                  ].map(opt => {
                    const IconC = opt.icon;
                    const isSelected = selectedAnswer === opt.key;
                    const isCorrect = opt.key === INCIDENT_SCENARIOS[currentScenarioIdx].correctPillar;

                    let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900";
                    if (showScenarioResult) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleScenarioSelect(opt.key)}
                        disabled={showScenarioResult}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all font-semibold text-sm ${btnStyle} ${opt.color}`}
                      >
                        <IconC className="w-6 h-6" />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scenario Feedback Result */}
              {showScenarioResult && (
                <div className="space-y-4 pt-4 border-t border-slate-800 animate-fadeIn">
                  <div className={`p-4 rounded-xl border flex items-start gap-3 text-sm ${
                    selectedAnswer === INCIDENT_SCENARIOS[currentScenarioIdx].correctPillar
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                  }`}>
                    {selectedAnswer === INCIDENT_SCENARIOS[currentScenarioIdx].correctPillar ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <strong className="font-bold block">
                        {selectedAnswer === INCIDENT_SCENARIOS[currentScenarioIdx].correctPillar 
                          ? '¡Diagnóstico Correcto!' 
                          : 'Diagnóstico Incorrecto'}
                      </strong>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {INCIDENT_SCENARIOS[currentScenarioIdx].explanation}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider block">
                      Recomendación del Especialista:
                    </span>
                    <p className="text-slate-300">
                      {INCIDENT_SCENARIOS[currentScenarioIdx].recommendation}
                    </p>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextScenario}
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
                    >
                      Siguiente Caso <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: QUIZ EVALUATIVO */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Evaluación de Conocimientos
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">Cuestionario Ciberseguridad CIA</h2>
              </div>
              {!quizFinished && (
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
                  Pregunta {quizIndex + 1} / {QUIZ_QUESTIONS.length}
                </span>
              )}
            </div>

            {!quizFinished ? (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
                <p className="text-base md:text-lg text-slate-200 font-medium">
                  {QUIZ_QUESTIONS[quizIndex].question}
                </p>

                <div className="space-y-3">
                  {QUIZ_QUESTIONS[quizIndex].options.map((opt, idx) => {
                    const isSelected = userAnswers[quizIndex] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all border flex items-center justify-between ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-500/10'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <span>{opt.text}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-700'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Progress Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setQuizIndex(prev => Math.max(0, prev - 1))}
                    disabled={quizIndex === 0}
                    className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 disabled:opacity-30 hover:bg-slate-800"
                  >
                    Anterior
                  </button>

                  {quizIndex < QUIZ_QUESTIONS.length - 1 ? (
                    <button
                      onClick={() => setQuizIndex(prev => prev + 1)}
                      disabled={userAnswers[quizIndex] === undefined}
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs disabled:opacity-40 transition-all"
                    >
                      Siguiente
                    </button>
                  ) : (
                    <button
                      onClick={() => setQuizFinished(true)}
                      disabled={userAnswers[quizIndex] === undefined}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs disabled:opacity-40 transition-all shadow-lg shadow-emerald-500/20"
                    >
                      Finalizar Evaluación
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Score Screen */
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                  <Award className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">¡Evaluación Completada!</h3>
                  <p className="text-slate-400 text-sm">Resultado de tu prueba sobre la Triada de la Información:</p>
                  <div className="text-4xl font-extrabold text-cyan-400 py-2">
                    {calculateQuizScore()} / {QUIZ_QUESTIONS.length}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-xs text-slate-300">
                  {calculateQuizScore() === QUIZ_QUESTIONS.length 
                    ? '¡Excelente trabajo! Dominas perfectamente los conceptos de Confidencialidad, Integridad y Disponibilidad.'
                    : 'Buen intento. Revisa nuevamente los pilares en la pestaña Infografía para perfeccionar tu conocimiento.'}
                </div>

                <button
                  onClick={resetQuiz}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm inline-flex items-center gap-2 border border-slate-700 transition-all"
                >
                  <RefreshCw className="w-4 h-4" /> Intentar de Nuevo
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MATRIZ DE MECANISMOS Y CONTROLES */}
        {activeTab === 'matriz' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Resumen Técnico
              </span>
              <h2 className="text-2xl font-bold text-white">Matriz General de Controles de Seguridad</h2>
              <p className="text-xs text-slate-400">
                Guía de referencia rápida relacionando objetivos de seguridad con tecnologías e implementaciones de la industria.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
                    <th className="p-4">Pilar</th>
                    <th className="p-4">Objetivo Principal</th>
                    <th className="p-4">Tecnologías / Estándares</th>
                    <th className="p-4">Ejemplo de Vulneración</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-emerald-400 flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Confidencialidad
                    </td>
                    <td className="p-4">Proteger los datos contra divulgación no autorizada.</td>
                    <td className="p-4 font-mono text-slate-400">AES-256, TLS 1.3, IAM, MFA, VPNs, OAuth 2.0</td>
                    <td className="p-4 text-rose-300">Filtración de base de datos de clientes en la Dark Web.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-blue-400 flex items-center gap-2">
                      <FileCheck className="w-4 h-4" /> Integridad
                    </td>
                    <td className="p-4">Prevenir modificaciones accidentales o maliciosas.</td>
                    <td className="p-4 font-mono text-slate-400">SHA-256, RSA Signatures, Blockchain, Git, WAF</td>
                    <td className="p-4 text-rose-300">Inyección SQL que altera saldos bancarios.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-purple-400 flex items-center gap-2">
                      <Server className="w-4 h-4" /> Disponibilidad
                    </td>
                    <td className="p-4">Garantizar acceso continuo a usuarios legítimos.</td>
                    <td className="p-4 font-mono text-slate-400">Kubernetes, CDN, Cloudflare DDoS, RAID, AWS Route53</td>
                    <td className="p-4 text-rose-300">Ataque DDoS tumbando tienda virtual durante festividades.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 pt-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© Proyecto <span className="text-slate-400 font-semibold">seguridad_miercoles</span> - Material Educativo de Ciberseguridad</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-cyan-400" /> Triada CIA</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-cyan-400" /> Vite + React</span>
          </div>
        </div>
      </footer>
    </div>
  );
}