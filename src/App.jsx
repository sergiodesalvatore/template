import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TemplateList from './pages/TemplateList';
import TemplateDetail from './pages/TemplateDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="templates" element={<TemplateList filterCategory="Interventi" />} />
          <Route path="dimissioni" element={<TemplateList filterCategory="Dimissioni" />} />
          <Route path="ambulatorio" element={<TemplateList filterCategory="Ambulatorio" />} />
          <Route path="pronto-soccorso" element={<TemplateList filterCategory="Pronto Soccorso" />} />
          <Route path="template/:id" element={<TemplateDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
