import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-white text-secondary font-semibold shadow-sm border border-slate-200'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <aside className="flex flex-col h-screen w-64 border-r border-slate-200 bg-slate-50 p-4 gap-2 sticky top-0 shrink-0">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Medical Archive</h1>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Dr. Ortho Pediatric</p>
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        <NavLink to="/" end className={navLinkClass}>
          <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
          <span className="font-sans text-sm font-medium">Dashboard</span>
        </NavLink>
        <NavLink to="/templates" className={navLinkClass}>
          <span className="material-symbols-outlined" data-icon="medical_services">medical_services</span>
          <span className="font-sans text-sm font-medium">Interventi</span>
        </NavLink>
        <NavLink to="/dimissioni" className={navLinkClass}>
          <span className="material-symbols-outlined" data-icon="exit_to_app">exit_to_app</span>
          <span className="font-sans text-sm font-medium">Dimissioni</span>
        </NavLink>
        <NavLink to="/ambulatorio" className={navLinkClass}>
          <span className="material-symbols-outlined" data-icon="monitor_heart">monitor_heart</span>
          <span className="font-sans text-sm font-medium">Ambulatorio</span>
        </NavLink>
        <NavLink to="/pronto-soccorso" className={navLinkClass}>
          <span className="material-symbols-outlined" data-icon="emergency">emergency</span>
          <span className="font-sans text-sm font-medium">Pronto Soccorso</span>
        </NavLink>
      </nav>
      <button 
        onClick={() => alert('Funzione "Nuovo Modello" in fase di implementazione. Sarà presto disponibile un editor completo.')}
        className="mt-auto mb-4 bg-primary text-on-primary py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold text-sm transition-all hover:opacity-90"
      >
        <span className="material-symbols-outlined text-sm" data-icon="add">add</span>
        New Template
      </button>
    </aside>
  );
};

export default Sidebar;
