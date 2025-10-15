
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DashboardScreen from './components/DashboardScreen';
import ReportsScreen from './components/ReportsScreen';
import HealthAIScreen from './components/HealthAIScreen';
import AlertsScreen from './components/AlertsScreen';
import ProfileScreen from './components/ProfileScreen';
import AddDataScreen from './components/AddDataScreen';
import ConnectDeviceScreen from './components/ConnectDeviceScreen';
import BottomNav from './components/BottomNav';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import EditProfileScreen from './components/EditProfileScreen';
import { View, Vital, Alert, VitalSign, HealthDataPoint, Gender } from './types';
import { MOCK_VITALS, METRIC_UNITS, AVATARS } from './constants';

type AppState = 'loading' | 'onboarding' | 'ready';

const generateInitialHistory = (): Record<string, HealthDataPoint[]> => {
    const vitals: VitalSign[] = ['Heart Rate', 'SpO2', 'Blood Pressure', 'Temperature', 'Glucose'];
    const history: Record<string, HealthDataPoint[]> = {};

    vitals.forEach(vitalName => {
        const dailyData: HealthDataPoint[] = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            dailyData.push({
                date: date.toISOString().split('T')[0],
                name: date.toLocaleString('en-us', { weekday: 'short' }),
                value: 0,
            });
        }
        history[vitalName] = dailyData;
    });
    return history;
};

