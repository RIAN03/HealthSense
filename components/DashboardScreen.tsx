
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { View, Vital, Alert } from '../types';
import { ICONS, METRIC_ICONS } from '../constants';
import ManageMetricsModal from './ManageMetricsModal';

interface DashboardScreenProps {
  setView: (view: View) => void;
  vitals: Vital[];
  addAlerts: (newAlerts: Omit<Alert, 'id' | 'timestamp'>[]) => void;
  userName: string;
  userPhoto: string | null;
  extraMetrics: string[];
  setExtraMetrics: (metrics: string[]) => void;
  healthData: Record<string, { value: string, unit: string }>;
}

const Header: React.FC<{ userName: string, userPhoto: string | null }> = ({ userName, userPhoto }) => (
  <div className="bg-light-bg p-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-text-dark-primary">Hello {userName}!</h1>
        <p className="text-text-dark-secondary">Here's your health summary.</p>
      </div>
      {userPhoto ? (
        <img src={userPhoto} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
      ) : (
        <div className="w-12 h-12 rounded-full bg-primary-blue/20 flex items-center justify-center">
            <ICONS.Profile className="w-7 h-7 text-primary-blue" />
        </div>
      )}
    </div>
  </div>
);

const VitalCardGraph: React.FC<{ vital: Vital }> = ({ vital }) => {
  const getHexColor = (tailwindColorClass: string) => {
    if (tailwindColorClass.includes('red')) return '#EF4444';
    if (tailwindColorClass.includes('sky')) return '#0EA5E9';
    if (tailwindColorClass.includes('purple')) return '#8B5CF6';
    if (tailwindColorClass.includes('orange')) return '#F97316';
    if (tailwindColorClass.includes('green')) return '#22C55E';
    return '#6B7280';
  };
  const strokeColor = getHexColor(vital.color);
  const gradientId = `gradient-${vital.name.replace(/\s+/g, '')}`;

  return (
    <div className="bg-card-light rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow duration-300 min-h-[160px]">
      <div className="flex justify-between items-start">
        <div className={`${vital.bgColor} p-2 rounded-lg`}>
          <vital.icon className={`w-6 h-6 ${vital.color}`} />
        </div>
        <p className="text-sm font-semibold text-text-dark-secondary">{vital.name}</p>
      </div>
      
      <div className="h-12 w-full my-1">
        {vital.history && vital.value !== '--' ? (
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={vital.history} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
               <defs>
                 <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4}/>
                   <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <Area
                 type="monotone"
                 dataKey="value"
                 stroke={strokeColor}
                 strokeWidth={2}
                 fillOpacity={1}
                 fill={`url(#${gradientId})`}
               />
             </AreaChart>
           </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-text-dark-secondary italic">
            No data for today
          </div>
        )}
      </div>

      <div className="text-right mt-auto">
        <p className={`text-3xl font-bold transition-colors ${vital.value === '--' ? 'text-text-dark-secondary' : 'text-text-dark-primary'}`}>{vital.value}</p>
        <p className="text-sm text-text-dark-secondary">{vital.unit}</p>
      </div>
    </div>
  );
};

