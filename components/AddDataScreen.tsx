import React, { useState } from 'react';
import { View, Vital } from '../types';
import { ICONS, METRIC_UNITS, METRIC_ICONS } from '../constants';

interface AddDataScreenProps {
  setView: (view: View) => void;
  onSave: (metricName: string, newValue: string) => void;
  primaryVitals: Vital[];
  extraMetrics: string[];
}

interface SelectedMetric {
    name: string;
    unit: string;
    icon: React.FC<any>;
    color: string;
    bgColor: string;
}

const AddDataScreen: React.FC<AddDataScreenProps> = ({ setView, onSave, primaryVitals, extraMetrics }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedMetric, setSelectedMetric] = useState<SelectedMetric | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSelectMetric = (metric: SelectedMetric) => {
    setSelectedMetric(metric);
    setSelectedValue('');
  };

  const handleSave = () => {
    if (!selectedMetric || !selectedValue.trim()) return;
    onSave(selectedMetric.name, selectedValue);
    setSelectedMetric(null);
    setSelectedValue('');
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000); // Hide message after 2 seconds
  };

  return (
    <div className="flex flex-col h-full bg-light-bg">
      <header className="flex items-center p-4 border-b bg-white shadow-sm">
        <button onClick={() => setView('dashboard')} className="p-2 rounded-lg hover:bg-gray-100">
          <ICONS.ChevronLeft className="w-6 h-6 text-text-dark-primary" />
        </button>
        <h1 className="text-xl font-bold text-center flex-1 text-text-dark-primary">Add Manual Data</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        {showConfirmation && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg shadow-sm animate-fade-in" role="alert">
            <p className="font-bold">Success!</p>
            <p>Your data has been saved.</p>
          </div>
        )}
        <h2 className="text-lg font-semibold text-text-dark-primary mb-3">Select a Vital</h2>
        <div className="grid grid-cols-3 gap-4">
          {primaryVitals.map(vital => (
            <button 
              key={vital.name} 
              onClick={() => handleSelectMetric(vital)}
              className={`flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-sm border-2 transition-all duration-200 ${selectedMetric?.name === vital.name ? 'border-primary-blue scale-105' : 'border-transparent'}`}
            >
              <div className={`${vital.bgColor} p-2 rounded-lg`}>
                <vital.icon className={`w-6 h-6 ${vital.color}`} />
              </div>
              <p className="text-xs font-medium text-text-dark-primary mt-2 text-center">{vital.name}</p>
            </button>
          ))}
        </div>

        {extraMetrics.length > 0 && (
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-text-dark-primary mb-3">Select a Measure</h2>
                <div className="grid grid-cols-3 gap-4">
                    {extraMetrics.map(metricName => {
                        const Icon = METRIC_ICONS[metricName] || METRIC_ICONS.Default;
                        const isSelected = selectedMetric?.name === metricName;
                        return (
                            <button
                                key={metricName}
                                onClick={() => handleSelectMetric({
                                    name: metricName,
                                    unit: METRIC_UNITS[metricName] || '',
                                    icon: Icon,
                                    color: 'text-gray-600',
                                    bgColor: 'bg-gray-100'
                                })}
                                className={`flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-sm border-2 transition-all duration-200 ${isSelected ? 'border-primary-blue scale-105' : 'border-transparent'}`}
                            >
                                <div className={`bg-gray-100 p-2 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-gray-600" />
                                </div>
                                <p className="text-xs font-medium text-text-dark-primary mt-2 text-center">{metricName}</p>
                            </button>
                        )
                    })}
                </div>
            </div>
        )}

        {selectedMetric && (
          <div className="mt-8 bg-white p-5 rounded-xl shadow-sm animate-fade-in">
            <h3 className="font-semibold text-text-dark-primary">
              Enter <span className={`${selectedMetric.color}`}>{selectedMetric.name}</span>
            </h3>
            <div className="mt-4 flex items-center bg-gray-100 rounded-lg">
              <input
                type="text" // Use text to allow for values like '120/80'
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                placeholder="Enter value"
                className="w-full p-4 bg-transparent text-lg font-semibold focus:outline-none"
                autoFocus
              />
              <span className="p-4 text-text-dark-secondary font-medium">{selectedMetric.unit}</span>
            </div>
          </div>
        )}
      </main>

      <footer className="p-6 bg-white border-t">
        <button
          onClick={handleSave}
          disabled={!selectedMetric || !selectedValue.trim()}
          className="w-full bg-primary-blue text-white py-4 rounded-full font-bold text-lg disabled:bg-gray-300 transition-colors"
        >
          Save Data
        </button>
      </footer>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AddDataScreen;