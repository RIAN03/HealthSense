import React, { useState, useCallback } from 'react';
import { View } from '../types';
import { ICONS } from '../constants';

interface ConnectDeviceScreenProps {
  setView: (view: View) => void;
  onSave: (metricName: string, newValue: string) => void;
}

type Status = 'disconnected' | 'scanning' | 'connecting' | 'connected' | 'error';

interface LiveVitals {
  heartRate: number | null;
  spo2: number | null;
  bloodPressure: { systolic: number; diastolic: number } | null;
  temperature: number | null;
  batteryLevel: number | null;
}

const LiveVitalDisplay: React.FC<{ icon: React.ReactNode, label: string, value: string | null, unit: string, color: string }> = ({ icon, label, value, unit, color }) => {
    if (value === null) return null;
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm text-left w-full">
            <div className="flex items-center text-text-dark-secondary">
                {icon}
                <span className="ml-2 font-semibold">{label}</span>
            </div>
            <div className="mt-1">
                <span className={`text-3xl font-bold ${color}`}>{value}</span>
                <span className="ml-1 text-text-dark-secondary">{unit}</span>
            </div>
        </div>
    );
};


const ConnectDeviceScreen: React.FC<ConnectDeviceScreenProps> = ({ setView, onSave }) => {
  const [status, setStatus] = useState<Status>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [device, setDevice] = useState<any | null>(null);
  const [liveVitals, setLiveVitals] = useState<LiveVitals>({
    heartRate: null,
    spo2: null,
    bloodPressure: null,
    temperature: null,
    batteryLevel: null,
  });

  const updateVital = (vital: keyof LiveVitals, value: any) => {
    setLiveVitals(prev => ({ ...prev, [vital]: value }));
  };

  // --- Data Parsers ---
  const handleHeartRateNotification = (event: Event) => {
    const value = (event.target as any).value as DataView;
    const flags = value.getUint8(0);
    const rate16Bits = (flags & 0x1) !== 0;
    const heartRate = rate16Bits ? value.getUint16(1, true) : value.getUint8(1);
    updateVital('heartRate', heartRate);
    onSave('Heart Rate', heartRate.toString());
  };

  const handleSpo2Notification = (event: Event) => {
    const value = (event.target as any).value as DataView;
    const spo2 = value.getUint16(1, true) / 10; // Example parsing, may vary
    updateVital('spo2', spo2);
    onSave('SpO2', spo2.toString());
  };
  
  const handleTemperatureNotification = (event: Event) => {
    const value = (event.target as any).value as DataView;
    const temp = value.getFloat32(1, true);
    updateVital('temperature', parseFloat(temp.toFixed(1)));
    onSave('Temperature', temp.toFixed(1));
  };

  const handleBloodPressureNotification = (event: Event) => {
    const value = (event.target as any).value as DataView;
    const systolic = value.getUint16(1, true);
    const diastolic = value.getUint16(3, true);
    updateVital('bloodPressure', { systolic, diastolic });
    onSave('Blood Pressure', `${systolic}/${diastolic}`);
  };

  const handleBatteryLevelNotification = (event: Event) => {
    const value = (event.target as any).value as DataView;
    const batteryLevel = value.getUint8(0);
    updateVital('batteryLevel', batteryLevel);
  };

  const onDisconnected = useCallback(() => {
    setStatus('disconnected');
    setLiveVitals({ heartRate: null, spo2: null, bloodPressure: null, temperature: null, batteryLevel: null });
    setDevice(null);
  }, []);

  const connectDevice = useCallback(async () => {
    setStatus('scanning');
    setError(null);
    try {
      if (!(navigator as any).bluetooth) {
        throw new Error('Web Bluetooth API is not available on this browser.');
      }
      
      const selectedDevice = await (navigator as any).bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          'heart_rate', 
          'blood_pressure', 
          'health_thermometer', 
          'pulse_oximeter', 
          'battery_service'
        ],
      });
      
      setStatus('connecting');
      setDevice(selectedDevice);
      selectedDevice.addEventListener('gattserverdisconnected', onDisconnected);
      
      const server = await selectedDevice.gatt?.connect();
      if (!server) throw new Error('Could not connect to GATT server.');
      
      // Setup notifications for all available services
      const setupNotification = async (serviceUUID: string, characteristicUUID: string, handler: (event: Event) => void) => {
        try {
          const service = await server.getPrimaryService(serviceUUID);
          const characteristic = await service.getCharacteristic(characteristicUUID);
          await characteristic.startNotifications();
          characteristic.addEventListener('characteristicvaluechanged', handler);
          console.log(`Subscribed to ${characteristicUUID}`);
        } catch (e) {
          console.log(`Service ${serviceUUID} not found or unsupported.`);
        }
      };

      await setupNotification('heart_rate', 'heart_rate_measurement', handleHeartRateNotification);
      await setupNotification('pulse_oximeter', 'plx_spot_check_measurement', handleSpo2Notification);
      await setupNotification('blood_pressure', 'blood_pressure_measurement', handleBloodPressureNotification);
      await setupNotification('health_thermometer', 'temperature_measurement', handleTemperatureNotification);
      await setupNotification('battery_service', 'battery_level', handleBatteryLevelNotification);
      
      setStatus('connected');
    } catch (err: any) {
      console.error('Bluetooth connection failed:', err);
      setStatus('error');
      setError(err.message || 'Failed to connect. Please try again.');
      if (device) device.gatt?.disconnect();
    }
  }, [onSave, onDisconnected, device]);

  const disconnectDevice = useCallback(async () => {
    if (device && device.gatt?.connected) {
      device.gatt.disconnect();
    } else {
      onDisconnected();
    }
  }, [device, onDisconnected]);

  return (
    <div className="flex flex-col h-full bg-light-bg">
      <header className="flex items-center p-4 border-b bg-white shadow-sm">
        <button onClick={() => setView('profile')} className="p-2 rounded-lg hover:bg-gray-100">
          <ICONS.ChevronLeft className="w-6 h-6 text-text-dark-primary" />
        </button>
        <h1 className="text-xl font-bold text-center flex-1 text-text-dark-primary">Connect Device</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center p-6 text-center">
        {status !== 'connected' ? (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="w-40 h-40 rounded-full bg-primary-blue/10 flex items-center justify-center">
                <ICONS.Bluetooth className="w-20 h-20 text-primary-blue" />
            </div>
            <div className="mt-4">
                <p className="font-bold text-lg text-text-dark-primary capitalize">{status}</p>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        ) : (
            <div className="w-full">
                <p className="font-bold text-lg text-text-dark-primary">{device?.name || 'Connected Device'}</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <LiveVitalDisplay icon={<ICONS.Heart className="w-5 h-5 text-red-500" />} label="Heart Rate" value={liveVitals.heartRate?.toString() || null} unit="bpm" color="text-red-500" />
                    <LiveVitalDisplay icon={<ICONS.Lungs className="w-5 h-5 text-sky-500" />} label="SpO2" value={liveVitals.spo2?.toString() || null} unit="%" color="text-sky-500" />
                    <LiveVitalDisplay icon={<ICONS.BloodPressure className="w-5 h-5 text-purple-500" />} label="Blood Pressure" value={liveVitals.bloodPressure ? `${liveVitals.bloodPressure.systolic}/${liveVitals.bloodPressure.diastolic}` : null} unit="mmHg" color="text-purple-500" />
                    <LiveVitalDisplay icon={<ICONS.Thermometer className="w-5 h-5 text-orange-500" />} label="Temperature" value={liveVitals.temperature?.toString() || null} unit="°C" color="text-orange-500" />
                    <LiveVitalDisplay icon={<ICONS.Smartwatch className="w-5 h-5 text-gray-500" />} label="Device Battery" value={liveVitals.batteryLevel?.toString() || null} unit="%" color="text-gray-600" />
                </div>
            </div>
        )}
        
        <div className="mt-auto w-full pt-4">
            {status !== 'connected' ? (
                <button
                  onClick={connectDevice}
                  disabled={status === 'scanning' || status === 'connecting'}
                  className="w-full bg-primary-blue text-white py-4 rounded-full font-bold text-lg disabled:bg-gray-400 transition-colors"
                >
                  {status === 'scanning' ? 'Scanning...' : 'Scan for Wearable Device'}
                </button>
            ) : (
                <button
                  onClick={disconnectDevice}
                  className="w-full bg-red-500 text-white py-4 rounded-full font-bold text-lg transition-colors"
                >
                  Disconnect
                </button>
            )}
            <p className="text-xs text-text-dark-secondary mt-4 px-4">
                Ensure your BLE device is on and discoverable. This feature requires a browser that supports Web Bluetooth, like Chrome on Desktop or Android.
            </p>
        </div>
      </main>
    </div>
  );
};

export default ConnectDeviceScreen;