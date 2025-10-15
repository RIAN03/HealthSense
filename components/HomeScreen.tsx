import React from 'react';
import { View, Friend } from '../types';
import { ICONS, MOCK_FRIENDS } from '../constants';

interface HomeScreenProps {
  setView: (view: View) => void;
}

const Calendar: React.FC = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const dates = [14, 15, 16, 17, 18, 19, 20];
    const activeDate = 14;

    return (
        <div className="flex justify-between items-center text-white mt-8">
            {dates.map((date, index) => (
                <div key={date} className={`text-center p-2 rounded-xl ${date === activeDate ? 'bg-primary-blue' : ''}`}>
                    <p className="text-sm font-medium text-light-secondary">{days[index]}</p>
                    <p className="font-semibold mt-1">{date}</p>
                </div>
            ))}
        </div>
    );
};

const StatCard: React.FC<{ icon: React.ReactNode, value: string, label: string, color: string }> = ({ icon, value, label, color }) => (
    <div className="bg-card-light rounded-xl p-4 flex items-center w-1/2">
        <div className={`p-2 rounded-full`} style={{ backgroundColor: color + '20' }}>
            {icon}
        </div>
        <div className="ml-3">
            <p className="font-bold text-lg text-text-dark-primary">{value}</p>
            <p className="text-sm text-text-dark-secondary">{label}</p>
        </div>
    </div>
);

const GoalCard: React.FC<{ title: string, duration: string, bgColor: string, textColor: string, onStart: () => void }> = ({ title, duration, bgColor, textColor, onStart }) => (
    <div className={`${bgColor} ${textColor} p-5 rounded-2xl flex-1`}>
        <p className="font-medium">{title}</p>
        <p className="text-4xl font-bold my-2">{duration.split(' ')[0]}<span className="text-xl font-medium ml-1">{duration.split(' ')[1]}</span></p>
        <div className="h-4 w-full bg-white/30 rounded-full my-4 relative">
            <div className="absolute left-0 top-0 h-4 w-3/4 bg-white/50 rounded-full"></div>
             <div className="absolute right-1/4 top-1/2 -translate-y-1/2 h-2 w-2 bg-white rounded-full"></div>
             {/* FIX: Removed invalid and redundant inline style. The `bg-white/30` class already handles opacity. */}
             <div className="absolute right-1/4 -top-1/2 h-8 w-px bg-white/30"></div>
        </div>
        <button onClick={onStart} className="flex items-center justify-between w-full mt-2">
            <span>Start Now</span>
            <div className="bg-white/30 p-1 rounded-full">
                <ICONS.ChevronRight className="w-4 h-4" />
            </div>
        </button>
    </div>
);


const FriendList: React.FC = () => (
    <div className="mt-6">
        <h2 className="text-xl font-bold text-text-dark-primary">Duel With a Friend</h2>
        <div className="flex items-center space-x-4 mt-4 text-center">
            <div className="flex flex-col items-center">
                <button className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-2xl font-light">+</button>
                <span className="text-sm mt-2 text-text-dark-secondary">New</span>
            </div>
            {MOCK_FRIENDS.map(friend => (
                <div key={friend.name} className="flex flex-col items-center">
                    <img src={friend.avatar} alt={friend.name} className="w-14 h-14 rounded-full border-2 border-primary-blue" />
                    <span className="text-sm mt-2 text-text-dark-secondary">{friend.name}</span>
                </div>
            ))}
        </div>
    </div>
);


const HomeScreen: React.FC<HomeScreenProps> = ({ setView }) => {
  return (
    <>
      <div className="bg-dark-bg p-6 rounded-b-3xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Hello John!</h1>
            <p className="text-light-secondary flex items-center">January, 2023 <ICONS.ChevronDown className="w-4 h-4 ml-1" /></p>
          </div>
          <img src="https://i.pravatar.cc/150?img=5" alt="Profile" className="w-12 h-12 rounded-full" />
        </div>
        <Calendar />
      </div>

      <div className="p-6">
        <div className="flex space-x-4">
            <StatCard icon={<ICONS.Water className="w-6 h-6 text-blue-500" />} value="4.5" label="Liters Water" color="#3B82F6" />
            <StatCard icon={<ICONS.Calories className="w-6 h-6 text-orange-500" />} value="2.3k" label="Calories" color="#F97316" />
        </div>

        <div className="mt-6">
            <h2 className="text-xl font-bold text-text-dark-primary">Today's Goals</h2>
            <div className="flex space-x-4 mt-4">
                <GoalCard title="Running" duration="30 Mins" bgColor="bg-primary-blue" textColor="text-white" onStart={() => setView('workout')} />
                <GoalCard title="Cycling" duration="40 Mins" bgColor="bg-accent-orange" textColor="text-white" onStart={() => setView('workout')} />
            </div>
        </div>
        
        <FriendList />
      </div>
    </>
  );
};

export default HomeScreen;