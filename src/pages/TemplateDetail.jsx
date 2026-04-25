import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { templates } from '../data/templates';

// Relationship mapping helper
const getRelatedTemplates = (templateId) => {
  const relations = {
    // Interventi -> Dimissioni
    'ORTHO-042-PI': ['ORTHO-103-DM', 'ORTHO-104-DB'], // Piede Piatto -> Dimissioni
    'ORTHO-015-SC': ['ORTHO-102-DS'], // Scoliosi -> Dimissione
    'ORTHO-016-SC': ['ORTHO-102-DS'], 
    'ORTHO-017-SC': ['ORTHO-102-DS'], 
    'ORTHO-018-MG': ['ORTHO-102-DS'], 
    'ORTHO-025-EQ': ['ORTHO-105-EQ'], // Equino -> Dimissione
    
    // Dimissioni -> Interventi
    'ORTHO-102-DS': ['ORTHO-015-SC'], 
    'ORTHO-103-DM': ['ORTHO-042-PI'],
    'ORTHO-104-DB': ['ORTHO-042-PI'],
    'ORTHO-105-EQ': ['ORTHO-025-EQ']
  };
  
  const ids = relations[templateId] || [];
  return ids.map(id => templates.find(t => t.id === id)).filter(Boolean);
};

const TemplateDetail = () => {
  const { id } = useParams();
  const template = templates.find(t => t.id === id);

  if (!template) {
    return <Navigate to="/templates" replace />;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(template.content || '');
  const [copied, setCopied] = useState(false);

  const relatedTemplates = getRelatedTemplates(template.id);

  const handleCopyText = () => {
    navigator.clipboard.writeText(editableContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSave = () => {
    // In a real app, this would save to a database.
    // For now, we just update the local state.
    setIsEditing(false);
    alert('Modifiche salvate localmente (non persistenti al refresh)');
  };

  return (
    <div className="p-gutter lg:p-lg max-w-container-max mx-auto w-full">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
        <div className="space-y-base">
          <div className="flex items-center gap-xs">
            <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase">{template.category}</span>
            <span className="text-on-tertiary-container text-[10px] font-bold">ID: {template.id}</span>
          </div>
          <h1 className="font-h1 text-h1 text-primary">{template.title}</h1>
        </div>
        
        <div className="flex gap-sm">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="flex items-center gap-xs px-md h-[44px] bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">save</span>
              Salva
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-xs px-md h-[44px] bg-white border border-outline-variant text-primary rounded-lg hover:bg-slate-50 transition-colors font-bold text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">edit</span>
              Modifica
            </button>
          )}
          
          <button 
            onClick={handleCopyText}
            className={`flex items-center gap-xs px-md h-[44px] rounded-lg transition-all font-bold text-sm min-w-[150px] justify-center ${
              copied ? 'bg-green-600 text-white' : 'bg-primary text-on-primary hover:opacity-90'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{copied ? 'check' : 'content_copy'}</span>
            {copied ? 'Copiato!' : 'Copia Testo'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main Text Area */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-outline-variant rounded-2xl overflow-hidden shadow-sm flex flex-col min-h-[600px]">
            <div className="bg-slate-50 px-md py-sm border-b border-outline-variant flex justify-between items-center">
              <span className="font-label-caps text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                {isEditing ? 'Modalità Modifica' : 'Testo del Template'}
              </span>
              {isEditing && (
                <button 
                  onClick={() => {
                    setEditableContent(template.content || '');
                    setIsEditing(false);
                  }}
                  className="text-xs text-red-500 font-bold hover:underline"
                >
                  Annulla
                </button>
              )}
            </div>
            <div className="p-xl flex-1 flex flex-col">
              {isEditing ? (
                <textarea
                  className="w-full flex-1 p-4 border border-slate-200 rounded-xl font-sans text-body-md leading-relaxed text-slate-800 focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
                  value={editableContent}
                  onChange={(e) => setEditableContent(e.target.value)}
                  autoFocus
                />
              ) : (
                <div className="font-sans text-body-md leading-relaxed text-slate-800 whitespace-pre-wrap">
                  {editableContent}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          {/* Related Documents Link */}
          {relatedTemplates.length > 0 ? (
            <div className="bg-secondary-container/30 border border-secondary/20 rounded-2xl p-md space-y-md">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-[20px]">link</span>
                <h4 className="font-bold text-sm uppercase tracking-tight">Documenti Correlati</h4>
              </div>
              <div className="space-y-sm">
                {relatedTemplates.map(related => (
                  <Link 
                    key={related.id} 
                    to={`/template/${related.id}`} 
                    className="flex items-center p-md bg-white border border-outline-variant rounded-xl hover:border-secondary hover:shadow-md transition-all group"
                  >
                    <div className="flex flex-col flex-1">
                      <span className="text-[10px] text-secondary font-bold uppercase mb-1">Vai a: {related.category}</span>
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">{related.title}</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-secondary">arrow_forward_ios</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-md flex flex-col items-center justify-center text-center py-xl">
               <span className="material-symbols-outlined text-slate-300 text-4xl mb-2">link_off</span>
               <p className="text-xs text-slate-400 font-medium tracking-tight">Nessuna correlazione automatica trovata.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
