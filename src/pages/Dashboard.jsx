import React from 'react';
import { Link } from 'react-router-dom';
import { templates } from '../data/templates';

const Dashboard = () => {
  return (
    <div className="p-lg max-w-container-max mx-auto w-full">
      <header className="mb-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Pediatric Ortho Hub</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400 font-label-caps uppercase">Gestione Clinica</span>
        </div>
        <h2 className="font-h1 text-h1 text-on-surface">Dashboard Clinica</h2>
        <p className="text-on-tertiary-container mt-2 max-w-2xl">Benvenuto nell'hub centralizzato dei protocolli. Accedi rapidamente ai modelli per verbali, lettere di dimissione e referti ambulatoriali.</p>
      </header>

      {/* Main Sections Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-xl">
        <Link to="/templates" className="bg-white border border-slate-200 rounded-2xl p-lg shadow-sm hover:shadow-md hover:border-primary transition-all group">
          <div className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[24px]">medical_services</span>
          </div>
          <h3 className="font-h3 text-lg mb-1">Interventi</h3>
          <p className="text-slate-500 text-xs mb-md">Protocolli operatori e verbali chirurgici.</p>
          <div className="text-primary font-bold text-[10px] flex items-center gap-1">
            ESPLORA <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
          </div>
        </Link>

        <Link to="/dimissioni" className="bg-white border border-slate-200 rounded-2xl p-lg shadow-sm hover:shadow-md hover:border-secondary transition-all group">
          <div className="bg-secondary text-white w-10 h-10 rounded-xl flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[24px]">exit_to_app</span>
          </div>
          <h3 className="font-h3 text-lg mb-1">Dimissioni</h3>
          <p className="text-slate-500 text-xs mb-md">Lettere di dimissione post-operatoria.</p>
          <div className="text-secondary font-bold text-[10px] flex items-center gap-1">
            ESPLORA <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
          </div>
        </Link>

        <Link to="/ambulatorio" className="bg-white border border-slate-200 rounded-2xl p-lg shadow-sm hover:shadow-md hover:border-slate-900 transition-all group">
          <div className="bg-slate-700 text-white w-10 h-10 rounded-xl flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[24px]">monitor_heart</span>
          </div>
          <h3 className="font-h3 text-lg mb-1">Ambulatorio</h3>
          <p className="text-slate-500 text-xs mb-md">Reperti per esami obiettivi e prescrizioni.</p>
          <div className="text-slate-700 font-bold text-[10px] flex items-center gap-1">
            ESPLORA <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
          </div>
        </Link>

        <Link to="/pronto-soccorso" className="bg-white border border-slate-200 rounded-2xl p-lg shadow-sm hover:shadow-md hover:border-red-600 transition-all group">
          <div className="bg-red-600 text-white w-10 h-10 rounded-xl flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[24px]">emergency</span>
          </div>
          <h3 className="font-h3 text-lg mb-1">Pronto Soccorso</h3>
          <p className="text-slate-500 text-xs mb-md">Gestione urgenze, gessi e traumi acuti.</p>
          <div className="text-red-600 font-bold text-[10px] flex items-center gap-1">
            ESPLORA <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
          </div>
        </Link>
      </div>

      {/* Recents / Quick Grid */}
      <section>
        <div className="flex justify-between items-center mb-md border-b pb-4 border-slate-100">
          <h4 className="font-label-caps text-slate-500 font-bold text-xs uppercase tracking-widest">Tutti i Template ({templates.length})</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-sm">
          {templates.slice(0, 12).map(doc => (
            <Link to={`/template/${doc.id}`} key={doc.id} className="bg-white border border-slate-200 p-md rounded-xl hover:shadow-md hover:border-primary transition-all group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">{doc.id}</span>
                <span className="material-symbols-outlined text-[16px] text-slate-300 group-hover:text-primary transition-colors">{doc.icon}</span>
              </div>
              <div className="text-[13px] font-bold text-slate-700 line-clamp-2" title={doc.title}>{doc.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