const ExtraMetricCard: React.FC<{ name: string; value?: string; unit?: string; }> = ({ name, value, unit }) => {
  const Icon = METRIC_ICONS[name] || METRIC_ICONS['Default'];
  return (
    <div className="bg-card-light rounded-2xl p-3 flex items-center justify-between shadow-sm min-h-[76px]">
        <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-lg">
                <Icon className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-sm font-semibold text-text-dark-primary ml-3">{name}</p>
        </div>
        <div className="text-right">
            <p className="text-lg font-bold text-text-dark-primary">{value || '--'}</p>
            <p className="text-xs text-text-dark-secondary">{value ? unit : 'Not set'}</p>
        </div>
    </div>
  );
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({ setView, vitals, addAlerts, userName, userPhoto, extraMetrics, setExtraMetrics, healthData }) => {
  const [aiSummary, setAiSummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [isCritical, setIsCritical] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveMetrics = (newMetrics: string[]) => {
    setExtraMetrics(newMetrics);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const getFullMetricsString = () => {
        const primaryVitalsString = vitals
            .filter(v => v.value && v.value.trim() !== '--')
            .map(v => `${v.name}: ${v.value} ${v.unit}`).join(', ');
            
        const extraMetricsWithValueString = extraMetrics
            .filter(metricName => healthData[metricName] && healthData[metricName].value && healthData[metricName].value.trim() !== '--')
            .map(metricName => {
                const data = healthData[metricName];
                return `${metricName}: ${data.value} ${data.unit}`;
            }).join(', ');
        
        const allMetrics = [primaryVitalsString, extraMetricsWithValueString].filter(Boolean);
        return allMetrics.join(', ');
    };

    const fetchAiInsights = async (metrics: string) => {
      setIsSummaryLoading(true);
      setAiSummary('');
      setIsCritical(false);

      if (!metrics.trim()) {
          setAiSummary("Add some vitals or measures to get your AI summary.");
          setIsSummaryLoading(false);
          return;
      }
      
      try {
        const responseStream = await ai.models.generateContentStream({
          model: "gemini-2.5-flash",
          contents: `Analyze these health metrics: ${metrics}.`,
          config: {
            systemInstruction: `You are HealthSense, an AI health assistant. Analyze user's health metrics. Normal ranges: Heart Rate 60-100 bpm, SpO2 95-100%, BP < 120/80 mmHg, Temp 36.5-37.5 C, Glucose 70-100 mg/dL.
Your response must have two parts separated by '|||---|||'.
Part 1 (Summary):
- Provide a brief, common-sense interpretation of all metrics.
- If a situation is highly critical (e.g., SpO2 below 92%), prefix the summary with the special tag [EMERGENCY].
- If vitals are normal, give a reassuring summary.
- If any vital is irregular, identify it and provide a safe, simple recommendation.
- CRITICAL: Never give a medical diagnosis. Always end with a recommendation to consult a healthcare professional.
Part 2 (Alerts JSON):
- After the separator, provide a valid JSON object with an 'alerts' array.
- The 'alerts' array should ONLY contain entries for vitals that are outside the normal range.
- For each alert, provide a 'title', a 'detail' string, and a 'risk' level ('Low', 'Moderate', 'Critical').
- If all vitals are normal, the 'alerts' array should be empty.`,
          },
        });
        
        let fullResponseText = '';
        let summaryText = '';
        let jsonBuffer = '';
        const separator = '|||---|||';
        let separatorFound = false;

        for await (const chunk of responseStream) {
            fullResponseText += chunk.text;
            
            if (!separatorFound) {
                if (fullResponseText.includes(separator)) {
                    separatorFound = true;
                    const parts = fullResponseText.split(separator);
                    summaryText += parts[0];
                    jsonBuffer += parts[1];
                } else {
                    summaryText += chunk.text;
                }
            } else {
                jsonBuffer += chunk.text;
            }

            if (summaryText.includes('[EMERGENCY]')) {
                setIsCritical(true);
                setAiSummary(summaryText.replace('[EMERGENCY]', ''));
            } else {
                setAiSummary(summaryText);
            }
        }

        if (jsonBuffer.trim()) {
            try {
                // Sanitize the JSON buffer by finding the first { and last }
                const firstBrace = jsonBuffer.indexOf('{');
                const lastBrace = jsonBuffer.lastIndexOf('}');
                if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                    const cleanJsonString = jsonBuffer.substring(firstBrace, lastBrace + 1);
                    const parsedJson = JSON.parse(cleanJsonString);
                    if (parsedJson.alerts && parsedJson.alerts.length > 0) {
                        addAlerts(parsedJson.alerts);
                    }
                }
            } catch (jsonError) {
                console.error("Failed to parse alerts JSON from AI response:", jsonError);
                console.error("Received JSON buffer:", jsonBuffer);
            }
        }

      } catch (error: any) {
        console.error("Failed to stream AI insights:", error);
        const errorMessage = error.toString();
        if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
             setAiSummary("AI analysis is currently unavailable due to high traffic. Please try again in a moment.");
        } else {
             setAiSummary("Could not load AI summary at the moment.");
        }
      } finally {
        setIsSummaryLoading(false);
      }
    };
    
    const metricsString = getFullMetricsString();
    fetchAiInsights(metricsString);

  }, [vitals, addAlerts, extraMetrics, healthData]);

  return (
    <div className="pb-24">
      <Header userName={userName} userPhoto={userPhoto} />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text-dark-primary">Today's Vitals</h2>
          <button 
              onClick={() => setView('addData')}
              className="bg-primary-blue/10 text-primary-blue font-semibold px-3 py-1.5 rounded-full text-xs hover:bg-primary-blue/20 transition-colors"
            >
              Add Manual
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {vitals.map(vital => (
            <VitalCardGraph key={vital.name} vital={vital} />
          ))}
        </div>

        <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text-dark-primary">Extra Measures</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary-blue/10 text-primary-blue font-semibold px-3 py-1.5 rounded-full text-xs hover:bg-primary-blue/20 transition-colors"
                >
                    Manage
                </button>
            </div>
            {extraMetrics.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    {extraMetrics.map(metricName => {
                        const metricData = healthData[metricName];
                        return (
                            <ExtraMetricCard 
                                key={metricName} 
                                name={metricName} 
                                value={metricData?.value} 
                                unit={metricData?.unit} />
                        )})}
                </div>
            ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <p className="text-text-dark-secondary">No extra measures selected.</p>
                    <button onClick={() => setIsModalOpen(true)} className="mt-2 text-sm font-semibold text-primary-blue">
                        Add Measures
                    </button>
                </div>
            )}
        </div>

        <div className={`mt-6 text-white p-5 rounded-2xl shadow-lg min-h-[140px] transition-colors duration-500 ${isCritical ? 'bg-red-600' : 'bg-primary-blue'}`}>
            <h3 className="font-bold text-lg flex items-center">
              {isCritical && <ICONS.Warning className="w-6 h-6 mr-2 animate-pulse" />}
              AI Health Summary
            </h3>
            {isSummaryLoading && !aiSummary ? (
               <div className="flex items-center justify-center pt-4">
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-150 mx-2"></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-300"></div>
               </div>
            ) : (
              <>
                <p className="mt-2 text-sm font-light whitespace-pre-wrap">{aiSummary}{isSummaryLoading ? '...' : ''}</p>
                {!isSummaryLoading && (
                  <button onClick={() => setView('healthAI')} className="mt-4 font-semibold text-sm flex items-center">
                      Ask Health AI <ICONS.ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </>
            )}
        </div>
      </div>
       <ManageMetricsModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveMetrics}
          initialSelectedMetrics={extraMetrics}
      />
    </div>
  );
};

export default DashboardScreen;
