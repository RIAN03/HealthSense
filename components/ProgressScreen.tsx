
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { View, CaloriesData } from '../types';
import { ICONS, MOCK_CALORIES_DATA } from '../constants';

interface ProgressScreenProps {
  setView: (view: View) => void;
}

const ProgressCircle: React.FC<{ percentage: number }> = ({ percentage }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    className="text-gray-200"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
                <circle
                    className="text-primary-blue"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50%"
                    cy="50%"
                />
            </svg>
            <span className="absolute text-3xl font-bold text-text-dark-primary">{percentage}%</span>
        </div>
    );
};

const CaloriesChart: React.FC<{data: CaloriesData[]}> = ({data}) => (
    <div className="h-48 mt-4">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                    <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#FBBF24" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 'dataMax + 20']} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
                    labelStyle={{ fontWeight: 'bold' }}
                    formatter={(value: number) => [`${value} Cal`, 'Calories']}
                />
                <Area type="monotone" dataKey="calories" stroke="#FBBF24" strokeWidth={3} fillOpacity={1} fill="url(#colorCalories)" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);


const StatCard: React.FC<{ icon: React.ReactNode, value: string, label: string, bgColor: string, children?: React.ReactNode }> = ({ icon, value, label, bgColor, children }) => (
    <div className={`p-4 rounded-2xl flex-1 ${bgColor}`}>
        <div className="flex items-center space-x-2 text-white">
            {icon}
            <span className="font-medium">{label}</span>
        </div>
        <div className="mt-2">
            {children ? children : <p className="text-4xl font-bold text-white">{value.split(' ')[0]}<span className="text-lg ml-1 font-medium">{value.split(' ')[1]}</span></p>}
        </div>
    </div>
);

const ProgressScreen: React.FC<ProgressScreenProps> = ({ setView }) => {
  return (
    <div className="p-6">
      <div className="flex items-center">
        <button onClick={() => setView('home')} className="p-2 rounded-lg bg-gray-200">
            <ICONS.ChevronLeft className="w-6 h-6 text-text-dark-primary" />
        </button>
        <h1 className="text-xl font-bold text-center flex-1 text-text-dark-primary">My Progress</h1>
        <div className="w-10"></div>
      </div>
      
      <div className="bg-white p-5 mt-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-lg font-bold text-text-dark-primary">Overall Progress</h2>
                <button className="text-sm text-primary-blue bg-blue-100 px-4 py-1 rounded-lg mt-2">Manage</button>
            </div>
            <ProgressCircle percentage={75} />
        </div>
      </div>

      <div className="bg-white p-5 mt-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-text-dark-primary">Calories Burn</h2>
            <button className="flex items-center text-sm text-primary-blue font-medium">
                This Week <ICONS.ChevronDown className="w-4 h-4 ml-1" />
            </button>
        </div>
        <CaloriesChart data={MOCK_CALORIES_DATA} />
      </div>

      <div className="flex space-x-4 mt-6">
        <StatCard icon={<ICONS.Sleep className="w-5 h-5" />} value="7.5 Hrs" label="Sleep Hours" bgColor="bg-primary-blue">
            <div className="flex items-end h-16 space-x-1.5 mt-2">
                {[4,6,8,5,7,6,7].map((h, i) => (
                    <div key={i} className="bg-white/50 rounded-full w-full" style={{height: `${(h/8)*100}%`}}></div>
                ))}
            </div>
             <p className="text-4xl font-bold text-white mt-2">7.5<span className="text-lg ml-1 font-medium">Hrs</span></p>
        </StatCard>
        <StatCard icon={<ICONS.Steps className="w-5 h-5" />} value="4.1k" label="Steps" bgColor="bg-accent-orange" />
      </div>

    </div>
  );
};

export default ProgressScreen;

