import React from 'react';
import { View, Gender } from '../types';
import { ICONS } from '../constants';

interface ProfileScreenProps {
  setView: (view: View) => void;
  userName: string;
  userEmail: string;
  userPhoto: string | null;
  age: string;
  gender: Gender;
}

const MenuItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    isDestructive?: boolean;
    isBeta?: boolean;
}> = ({ icon, label, onClick, isDestructive = false, isBeta = false }) => (
    <button 
        onClick={onClick} 
        className={`flex items-center w-full text-left p-4 transition-colors duration-200 ${isDestructive ? 'hover:bg-red-50' : 'hover:bg-gray-50'}`}
        aria-label={label}
    >
        <div className={`p-2 rounded-lg ${
            label === 'Connected Devices' ? 'bg-indigo-100' :
            label === 'Settings' ? 'bg-gray-100' :
            label === 'Help & Support' ? 'bg-green-100' :
            isDestructive ? 'bg-red-100' : ''
        }`}>
            {icon}
        </div>
        <span className={`ml-4 font-medium flex-1 ${isDestructive ? 'text-red-500' : 'text-text-dark-primary'}`}>{label}</span>
        {isBeta && (
            <span className="text-xs font-semibold bg-accent-orange/20 text-accent-orange px-2 py-1 rounded-full mr-2">
                Beta
            </span>
        )}
        {!isDestructive && <ICONS.ChevronRight className="w-5 h-5 text-gray-400" />}
    </button>
);


const ProfileScreen: React.FC<ProfileScreenProps> = ({ setView, userName, userEmail, userPhoto, age, gender }) => {
  return (
    <div className="pb-24 bg-light-bg min-h-full">
        <div className="p-6">
            <h1 className="text-xl font-bold text-center text-text-dark-primary">My Profile</h1>
        </div>
        
        <div className="px-6 flex flex-col items-center">
            <div className="relative">
                {userPhoto ? (
                    <img src={userPhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover shadow-md" />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-primary-blue/10 flex items-center justify-center">
                        <ICONS.Profile className="w-12 h-12 text-primary-blue" />
                    </div>
                )}
            </div>
            <h2 className="text-2xl font-bold mt-4 text-text-dark-primary">{userName}</h2>
            <p className="text-text-dark-secondary">{userEmail}</p>
            <p className="text-text-dark-secondary text-sm mt-1 capitalize">{age} years old, {gender}</p>
            <button 
                onClick={() => setView('editProfile')}
                className="mt-4 bg-primary-blue/10 text-primary-blue font-semibold px-4 py-2 rounded-full text-sm hover:bg-primary-blue/20 transition-colors"
            >
                Edit Profile
            </button>
        </div>

        {/* Menu Section */}
        <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100">
                 <MenuItem 
                    icon={<ICONS.Bluetooth className="w-5 h-5 text-indigo-500"/>}
                    label="Connected Devices" 
                    onClick={() => setView('connectDevice')} 
                />
                 <MenuItem 
                    icon={<ICONS.Settings className="w-5 h-5 text-gray-600"/>} 
                    label="Settings" 
                    onClick={() => {}} // Placeholder
                    isBeta={true}
                />
                <MenuItem 
                    icon={<ICONS.Help className="w-5 h-5 text-green-500"/>}
                    label="Help & Support" 
                    onClick={() => {}} // Placeholder
                    isBeta={true}
                />
                <MenuItem 
                    icon={<ICONS.Logout className="w-5 h-5 text-red-500"/>}
                    label="Logout" 
                    onClick={() => {}} // Placeholder
                    isDestructive={true}
                />
            </div>
        </div>
    </div>
  );
};

export default ProfileScreen;