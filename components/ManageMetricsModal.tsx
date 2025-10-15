import React, { useState, useEffect } from 'react';
import { EXTRA_METRICS } from '../constants';
import { ICONS } from '../constants';

interface ManageMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedMetrics: string[]) => void;
  initialSelectedMetrics: string[];
}

const ManageMetricsModal: React.FC<ManageMetricsModalProps> = ({ isOpen, onClose, onSave, initialSelectedMetrics }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelectedMetrics));

  useEffect(() => {
    // Sync state if initial props change while modal is open
    setSelected(new Set(initialSelectedMetrics));
  }, [initialSelectedMetrics]);

  const handleToggle = (metricName: string) => {
    setSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(metricName)) {
        newSet.delete(metricName);
      } else {
        newSet.add(metricName);
      }
      return newSet;
    });
  };

  const handleSave = () => {
    onSave(Array.from(selected));
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in-fast">
      <div className="relative bg-light-bg w-[375px] h-[812px] flex flex-col rounded-3xl overflow-hidden shadow-2xl">
        <header className="flex items-center p-4 border-b bg-white shadow-sm">
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
                <ICONS.ChevronLeft className="w-6 h-6 text-text-dark-primary" />
            </button>
            <h1 className="text-xl font-bold text-center flex-1 text-text-dark-primary">Manage Measures</h1>
            <div className="w-10"></div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {EXTRA_METRICS.map(category => (
            <div key={category.category}>
              <h3 className="text-sm font-semibold text-text-dark-secondary mb-3 uppercase tracking-wider">{category.category}</h3>
              <div className="space-y-3">
                {category.metrics.map(metric => (
                  <label key={metric.name} htmlFor={`metric-${metric.name}`} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-text-dark-primary">{metric.name}</span>
                    <input
                      id={`metric-${metric.name}`}
                      type="checkbox"
                      checked={selected.has(metric.name)}
                      onChange={() => handleToggle(metric.name)}
                      className="form-checkbox h-5 w-5 text-primary-blue rounded focus:ring-primary-blue focus:ring-offset-0 focus:ring-2 transition"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </main>
        
        <footer className="p-6 bg-white border-t">
          <button
            onClick={handleSave}
            className="w-full bg-primary-blue text-white py-4 rounded-full font-bold text-lg hover:bg-primary-blue/90 transition-colors"
          >
            Save Changes
          </button>
        </footer>
      </div>
      <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; transform: scale(0.95); } 
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ManageMetricsModal;