const generateInitialMonthlyHistory = (): Record<string, HealthDataPoint[]> => {
    const vitals: VitalSign[] = ['Heart Rate', 'SpO2', 'Blood Pressure', 'Temperature', 'Glucose'];
    const history: Record<string, HealthDataPoint[]> = {};

    vitals.forEach(vitalName => {
        const monthlyData: HealthDataPoint[] = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            monthlyData.push({
                date: date.toISOString().split('T')[0],
                name: date.getDate().toString(),
                value: 0,
            });
        }
        history[vitalName] = monthlyData;
    });
    return history;
};


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [healthData, setHealthData] = useState<Record<string, { value: string, unit: string }>>(() => {
    return MOCK_VITALS.reduce((acc, vital) => {
      acc[vital.name] = { value: '--', unit: vital.unit };
      return acc;
    }, {} as Record<string, { value: string, unit: string }>);
  });
  const [extraMetrics, setExtraMetrics] = useState<string[]>(['Steps', 'Sleep Stages']);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [appState, setAppState] = useState<AppState>('loading');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name: string; age: string; gender: Gender; photo: string | null; } | null>(null);
  const [healthHistory, setHealthHistory] = useState<Record<string, HealthDataPoint[]>>(generateInitialHistory);
  const [healthHistoryMonth, setHealthHistoryMonth] = useState<Record<string, HealthDataPoint[]>>(generateInitialMonthlyHistory);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2500);

    const loadingTimer = setTimeout(() => {
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      if (onboardingComplete) {
        const savedName = localStorage.getItem('userName') || 'User';
        const savedAge = localStorage.getItem('userAge') || '';
        const savedGender = (localStorage.getItem('userGender') as Gender) || 'other';
        const savedPhoto = localStorage.getItem('userPhoto') || null;
        setUserProfile({ name: savedName, age: savedAge, gender: savedGender, photo: savedPhoto });
        setAppState('ready');
      } else {
        setAppState('onboarding');
      }
    }, 3200);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(loadingTimer);
    };
  }, []);
  
  const handleOnboardingComplete = async (name: string, age: string, gender: Gender, photo: string | null) => {
    let finalPhoto = photo;
    if (!photo) {
        let avatarList: string[];
        switch (gender) {
            case 'female':
                avatarList = AVATARS.female;
                break;
            case 'male':
                avatarList = AVATARS.male;
                break;
            default:
                avatarList = AVATARS.other;
        }

        // Use a simple hash of the name and age to pick a consistent avatar
        let hash = 0;
        const key = name + age;
        for (let i = 0; i < key.length; i++) {
            hash = key.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % avatarList.length;
        finalPhoto = avatarList[index];
    }
    
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userAge', age);
    localStorage.setItem('userGender', gender);
    if (finalPhoto) {
        localStorage.setItem('userPhoto', finalPhoto);
    } else {
        localStorage.removeItem('userPhoto');
    }
    setUserProfile({ name, age, gender, photo: finalPhoto });
    setAppState('ready');
  };

  const handleProfileUpdate = (name: string, age: string, gender: Gender, photo: string | null) => {
    const updatedProfile = { name, age, gender, photo };
    setUserProfile(updatedProfile);
    localStorage.setItem('userName', name);
    localStorage.setItem('userAge', age);
    localStorage.setItem('userGender', gender);
    if (photo) {
        localStorage.setItem('userPhoto', photo);
    } else {
        localStorage.removeItem('userPhoto');
    }
    setCurrentView('profile');
  };

  const handleSaveMetric = (metricName: string, newValue: string) => {
    setHealthData(currentData => ({
        ...currentData,
        [metricName]: {
            ...currentData[metricName],
            value: newValue,
            unit: METRIC_UNITS[metricName] || ''
        }
    }));
    
    const today = new Date();
    const todayKey = today.toISOString().split('T')[0];
    const numericValue = parseFloat(newValue.split('/')[0]); // Handle BP like '120/80'

    if (!isNaN(numericValue)) {
        // Update weekly history
        setHealthHistory(currentHistory => {
            const newHistory = { ...currentHistory };
            if (!newHistory[metricName]) {
                // Create initial history for this new metric if it doesn't exist
                const dailyData: HealthDataPoint[] = [];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    dailyData.push({
                        date: date.toISOString().split('T')[0],
                        name: date.toLocaleString('en-us', { weekday: 'short' }),
                        value: 0,
                    });
                }
                newHistory[metricName] = dailyData;
            }

            const vitalHistory = newHistory[metricName].map(dayData => 
                dayData.date === todayKey 
                ? { ...dayData, value: numericValue } 
                : dayData
            );
            
            return { ...newHistory, [metricName]: vitalHistory };
        });

        // Update monthly history
        setHealthHistoryMonth(currentHistory => {
            const newHistory = { ...currentHistory };
            if (!newHistory[metricName]) {
                const monthlyData: HealthDataPoint[] = [];
                for (let i = 29; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    monthlyData.push({
                        date: date.toISOString().split('T')[0],
                        name: date.getDate().toString(),
                        value: 0,
                    });
                }
                newHistory[metricName] = monthlyData;
            }
            const vitalHistory = newHistory[metricName].map(dayData =>
                dayData.date === todayKey
                ? { ...dayData, value: numericValue }
                : dayData
            );
            return { ...newHistory, [metricName]: vitalHistory };
        });
    }
  };

  const handleAddAlerts = useCallback((newAlerts: Omit<Alert, 'id' | 'timestamp'>[]) => {
    if (newAlerts.length === 0) return;

    const alertsToAdd = newAlerts.map(alert => ({
      ...alert,
      id: Date.now() + Math.random(), // simple unique id
      timestamp: 'Just now'
    }));

    setAlerts(prevAlerts => {
      const existingAlerts = new Set(prevAlerts.map(a => a.title + a.detail));
      const filteredNewAlerts = alertsToAdd.filter(a => !existingAlerts.has(a.title + a.detail));
      
      if (filteredNewAlerts.length === 0) {
        return prevAlerts; // Avoid re-render if all new alerts are duplicates
      }
      
      return [...filteredNewAlerts, ...prevAlerts];
    });
  }, []);

  const vitalsForDashboard: Vital[] = useMemo(() => MOCK_VITALS.map(vital => ({
      ...vital,
      value: healthData[vital.name]?.value || vital.value,
      history: healthHistory[vital.name] || vital.history,
  })), [healthData, healthHistory]);

  const renderView = () => {
    const rawUserName = userProfile?.name || 'User';
    const capitalize = (s: string) => (s && s.charAt(0).toUpperCase() + s.slice(1)) || '';
    const userName = capitalize(rawUserName);
    const userEmail = `${rawUserName.replace(/\s+/g, '.').toLowerCase()}@example.com`;
    const userPhoto = userProfile?.photo || null;

    switch (currentView) {
      case 'dashboard':
        return <DashboardScreen 
                    userName={userName} 
                    userPhoto={userPhoto}
                    setView={setCurrentView} 
                    vitals={vitalsForDashboard} 
                    addAlerts={handleAddAlerts}
                    extraMetrics={extraMetrics}
                    setExtraMetrics={setExtraMetrics}
                    healthData={healthData}
                />;
      case 'reports':
        return <ReportsScreen 
                    setView={setCurrentView} 
                    healthHistory={healthHistory}
                    healthHistoryMonth={healthHistoryMonth}
                    userName={userName}
                    extraMetrics={extraMetrics}
                />;
      case 'healthAI':
        return <HealthAIScreen 
                    setView={setCurrentView} 
                    healthData={healthData} 
                    userName={userName}
                    healthHistory={healthHistory}
                    healthHistoryMonth={healthHistoryMonth}
                />;
      case 'alerts':
        return <AlertsScreen setView={setCurrentView} alerts={alerts} />;
      case 'profile':
        return <ProfileScreen 
                    userName={userName} 
                    userEmail={userEmail} 
                    userPhoto={userPhoto} 
                    age={userProfile?.age || ''}
                    gender={userProfile?.gender || 'other'}
                    setView={setCurrentView} 
                />;
      case 'editProfile':
        return <EditProfileScreen
                    setView={setCurrentView}
                    currentUser={userProfile}
                    onSave={handleProfileUpdate}
                />;
      case 'addData':
        return <AddDataScreen 
                    setView={setCurrentView} 
                    onSave={handleSaveMetric} 
                    primaryVitals={MOCK_VITALS}
                    extraMetrics={extraMetrics}
                />;
      case 'connectDevice':
        return <ConnectDeviceScreen setView={setCurrentView} onSave={handleSaveMetric} />;
      default:
        return <DashboardScreen 
                    userName={userName}
                    userPhoto={userPhoto}
                    setView={setCurrentView} 
                    vitals={vitalsForDashboard} 
                    addAlerts={handleAddAlerts} 
                    extraMetrics={extraMetrics}
                    setExtraMetrics={setExtraMetrics}
                    healthData={healthData}
                />;
    }
  };

  const renderAppContent = () => {
    switch (appState) {
      case 'loading':
        return <SplashScreen isFadingOut={isFadingOut} />;
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'ready':
        return (
          <>
            <div className="flex-1 overflow-y-auto">
              {renderView()}
            </div>
            {currentView !== 'healthAI' && currentView !== 'addData' && currentView !== 'connectDevice' && currentView !== 'editProfile' && <BottomNav currentView={currentView} setView={setCurrentView} />}
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center font-poppins">
      <div className="relative w-[375px] h-[812px] bg-light-bg overflow-hidden shadow-2xl rounded-3xl flex flex-col">
        {renderAppContent()}
      </div>
    </div>
  );
};

export default App;
