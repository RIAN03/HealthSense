import React from 'react';
import { View } from '../types';
import { ICONS } from '../constants';

interface BottomNavProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; isActive: boolean; onClick: () => void, 'aria-label': string }> = ({ icon, isActive, onClick, 'aria-label': ariaLabel }) => (
  <button onClick={onClick} aria-label={ariaLabel} className={`p-3 rounded-full transition-colors duration-300 ${isActive ? 'bg-primary-blue text-white' : 'text-gray-400 hover:bg-gray-100'}`}>
    {icon}
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-transparent flex justify-center items-center">
        <div className="flex justify-around items-center bg-white w-[90%] rounded-full shadow-lg px-4 py-2">
            <NavItem icon={<ICONS.Home className="w-7 h-7" />} isActive={currentView === 'dashboard'} onClick={() => setView('dashboard')} aria-label="Dashboard" />
            <NavItem icon={<ICONS.Chart className="w-7 h-7" />} isActive={currentView === 'reports'} onClick={() => setView('reports')} aria-label="Reports" />
            <button onClick={() => setView('healthAI')} aria-label="Health Assistant" className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center text-white -mt-10 shadow-md shadow-primary-blue/50 transform hover:scale-110 transition-transform duration-300">
                <ICONS.HealthAI className="w-8 h-8" />
            </button>
            <NavItem icon={<ICONS.Alerts className="w-7 h-7" />} isActive={currentView === 'alerts'} onClick={() => setView('alerts')} aria-label="Alerts"/>
            <NavItem icon={<ICONS.Profile className="w-7 h-7" />} isActive={currentView === 'profile'} onClick={() => setView('profile')} aria-label="Profile"/>
        </div>
    </div>
  );
};

export default BottomNav;
