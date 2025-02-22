import React from 'react';

const Navbar = ({ currentView, setCurrentView }) => {
  return (
    <nav className="backdrop-blur-lg bg-white/10 p-2 text-black shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">TempX</h1>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-lg text-lg backdrop-blur-sm ${
                currentView === 'dashboard'
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'bg-transparent hover:bg-white/10 hover:text-white'
              } transition-all duration-300`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView('form')}
              className={`px-4 py-2 rounded-lg text-lg backdrop-blur-sm ${
                currentView === 'form'
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'bg-transparent hover:bg-white/10 hover:text-white'
              } transition-all duration-300`}
            >
            SEND MAIL
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView('list')}
              className={`px-4 py-2 rounded-lg text-lg backdrop-blur-sm ${
                currentView === 'list'
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'bg-transparent hover:bg-white/10 hover:text-white'
              } transition-all duration-300`}
            >
              E-MAILS
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;