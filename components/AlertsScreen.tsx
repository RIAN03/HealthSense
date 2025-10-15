import React from 'react';
import { View, Alert, RiskLevel } from '../types';
import { ICONS } from '../constants';

interface AlertsScreenProps {
  setView: (view: View) => void;
  alerts: Alert[];
}

const riskColorMap: Record<RiskLevel, string> = {
    'Low': 'border-primary-blue',
    'Moderate': 'border-accent-orange',
    'Critical': 'border-red-500',
};

const AlertCard: React.FC<{ alert: Alert }> = ({ alert }) => (
    <div className={`bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 ${riskColorMap[alert.risk]}`}>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-text-dark-primary">{alert.title}</h3>
                <p className="text-sm text-text-dark-secondary mt-1">{alert.detail}</p>
            </div>
            <p className="text-xs text-text-dark-secondary whitespace-nowrap ml-2">{alert.timestamp}</p>
        </div>
    </div>
);

const AlertsScreen: React.FC<AlertsScreenProps> = ({ setView, alerts }) => {
  return (
    <div className="p-6 pb-24">
        <h1 className="text-xl font-bold text-center flex-1 text-text-dark-primary">Health Alerts</h1>
        <p className="text-center text-text-dark-secondary text-sm mt-1">Here are your recent health notifications.</p>

        <div className="mt-6">
            {alerts.length > 0 ? (
                alerts.map(alert => (
                    <AlertCard key={alert.id} alert={alert} />
                ))
            ) : (
                <div className="text-center mt-10 text-text-dark-secondary">
                    <p>No new alerts.</p>
                    <p className="text-sm">Your health vitals are looking good!</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default AlertsScreen;