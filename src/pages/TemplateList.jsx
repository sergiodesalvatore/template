import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { templates } from '../data/templates';

const TemplateList = ({ filterCategory }) => {
  const [activeTab, setActiveTab] = useState('all');

  // Filter templates based on the page's main category
  const pageTemplates = useMemo(() => {
    if (filterCategory === 'Dimissioni') {
      return templates.filter(t => t.category === 'Dimissioni');
    }
    if (filterCategory === 'Ambulatorio') {
      return templates.filter(t => t.category === 'Ambulatorio');
    }
    if (filterCategory === 'Pronto Soccorso') {
      return templates.filter(t => t.category === 'Pronto Soccorso');
    }
    if (filterCategory === 'Preospedalizzazione') {
      return templates.filter(t => t.category === 'Preospedalizzazione');
    }
    // "Interventi" includes everything except the specific sections above
    return templates.filter(t => 
      t.category !== 'Dimissioni' && 
      t.category !== 'Ambulatorio' && 
      t.category !== 'Pronto Soccorso' &&
      t.category !== 'Preospedalizzazione'
    );
  }, [filterCategory]);

  // Extract unique sub-categories from the filtered templates for the tabs
  const categories = useMemo(() => {
    const cats = new Set(pageTemplates.map(t => t.category));
    const catArray = Array.from(cats);
    if (catArray.length <= 1) return []; // Don't show tabs if there's only one category
    return ['all', ...catArray];
  }, [pageTemplates]);

  // Filter templates based on the active tab
  const filteredTemplates = useMemo(() => {
    if (activeTab === 'all') return pageTemplates;
    return pageTemplates.filter(t => t.category === activeTab);
  }, [pageTemplates, activeTab]);

  const downloads = [
    { title: 'Scheda Informativa Scoliosi', url: 'https://1drv.ms/w/c/1463450412a5421e/IQAeQqUSBEVjIIAUc0IAAAAAAWvyNdhvftEX-Kd6uNPuTEQ?e=YupUIW', icon: 'description' },
    { title: 'Consenso Trasfusioni', url: 'https://1drv.ms/b/c/1463450412a5421e/IQAeQqUSBEVjIIAUdEIAAAAAAf6KteDMW0mylRTWnJ1wQLI?e=GKXrlY', icon: 'picture_as_pdf' },
    { title: 'Scheda Informativa Piede Piatto', url: 'https://1drv.ms/b/c/1463450412a5421e/IQAeQqUSBEVjIIAUdUIAAAAAAZ2sRtYnNg3ltvw8yudprs8?e=UWdZfn', icon: 'picture_as_pdf' },
  ];

  return (
    <div className="p-gutter lg:p-lg bg-surface w-full max-w-container-max mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-sm text-on-tertiary-container font-label-caps uppercase tracking-wider">
        <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">{filterCategory || 'Interventi'}</span>
      </nav>

      <header className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface">Archivio {filterCategory || 'Interventi'}</h1>
          <p className="text-on-surface-variant font-body-md mt-base max-w-2xl">
            Sfoglia i modelli standard per {
              filterCategory === 'Dimissioni' ? 'le lettere di dimissione' : 
              filterCategory === 'Ambulatorio' ? 'i referti ambulatoriali' : 
              filterCategory === 'Preospedalizzazione' ? 'le cartelle di pre-ricovero' :
              'i verbali operatori'
            }.
          </p>
        </div>
        <button 
          onClick={() => alert('Funzione "Nuovo Modello" in fase di implementazione. Sarà presto disponibile un editor completo.')}
          className="flex items-center gap-xs px-md h-[40px] bg-secondary text-on-secondary hover:opacity-90 transition-opacity rounded w-fit"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span className="font-label-caps">Nuovo Modello</span>
        </button>
      </header>

      {/* Downloads Section for Preospedalizzazione */}
      {filterCategory === 'Preospedalizzazione' && (
        <section className="mb-xl p-lg bg-amber-50 border border-amber-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-md text-amber-800 font-bold uppercase text-xs tracking-widest">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Documenti Informativi e Consensi (Download)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {downloads.map((doc, i) => (
              <a 
                key={i}
                href={doc.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white border border-amber-100 rounded-xl hover:shadow-md hover:border-amber-400 transition-all group"
              >
                <div className="bg-amber-100 text-amber-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">{doc.icon}</span>
                </div>
                <span className="text-sm font-semibold text-slate-700">{doc.title}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Tabs */}
      {categories.length > 0 && (
        <div className="flex gap-4 border-b border-outline-variant mb-xl overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`pb-sm font-label-caps uppercase transition-colors whitespace-nowrap border-b-2 transition-all duration-200 ${
                activeTab === category
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {category === 'all' ? 'Tutti' : category}
            </button>
          ))}
        </div>
      )}

      {/* Uniform Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filteredTemplates.map((template) => (
          <article key={template.id} className="bg-surface-container-lowest border border-outline-variant p-md flex flex-col group hover:border-secondary transition-all duration-300 cloud-shadow rounded-xl">
            <div className="flex justify-between items-start mb-md">
              <span className="bg-secondary-container text-on-secondary-container font-label-caps px-2 py-0.5 rounded-full text-[10px]">
                {template.category}
              </span>
              <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">
                {template.icon}
              </span>
            </div>
            
            <h3 className="font-h3 text-[18px] text-on-surface mb-sm min-h-[54px] line-clamp-2">
              {template.title}
            </h3>
            
            <p className="text-on-surface-variant text-body-sm mb-md line-clamp-3 flex-grow">
              {template.description}
            </p>
            
            <div className="flex items-center justify-end pt-md border-t border-outline-variant">
              <Link 
                to={`/template/${template.id}`} 
                className="bg-primary text-on-primary px-4 py-1.5 rounded text-label-caps font-bold text-[11px] hover:opacity-90 transition-all"
              >
                APRI
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default TemplateList;
