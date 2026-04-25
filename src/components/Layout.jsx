import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavBar from './TopNavBar';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <TopNavBar />
        <Outlet />
        <footer className="mt-auto px-lg py-sm border-t border-slate-200 bg-white flex justify-between items-center text-[10px] font-bold text-slate-400">
          <div>© 2024 PEDIATRIC ORTHO REPOSITORY SYSTEM</div>
          <div className="flex gap-4 uppercase">
            <a className="hover:text-slate-600" href="#">Privacy Policy</a>
            <a className="hover:text-slate-600" href="#">Terms of Service</a>
            <span className="text-slate-200">|</span>
            <span className="flex items-center gap-1 text-secondary">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> SYSTEM ONLINE
            </span>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Layout;
