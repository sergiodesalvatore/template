import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { templates } from '../data/templates';

const TopNavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Filter templates based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = templates.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8);
      setSearchResults(results);
      setIsDropdownOpen(true);
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectResult = (id) => {
    setSearchQuery('');
    setIsDropdownOpen(false);
    navigate(`/template/${id}`);
  };

  return (
    <header className="flex justify-between items-center w-full px-6 h-16 sticky top-0 z-50 bg-white border-b border-slate-200 shrink-0">
      <div className="flex items-center flex-1 max-w-xl relative" ref={dropdownRef}>
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" data-icon="search">search</span>
          <input 
            className="w-full bg-slate-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
            placeholder="Cerca template (titolo, ID o categoria)..." 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim().length > 1 && setIsDropdownOpen(true)}
          />
        </div>

        {/* Search Results Dropdown */}
        {isDropdownOpen && searchResults.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-[60]">
            <div className="p-2 border-b border-slate-100 bg-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Risultati Trovati</span>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {searchResults.map(result => (
                <button
                  key={result.id}
                  onClick={() => handleSelectResult(result.id)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 last:border-0"
                >
                  <div className="bg-slate-100 text-slate-500 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-lg">{result.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary uppercase text-[9px] mb-0.5">{result.id} • {result.category}</span>
                    <span className="text-sm font-semibold text-slate-700">{result.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isDropdownOpen && searchResults.length === 0 && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl p-6 text-center z-[60]">
            <span className="material-symbols-outlined text-slate-200 text-4xl mb-2">search_off</span>
            <p className="text-sm text-slate-500 font-medium">Nessun risultato trovato per "{searchQuery}"</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 ml-6">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
          <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <span className="material-symbols-outlined" data-icon="help_outline">help_outline</span>
        </button>
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        <button className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-slate-50 rounded-full transition-colors">
          <span className="text-xs font-bold text-slate-700">Dott. De Salvatore</span>
          <span className="material-symbols-outlined text-slate-400" data-icon="account_circle" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
        </button>
      </div>
    </header>
  );
};

export default TopNavBar;
