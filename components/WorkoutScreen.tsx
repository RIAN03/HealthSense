
import React from 'react';
import { View, Workout } from '../types';
import { ICONS, MOCK_WORKOUTS } from '../constants';

interface WorkoutScreenProps {
  setView: (view: View) => void;
}

const WorkoutItem: React.FC<{ workout: Workout }> = ({ workout }) => (
    <div className="flex items-center justify-between bg-white p-3 rounded-xl mb-4 shadow-sm">
        <div className="flex items-center">
            <img src={workout.image} alt={workout.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="ml-4">
                <p className="font-bold text-text-dark-primary">{workout.name}</p>
                <p className="text-sm text-text-dark-secondary">x{workout.reps} Reps</p>
            </div>
        </div>
        <button className="p-2 bg-gray-100 rounded-full">
            <ICONS.ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
    </div>
);

const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ setView }) => {
  return (
    <div className="bg-light-bg">
        <div className="bg-dark-bg p-6 rounded-b-3xl text-white">
            <div className="flex items-center">
                <button onClick={() => setView('home')} className="p-2 rounded-lg bg-white/20">
                    <ICONS.ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <h1 className="text-xl font-bold text-center flex-1">Full Body Workout</h1>
                <div className="w-10"></div>
            </div>

            <div className="flex justify-around items-center text-center mt-8">
                <div>
                    <p className="text-light-secondary">Duration</p>
                    <p className="text-3xl font-bold">0:12:25</p>
                </div>
                 <div>
                    <p className="text-light-secondary">Energy</p>
                    <p className="text-3xl font-bold">75.5<span className="text-base font-normal"> KCAL</span></p>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <button className="w-20 h-20 bg-accent-orange rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>

        <div className="p-6">
            <p className="font-semibold text-text-dark-secondary">30 Min &bull; 11 Workouts</p>
            <div className="mt-4">
                {MOCK_WORKOUTS.map((workout, index) => (
                    <WorkoutItem key={index} workout={workout} />
                ))}
            </div>
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] px-6 py-4 bg-light-bg">
            <button className="w-full bg-primary-blue text-white py-4 rounded-full font-bold text-lg flex items-center justify-center">
                Start Now <ICONS.ChevronRight className="w-5 h-5 ml-2" />
            </button>
        </div>
    </div>
  );
};

export default WorkoutScreen;
